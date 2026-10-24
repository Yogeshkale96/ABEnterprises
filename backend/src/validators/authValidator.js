const { z } = require('zod');

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email('Enter a valid email address').max(190),
    password: z.string().min(8, 'Password must be at least 8 characters').max(128),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required').max(128),
    newPassword: z
      .string()
      .min(10, 'New password must be at least 10 characters')
      .max(128)
      .refine((v) => /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v), 'New password must include uppercase, lowercase and a number'),
  }),
});

module.exports = { loginSchema, changePasswordSchema };
