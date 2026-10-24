const { pool } = require('../config/database');

/** Refresh tokens are stored as SHA-256 hashes — never the raw token. */
const refreshTokenRepository = {
  async create({ userId, tokenHash, expiresAt }) {
    const [result] = await pool.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)`,
      [userId, tokenHash, expiresAt]
    );
    return result.insertId;
  },

  /** Returns the row or null. Includes revoked rows so reuse can be detected. */
  async findByHash(tokenHash) {
    const [rows] = await pool.query(
      `SELECT id, user_id, expires_at, revoked_at FROM refresh_tokens WHERE token_hash = ?`,
      [tokenHash]
    );
    return rows[0] || null;
  },

  async revoke(id) {
    await pool.query(
      `UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = ? AND revoked_at IS NULL`,
      [id]
    );
  },

  /** Revoke every active session for a user (password change, token reuse, logout-all). */
  async revokeAllForUser(userId) {
    await pool.query(
      `UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = ? AND revoked_at IS NULL`,
      [userId]
    );
  },
};

module.exports = refreshTokenRepository;
