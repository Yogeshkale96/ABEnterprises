const { z } = require('zod');

const queryField = z
  .string()
  .trim()
  .min(2, 'Search query must be at least 2 characters')
  .max(80, 'Search query is too long')
  .regex(/^[\p{L}\p{N}\s&.,\-_/]+$/u, 'Search query contains invalid characters');

const suggestionsSchema = z.object({
  query: z.object({ q: queryField }),
});

const searchSchema = z.object({
  query: z.object({
    q: queryField,
    type: z.enum(['all', 'products', 'services']).optional().default('all'),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional(),
  }),
});

module.exports = { suggestionsSchema, searchSchema };
