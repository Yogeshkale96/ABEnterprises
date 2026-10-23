const AppError = require('../utils/AppError');

/**
 * Wraps a Zod schema into Express middleware.
 * Validates { body, query, params } and replaces them with parsed values.
 */
function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return next(new AppError('Validation failed', 400, 'VALIDATION_ERROR', details));
    }
    const { body, query, params } = result.data;
    if (body !== undefined) req.body = body;
    if (query !== undefined) req.validatedQuery = query;
    if (params !== undefined) req.params = params;
    return next();
  };
}

module.exports = validateRequest;
