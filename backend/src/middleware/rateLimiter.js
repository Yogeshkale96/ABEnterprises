const rateLimit = require('express-rate-limit');

const baseOptions = {
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' },
};

const apiLimiter = rateLimit({ ...baseOptions, windowMs: 15 * 60 * 1000, limit: 300 });

const searchLimiter = rateLimit({ ...baseOptions, windowMs: 60 * 1000, limit: 30 });

const formLimiter = rateLimit({ ...baseOptions, windowMs: 15 * 60 * 1000, limit: 10 });

const authLimiter = rateLimit({ ...baseOptions, windowMs: 15 * 60 * 1000, limit: 10 });

module.exports = { apiLimiter, searchLimiter, formLimiter, authLimiter };
