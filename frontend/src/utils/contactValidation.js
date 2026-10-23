import {
  makeTextValidator,
  normalizeIndianPhone,
  normalizeName,
  validateCompany,
  validateConsent,
  validateEmail,
  validateName,
  validatePhone,
  validateSubject,
} from './formRules.js'

export const CONTACT_FIELD_ORDER = ['name', 'phone', 'email', 'company', 'subject', 'message', 'consent']

export const contactInitialValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  consent: false,
  website: '',
}

export const contactValidators = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  company: validateCompany,
  subject: validateSubject,
  message: makeTextValidator({
    min: 10,
    emptyMsg: 'Please describe your requirement.',
    minMsg: 'Please enter at least 10 characters.',
    maxMsg: 'Your message cannot exceed 5,000 characters.',
  }),
  consent: validateConsent('Please provide your consent before submitting this enquiry.'),
}

export function buildContactPayload(v) {
  return {
    type: 'contact',
    name: normalizeName(v.name),
    email: v.email.trim(),
    phone: normalizeIndianPhone(v.phone),
    company: v.company.trim(),
    subject: v.subject.trim(),
    message: v.message.trim(),
    consent: v.consent === true,
    website: v.website,
  }
}
