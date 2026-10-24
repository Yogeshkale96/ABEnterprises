const { z } = require('zod');

const SERVICE_LABELS = {
  'website-development': 'Website Development',
  'software-development': 'Software Development',
  'digital-marketing': 'Digital Marketing',
  'seo-social-media': 'SEO & Social Media',
  'computer-laptop-services': 'Computer & Laptop Services',
  'networking-solutions': 'Networking Solutions',
  'cctv-installation': 'CCTV Installation',
  'access-control-systems': 'Access Control Systems',
  'amc-support': 'AMC Support',
  'institutional-it-supply': 'Institutional IT Supply',
  'other-requirement': 'Other Requirement',
};

const NAME_PART = /^[\p{L}\p{M}]+(?:['’-][\p{L}\p{M}]+)*$/u;
const EMAIL_LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
const COMPANY_RE = /^[\p{L}\p{N}][\p{L}\p{N} .,&'’()\-/+@#:]*$/u;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const normalizeName = (v) => v.trim().replace(/\s+/g, ' ');

const isValidName = (v) => {
  const parts = normalizeName(v).split(' ');
  return parts.length >= 2 && parts.every((p) => NAME_PART.test(p));
};

const isValidEmail = (v) => {
  if (v.length > 254 || /\s/.test(v)) return false;
  const at = v.lastIndexOf('@');
  if (at < 1) return false;
  const local = v.slice(0, at);
  const labels = v.slice(at + 1).split('.');
  if (local.length > 64 || !EMAIL_LOCAL.test(local)) return false;
  if (labels.length < 2 || !labels.every((l) => DOMAIN_LABEL.test(l))) return false;
  return /^[A-Za-z]{2,}$/.test(labels[labels.length - 1]);
};

// Returns "+91XXXXXXXXXX" or null.
const normalizeIndianPhone = (v) => {
  const compact = v.replace(/[\s-]/g, '');
  const m = /^(?:\+91)?([6-9]\d{9})$/.exec(compact);
  return m ? `+91${m[1]}` : null;
};

const optionalText = (max, label, re) =>
  z
    .string()
    .max(max * 2)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v || '').trim())
    .refine((v) => v.length <= max, `${label} is too long`)
    .refine((v) => !CONTROL_CHARS.test(v), `${label} contains invalid characters`)
    .refine((v) => !re || v === '' || re.test(v), `${label} contains invalid characters`);

const baseFields = {
  name: z
    .string()
    .transform(normalizeName)
    .refine((v) => v.length > 0 && v.length <= 100 && isValidName(v), 'Please enter your first name and surname.'),
  email: z
    .string()
    .trim()
    .refine(isValidEmail, 'Please enter a valid email address.'),
  phone: z
    .string()
    .transform((v) => normalizeIndianPhone(v.trim()))
    .refine((v) => v !== null, 'Enter a valid 10-digit Indian mobile number.'),
  company: optionalText(150, 'Company name', COMPANY_RE),
  message: z
    .string()
    .trim()
    .min(10, 'Please enter at least 10 characters.')
    .max(5000, 'Your message cannot exceed 5,000 characters.')
    .refine((v) => !CONTROL_CHARS.test(v), 'Message contains invalid characters'),
  consent: z.literal(true, { error: 'Consent is required' }),
  // Honeypot — must stay empty; bots that fill it are rejected silently.
  website: z.string().max(0).optional().or(z.literal('')),
};

const enquirySchema = z.object({
  body: z.object({
    ...baseFields,
    type: z.enum(['contact', 'quote', 'amc']).optional().default('contact'),
    service: z.enum(Object.keys(SERVICE_LABELS)).optional(),
    subject: optionalText(150, 'Subject'),
    items: z
      .array(
        z.object({
          itemType: z.enum(['service', 'product']),
          itemId: z.number().int().positive(),
          quantity: z.number().int().min(1).max(999).optional().default(1),
        })
      )
      .max(20)
      .optional(),
  }).superRefine((body, ctx) => {
    if (body.type !== 'quote') return;
    if (!body.service) {
      ctx.addIssue({ code: 'custom', path: ['service'], message: 'Please select a product or service.' });
    }
    if (body.message.length < 20) {
      ctx.addIssue({ code: 'custom', path: ['message'], message: 'Please enter at least 20 characters.' });
    }
  }),
});

const updateStatusSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
  body: z.object({ status: z.enum(['new', 'in_progress', 'resolved', 'closed']) }),
});

const enquiryIdSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const listEnquiriesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    status: z.enum(['new', 'in_progress', 'resolved', 'closed']).optional(),
    type: z.enum(['contact', 'quote', 'amc']).optional(),
    search: z.string().trim().max(120).optional(),
    from: z.string().regex(DATE_RE, 'from must be YYYY-MM-DD').optional(),
    to: z.string().regex(DATE_RE, 'to must be YYYY-MM-DD').optional(),
  }),
});

const addNoteSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
  body: z.object({
    note: z
      .string()
      .trim()
      .min(1, 'Note cannot be empty')
      .max(2000, 'Note cannot exceed 2,000 characters')
      .refine((v) => !CONTROL_CHARS.test(v), 'Note contains invalid characters'),
  }),
});

module.exports = {
  enquirySchema,
  updateStatusSchema,
  enquiryIdSchema,
  listEnquiriesSchema,
  addNoteSchema,
  SERVICE_LABELS,
};
