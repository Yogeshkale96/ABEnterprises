const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const userRepository = require('../repositories/userRepository');
const refreshTokenRepository = require('../repositories/refreshTokenRepository');
const logger = require('../utils/logger');

const MS_PER_SECOND = 1000;

const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

const refreshTtlMs = () => {
  const match = /^(\d+)([smhd])$/.exec(env.jwt.refreshExpiresIn);
  const mult = { s: 1, m: 60, h: 3600, d: 86400 }[match?.[2]] || 86400;
  return (parseInt(match?.[1], 10) || 7) * mult * MS_PER_SECOND;
};

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const authService = {
  signAccessToken(user) {
    return jwt.sign(
      { sub: user.id, name: user.name, email: user.email, role: user.role, type: 'access' },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn, issuer: env.jwt.issuer, audience: env.jwt.audience }
    );
  },

  /** Creates a refresh token, persists only its SHA-256 hash, returns the raw token. */
  async issueRefreshToken(userId) {
    const jti = crypto.randomUUID();
    const token = jwt.sign(
      { sub: userId, jti, type: 'refresh' },
      env.jwt.refreshSecret,
      { expiresIn: env.jwt.refreshExpiresIn, issuer: env.jwt.issuer, audience: env.jwt.audience }
    );
    await refreshTokenRepository.create({
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + refreshTtlMs()),
    });
    return token;
  },

  async issueSession(user) {
    const accessToken = this.signAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user.id);
    return { accessToken, refreshToken, user: publicUser(user) };
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    // Uniform failure message — don't reveal which field was wrong.
    if (!user || user.status !== 'active') {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    return this.issueSession(user);
  },

  /**
   * Rotate a refresh token: verify signature/claims, check the stored hash is
   * still active, then revoke it and issue a fresh pair. Presenting a revoked
   * token revokes the whole session chain (theft detection).
   */
  async refresh(rawToken) {
    if (!rawToken) throw new AppError('Refresh token required', 401, 'UNAUTHENTICATED');

    let payload;
    try {
      payload = jwt.verify(rawToken, env.jwt.refreshSecret, {
        issuer: env.jwt.issuer,
        audience: env.jwt.audience,
      });
    } catch {
      throw new AppError('Invalid or expired session', 401, 'UNAUTHENTICATED');
    }
    if (payload.type !== 'refresh') {
      throw new AppError('Invalid or expired session', 401, 'UNAUTHENTICATED');
    }

    const row = await refreshTokenRepository.findByHash(hashToken(rawToken));
    if (!row || row.expires_at < new Date()) {
      throw new AppError('Invalid or expired session', 401, 'UNAUTHENTICATED');
    }
    if (row.revoked_at) {
      // Token reuse — treat as compromised: kill every session for this user.
      await refreshTokenRepository.revokeAllForUser(row.user_id);
      logger.warn('Refresh token reuse detected — all sessions revoked', { userId: row.user_id });
      throw new AppError('Session revoked. Please sign in again.', 401, 'SESSION_REVOKED');
    }

    const user = await userRepository.findById(row.user_id);
    if (!user || user.status !== 'active') {
      throw new AppError('Invalid or expired session', 401, 'UNAUTHENTICATED');
    }

    await refreshTokenRepository.revoke(row.id);
    return this.issueSession(user);
  },

  /** Revoke the presented refresh token (best-effort; clears cookies either way). */
  async logout(rawToken) {
    if (!rawToken) return;
    const row = await refreshTokenRepository.findByHash(hashToken(rawToken));
    if (row) await refreshTokenRepository.revoke(row.id);
  },

  /** Change the signed-in admin's password and revoke all active sessions. */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('Account not found', 404, 'NOT_FOUND');
    const row = await userRepository.findByEmail(user.email);
    const ok = row && (await bcrypt.compare(currentPassword, row.password_hash));
    if (!ok) throw new AppError('Current password is incorrect', 401, 'INVALID_CREDENTIALS');
    await userRepository.updatePassword(userId, await bcrypt.hash(newPassword, 12));
    await refreshTokenRepository.revokeAllForUser(userId);
    return { changed: true };
  },
};

module.exports = authService;
