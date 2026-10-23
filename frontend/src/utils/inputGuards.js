/**
 * Live input restrictions: sanitise what the user types per field, so invalid
 * characters never enter the value at all. Mirrors the rules in formRules.js.
 */

const CONTROL_CHARS = new RegExp(
  // eslint-disable-next-line no-control-regex
  '[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]',
  'g'
)

/** Letters (any language), spaces, dot, hyphen and apostrophe — for person names. */
export const guardName = (v = '') =>
  v.replace(/[^\p{L}\p{M} .'’-]/gu, '').replace(/\s{2,}/g, ' ')

/** Letters, digits and common company punctuation — for company names. */
export const guardCompany = (v = '') =>
  v.replace(/[^\p{L}\p{N} .,&'’()\-/+@#:]/gu, '').replace(/\s{2,}/g, ' ')

/** Digits, spaces, hyphens, parentheses and a single leading "+" — for phone numbers. */
export const guardPhone = (v = '') => {
  const clean = v.replace(/[^\d\s\-+()]/g, '')
  return clean.startsWith('+')
    ? `+${clean.slice(1).replace(/\+/g, '')}`
    : clean.replace(/\+/g, '')
}

/** Valid email characters only — no spaces, at most one "@". */
export const guardEmail = (v = '') => {
  const clean = v.replace(/\s/g, '').replace(/[^A-Za-z0-9!#$%&'*+/=?^_`{|}~@.-]/g, '')
  const at = clean.indexOf('@')
  return at === -1 ? clean : clean.slice(0, at + 1) + clean.slice(at + 1).replace(/@/g, '')
}

/** Free text: strip control characters only (newlines allowed in textareas). */
export const guardText = (v = '') => v.replace(CONTROL_CHARS, '')

/** Field-name → guard map used by the enquiry forms. */
export const FIELD_GUARDS = {
  name: guardName,
  company: guardCompany,
  phone: guardPhone,
  email: guardEmail,
  subject: guardText,
  message: guardText,
}

/** Sanitise an input change event in place (for react-hook-form register onChange). */
export const guardEvent = (guard) => (e) => {
  if (e?.target && typeof e.target.value === 'string') {
    e.target.value = guard(e.target.value)
  }
}
