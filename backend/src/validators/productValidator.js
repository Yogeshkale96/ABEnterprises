const { z } = require('zod');

const slugParam = z.object({
  params: z.object({ slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9-]+$/) }),
});

const listQuery = z.object({
  query: z.object({
    category: z.string().trim().max(140).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional(),
  }),
});

module.exports = { slugParam, listQuery };
