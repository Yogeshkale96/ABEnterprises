import siteConfig from '../../config/siteConfig.js'

const { contact } = siteConfig

export const telHref = `tel:${contact.phone.replace(/[^+\d]/g, '')}`
export const waHref = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`
export const mailHref = `mailto:${contact.email}`
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address)}`
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  el.focus({ preventScroll: true })
}
