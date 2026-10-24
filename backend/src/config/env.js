require('dotenv').config();

const required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'JWT_SECRET'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
  // Warn rather than crash so the server can still boot for health checks.
  // The DB pool will lazily fail if actually used without config.
  console.warn(`[env] Missing environment variables: ${missing.join(', ')}`);
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name: process.env.DB_NAME || 'ab_enterprises',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  jwt: {
    // Access token — JWT_ACCESS_* preferred, JWT_SECRET kept for backward compat.
    secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'dev-only-insecure-secret-change-me',
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || process.env.JWT_EXPIRES_IN || '15m',
    issuer: process.env.JWT_ISSUER || 'abenterprises-api',
    audience: process.env.JWT_AUDIENCE || 'abenterprises-client',
    // Refresh token — separate secret, longer-lived, rotated on every use.
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-only-insecure-refresh-secret-change-me',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  cookie: {
    name: 'abe_admin_token',
    refreshName: 'abe_admin_refresh',
    secure: process.env.NODE_ENV === 'production',
  },
};

module.exports = env;
