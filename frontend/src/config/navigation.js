/**
 * Central navigation model consumed by Navbar, dropdowns, mobile menu and footer.
 */

export const servicesMenu = [
  {
    heading: 'IT & Software Solutions',
    items: [
      { label: 'Website Development', to: '/services/website-development' },
      { label: 'Software Development', to: '/services/software-development' },
    ],
  },
  {
    heading: 'Digital Services',
    items: [
      { label: 'Digital Marketing', to: '/services/digital-marketing' },
      { label: 'SEO & Social Media', to: '/services/seo-social-media' },
    ],
  },
  {
    heading: 'IT Infrastructure & Hardware',
    items: [
      { label: 'Computer & Laptop Services', to: '/services/computer-laptop-services' },
      { label: 'Networking Solutions', to: '/services/networking-solutions' },
    ],
  },
  {
    heading: 'Security Solutions',
    items: [
      { label: 'CCTV Installation', to: '/services/cctv-installation' },
      { label: 'Access Control Systems', to: '/services/access-control-systems' },
    ],
  },
  {
    heading: 'AMC & Technical Support',
    items: [{ label: 'View AMC Plans', to: '/amc-support' }],
  },
  {
    heading: 'Government & Business Solutions',
    items: [{ label: 'Institutional IT Supply', to: '/services/institutional-it-supply' }],
  },
];

export const productsMenu = [
  { label: 'Desktops', to: '/products?category=desktops' },
  { label: 'Laptops', to: '/products?category=laptops' },
  { label: 'Printers & Scanners', to: '/products?category=printers-scanners' },
  { label: 'CCTV Cameras', to: '/products?category=cctv-cameras' },
  { label: 'Networking Devices', to: '/products?category=networking-devices' },
  { label: 'Routers & Switches', to: '/products?category=routers-switches' },
  { label: 'UPS & Batteries', to: '/products?category=ups-batteries' },
  { label: 'Computer Accessories', to: '/products?category=computer-accessories' },
  { label: 'Storage Devices', to: '/products?category=storage-devices' },
  { label: 'Security Equipment', to: '/products?category=security-equipment' },
];

export const mainNav = [
  { label: 'Home', to: '/home' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services', dropdown: 'services' },
  { label: 'Products', to: '/products', dropdown: 'products' },
  { label: 'Contact Us', to: '/contact' },
];

export const footerLinks = {
  quickLinks: [
    { label: 'Home', to: '/home' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Products', to: '/products' },
    { label: 'AMC Support', to: '/amc-support' },
    { label: 'News & IT Tips', to: '/articles' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Request a Quote', to: '/request-quote' },
  ],
  services: [
    { label: 'Website Development', to: '/services/website-development' },
    { label: 'Software Development', to: '/services/software-development' },
    { label: 'Digital Marketing', to: '/services/digital-marketing' },
    { label: 'Networking Solutions', to: '/services/networking-solutions' },
    { label: 'CCTV Installation', to: '/services/cctv-installation' },
    { label: 'AMC & Support', to: '/amc-support' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
};
