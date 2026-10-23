const NAME_PART = /^[\p{L}\p{M}]+(?:['’-][\p{L}\p{M}]+)*$/u
const EMAIL_LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/
const COMPANY_RE = /^[\p{L}\p{N}][\p{L}\p{N} .,&'’()\-/+@#:]*$/u
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/

export const normalizeName = (v = '') => v.trim().replace(/\s+/g, ' ')

export function validateName(value = '') {
  const v = normalizeName(value)
  if (!v) return 'Please enter your full name.'
  if (v.length > 100) return 'Please enter a valid name without numbers.'
  const parts = v.split(' ')
  if (parts.some((p) => !NAME_PART.test(p))) {
    if (parts.length === 1 && !/\d/.test(v) && NAME_PART.test(v)) {
      return 'Please enter your first name and surname.'
    }
    return 'Please enter a valid name without numbers.'
  }
  if (parts.length < 2) return 'Please enter your first name and surname.'
  return ''
}

export function validateEmail(value = '') {
  const v = value.trim()
  if (!v) return 'Please enter your business email address.'
  const invalid = 'Please enter a valid email address.'
  if (v.length > 254 || /\s/.test(v)) return invalid
  const at = v.lastIndexOf('@')
  if (at < 1) return invalid
  const local = v.slice(0, at)
  const labels = v.slice(at + 1).split('.')
  if (local.length > 64 || !EMAIL_LOCAL.test(local)) return invalid
  if (labels.length < 2 || !labels.every((l) => DOMAIN_LABEL.test(l))) return invalid
  if (!/^[A-Za-z]{2,}$/.test(labels[labels.length - 1])) return invalid
  return ''
}

/** Returns "+91XXXXXXXXXX" or null when the value is not a valid Indian mobile number. */
export function normalizeIndianPhone(value = '') {
  const compact = value.trim().replace(/[\s-]/g, '')
  const m = /^(?:\+91)?([6-9]\d{9})$/.exec(compact)
  return m ? `+91${m[1]}` : null
}

export function validatePhone(value = '') {
  const v = value.trim()
  if (!v) return 'Please enter your phone number.'
  if (!/^\+?[\d\s-]+$/.test(v) || (v.includes('+') && !v.startsWith('+'))) {
    return 'Please enter digits only, with an optional +91 country code.'
  }
  return normalizeIndianPhone(v) ? '' : 'Enter a valid 10-digit Indian mobile number.'
}

export function validateCompany(value = '') {
  if (!value) return ''
  const v = value.trim()
  if (!v) return 'Company name cannot contain only spaces.'
  if (v.length > 150) return 'Company name cannot exceed 150 characters.'
  if (!COMPANY_RE.test(v)) return 'Company name contains invalid characters.'
  return ''
}

export function validateSubject(value = '') {
  if (!value) return ''
  const v = value.trim()
  if (!v) return 'Subject cannot contain only spaces.'
  if (v.length > 150) return 'Subject cannot exceed 150 characters.'
  if (CONTROL_CHARS.test(v)) return 'Subject contains invalid characters.'
  return ''
}

export function makeTextValidator({ min, max = 5000, emptyMsg, minMsg, maxMsg }) {
  return (value = '') => {
    const v = value.trim()
    if (!v) return emptyMsg
    if (v.length < min) return minMsg
    if (v.length > max) return maxMsg
    if (CONTROL_CHARS.test(v)) return 'Please remove unsupported characters.'
    return ''
  }
}

export const validateConsent = (msg) => (checked) => (checked === true ? '' : msg)
