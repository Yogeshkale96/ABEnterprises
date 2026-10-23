const env = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const cookieOptions = {
  httpOnly: true,
  secure: env.cookie.secure,
  sameSite: env.cookie.secure ? 'none' : 'lax',
  maxAge: 2 * 60 * 60 * 1000,
  path: '/',
};

const login = asyncHandler(async (req, res) => {
  const { token, user } = await authService.login(req.body.email, req.body.password);
  res.cookie(env.cookie.name, token, cookieOptions);
  res.json({ success: true, data: { user } });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie(env.cookie.name, { ...cookieOptions, maxAge: undefined });
  res.json({ success: true });
});

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

module.exports = { login, logout, me };
