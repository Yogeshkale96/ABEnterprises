import {
  makeTextValidator,
  normalizeIndianPhone,
  normalizeName,
  validateCompany,
  validateConsent,
  validateEmail,
  validateName,
  validatePhone,
} from './formRules.js'

export const QUOTE_SERVICES = [
  { value: 'website-development', label: 'Website Development' },
  { value: 'software-development', label: 'Software Development' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'seo-social-media', label: 'SEO & Social Media' },
  { value: 'computer-laptop-services', label: 'Computer & Laptop Services' },
  { value: 'networking-solutions', label: 'Networking Solutions' },
  { value: 'cctv-installation', label: 'CCTV Installation' },
  { value: 'access-control-systems', label: 'Access Control Systems' },
  { value: 'amc-support', label: 'AMC Support' },
  { value: 'institutional-it-supply', label: 'Institutional IT Supply' },
  { value: 'other-requirement', label: 'Other Requirement' },
]

const NOT_SURE = 'Not sure yet - need guidance'

/* Indicative budget ranges (INR) offered for each product / service. */
const BUDGET_RANGES = {
  'website-development': ['Up to ₹25,000', '₹25,000 - ₹75,000', '₹75,000 - ₹2,00,000', 'Above ₹2,00,000'],
  'software-development': ['₹50,000 - ₹2,00,000', '₹2,00,000 - ₹5,00,000', '₹5,00,000 - ₹15,00,000', 'Above ₹15,00,000'],
  'digital-marketing': ['Up to ₹15,000 / month', '₹15,000 - ₹50,000 / month', '₹50,000 - ₹2,00,000 / month', 'Above ₹2,00,000 / month'],
  'seo-social-media': ['Up to ₹10,000 / month', '₹10,000 - ₹30,000 / month', '₹30,000 - ₹75,000 / month', 'Above ₹75,000 / month'],
  'computer-laptop-services': ['Under ₹5,000', '₹5,000 - ₹25,000', '₹25,000 - ₹1,00,000', 'Above ₹1,00,000'],
  'networking-solutions': ['Under ₹25,000', '₹25,000 - ₹1,00,000', '₹1,00,000 - ₹5,00,000', 'Above ₹5,00,000'],
  'cctv-installation': ['Under ₹20,000', '₹20,000 - ₹60,000', '₹60,000 - ₹2,00,000', 'Above ₹2,00,000'],
  'access-control-systems': ['Under ₹25,000', '₹25,000 - ₹75,000', '₹75,000 - ₹3,00,000', 'Above ₹3,00,000'],
  'amc-support': ['Under ₹15,000 / year', '₹15,000 - ₹50,000 / year', '₹50,000 - ₹2,00,000 / year', 'Above ₹2,00,000 / year'],
  'institutional-it-supply': ['₹1,00,000 - ₹5,00,000', '₹5,00,000 - ₹20,00,000', '₹20,00,000 - ₹50,00,000', 'Above ₹50,00,000'],
  'other-requirement': ['Under ₹25,000', '₹25,000 - ₹1,00,000', '₹1,00,000 - ₹5,00,000', 'Above ₹5,00,000'],
}

export const budgetOptionsFor = (service) =>
  (BUDGET_RANGES[service] ? [...BUDGET_RANGES[service], NOT_SURE] : []).map((label) => ({
    value: label,
    label,
  }))

export const QUOTE_FIELD_ORDER = ['name', 'phone', 'email', 'company', 'service', 'budget', 'message', 'consent']

export const quoteInitialValues = (service = '') => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  service: QUOTE_SERVICES.some((s) => s.value === service) ? service : '',
  budget: '',
  message: '',
  consent: false,
  website: '',
})

export const quoteValidators = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  company: validateCompany,
  service: (v) => (QUOTE_SERVICES.some((s) => s.value === v) ? '' : 'Please select a product or service.'),
  budget: () => '',
  message: makeTextValidator({
    min: 20,
    max: 4900,
    emptyMsg: 'Please describe what you need.',
    minMsg: 'Please enter at least 20 characters.',
    maxMsg: 'Your requirement details cannot exceed 4,900 characters.',
  }),
  consent: validateConsent('Please provide your consent before submitting this request.'),
}

export function buildQuotePayload(v) {
  return {
    type: 'quote',
    name: normalizeName(v.name),
    email: v.email.trim(),
    phone: normalizeIndianPhone(v.phone),
    company: v.company.trim(),
    service: v.service,
    message: v.budget
      ? `${v.message.trim()}\n\nEstimated budget range: ${v.budget}`
      : v.message.trim(),
    consent: v.consent === true,
    website: v.website,
  }
}
