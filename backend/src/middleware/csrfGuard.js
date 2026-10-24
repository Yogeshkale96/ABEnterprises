const env = require('../config/env');
const AppError = require('../utils/AppError');

const allowedOrigins = env.frontendUrl
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);

// Native WebViews serve the app from these origins.
const NATIVE_ORIGINS = new Set(['capacitor://localhost', 'ionic://localhost', 'http://localhost']);

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * CSRF guard for cookie-authenticated state-changing requests.
 * - Bearer-token requests (native app) are skipped: they aren't ambient credentials.
 * - Requests with no Origin/Referer (curl, server-to-server) are skipped.
 * - Everything else must send an Origin or Referer matching FRONTEND_URL or a
 *   native WebView origin.
 */
function csrfGuard(req, res, next) {
  if (SAFE_METHODS.has(req.method)) return next();
  if (req.headers.authorization?.startsWith('Bearer ')) return next();

  const origin = (req.headers.origin || req.headers.referer || '').replace(/\/$/, '');
  if (!origin) return next();

  if (allowedOrigins.includes(origin) || NATIVE_ORIGINS.has(origin)) return next();
  try {
    // Referer may include a path — compare on the origin part only.
    const { origin: refererOrigin } = new URL(origin);
    if (allowedOrigins.includes(refererOrigin) || NATIVE_ORIGINS.has(refererOrigin)) return next();
  } catch {
    /* fall through to rejection */
  }
  return next(new AppError('Request origin is not allowed', 403, 'FORBIDDEN'));
}

module.exports = csrfGuard;
