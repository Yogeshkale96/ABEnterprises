const logger = require('../utils/logger');
const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const payload = {
    success: false,
    code: err.code || 'INTERNAL_ERROR',
    message: statusCode >= 500 ? 'Something went wrong. Please try again later.' : err.message,
  };
  if (err.details && statusCode < 500) payload.errors = err.details;

  if (statusCode >= 500) {
    logger.error(err.message, { stack: err.stack, path: req.originalUrl });
  } else {
    logger.warn(err.message, { path: req.originalUrl, code: err.code });
  }

  res.status(statusCode).json(payload);
}

module.exports = errorHandler;
