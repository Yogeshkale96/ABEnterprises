const { z } = require('zod');

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email('Enter a valid email address').max(190),
    password: z.string().min(8, 'Password must be at least 8 characters').max(128),
  }),
});

module.exports = { loginSchema };
