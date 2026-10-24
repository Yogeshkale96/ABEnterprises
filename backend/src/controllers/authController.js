const env = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const baseCookie = {
  httpOnly: true,
  secure: env.cookie.secure,
  sameSite: env.cookie.secure ? 'none' : 'lax',
  path: '/',
};

// Access token: short-lived, matches JWT_ACCESS_EXPIRES_IN.
const accessCookie = { ...baseCookie, maxAge: 2 * 60 * 60 * 1000 };
// Refresh token: longer-lived, scoped to the refresh endpoint path.
const refreshCookie = { ...baseCookie, maxAge: 7 * 24 * 60 * 60 * 1000 };

const clearSessionCookies = (res) => {
  res.clearCookie(env.cookie.name, { ...baseCookie, maxAge: undefined });
  res.clearCookie(env.cookie.refreshName, { ...baseCookie, maxAge: undefined });
};

const setSessionCookies = (res, { accessToken, refreshToken }) => {
  res.cookie(env.cookie.name, accessToken, accessCookie);
  res.cookie(env.cookie.refreshName, refreshToken, refreshCookie);
};

/** Refresh token can arrive via cookie (browser) or request body (native app). */
const getRefreshToken = (req) =>
  req.cookies?.[env.cookie.refreshName] || req.body?.refreshToken || null;

const login = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.login(
    req.body.email,
    req.body.password
  );
  setSessionCookies(res, { accessToken, refreshToken });
  // Native clients store these in secure storage; browsers rely on cookies.
  res.json({ success: true, data: { user, accessToken, refreshToken } });
});

const refresh = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.refresh(
    getRefreshToken(req)
  );
  setSessionCookies(res, { accessToken, refreshToken });
  res.json({ success: true, data: { user, accessToken, refreshToken } });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(getRefreshToken(req));
  clearSessionCookies(res);
  res.json({ success: true });
});

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user.sub, req.body.currentPassword, req.body.newPassword);
  clearSessionCookies(res);
  res.json({ success: true, message: 'Password changed. Please sign in again.' });
});

module.exports = { login, logout, me, refresh, changePassword };
