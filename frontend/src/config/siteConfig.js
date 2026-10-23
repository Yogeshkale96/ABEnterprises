/**
 * Central site configuration.
 * Replace placeholder contact details with verified company information
 * before going live.
 */
const siteConfig = {
  company: {
    name: 'AB Enterprises',
    legalName: 'AB ENTERPRISES PRIVATE LIMITED',
    tagline: 'Tech Solutions for Every Need',
    shortIntro:
      'Complete IT solutions — computers, laptops, CCTV, networking, software development and AMC support for homes and businesses.',
  },
  contact: {
    address: 'Yashodha Nagar, Old Bypass Road, Amravati, Maharashtra',
    phone: '+91 86698 82908',
    whatsapp: '+918669882908',
    email: 'absystem024@gmail.com',
    website: 'www.abenterprises24.com',
    gst: '27AFKPF7083B1ZJ',
    hours: 'Mon – Sat, 10:00 AM – 7:00 PM',
  },
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    twitter: '#',
  },
  stats: [
    { label: 'Happy Clients', value: 100, suffix: '+', icon: 'UsersRound' },
    { label: 'Industry Experience', value: 2, suffix: ' Years', icon: 'CalendarCheck' },
    { label: 'Products Supplied', value: 300, suffix: '+', icon: 'PackageCheck' },
    { label: 'Client Satisfaction', value: 95, suffix: '%', icon: 'HeartHandshake' },
  ],
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  },
};

export default siteConfig;
