/**
 * Distinct supporting photos per service page. Each page gets four different
 * images (overview, offerings, benefits, cta) that are never the page's own
 * hero photo, chosen from the lightweight JPGs already shipped with the site.
 */
const base = import.meta.env.BASE_URL
const svc = (n) => `${base}images/services/${n}.jpg`
const prod = (n) => `${base}images/products/${n}.jpg`
const ind = (n) => `${base}images/industries/${n}.jpg`

export const SERVICE_GALLERY = {
  'website-development': {
    overview: ind('shops-showrooms'),
    offerings: svc('services-hero'),
    benefits: svc('digital-marketing'),
    cta: ind('ca-offices'),
  },
  'software-development': {
    overview: svc('website-development'),
    offerings: ind('government-offices'),
    benefits: prod('desktops'),
    cta: ind('industries'),
  },
  'digital-marketing': {
    overview: svc('seo-social-media'),
    offerings: ind('hotels-restaurants'),
    benefits: ind('shops-showrooms'),
    cta: svc('spotlight'),
  },
  'seo-social-media': {
    overview: svc('digital-marketing'),
    offerings: svc('software-development'),
    benefits: ind('ca-offices'),
    cta: prod('laptops'),
  },
  'computer-laptop-services': {
    overview: prod('laptops'),
    offerings: prod('desktops'),
    benefits: svc('amc-support'),
    cta: ind('schools-colleges'),
  },
  'networking-solutions': {
    overview: prod('networking'),
    offerings: svc('spotlight'),
    benefits: ind('government-offices'),
    cta: svc('services-hero'),
  },
  'cctv-installation': {
    overview: prod('cctv'),
    offerings: svc('access-control-systems'),
    benefits: ind('hospitals-clinics'),
    cta: ind('residential'),
  },
  'access-control-systems': {
    overview: svc('cctv-installation'),
    offerings: ind('hotels-restaurants'),
    benefits: ind('hospitals-clinics'),
    cta: prod('cctv'),
  },
  'institutional-it-supply': {
    overview: ind('schools-colleges'),
    offerings: prod('printers'),
    benefits: ind('government-offices'),
    cta: prod('laptops'),
  },
  'amc-support': {
    overview: svc('computer-laptop-services'),
    offerings: prod('ups'),
    benefits: svc('networking-solutions'),
    cta: prod('desktops'),
  },
}

export const svcGallery = (slug) => SERVICE_GALLERY[slug] || SERVICE_GALLERY['website-development']
