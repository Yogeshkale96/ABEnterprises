/**
 * Static fallback content used when the API is unreachable, so public pages
 * never render empty. The API remains the source of truth when available.
 */

export const FALLBACK_SERVICES = [
  {
    slug: 'website-development',
    name: 'Website Development',
    short_description: 'Responsive business websites built with modern technologies.',
    category_name: 'IT & Software Solutions',
    keywords: ['website', 'web', 'site', 'online presence', 'landing page'],
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    short_description: 'Custom business software, billing and management systems.',
    category_name: 'IT & Software Solutions',
    keywords: ['software', 'app', 'application', 'billing', 'erp', 'crm'],
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    short_description: 'Grow your business online with targeted campaigns.',
    category_name: 'Digital Services',
    keywords: ['marketing', 'ads', 'advertising', 'campaign', 'leads', 'promotion'],
  },
  {
    slug: 'seo-social-media',
    name: 'SEO & Social Media',
    short_description: 'Improve search visibility and social presence.',
    category_name: 'Digital Services',
    keywords: ['seo', 'social media', 'ranking', 'google', 'instagram', 'facebook'],
  },
  {
    slug: 'computer-laptop-services',
    name: 'Computer & Laptop Services',
    short_description: 'Sales, repair and upgrades for desktops and laptops.',
    category_name: 'IT Infrastructure & Hardware',
    keywords: ['computer', 'laptop', 'repair', 'service', 'upgrade', 'format', 'pc'],
  },
  {
    slug: 'networking-solutions',
    name: 'Networking Solutions',
    short_description: 'Structured cabling, LAN, Wi-Fi and enterprise networking.',
    category_name: 'IT Infrastructure & Hardware',
    keywords: ['network', 'wifi', 'wi-fi', 'lan', 'cabling', 'router', 'internet', 'networking'],
  },
  {
    slug: 'cctv-installation',
    name: 'CCTV Installation',
    short_description: 'HD CCTV camera installation and surveillance setup.',
    category_name: 'Security Solutions',
    keywords: ['camera', 'surveillance', 'security', 'dvr', 'nvr', 'video monitoring'],
  },
  {
    slug: 'access-control-systems',
    name: 'Access Control Systems',
    short_description: 'Card, PIN and biometric entry systems for doors and gates.',
    category_name: 'Security Solutions',
    keywords: ['rfid', 'biometric', 'fingerprint', 'door lock', 'entry', 'attendance'],
  },
  {
    slug: 'annual-maintenance-contracts',
    name: 'Annual Maintenance Contracts',
    short_description: 'Comprehensive AMC plans for computers, printers and networks.',
    category_name: 'AMC & Technical Support',
    to: '/amc-support',
    keywords: ['amc', 'maintenance', 'annual contract', 'support plan', 'service agreement'],
  },
  {
    slug: 'on-site-technical-support',
    name: 'On-Site Technical Support',
    short_description: 'Fast on-site diagnosis and repair at your location.',
    category_name: 'AMC & Technical Support',
    to: '/amc-support',
    keywords: ['technician', 'repair visit', 'troubleshooting', 'it help', 'field service'],
  },
  {
    slug: 'institutional-it-supply',
    name: 'Institutional IT Supply',
    short_description: 'Bulk IT hardware supply for offices and institutions.',
    category_name: 'Government & Business Solutions',
    keywords: ['institutional', 'bulk', 'supply', 'procurement', 'tender', 'government', 'gem'],
  },
]

const PRODUCT_IMG = (name) => `${import.meta.env.BASE_URL}images/products/${name}`

export const FALLBACK_PRODUCTS = [
  {
    slug: 'business-desktop-pcs',
    image_url: PRODUCT_IMG('desktops-2.jpg'),
    name: 'Business Desktop PCs',
    short_description: 'Reliable desktops configured for office workloads.',
    category_name: 'Desktops',
    category_slug: 'desktops',
    keywords: ['desktop', 'pc', 'computer', 'workstation', 'office'],
  },
  {
    slug: 'business-laptops',
    image_url: PRODUCT_IMG('laptops-2.jpg'),
    name: 'Business Laptops',
    short_description: 'Lightweight laptops with long battery life.',
    category_name: 'Laptops',
    category_slug: 'laptops',
    keywords: ['laptop', 'notebook', 'computer', 'portable'],
  },
  {
    slug: 'laser-printers',
    image_url: PRODUCT_IMG('printers-2.jpg'),
    name: 'Laser Printers',
    short_description: 'Fast mono and colour laser printers for offices.',
    category_name: 'Printers & Scanners',
    category_slug: 'printers-scanners',
    keywords: ['printer', 'scanner', 'printing', 'ink', 'toner'],
  },
  {
    slug: 'hd-cctv-camera-kits',
    image_url: PRODUCT_IMG('cctv-n2.jpg'),
    name: 'HD CCTV Camera Kits',
    short_description: 'Complete surveillance kits with DVR and storage.',
    category_name: 'CCTV Cameras',
    category_slug: 'cctv-cameras',
    keywords: ['cctv', 'camera', 'surveillance', 'dvr', 'nvr', 'security'],
  },
  {
    slug: 'managed-switches',
    image_url: PRODUCT_IMG('networking-2.jpg'),
    name: 'Managed Switches',
    short_description: 'Gigabit switches for structured office networks.',
    category_name: 'Networking Devices',
    category_slug: 'networking-devices',
    keywords: ['switch', 'network', 'lan', 'cabling', 'ethernet', 'networking'],
  },
  {
    slug: 'line-interactive-ups',
    image_url: PRODUCT_IMG('ups-n2.jpg'),
    name: 'Line-Interactive UPS',
    short_description: 'Backup power for desktops and network equipment.',
    category_name: 'UPS & Batteries',
    category_slug: 'ups-batteries',
    keywords: ['ups', 'battery', 'backup', 'power', 'inverter'],
  },
  {
    slug: 'dual-band-wifi-routers',
    image_url: PRODUCT_IMG('routers-n2.jpg'),
    name: 'Dual-Band Wi-Fi Routers',
    short_description: 'Reliable Wi-Fi routers and access points for office coverage.',
    category_name: 'Routers & Switches',
    category_slug: 'routers-switches',
    to: '/products?category=routers-switches',
    keywords: ['router', 'wifi', 'wi-fi', 'wireless', 'access point', 'internet'],
  },
  {
    slug: 'computer-accessories-kit',
    image_url: PRODUCT_IMG('accessories-2.jpg'),
    name: 'Computer Accessories',
    short_description: 'Keyboards, mice, webcams, cables and everyday peripherals.',
    category_name: 'Computer Accessories',
    category_slug: 'computer-accessories',
    to: '/products?category=computer-accessories',
    keywords: ['keyboard', 'mouse', 'webcam', 'cable', 'adapter', 'headset', 'peripheral'],
  },
  {
    slug: 'external-storage-drives',
    image_url: PRODUCT_IMG('storage-n1.jpg'),
    name: 'Storage Devices',
    short_description: 'External hard drives, SSDs and pen drives for backup and storage.',
    category_name: 'Storage Devices',
    category_slug: 'storage-devices',
    to: '/products?category=storage-devices',
    keywords: ['hard drive', 'hdd', 'ssd', 'pen drive', 'backup', 'disk', 'storage'],
  },
  {
    slug: 'security-equipment-range',
    image_url: PRODUCT_IMG('security-2.jpg'),
    name: 'Security Equipment',
    short_description: 'Surveillance cameras, recorders and access control hardware.',
    category_name: 'Security Equipment',
    category_slug: 'security-equipment',
    to: '/products?category=security-equipment',
    keywords: ['security', 'surveillance', 'camera', 'access control', 'alarm', 'biometric'],
  },
]

/**
 * Keyword-aware match used by the navbar search suggestions and the /search
 * results page when the API is unreachable. Matches every word of the query
 * against the item's name, description, category and keywords.
 */
export function matchesSearch(item, q) {
  const hay = [
    item.name,
    item.short_description,
    item.category_name,
    ...(item.keywords || []),
  ]
    .join(' ')
    .toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w))
}

const INDUSTRY_IMG = (slug) => `${import.meta.env.BASE_URL}images/industries/${slug}.jpg`
export const FALLBACK_INDUSTRIES = [
  { slug: 'ca-offices', name: 'CA Offices', icon: 'Calculator', description: 'IT infrastructure, printers and data security for accounting firms.', image: INDUSTRY_IMG('ca-offices') },
  { slug: 'hospitals-clinics', name: 'Hospitals & Clinics', icon: 'Stethoscope', description: 'Reliable systems, CCTV and networking for healthcare.', image: INDUSTRY_IMG('hospitals-clinics') },
  { slug: 'schools-colleges', name: 'Schools & Colleges', icon: 'GraduateCap', description: 'Computer labs, smart-class hardware and campus networking.', image: INDUSTRY_IMG('schools-colleges') },
  { slug: 'shops-showrooms', name: 'Shops & Showrooms', icon: 'Store', description: 'Billing systems, CCTV and display solutions for retail.', image: INDUSTRY_IMG('shops-showrooms') },
  { slug: 'industries', name: 'Industries', icon: 'Factory', description: 'Rugged IT and surveillance for factories and warehouses.', image: INDUSTRY_IMG('industries') },
  { slug: 'hotels-restaurants', name: 'Hotels & Restaurants', icon: 'Hotel', description: 'POS support, guest Wi-Fi and surveillance for hospitality.', image: INDUSTRY_IMG('hotels-restaurants') },
  { slug: 'residential', name: 'Residential', icon: 'Home', description: 'Home CCTV, Wi-Fi and computer support for residences.', image: INDUSTRY_IMG('residential') },
  { slug: 'government-offices', name: 'Government Offices', icon: 'Landmark', description: 'Compliant IT supply and support for government offices.', image: INDUSTRY_IMG('government-offices') },
]

/** Articles live in articles.js; re-exported here for existing imports. */
export { ARTICLES as SAMPLE_ARTICLES } from './articles.js'

/** Placeholder testimonials — replace with verified customer feedback before launch. */
export const SAMPLE_TESTIMONIALS = [
  {
    id: 't1',
    customer_name: 'Rajesh Deshmukh',
    organization: 'Deshmukh & Associates, Amravati',
    quote:
      'AB Enterprises set up all our office desktops and printers with an AMC that actually works. One call and their team is on-site the same day.',
    rating: 5,
  },
  {
    id: 't2',
    customer_name: 'Dr. Sneha Patil',
    organization: 'Shree Multispeciality Clinic',
    quote:
      'From CCTV installation to networking, everything was handled professionally. The systems have been running flawlessly since setup.',
    rating: 5,
  },
  {
    id: 't3',
    customer_name: 'Amit Agrawal',
    organization: 'Agrawal Electronics Showroom',
    quote:
      'Genuine products at fair prices, plus quick billing system support. A dependable IT partner for our retail business.',
    rating: 4,
  },
]

export const POPULAR_SEARCHES = [
  'laptops', 'cctv camera', 'printer', 'amc', 'ups battery',
  'networking', 'website development', 'desktop',
]
