import { z } from 'zod'

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+]?[\d\s\-()]{7,20}$/, 'Enter a valid phone number')

export const enquiryBaseFields = {
  name: z.string().trim().min(2, 'Please enter your full name').max(120),
  email: z.string().trim().email('Enter a valid email address').max(190),
  phone: phoneSchema,
  company: z.string().trim().max(160).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Please describe your requirement (min 10 characters)')
    .max(2000),
  consent: z.literal(true, { error: 'Consent is required' }),
}
