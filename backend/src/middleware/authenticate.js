const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');

function authenticate(req, res, next) {
  const token =
    req.cookies?.[env.cookie.name] ||
    (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null);

  if (!token) return next(new AppError('Authentication required', 401, 'UNAUTHENTICATED'));

  try {
    req.user = jwt.verify(token, env.jwt.secret);
    return next();
  } catch {
    return next(new AppError('Invalid or expired session', 401, 'UNAUTHENTICATED'));
  }
}

module.exports = authenticate;
