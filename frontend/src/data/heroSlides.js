/**
 * Hero carousel slide configuration.
 * Images live in frontend/public/homehero/.
 *
 * textSide alternates left/right per the approved design.
 */

const HERO_IMAGE_BASE = `${import.meta.env.BASE_URL}homehero/`
const img = (name) => `${HERO_IMAGE_BASE}${encodeURIComponent(name)}`

export const heroSlides = [
  {
    key: 'it-solutions',
    image: img('Futuristic Blue IT Workspace.png'),
    imageAlt:
      'Modern office workstations with desktop computers, laptops and monitors — IT infrastructure by AB Enterprises',
    imagePosition: 'center right',
    textSide: 'left',
    eyebrow: 'Your Trusted IT Partner',
    headingBefore: 'Complete IT Solutions for ',
    highlight: 'Your Business',
    headingAfter: '',
    description:
      'Explore computers, laptops, software, networking, CCTV, and digital services for businesses and institutions.',
    primary: { label: 'Explore Our Services', to: '/services' },
    secondary: { label: 'Get a Free Quote', to: '/request-quote' },
  },
  {
    key: 'cctv-security',
    image: img('High-Tech CCTV Control Room.png'),
    imageAlt:
      'Professional CCTV cameras, surveillance monitors and access control equipment — security solutions by AB Enterprises',
    imagePosition: 'center right',
    textSide: 'left',
    eyebrow: 'Smarter Security Solutions',
    headingBefore: 'Protect What ',
    highlight: 'Matters Most',
    headingAfter: '',
    description:
      'Explore professional CCTV, surveillance, access control, and security solutions for homes, offices, and commercial spaces.',
    primary: { label: 'Explore Security Solutions', to: '/services/cctv-installation' },
    secondary: { label: 'Request a Quote', to: '/request-quote' },
  },
  {
    key: 'networking',
    image: img('Futuristic Blue Data Center Network.png'),
    imageAlt:
      'Network switches, routers, Ethernet cabling and server racks — networking infrastructure by AB Enterprises',
    imagePosition: 'center right',
    textSide: 'left',
    eyebrow: 'Connected. Secure. Reliable.',
    headingBefore: 'Build a Stronger ',
    highlight: 'IT Infrastructure',
    headingAfter: '',
    description:
      'Discover networking devices, connectivity solutions, installation, and technical support designed to keep your business connected.',
    primary: { label: 'Explore Networking', to: '/services/networking-solutions' },
    secondary: { label: 'Talk to Our Team', to: '/contact' },
  },
  {
    key: 'computer-services',
    image: img('High-Tech Electronics Repair Lab.png'),
    imageAlt:
      'Technicians servicing computers and laptops in a clean professional repair environment — AB Enterprises service desk',
    imagePosition: 'center right',
    textSide: 'left',
    eyebrow: 'Technology That Works for You',
    headingBefore: 'Reliable Devices. ',
    highlight: 'Expert Support.',
    headingAfter: '',
    description:
      'Find computer and laptop solutions, printer support, hardware services, maintenance, and professional technical assistance.',
    primary: { label: 'Explore Products', to: '/products' },
    secondary: { label: 'Get Service Support', to: '/amc-support' },
  },
  {
    key: 'digital-solutions',
    image: img('Futuristic Blue Cloud Command Center.png'),
    imageAlt:
      'Modern corporate workspace with business technology and software development — digital solutions by AB Enterprises',
    imagePosition: 'center right',
    textSide: 'left',
    eyebrow: 'Power Your Digital Growth',
    headingBefore: 'Smarter ',
    highlight: 'Digital Solutions',
    headingAfter: ' for Modern Businesses',
    description:
      'From website development and software solutions to digital marketing and IT support, explore technology services tailored to your needs.',
    primary: { label: 'Discover Digital Services', to: '/services' },
    secondary: { label: 'Discuss Your Project', to: '/contact' },
  },
]

export const HERO_SLIDE_COUNT = heroSlides.length
