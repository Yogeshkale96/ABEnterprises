/**
 * Seed runner: populates roles, categories, services, products, industries,
 * sample articles, and a default admin user.
 * Usage: npm run db:seed
 * Admin credentials come from ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 */
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const SERVICE_CATEGORIES = [
  ['IT & Software Solutions', 'it-software-solutions', 'Custom software, websites and business applications.', 'Code2', 1],
  ['Digital Services', 'digital-services', 'Digital marketing, SEO and social media management.', 'Megaphone', 2],
  ['IT Infrastructure & Hardware', 'it-infrastructure-hardware', 'Computers, laptops, servers and networking.', 'Server', 3],
  ['Security Solutions', 'security-solutions', 'CCTV surveillance and access control systems.', 'ShieldCheck', 4],
  ['AMC & Technical Support', 'amc-technical-support', 'Annual maintenance contracts and on-site support.', 'Wrench', 5],
  ['Government & Business Solutions', 'government-business-solutions', 'IT procurement and solutions for institutions.', 'Landmark', 6],
];

const SERVICES = [
  ['it-software-solutions', 'Website Development', 'website-development', 'Responsive business websites built with modern technologies.'],
  ['it-software-solutions', 'Software Development', 'software-development', 'Custom business software, billing and management systems.'],
  ['digital-services', 'Digital Marketing', 'digital-marketing', 'Grow your business online with targeted campaigns.'],
  ['digital-services', 'SEO & Social Media', 'seo-social-media', 'Improve search visibility and social presence.'],
  ['it-infrastructure-hardware', 'Computer & Laptop Services', 'computer-laptop-services', 'Sales, repair and upgrades for desktops and laptops.'],
  ['it-infrastructure-hardware', 'Networking Solutions', 'networking-solutions', 'Structured cabling, LAN, Wi-Fi and enterprise networking.'],
  ['security-solutions', 'CCTV Installation', 'cctv-installation', 'HD CCTV camera installation and surveillance setup.'],
  ['security-solutions', 'Access Control Systems', 'access-control-systems', 'Biometric and card-based access control solutions.'],
  ['amc-technical-support', 'Annual Maintenance Contracts', 'annual-maintenance-contracts', 'Comprehensive AMC plans for computers, printers and networks.'],
  ['amc-technical-support', 'On-Site Technical Support', 'on-site-technical-support', 'Fast on-site diagnosis and repair at your location.'],
  ['government-business-solutions', 'Institutional IT Supply', 'institutional-it-supply', 'Bulk IT hardware supply for offices and institutions.'],
];

const PRODUCT_CATEGORIES = [
  ['Desktops', 'desktops', 'Business and performance desktop computers.', 'Monitor', 1],
  ['Laptops', 'laptops', 'Laptops for business, students and professionals.', 'Laptop', 2],
  ['Printers & Scanners', 'printers-scanners', 'Laser, inkjet printers and document scanners.', 'Printer', 3],
  ['CCTV Cameras', 'cctv-cameras', 'HD and IP surveillance cameras and DVR/NVR kits.', 'Cctv', 4],
  ['Networking Devices', 'networking-devices', 'Routers, switches, access points and cabling.', 'Network', 5],
  ['Routers & Switches', 'routers-switches', 'Enterprise routers and managed switches.', 'Router', 6],
  ['UPS & Batteries', 'ups-batteries', 'UPS systems and backup batteries.', 'BatteryCharging', 7],
  ['Computer Accessories', 'computer-accessories', 'Keyboards, mice, cables and peripherals.', 'Keyboard', 8],
  ['Storage Devices', 'storage-devices', 'HDDs, SSDs, NAS and external storage.', 'HardDrive', 9],
  ['Security Equipment', 'security-equipment', 'Surveillance and security accessories.', 'ShieldCheck', 10],
];

const PRODUCTS = [
  ['desktops', 'Business Desktop PCs', 'business-desktop-pcs', 'Reliable desktops configured for office workloads.'],
  ['desktops', 'Custom-Built Workstations', 'custom-built-workstations', 'High-performance builds for design and engineering.'],
  ['laptops', 'Business Laptops', 'business-laptops', 'Lightweight laptops with long battery life.'],
  ['laptops', 'Student Laptops', 'student-laptops', 'Affordable laptops for study and everyday use.'],
  ['printers-scanners', 'Laser Printers', 'laser-printers', 'Fast mono and colour laser printers for offices.'],
  ['printers-scanners', 'Multifunction Printers', 'multifunction-printers', 'Print, scan and copy in one device.'],
  ['cctv-cameras', 'HD CCTV Camera Kits', 'hd-cctv-camera-kits', 'Complete surveillance kits with DVR and storage.'],
  ['cctv-cameras', 'IP Cameras', 'ip-cameras', 'Network cameras with remote viewing support.'],
  ['networking-devices', 'Enterprise Access Points', 'enterprise-access-points', 'Reliable Wi-Fi coverage for offices and campuses.'],
  ['routers-switches', 'Managed Switches', 'managed-switches', 'Gigabit switches for structured office networks.'],
  ['routers-switches', 'Business Routers', 'business-routers', 'Secure routers with VPN and firewall features.'],
  ['ups-batteries', 'Line-Interactive UPS', 'line-interactive-ups', 'Backup power for desktops and network equipment.'],
  ['ups-batteries', 'Online UPS Systems', 'online-ups-systems', 'Continuous power protection for servers.'],
  ['computer-accessories', 'Keyboard & Mouse Combos', 'keyboard-mouse-combos', 'Durable peripherals for daily office use.'],
  ['storage-devices', 'SSD Upgrades', 'ssd-upgrades', 'Speed up existing systems with solid-state drives.'],
  ['storage-devices', 'Surveillance Hard Drives', 'surveillance-hard-drives', 'Storage built for 24/7 CCTV recording.'],
  ['security-equipment', 'Video Door Phones', 'video-door-phones', 'Secure entry screening for offices and homes.'],
];

const INDUSTRIES = [
  ['CA Offices', 'ca-offices', 'IT infrastructure, printers and data security for accounting firms.', 'Calculator', 1],
  ['Hospitals & Clinics', 'hospitals-clinics', 'Reliable systems, CCTV and networking for healthcare.', 'Stethoscope', 2],
  ['Schools & Colleges', 'schools-colleges', 'Computer labs, smart-class hardware and campus networking.', 'GraduationCap', 3],
  ['Shops & Showrooms', 'shops-showrooms', 'Billing systems, CCTV and display solutions for retail.', 'Store', 4],
  ['Industries', 'industries', 'Rugged IT and surveillance for factories and warehouses.', 'Factory', 5],
  ['Hotels & Restaurants', 'hotels-restaurants', 'POS support, guest Wi-Fi and surveillance for hospitality.', 'Hotel', 6],
  ['Residential', 'residential', 'Home CCTV, Wi-Fi and computer support for residences.', 'Home', 7],
  ['Government Offices', 'government-offices', 'Compliant IT supply and support for government offices.', 'Landmark', 8],
];

const ARTICLES = [
  ['How to Choose the Right Laptop for Your Business', 'choose-right-laptop-business', 'Buying Guide', 'Key specs, warranty tips and budgets to consider before buying laptops for your team.'],
  ['5 Benefits of CCTV Surveillance for Businesses', 'cctv-benefits-businesses', 'Security', 'Why CCTV is one of the most cost-effective security investments for any premises.'],
  ['Building a Reliable Business Network', 'reliable-business-network', 'Networking', 'Router, switch and cabling best practices for a stable office network.'],
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ab_enterprises',
    multipleStatements: true,
  });

  try {
    console.log('Seeding database...');

    await connection.query(
      `INSERT IGNORE INTO roles (name) VALUES ('admin'), ('staff')`
    );

    // Admin user (credentials from env — change defaults before production).
    const adminEmail = process.env.ADMIN_EMAIL || 'abenterprises@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'abenterprises@123';
    const hash = await bcrypt.hash(adminPassword, 12);
    await connection.query(
      `INSERT IGNORE INTO users (name, email, password_hash, role_id, status)
       SELECT 'Administrator', ?, ?, id, 'active' FROM roles WHERE name = 'admin'`,
      [adminEmail, hash]
    );

    for (const [name, slug, description, icon, sort] of SERVICE_CATEGORIES) {
      await connection.query(
        `INSERT INTO service_categories (name, slug, description, icon, sort_order)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)`,
        [name, slug, description, icon, sort]
      );
    }

    for (const [catSlug, name, slug, short] of SERVICES) {
      await connection.query(
        `INSERT INTO services (category_id, name, slug, short_description, description)
         SELECT id, ?, ?, ?, ? FROM service_categories WHERE slug = ?
         ON DUPLICATE KEY UPDATE name = VALUES(name), short_description = VALUES(short_description)`,
        [name, slug, short, `${short}\n\nContact AB Enterprises for a tailored quote.`, catSlug]
      );
    }

    for (const [name, slug, description, icon, sort] of PRODUCT_CATEGORIES) {
      await connection.query(
        `INSERT INTO product_categories (name, slug, description, icon, sort_order)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)`,
        [name, slug, description, icon, sort]
      );
    }

    for (const [catSlug, name, slug, short] of PRODUCTS) {
      await connection.query(
        `INSERT INTO products (category_id, name, slug, short_description, description)
         SELECT id, ?, ?, ?, ? FROM product_categories WHERE slug = ?
         ON DUPLICATE KEY UPDATE name = VALUES(name), short_description = VALUES(short_description)`,
        [name, slug, short, `${short}\n\nRequest a quote for current pricing and availability.`, catSlug]
      );
    }

    for (const [name, slug, description, icon, sort] of INDUSTRIES) {
      await connection.query(
        `INSERT INTO industries (name, slug, description, icon, sort_order)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description)`,
        [name, slug, description, icon, sort]
      );
    }

    for (const [title, slug, category, excerpt] of ARTICLES) {
      await connection.query(
        `INSERT INTO articles (title, slug, category, excerpt, content, published_at, status)
         VALUES (?, ?, ?, ?, ?, NOW(), 'published')
         ON DUPLICATE KEY UPDATE title = VALUES(title), excerpt = VALUES(excerpt)`,
        [title, slug, category, excerpt, excerpt]
      );
    }

    console.log('Seed complete.');
    console.log(`Admin login: ${adminEmail} (password from ADMIN_PASSWORD env)`);
  } finally {
    await connection.end();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
