const IMG = (path) => `${import.meta.env.BASE_URL}images/${path}`

/**
 * Editorial content for the ten product categories. Slugs match the routes in
 * config/navigation.js (/products?category=<slug>). Product records themselves
 * (name, brand, price, image, description) always come from the products API.
 *
 * `types` are product families used to filter the live listing by keyword; they
 * are NOT confirmed stock. `specs` lists what to compare, not product claims.
 */
export const PRODUCT_CATEGORY_CONTENT = {
  desktops: {
    name: 'Desktops',
    image: IMG('products/desktops.jpg'),
    tagline: 'Business, office and workstation desktop computers.',
    intro:
      'Desktop computers for daily office work, accounting, design and institutional labs, configured around the processor, memory and storage your workload needs.',
    overview: {
      contains: 'Branded and assembled desktops, compact mini PCs and all-in-one systems.',
      customers: 'Offices, CA firms, schools, government departments and growing businesses.',
      applications: 'Billing, accounting, documentation, computer labs, design and light engineering work.',
      configurations: 'Processor, RAM, storage type and capacity and graphics vary by model - ask us for the configurations currently available.',
      considerations: 'Workload, upgradeability, warranty, operating-system licensing and available desk space.',
    },
    types: [
      { name: 'Business Desktops', keywords: ['business'], desc: 'Dependable towers for everyday office applications.', specs: ['Processor', 'RAM', 'SSD / HDD', 'Warranty'] },
      { name: 'Workstations', keywords: ['workstation'], desc: 'Higher-performance systems for design, CAD and heavy multitasking.', specs: ['Processor class', 'RAM capacity', 'Graphics', 'Storage'] },
      { name: 'Mini PCs', keywords: ['mini pc', 'mini', 'small form factor'], desc: 'Space-saving computers for reception desks and counters.', specs: ['Form factor', 'Ports', 'Memory', 'Mounting'] },
      { name: 'All-in-One', keywords: ['all-in-one', 'aio'], desc: 'Display and computer in one tidy unit.', specs: ['Screen size', 'Processor', 'Memory', 'Connectivity'] },
    ],
    guide: [
      { title: 'Match the processor to the work', text: 'Basic office tasks need far less than CAD, video or database work. Avoid over- or under-buying.' },
      { title: 'Choose SSD storage where possible', text: 'An SSD makes start-up and application loading noticeably faster than a hard disk.' },
      { title: 'Plan RAM for multitasking', text: 'More simultaneous applications and browser tabs call for more memory. Check whether the model can be upgraded later.' },
      { title: 'Confirm warranty and OS licence', text: 'Ask what warranty is included and whether the operating system is pre-installed and licensed.' },
    ],
    related: ['laptops', 'computer-accessories', 'ups-batteries'],
  },
  laptops: {
    name: 'Laptops',
    image: IMG('products/laptops.jpg'),
    tagline: 'Business, student and performance laptops.',
    intro:
      'Portable computers for business teams, students and professionals - from lightweight everyday models to performance and workstation-class machines.',
    overview: {
      contains: 'Business, everyday, performance and lightweight laptops from established brands.',
      customers: 'Companies equipping teams, students, field staff, freelancers and professionals.',
      applications: 'Office productivity, remote work, presentations, development, design and education.',
      configurations: 'Processor, RAM, SSD capacity, display and graphics differ by model. Only configurations we can supply are quoted.',
      considerations: 'Weight and battery needs, display size, RAM and storage upgrades, warranty and after-sales support.',
    },
    types: [
      { name: 'Business Laptops', keywords: ['business'], desc: 'Durable, secure laptops for professional use.', specs: ['Processor', 'RAM', 'SSD', 'Warranty'] },
      { name: 'Student & Everyday', keywords: ['student', 'everyday'], desc: 'Value-focused laptops for study and daily tasks.', specs: ['Display', 'Battery', 'Weight', 'Storage'] },
      { name: 'Performance Laptops', keywords: ['performance', 'gaming'], desc: 'More power for demanding applications.', specs: ['Processor', 'Graphics', 'RAM', 'Cooling'] },
      { name: 'Workstation Laptops', keywords: ['workstation'], desc: 'Certified-class mobile workstations for professionals.', specs: ['Graphics', 'RAM capacity', 'Display', 'Ports'] },
    ],
    guide: [
      { title: 'Decide on RAM and SSD together', text: 'Memory and SSD size should reflect the software you run and how many files you keep locally.' },
      { title: 'Balance portability and performance', text: 'Smaller, lighter laptops travel easily; larger ones typically offer bigger displays and more ports.' },
      { title: 'Check display and ports', text: 'Resolution, screen size and the ports you need (HDMI, USB-C, LAN) affect daily comfort.' },
      { title: 'Ask about battery and warranty', text: 'Battery life depends on use. Confirm warranty terms and service support before ordering in bulk.' },
    ],
    related: ['desktops', 'computer-accessories', 'storage-devices'],
  },
  'printers-scanners': {
    name: 'Printers & Scanners',
    image: IMG('products/printers.jpg'),
    tagline: 'Inkjet, laser, multifunction printers and scanners.',
    intro:
      'Printing, copying and scanning equipment for home offices, businesses and high-volume document environments.',
    overview: {
      contains: 'Inkjet and laser printers, multifunction devices and document scanners.',
      customers: 'Home offices, CA firms, schools, clinics and busy administrative departments.',
      applications: 'Invoices, reports, ID and document scanning, double-sided printing and shared network printing.',
      configurations: 'Mono or colour, duplex, wireless or network connectivity and paper-size support vary by model.',
      considerations: 'Monthly print volume, cost per page, consumables availability and maintenance.',
    },
    types: [
      { name: 'Inkjet Printers', keywords: ['inkjet', 'ink tank'], desc: 'Flexible printing for lower volumes and colour documents.', specs: ['Colour / mono', 'Resolution', 'Connectivity', 'Ink type'] },
      { name: 'Laser Printers', keywords: ['laser'], desc: 'Fast, sharp text for offices.', specs: ['Print speed', 'Duplex', 'Paper size', 'Toner'] },
      { name: 'Multifunction', keywords: ['multifunction', 'all-in-one', 'mfp'], desc: 'Print, copy and scan in one device.', specs: ['Functions', 'ADF', 'Network', 'Duplex'] },
      { name: 'Scanners', keywords: ['scanner'], desc: 'Digitise paperwork quickly and accurately.', specs: ['Scan speed', 'Resolution', 'ADF', 'Interface'] },
    ],
    guide: [
      { title: 'Start with your monthly volume', text: 'Light use suits inkjet; steady daily volume usually favours laser or high-capacity ink-tank models.' },
      { title: 'Compare cost per page', text: 'Consumables determine the real running cost more than the purchase price.' },
      { title: 'Choose connectivity for your office', text: 'Shared use benefits from network or wireless printing; single-user desks may need only USB.' },
      { title: 'Check consumables availability', text: 'Confirm that cartridges or toner are easy to obtain locally.' },
    ],
    related: ['computer-accessories', 'desktops', 'storage-devices'],
  },
  'cctv-cameras': {
    name: 'CCTV Cameras',
    image: IMG('products/cctv.jpg'),
    tagline: 'Dome, bullet, PTZ and IP surveillance cameras.',
    intro:
      'Surveillance cameras and recording equipment for shops, offices, homes, campuses and industrial sites.',
    overview: {
      contains: 'Dome, bullet, PTZ and IP cameras with compatible recorders and storage.',
      customers: 'Retail stores, offices, schools, hospitals, residences and warehouses.',
      applications: 'Entrance monitoring, perimeter coverage, indoor surveillance and remote viewing.',
      configurations: 'Resolution, lens, night-vision range and indoor/outdoor rating differ by model.',
      considerations: 'Coverage area, lighting, recorder compatibility, storage duration and weather exposure.',
    },
    types: [
      { name: 'Dome Cameras', keywords: ['dome'], desc: 'Discreet cameras typically used indoors and under canopies.', specs: ['Resolution', 'Lens', 'Night vision', 'Mounting'] },
      { name: 'Bullet Cameras', keywords: ['bullet'], desc: 'Visible, long-range cameras for entrances and perimeters.', specs: ['Resolution', 'IR range', 'Weather rating', 'Lens'] },
      { name: 'PTZ Cameras', keywords: ['ptz'], desc: 'Pan-tilt-zoom cameras for wide-area monitoring.', specs: ['Zoom', 'Resolution', 'Control', 'Power'] },
      { name: 'IP Cameras', keywords: ['ip camera', 'ip network', 'network camera'], desc: 'Network cameras recorded via NVR or compatible software.', specs: ['Resolution', 'PoE', 'Recording', 'Protocol'] },
      { name: 'CCTV Kits', keywords: ['kit', 'dvr', 'nvr'], desc: 'Camera and recorder bundles for quick setups.', specs: ['Channels', 'Storage', 'Cameras', 'Cabling'] },
    ],
    guide: [
      { title: 'Indoor or outdoor?', text: 'Outdoor cameras need a suitable weather-resistance rating; indoor models can be more compact.' },
      { title: 'Plan coverage and placement', text: 'Lens angle and mounting height decide how much area each camera actually covers.' },
      { title: 'Consider night-time monitoring', text: 'Check infrared range or low-light capability for dark areas.' },
      { title: 'Size recording and storage', text: 'Resolution, camera count and retention days determine the storage you need. Confirm recorder compatibility.' },
    ],
    related: ['security-equipment', 'networking-devices', 'storage-devices'],
  },
  'networking-devices': {
    name: 'Networking Devices',
    image: IMG('products/networking.jpg'),
    tagline: 'Adapters, NICs, cabling and connectivity hardware.',
    intro:
      'Networking hardware and connectivity accessories to build, extend and maintain wired and wireless office networks.',
    overview: {
      contains: 'Network adapters, interface cards, wireless adapters, cabling and connectivity devices.',
      customers: 'Offices, institutions, shops and IT teams expanding or repairing networks.',
      applications: 'LAN connectivity, Wi-Fi upgrades, structured cabling and network troubleshooting.',
      configurations: 'Interface, supported standards, speed and port count differ by device.',
      considerations: 'Compatibility with existing hardware, required speeds and future expansion.',
    },
    types: [
      { name: 'Network Adapters / NICs', keywords: ['adapter', 'nic', 'network card'], desc: 'Add or upgrade wired network connectivity.', specs: ['Interface', 'Speed', 'Ports', 'Compatibility'] },
      { name: 'Wireless Adapters', keywords: ['wireless', 'wi-fi', 'wifi'], desc: 'Add Wi-Fi to desktops and older systems.', specs: ['Wi-Fi standard', 'Interface', 'Bands', 'Antenna'] },
      { name: 'Cabling & Connectivity', keywords: ['cable', 'patch', 'connector'], desc: 'LAN cables, patch cords and accessories.', specs: ['Category', 'Length', 'Shielding', 'Connector'] },
    ],
    guide: [
      { title: 'Wired vs wireless', text: 'Wired links give consistent speed for fixed desks; wireless suits mobility and hard-to-cable areas.' },
      { title: 'Check compatibility', text: 'Confirm interface (PCIe, USB) and operating-system support before ordering.' },
      { title: 'Plan for expansion', text: 'Choose speeds and port counts that leave room for more users and devices.' },
      { title: 'Pair with the right switch or router', text: 'See our Routers & Switches category for core network equipment.' },
    ],
    related: ['routers-switches', 'cctv-cameras', 'computer-accessories'],
  },
  'routers-switches': {
    name: 'Routers & Switches',
    image: IMG('services/networking-solutions.jpg'),
    tagline: 'Routers, managed and PoE switches and access points.',
    intro:
      'Core network equipment for small offices to larger campuses: routing, switching, PoE power and wireless coverage.',
    overview: {
      contains: 'Business and wireless routers, managed and unmanaged switches, PoE switches and access points.',
      customers: 'Offices, institutions, retail chains and sites running IP cameras or VoIP.',
      applications: 'Internet sharing, VLAN segmentation, IP-camera power and Wi-Fi coverage.',
      configurations: 'Port count, Ethernet speed, Wi-Fi standard, management features and PoE budget vary by model.',
      considerations: 'Number of devices, PoE needs, management features and coverage area.',
    },
    types: [
      { name: 'Routers', keywords: ['router'], desc: 'Share internet and manage traffic for your network.', specs: ['WAN ports', 'Throughput', 'Wi-Fi standard', 'VPN'] },
      { name: 'Managed Switches', keywords: ['managed'], desc: 'Switches with VLAN and traffic-management features.', specs: ['Ports', 'Speed', 'VLAN', 'Management'] },
      { name: 'Unmanaged Switches', keywords: ['unmanaged', 'switch'], desc: 'Simple plug-and-play port expansion.', specs: ['Ports', 'Speed', 'Metal / plastic', 'Power'] },
      { name: 'PoE Switches', keywords: ['poe'], desc: 'Power IP cameras and access points over Ethernet.', specs: ['PoE ports', 'Power budget', 'Speed', 'Standards'] },
      { name: 'Access Points', keywords: ['access point', 'wireless', 'wi-fi'], desc: 'Extend reliable Wi-Fi coverage.', specs: ['Wi-Fi standard', 'Bands', 'PoE', 'Coverage'] },
    ],
    guide: [
      { title: 'Managed or unmanaged?', text: 'Unmanaged is simple and affordable; managed adds VLANs and monitoring for larger or segmented networks.' },
      { title: 'Count ports and growth', text: 'Include uplinks and future devices when choosing the number of ports.' },
      { title: 'Check PoE budget', text: 'Total camera or access-point power must fit within the switch\'s PoE budget.' },
      { title: 'Plan Wi-Fi coverage', text: 'Walls, floors and user density decide how many access points you need.' },
    ],
    related: ['networking-devices', 'cctv-cameras', 'ups-batteries'],
  },
  'ups-batteries': {
    name: 'UPS & Batteries',
    image: IMG('products/ups.jpg'),
    tagline: 'Offline, line-interactive and online UPS and batteries.',
    intro:
      'Backup power for computers, network equipment and CCTV - from small offline units to online UPS systems and replacement batteries.',
    overview: {
      contains: 'Offline, line-interactive and online UPS units plus compatible replacement batteries.',
      customers: 'Offices, shops, server rooms, CCTV installations and clinics.',
      applications: 'Protecting computers from power cuts and surges and keeping network and security gear online.',
      configurations: 'VA rating, battery configuration and connectivity differ by model.',
      considerations: 'Total connected load, required backup time, battery type and replacement cost.',
    },
    types: [
      { name: 'Offline UPS', keywords: ['offline'], desc: 'Basic backup for a single computer.', specs: ['VA rating', 'Outlets', 'Battery', 'Transfer time'] },
      { name: 'Line-Interactive UPS', keywords: ['line-interactive', 'line interactive'], desc: 'Voltage regulation and backup for offices.', specs: ['VA rating', 'AVR', 'Outlets', 'Battery'] },
      { name: 'Online UPS', keywords: ['online'], desc: 'Continuous conditioned power for critical equipment.', specs: ['VA / Watt', 'Input / output', 'Battery bank', 'Monitoring'] },
      { name: 'Batteries', keywords: ['battery', 'batteries'], desc: 'Replacement batteries for supported UPS units.', specs: ['Voltage', 'Capacity (Ah)', 'Terminal', 'Compatibility'] },
    ],
    guide: [
      { title: 'Add up your load', text: 'Total the wattage of every connected device and choose a UPS with headroom.' },
      { title: 'Runtime depends on load', text: 'Backup time varies with load and battery. Share your equipment list and we will advise.' },
      { title: 'Match battery replacements', text: 'Check voltage, capacity and connector compatibility before replacing batteries.' },
      { title: 'Pick the UPS type', text: 'Offline for basic needs, line-interactive for fluctuating supply, online for critical systems.' },
    ],
    related: ['desktops', 'networking-devices', 'cctv-cameras'],
  },
  'computer-accessories': {
    name: 'Computer Accessories',
    image: IMG('services/computer-laptop-services.jpg'),
    tagline: 'Keyboards, mice, webcams, headsets and peripherals.',
    intro:
      'Everyday peripherals and workstation accessories that keep teams productive, from input devices to conferencing gear.',
    overview: {
      contains: 'Keyboards, mice, webcams, headsets, docking stations, adapters and monitors.',
      customers: 'Offices, remote workers, schools and IT departments.',
      applications: 'Daily productivity, video conferencing and ergonomic workstation setups.',
      configurations: 'Wired or wireless, interface type and feature set vary by product.',
      considerations: 'Compatibility with your computers, comfort and warranty.',
    },
    types: [
      { name: 'Keyboards & Mice', keywords: ['keyboard', 'mouse'], desc: 'Input devices for everyday work.', specs: ['Wired / wireless', 'Layout', 'Interface', 'Warranty'] },
      { name: 'Webcams & Headsets', keywords: ['webcam', 'headset'], desc: 'Equipment for meetings and online classes.', specs: ['Resolution', 'Microphone', 'Connection', 'Compatibility'] },
      { name: 'Docks & Adapters', keywords: ['dock', 'adapter', 'hub'], desc: 'Connect displays and peripherals to laptops.', specs: ['Ports', 'Video output', 'Power delivery', 'Host interface'] },
      { name: 'Monitors', keywords: ['monitor', 'display'], desc: 'Screens for desks and reception counters.', specs: ['Size', 'Resolution', 'Panel', 'Inputs'] },
    ],
    guide: [
      { title: 'Check connection type', text: 'Confirm USB, USB-C or Bluetooth support on the target computers.' },
      { title: 'Think ergonomics', text: 'Comfortable keyboards, mice and screen height reduce fatigue over a full day.' },
      { title: 'Equip for video calls', text: 'Camera resolution and a clear microphone matter more than extra features.' },
      { title: 'Verify compatibility', text: 'Docks and adapters differ in supported displays and power delivery.' },
    ],
    related: ['laptops', 'desktops', 'storage-devices'],
  },
  'storage-devices': {
    name: 'Storage Devices',
    image: IMG('services/institutional-it-supply.jpg'),
    tagline: 'SSDs, hard drives, external and portable storage.',
    intro:
      'Internal and external storage for upgrades, backup and archiving, in capacities from everyday to high-volume.',
    overview: {
      contains: 'SATA and NVMe SSDs, internal hard drives, external drives and portable SSDs.',
      customers: 'Offices, IT teams, photographers, CCTV operators and home users.',
      applications: 'System upgrades, backup, file archives and surveillance footage retention.',
      configurations: 'Capacity, interface and form factor differ by model; not every model is offered in every capacity.',
      considerations: 'Speed vs capacity, compatibility with your device, durability and warranty.',
    },
    types: [
      { name: 'SATA SSDs', keywords: ['sata'], desc: 'Fast upgrade for older laptops and desktops.', specs: ['Capacity', 'Interface', 'Form factor', 'Speed'] },
      { name: 'NVMe SSDs', keywords: ['nvme', 'm.2'], desc: 'High-speed storage for modern systems.', specs: ['Capacity', 'PCIe gen', 'M.2 size', 'Speed'] },
      { name: 'Hard Drives', keywords: ['hdd', 'hard drive', 'hard disk'], desc: 'High-capacity storage at lower cost per GB.', specs: ['Capacity', 'RPM', 'Interface', 'Use (desktop / surveillance)'] },
      { name: 'External & Portable', keywords: ['external', 'portable', 'pen drive'], desc: 'Backup and transfer on the move.', specs: ['Capacity', 'Interface', 'Type (SSD / HDD)', 'Durability'] },
    ],
    guide: [
      { title: 'SSD vs HDD', text: 'SSDs are faster and quieter; HDDs offer more capacity per rupee for archives and recordings.' },
      { title: 'Internal vs external', text: 'Internal drives upgrade a machine; external drives provide backup and portability.' },
      { title: 'Choose capacity with headroom', text: 'Pick a size above current needs so the drive does not fill quickly.' },
      { title: 'Check compatibility', text: 'Confirm interface and form factor (2.5", M.2) supported by your device.' },
    ],
    related: ['laptops', 'desktops', 'cctv-cameras'],
  },
  'security-equipment': {
    name: 'Security Equipment',
    image: IMG('services/access-control-systems.jpg'),
    tagline: 'Biometric, access-control and alarm hardware.',
    intro:
      'Entry-point and premises security hardware: biometric devices, door controllers, locks, alarms and sensors.',
    overview: {
      contains: 'Biometric terminals, door access controllers, smart locks, alarm systems and sensors.',
      customers: 'Offices, institutions, factories, clinics and residences.',
      applications: 'Controlled entry, attendance, intrusion alerts and restricted-area protection.',
      configurations: 'Authentication methods (fingerprint, card, PIN), connectivity and integration vary by device.',
      considerations: 'Supported access methods, integration with existing systems, power and installation.',
    },
    types: [
      { name: 'Biometric Devices', keywords: ['biometric', 'fingerprint', 'face'], desc: 'Attendance and entry using biometrics.', specs: ['Authentication', 'Users', 'Connectivity', 'Power'] },
      { name: 'Door Access Controllers', keywords: ['access control', 'controller', 'rfid'], desc: 'Manage who can open which door.', specs: ['Doors', 'Readers', 'Interface', 'Software'] },
      { name: 'Smart Locks', keywords: ['lock'], desc: 'Electronic locks for offices and rooms.', specs: ['Access method', 'Power', 'Door type', 'Connectivity'] },
      { name: 'Alarms & Sensors', keywords: ['alarm', 'sensor'], desc: 'Detect and alert on intrusion.', specs: ['Sensor type', 'Zones', 'Siren', 'Power backup'] },
    ],
    guide: [
      { title: 'Choose access methods', text: 'Card, PIN and biometrics suit different risk levels. Not every device supports all methods.' },
      { title: 'Secure every entry point', text: 'List main doors, server rooms and back entries before choosing devices.' },
      { title: 'Check integration', text: 'Confirm compatibility with attendance software, CCTV or existing controllers.' },
      { title: 'Plan power and installation', text: 'Locks and controllers need suitable power, cabling and backup.' },
    ],
    related: ['cctv-cameras', 'networking-devices', 'ups-batteries'],
  },
}

export const CATEGORY_SLUGS = Object.keys(PRODUCT_CATEGORY_CONTENT)
