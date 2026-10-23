/**
 * Indicative product lines shown on category pages when the product API has
 * fewer than TARGET products for a category. They carry no brand, model number
 * or price: configurations, specifications and availability are confirmed in
 * the quotation. Real products added through the admin/API always take
 * precedence and gradually replace these lines.
 */
import { PRODUCT_CATEGORY_CONTENT } from './productCategories.js'

export const CATALOGUE_TARGET = 10

const P = (path) => `${import.meta.env.BASE_URL}images/${path}`

/** Photo pools per category; each product line gets the next image in turn. */
const CATEGORY_IMAGES = {
  desktops: [
    'products/desktops.jpg', 'products/desktops-2.jpg', 'products/desktops-3.jpg',
    'products/desktops-4.jpg', 'products/desktops-8.jpg', 'products/desktops-9.jpg',
    'products/desktops-10.jpg', 'products/desktops-11.jpg', 'products/desktops-12.jpg',
    'products/desktops-13.jpg',
  ],
  laptops: [
    'products/laptops.jpg', 'products/laptops-2.jpg', 'products/laptops-3.jpg',
    'products/laptops-4.jpg', 'products/laptops-6.jpg', 'products/laptops-7.jpg',
    'products/laptops-9.jpg', 'products/laptops-10.jpg', 'articles/laptop-guide.jpg',
    'industries/ca-offices.jpg',
  ],
  'printers-scanners': [
    'products/printers.jpg', 'products/printers-2.jpg', 'products/printers-n1.jpg',
    'products/printers-n3.jpg', 'products/printers-n4.jpg', 'products/printers-n5.jpg',
    'products/printers-n6.jpg', 'industries/ca-offices.jpg', 'industries/government-offices.jpg',
    'industries/schools-colleges.jpg',
  ],
  'cctv-cameras': [
    'products/cctv.jpg', 'products/cctv-n1.jpg', 'products/cctv-n2.jpg',
    'products/cctv-n4.jpg', 'articles/cctv-benefits.jpg', 'services/cctv-installation.jpg',
    'industries/shops-showrooms.jpg', 'industries/residential.jpg',
  ],
  'networking-devices': [
    'products/networking.jpg', 'products/networking-2.jpg', 'products/networking-3.jpg',
    'products/networking-7.jpg', 'products/networking-n1.jpg', 'products/networking-n2.jpg',
    'products/networking-n3.jpg', 'products/networking-n4.jpg', 'services/networking-solutions.jpg',
    'contact/cta-network.jpg',
  ],
  'routers-switches': [
    'products/routers-n1.jpg', 'products/routers-n2.jpg', 'products/routers-n5.jpg',
    'products/routers-n6.jpg', 'products/networking-n3.jpg', 'products/networking-n1.jpg',
    'products/networking-n2.jpg', 'products/networking-7.jpg', 'articles/business-network.jpg',
    'services/networking-solutions.jpg',
  ],
  'ups-batteries': [
    'products/ups.jpg', 'products/ups-5.jpg', 'products/ups-n2.jpg',
    'services/amc-support.jpg', 'about/intro-technician.jpg', 'industries/government-offices.jpg',
    'industries/residential.jpg', 'industries/ca-offices.jpg',
  ],
  'computer-accessories': [
    'products/accessories-2.jpg', 'products/accessories-3.jpg', 'products/accessories-5.jpg',
    'products/accessories-6.jpg', 'products/accessories-7.jpg', 'products/accessories-8.jpg',
    'products/accessories-9.jpg', 'products/accessories-10.jpg', 'products/accessories-12.jpg',
    'products/accessories-13.jpg',
  ],
  'storage-devices': [
    'products/storage-n1.jpg', 'products/storage-n2.jpg', 'products/storage-n3.jpg',
    'products/storage-n5.jpg', 'products/storage-n6.jpg', 'services/institutional-it-supply.jpg',
    'services/computer-laptop-services.jpg', 'industries/ca-offices.jpg',
  ],
  'security-equipment': [
    'products/security-2.jpg', 'products/security-3.jpg', 'products/security-6.jpg',
    'products/security-n1.jpg', 'products/security-n2.jpg', 'services/access-control-systems.jpg',
    'products/cctv-n2.jpg', 'articles/cctv-benefits.jpg', 'industries/residential.jpg',
    'industries/shops-showrooms.jpg',
  ],
}

export const categoryImages = (slug) => (CATEGORY_IMAGES[slug] || []).map(P)

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const LINES = {
  desktops: [
    ['Business Desktop PC', 'Dependable tower PC for accounting, billing and daily office software.', 'Processor:Intel Core i3 / i5 class|RAM:8 GB or 16 GB DDR4|Storage:256 GB / 512 GB SSD|Operating System:Windows 11 Pro (on request)', 'Quiet everyday performance|Tool-free upgrades where supported|Bulk-order friendly'],
    ['Office Desktop PC', 'Cost-effective desktop for reception, data entry and document work.', 'Processor:Intel Core i3 class|RAM:4 GB or 8 GB|Storage:256 GB SSD or 1 TB HDD|Operating System:Windows 11 Home / Pro', 'Low power consumption|Reliable for 8-hour office use|Easy to service'],
    ['Workstation Desktop', 'High-performance tower for CAD, design and heavy multitasking.', 'Processor:Intel Core i7 / Xeon class|RAM:16 GB to 64 GB|Storage:512 GB NVMe SSD + HDD|Graphics:Dedicated GPU (as configured)', 'Built for sustained workloads|Expandable memory and storage|Optional professional GPU'],
    ['Mini PC', 'Space-saving computer for counters, kiosks and compact desks.', 'Form Factor:Mini / small form factor|RAM:8 GB or 16 GB|Storage:256 GB SSD|Connectivity:USB, HDMI, LAN, Wi-Fi', 'Tiny footprint|VESA mounting on supported models|Low noise and power'],
    ['All-in-One Desktop', 'Display and computer in a single tidy unit for front-desk use.', 'Display:21.5 to 27 inch (model dependent)|Processor:Intel Core i3 / i5 class|RAM:8 GB or 16 GB|Storage:256 GB / 512 GB SSD', 'Fewer cables|Clean reception-desk look|Built-in webcam on selected models'],
    ['Custom-Built Desktop', 'Assembled to your exact specification and budget.', 'Processor:Intel or AMD, as specified|RAM:As per requirement|Storage:SSD / HDD combination|Warranty:Component-wise, as quoted', 'Choose each component|No unnecessary extras|Easy future upgrades'],
    ['Computer Lab Desktop', 'Uniform desktops for schools, colleges and training institutes.', 'Processor:Intel Core i3 class|RAM:8 GB|Storage:256 GB SSD|Operating System:Windows 11 / Linux on request', 'Identical configuration for easy management|Bulk pricing and delivery|Optional imaging and setup'],
    ['Gaming & Design Desktop', 'Performance-focused build for graphics, rendering and creative software.', 'Processor:Intel Core i5 / i7 or AMD Ryzen|RAM:16 GB or 32 GB|Storage:1 TB NVMe SSD|Graphics:Dedicated GPU', 'Strong graphics performance|Cooling-focused cabinet|Upgrade-ready power supply'],
    ['Refurbished Desktop', 'Tested, budget-friendly desktops for basic and temporary needs.', 'Processor:Intel Core i3 / i5 (earlier generation)|RAM:4 GB or 8 GB|Storage:SSD / HDD|Condition:Tested and cleaned', 'Budget-friendly|Tested before delivery|Suited to basic tasks'],
    ['Server-Grade Tower', 'Tower platform for file servers, billing servers and small-office data.', 'Processor:Xeon / Ryzen class|RAM:16 GB or more, ECC where supported|Storage:RAID-capable drive bays|Use:File / application server', 'Designed for always-on operation|Room for multiple drives|Optional UPS pairing'],
  ],
  laptops: [
    ['Business Laptop', 'Durable, secure laptop for professional teams and travel.', 'Processor:Intel Core i5 / i7 class|RAM:8 GB or 16 GB|Storage:256 GB / 512 GB SSD|Display:14 to 15.6 inch Full HD', 'Reliable build quality|Security features on supported models|Good battery for a workday'],
    ['Student Laptop', 'Affordable everyday laptop for study, assignments and browsing.', 'Processor:Intel Core i3 / Ryzen 3 class|RAM:8 GB|Storage:256 GB SSD|Display:14 to 15.6 inch', 'Value-focused|Lightweight options|Windows or Linux on request'],
    ['Everyday Laptop', 'Balanced laptop for office apps, video calls and web use.', 'Processor:Intel Core i3 / i5 class|RAM:8 GB|Storage:512 GB SSD|Display:15.6 inch', 'Comfortable keyboard|Wi-Fi and Bluetooth|Suitable for most home offices'],
    ['Performance Laptop', 'More power for editing, development and demanding applications.', 'Processor:Intel Core i7 / Ryzen 7 class|RAM:16 GB or 32 GB|Storage:512 GB / 1 TB SSD|Graphics:Dedicated GPU on selected models', 'High multitasking headroom|Stronger cooling|Upgrade options on supported models'],
    ['Workstation Laptop', 'Mobile workstation for engineering, CAD and professional graphics.', 'Processor:Intel Core i7 / i9 / Xeon class|RAM:16 GB to 64 GB|Graphics:Professional / dedicated GPU|Display:15.6 to 17 inch', 'Built for sustained load|Colour-accurate displays on selected models|Expandable storage'],
    ['Lightweight Ultrabook', 'Slim, light laptop for frequent travellers.', 'Processor:Intel Core i5 / i7 low-power class|RAM:8 GB or 16 GB|Storage:512 GB SSD|Weight:Around 1.2 to 1.4 kg (model dependent)', 'Easy to carry|Fast wake and boot|Thin-and-light design'],
    ['2-in-1 Convertible Laptop', 'Touchscreen laptop that folds into tablet mode.', 'Display:Touch, 13 to 14 inch|Processor:Intel Core i5 class|RAM:8 GB or 16 GB|Storage:256 GB / 512 GB SSD', 'Touch and stylus support on selected models|Flexible for presentations|Compact design'],
    ['Gaming Laptop', 'High-refresh display and dedicated graphics for gaming and creation.', 'Processor:Intel Core i5 / i7 or Ryzen|RAM:16 GB|Graphics:Dedicated GPU|Display:High-refresh 15.6 inch', 'Advanced cooling|RGB keyboard on selected models|Strong graphics performance'],
    ['Refurbished Laptop', 'Tested, budget-friendly laptops for basic use.', 'Processor:Intel Core i5 (earlier generation)|RAM:8 GB|Storage:SSD|Condition:Tested and cleaned', 'Lower cost|Tested before delivery|Good for schools and temporary staff'],
    ['Corporate Bulk Laptop Supply', 'Uniform laptop fleets for companies and institutions.', 'Configuration:Standardised per order|Warranty:As quoted|Delivery:Bulk, with setup on request|Support:AMC available', 'Volume pricing|Pre-installed software on request|Single point of contact'],
  ],
  'printers-scanners': [
    ['Inkjet Printer', 'Colour printing for documents, photos and light office use.', 'Technology:Inkjet|Output:Colour|Connectivity:USB / Wi-Fi|Paper:A4', 'Low upfront cost|Good colour output|Compact footprint'],
    ['Ink Tank Printer', 'Refillable tank printer with low running cost for higher volumes.', 'Technology:Ink tank|Output:Colour|Connectivity:USB / Wi-Fi|Use:High-volume home and office', 'Low cost per page|Easy ink refills|Suited to frequent printing'],
    ['Laser Printer (Mono)', 'Fast, sharp black-and-white printing for offices.', 'Technology:Laser|Output:Monochrome|Duplex:Auto duplex on selected models|Connectivity:USB / LAN', 'Crisp text|Fast first page|Toner-based economy'],
    ['Colour Laser Printer', 'Professional colour documents with laser quality.', 'Technology:Colour laser|Output:Colour|Connectivity:USB / LAN / Wi-Fi|Paper:A4', 'Sharp graphics|Network ready|Durable for office use'],
    ['Multifunction Printer (Inkjet)', 'Print, copy and scan in one compact device.', 'Functions:Print / Copy / Scan|Technology:Inkjet or ink tank|Connectivity:USB / Wi-Fi|Scanner:Flatbed', 'Saves desk space|Mobile printing on supported models|Easy operation'],
    ['Multifunction Printer (Laser)', 'Office multifunction with automatic document feeder.', 'Functions:Print / Copy / Scan|Technology:Laser|Duplex:Auto duplex on selected models|Feeder:ADF on selected models', 'Shared network use|Fast copying|Scan-to-email on supported models'],
    ['A3 Printer', 'Large-format printing for drawings, posters and spreadsheets.', 'Paper:A3 and A4|Technology:Laser or inkjet|Connectivity:USB / LAN|Use:Design and administration', 'Wide-format output|Suits architects and engineers|Network capable'],
    ['Document Scanner', 'Fast scanning to digitise invoices, records and files.', 'Type:Sheet-fed document scanner|Feeder:ADF|Resolution:Up to 600 dpi (model dependent)|Interface:USB', 'High-speed batch scanning|Searchable PDF output on supported software|Compact design'],
    ['Photo & Flatbed Scanner', 'Flatbed scanning for photos, books and fragile originals.', 'Type:Flatbed|Resolution:High optical resolution|Interface:USB|Use:Photos and bound documents', 'Gentle on originals|High-quality scans|Plug and play'],
    ['High-Volume Office Printer', 'Heavy-duty printing for busy departments.', 'Technology:Laser|Duty:High monthly volume|Connectivity:LAN|Capacity:Large paper trays', 'Built for volume|Large toner options|Business-grade reliability'],
  ],
  'cctv-cameras': [
    ['Dome CCTV Camera', 'Discreet dome camera for offices, shops and indoor areas.', 'Camera Type:Dome|Resolution:2 MP / 5 MP|Night Vision:Infrared|Use:Indoor', 'Low-profile look|Vandal-resistant options|Clear day and night video'],
    ['Bullet CCTV Camera', 'Visible long-range camera for entrances and perimeters.', 'Camera Type:Bullet|Resolution:2 MP / 5 MP|Night Vision:Infrared|Rating:Weather-resistant on outdoor models', 'Strong deterrent|Simple mounting|Suited to outdoor use'],
    ['PTZ Camera', 'Pan-tilt-zoom camera for wide-area monitoring.', 'Camera Type:PTZ|Zoom:Optical zoom, model dependent|Resolution:2 MP / 4 MP|Control:Remote', 'Covers large areas|Operator-controlled tracking|Ideal for parking and yards'],
    ['IP Network Camera', 'Network camera with remote viewing and NVR recording.', 'Camera Type:IP|Resolution:2 MP to 8 MP|Power:PoE on supported models|Recording:NVR compatible', 'Sharper detail|Remote mobile viewing|Cabling simplified with PoE'],
    ['Wi-Fi Camera', 'Easy-install wireless camera for homes and small shops.', 'Connectivity:Wi-Fi|Storage:microSD / cloud on supported models|Resolution:2 MP / 3 MP|Use:Indoor', 'Quick setup|Mobile app alerts on supported models|Two-way audio on selected models'],
    ['Outdoor Weatherproof Camera', 'Rugged camera for gates, compounds and exteriors.', 'Rating:IP66 / IP67 on selected models|Night Vision:Long-range infrared|Resolution:2 MP / 5 MP|Housing:Metal on selected models', 'Dust and rain resistant|Long night-vision range|Built for outdoor installs'],
    ['Audio-Enabled Camera', 'Camera with built-in microphone for counters and reception.', 'Audio:Built-in microphone|Resolution:2 MP / 5 MP|Recording:DVR / NVR compatible|Use:Indoor', 'Records sound with video|Useful for service counters|Simple integration'],
    ['Full-Colour Night Camera', 'Colour video after dark with supplemental lighting.', 'Night Mode:Full colour with white light on selected models|Resolution:2 MP / 5 MP|Lens:Wide angle|Use:Indoor / outdoor', 'Identify colours at night|Clear detail in low light|Great for retail'],
    ['CCTV Camera Kit (4 Channel)', 'Complete kit with cameras, DVR and storage for small premises.', 'Channels:4|Includes:Cameras, DVR, cables, adapters|Storage:HDD (capacity as quoted)|Installation:Available', 'Ready-to-install bundle|Remote viewing on supported models|One-stop purchase'],
    ['CCTV Camera Kit (8 Channel)', 'Expanded kit for larger offices, schools and warehouses.', 'Channels:8|Includes:Cameras, DVR/NVR, cables, adapters|Storage:HDD (capacity as quoted)|Installation:Available', 'Scales for larger sites|Central recording|Professional installation option'],
  ],
  'networking-devices': [
    ['Gigabit Network Interface Card', 'Add or replace wired network connectivity in a desktop.', 'Device Type:NIC (PCIe)|Speed:10/100/1000 Mbps|Ports:1|Compatibility:Windows / Linux', 'Reliable wired link|Low-profile bracket on selected models|Easy to install'],
    ['USB LAN Adapter', 'Add Ethernet to laptops and ultrabooks without a LAN port.', 'Device Type:USB to Ethernet|Speed:Gigabit|Interface:USB 3.0 / USB-C|Compatibility:Windows / macOS', 'Plug and play|Pocket-sized|Great for slim laptops'],
    ['Wireless USB Adapter', 'Add Wi-Fi to desktops and older computers.', 'Device Type:Wireless USB|Standard:Wi-Fi 5 / Wi-Fi 6 (model dependent)|Bands:Dual band|Interface:USB', 'Quick Wi-Fi upgrade|Compact|Broad OS support'],
    ['PCIe Wi-Fi Card', 'Internal wireless card with strong antennas for desktops.', 'Device Type:PCIe Wi-Fi + Bluetooth|Standard:Wi-Fi 5 / Wi-Fi 6|Bands:Dual band|Antenna:External', 'Stronger signal than USB sticks|Bluetooth included on selected models|Stable connection'],
    ['LAN Cable Cat6 (Box)', 'Structured-cabling cable for office and building networks.', 'Category:Cat6|Length:305 m box (as available)|Type:UTP|Use:Structured cabling', 'Gigabit-ready|Consistent quality|Bulk supply'],
    ['Patch Cords', 'Ready-made patch cables for racks, desks and switches.', 'Category:Cat5e / Cat6|Length:0.5 m to 5 m|Connector:RJ45|Use:Racks and desks', 'Snagless boots|Multiple lengths|Colour options on request'],
    ['Network Rack & Accessories', 'Wall and floor racks, patch panels and cable managers.', 'Rack:Wall-mount / floor-standing|Size:6U to 42U (as available)|Includes:Options for fans, shelves, PDUs|Use:Server and network rooms', 'Tidy cabling|Ventilation options|Scalable'],
    ['Patch Panel & Keystone Jacks', 'Termination hardware for neat structured cabling.', 'Ports:24 / 48 port|Category:Cat6|Mount:19-inch rack|Use:Structured cabling', 'Clear port labelling|Tool-less jacks on selected models|Easy maintenance'],
    ['Powerline & Range Extenders', 'Extend network coverage where cabling is difficult.', 'Type:Powerline adapter / Wi-Fi extender|Speed:As per model|Setup:Plug and play|Use:Homes and small offices', 'No new cabling|Simple installation|Fills Wi-Fi dead spots'],
    ['Fibre Media Converter', 'Convert between copper and fibre links across buildings.', 'Type:Media converter|Speed:100 Mbps / 1 Gbps|Fibre:Single-mode / multi-mode (model dependent)|Use:Campus links', 'Longer link distances|Simple deployment|Pairs with SFP switches'],
  ],
  'routers-switches': [
    ['Wireless Router', 'Dependable Wi-Fi router for homes and small offices.', 'Device Type:Wireless router|Standard:Wi-Fi 5 / Wi-Fi 6|Ports:Gigabit LAN|Management:Web / app', 'Simple setup|Guest network on supported models|Good coverage'],
    ['Business VPN Router', 'Secure routing with VPN and firewall for offices.', 'Device Type:Business router|Features:VPN, firewall (model dependent)|WAN:Single or dual|Ports:Gigabit', 'Secure remote access|Load balancing on selected models|Rack options'],
    ['Dual-WAN Router', 'Combine two internet lines for failover and balance.', 'Device Type:Router|WAN:Dual|Features:Failover / load balance|Ports:Gigabit', 'Keeps you online|Better use of two ISPs|Central management'],
    ['Unmanaged Gigabit Switch', 'Plug-and-play port expansion for desks and rooms.', 'Device Type:Unmanaged switch|Ports:5 / 8 / 16 / 24|Speed:Gigabit|Management:None', 'No configuration|Fanless on small models|Reliable'],
    ['Managed Gigabit Switch', 'VLAN and traffic-management features for structured networks.', 'Device Type:Managed switch|Ports:8 / 24 / 48|Speed:Gigabit|Features:VLAN and monitoring (model dependent)', 'Network segmentation|Detailed control|Scalable'],
    ['PoE Switch', 'Power IP cameras and access points over Ethernet.', 'Device Type:PoE switch|Ports:4 to 48 (model dependent)|Power:PoE / PoE+ (budget as per model)|Speed:Fast or Gigabit', 'One cable for data and power|Neat camera installs|Overload protection on selected models'],
    ['Layer 3 Switch', 'Core switching with routing between VLANs.', 'Device Type:Layer 3 managed switch|Ports:24 / 48|Uplinks:SFP / SFP+ (model dependent)|Features:Inter-VLAN routing', 'Core of larger networks|High throughput|Future-ready uplinks'],
    ['Ceiling Wireless Access Point', 'Wi-Fi access point for offices, classrooms and lobbies.', 'Device Type:Access point|Standard:Wi-Fi 5 / Wi-Fi 6|Power:PoE|Mount:Ceiling / wall', 'Seamless coverage|Controller or standalone options|Clean installation'],
    ['Outdoor Access Point', 'Weatherproof wireless coverage for yards and campuses.', 'Device Type:Outdoor AP|Rating:Weather-resistant|Power:PoE|Use:Outdoor coverage', 'Long-range coverage|Rugged housing|Mounts to poles and walls'],
    ['SFP Modules & Uplinks', 'Fibre and copper uplink modules for switches.', 'Type:SFP / SFP+ modules|Speed:1G / 10G|Fibre:Single-mode / multi-mode|Compatibility:Check switch model', 'Flexible uplinks|Longer distances|Compatibility advice on request'],
  ],
  'ups-batteries': [
    ['Offline UPS (600 VA)', 'Entry-level backup for a single desktop and router.', 'UPS Type:Offline|Rating:Around 600 VA|Outlets:2 to 3|Use:Single computer', 'Affordable protection|Compact|Basic surge safeguarding'],
    ['Line-Interactive UPS (1 kVA)', 'Voltage regulation and backup for small offices.', 'UPS Type:Line-interactive|Rating:Around 1 kVA|Feature:AVR|Use:Small office desks', 'Handles voltage swings|Longer battery life|Reliable for PCs and routers'],
    ['Line-Interactive UPS (2 kVA)', 'Higher-capacity backup for multiple workstations.', 'UPS Type:Line-interactive|Rating:Around 2 kVA|Feature:AVR|Battery:External options on selected models', 'More equipment protected|Extended runtime options|Office-ready'],
    ['Online UPS (1 to 3 kVA)', 'Double-conversion UPS for servers and critical equipment.', 'UPS Type:Online double-conversion|Rating:1 to 3 kVA|Output:Pure sine wave|Use:Servers and network gear', 'Zero transfer time|Clean regulated power|Monitoring options'],
    ['Online UPS (Rack Mount)', 'Rack-mounted online UPS for server rooms.', 'UPS Type:Online|Form Factor:Rack / tower|Rating:Model dependent|Connectivity:USB / SNMP options', 'Fits standard racks|Remote monitoring on supported models|Hot-swappable batteries on selected models'],
    ['Three-Phase UPS', 'Heavy-duty backup for large IT loads and facilities.', 'UPS Type:Online three-phase|Rating:Higher kVA (as quoted)|Use:Data rooms and industrial|Battery:As per backup requirement', 'High capacity|Planned for runtime needs|Site survey available'],
    ['CCTV Power Backup UPS', 'Compact UPS to keep cameras and recorders running.', 'Output:12 V / 24 V DC options|Use:CCTV, DVR and routers|Battery:Sealed|Type:Mini / DC UPS', 'Keeps security running|Compact|Low maintenance'],
    ['SMF / VRLA Battery', 'Sealed maintenance-free batteries for UPS systems.', 'Battery Type:SMF / VRLA|Voltage:12 V|Capacity:Multiple Ah options|Compatibility:Confirm UPS model', 'Low maintenance|Wide range of capacities|Replacement advice'],
    ['Tubular Battery & Trolley', 'Long-backup batteries for inverter-UPS setups.', 'Battery Type:Tubular|Voltage:12 V|Capacity:Multiple Ah options|Accessories:Trolley options', 'Suited to long outages|Deep-cycle design|Recyclable on exchange'],
    ['Surge Protector & Power Strip', 'Protect equipment from spikes and extend outlets.', 'Type:Surge protector|Sockets:4 to 8|Protection:Surge / overload|Use:Desks and racks', 'Affordable protection|Indicator lights|Safe cable management'],
  ],
  'computer-accessories': [
    ['Wireless Keyboard & Mouse Combo', 'Cable-free everyday keyboard and mouse set.', 'Connection:2.4 GHz wireless|Type:Keyboard + Mouse|Power:Batteries|Compatibility:Windows / macOS', 'Tidy desk|Long battery life|Plug-and-play receiver'],
    ['Wired Keyboard', 'Reliable USB keyboard for offices and labs.', 'Connection:USB|Layout:Full size|Features:Spill resistance on selected models|Compatibility:Windows / Linux', 'Durable keys|No batteries|Bulk supply'],
    ['Ergonomic Mouse', 'Comfort-focused mouse for all-day use.', 'Connection:Wired / wireless|DPI:Adjustable (model dependent)|Design:Ergonomic|Compatibility:Windows / macOS', 'Reduces wrist strain|Precise tracking|Quiet clicks on selected models'],
    ['HD Webcam', 'Clear video for meetings and online classes.', 'Resolution:720p / 1080p|Microphone:Built-in|Connection:USB|Compatibility:Windows / macOS', 'Crisp video calls|Plug and play|Privacy shutter on selected models'],
    ['Headset with Microphone', 'Noise-reducing headset for calls and training.', 'Connection:USB / 3.5 mm|Microphone:Noise-cancelling|Type:Over-ear|Compatibility:PC / laptop', 'Clear voice pickup|Comfortable for long calls|Inline volume control'],
    ['USB-C Docking Station', 'One cable to connect monitors, network and peripherals.', 'Host Interface:USB-C|Video:HDMI / DisplayPort|Ports:USB-A, Ethernet, card reader (model dependent)|Power:Pass-through charging on selected models', 'Single-cable desk setup|Dual displays on selected models|Compatibility check available'],
    ['Adapters & Converters', 'HDMI, VGA, USB-C and display adapters.', 'Types:HDMI / VGA / DisplayPort / USB-C|Use:Connect displays and projectors|Compatibility:Confirm source and display|Build:Metal / braided options', 'Solves port mismatches|Compact|Wide range'],
    ['Office Monitor', 'Full HD monitor for desks and reception.', 'Size:19 to 27 inch|Resolution:Full HD|Inputs:HDMI / VGA (model dependent)|Panel:IPS on selected models', 'Comfortable viewing|VESA mount on selected models|Energy efficient'],
    ['Laptop Bag & Stand', 'Protective bags and ergonomic stands for laptops.', 'Type:Backpack / sleeve / stand|Size:Up to 15.6 or 17 inch|Material:Padded|Use:Travel and desk', 'Protects devices|Ergonomic height|Lightweight'],
    ['USB Hub & Cables', 'Extra ports plus quality USB, HDMI and power cables.', 'Type:USB hub / cable set|Ports:4 to 7 (model dependent)|Speed:USB 3.0|Use:Desk expansion', 'More ports|Stable connections|Durable cabling'],
  ],
  'storage-devices': [
    ['SATA SSD 2.5 inch', 'Fast, simple upgrade for older laptops and desktops.', 'Type:SATA SSD|Capacity:120 GB to 2 TB (model dependent)|Form Factor:2.5 inch|Interface:SATA III', 'Quick boot and loading|Low power|Easy swap-in upgrade'],
    ['NVMe M.2 SSD', 'High-speed storage for modern laptops and desktops.', 'Type:NVMe SSD|Capacity:256 GB to 2 TB (model dependent)|Form Factor:M.2 2280|Interface:PCIe', 'Very high speeds|Compact|Compatibility check available'],
    ['Internal Desktop Hard Drive', 'Large-capacity storage at a low cost per GB.', 'Type:HDD|Capacity:500 GB to 8 TB (model dependent)|Form Factor:3.5 inch|Interface:SATA', 'Best value for capacity|Reliable for archives|Wide availability'],
    ['Surveillance Hard Drive', 'Drives built for continuous 24/7 CCTV recording.', 'Type:Surveillance HDD|Capacity:1 TB to 8 TB (model dependent)|Duty:24/7 recording|Interface:SATA', 'Designed for always-on writes|Works with DVR / NVR|Reduced frame drops'],
    ['Laptop Hard Drive (2.5 inch)', 'Replacement HDDs for laptops and older systems.', 'Type:HDD|Capacity:500 GB / 1 TB|Form Factor:2.5 inch|Interface:SATA', 'Affordable capacity|Replacement-ready|Quiet operation'],
    ['Portable External Hard Drive', 'Pocket-sized backup storage for files and photos.', 'Type:External HDD|Capacity:1 TB to 5 TB (model dependent)|Interface:USB 3.0|Compatibility:Windows / macOS', 'Easy backup|Bus-powered|Slim body'],
    ['Portable SSD', 'Fast, shock-resistant external storage for work on the move.', 'Type:Portable SSD|Capacity:250 GB to 2 TB (model dependent)|Interface:USB 3.x / USB-C|Compatibility:Windows / macOS', 'Very fast transfers|Durable|Pocket-sized'],
    ['Pen Drive (USB Flash)', 'Quick file transfer and carry-everywhere storage.', 'Type:USB flash drive|Capacity:16 GB to 256 GB|Interface:USB 3.0 / USB-C options|Use:Transfers and backups', 'Compact|Plug and play|Bulk supply for institutions'],
    ['Memory Cards', 'microSD and SD cards for cameras, phones and dashcams.', 'Type:microSD / SD|Capacity:32 GB to 512 GB|Class:High-endurance options|Use:Cameras and devices', 'Reliable recording|High endurance on selected cards|Fits CCTV and dashcams'],
    ['NAS Storage', 'Network-attached storage for shared files and backups.', 'Type:NAS enclosure|Bays:2 / 4 / 8|Drives:Sold separately or bundled|Features:Shared folders, backup, remote access', 'Central file sharing|Scheduled backups|Expandable'],
  ],
  'security-equipment': [
    ['Fingerprint Attendance Device', 'Biometric terminal for attendance and basic access.', 'Authentication:Fingerprint|Connectivity:USB / LAN (model dependent)|Users:Model dependent|Use:Attendance', 'Prevents buddy punching|Easy reports|Standalone operation'],
    ['Face Recognition Terminal', 'Touchless identification for attendance and entry.', 'Authentication:Face recognition|Connectivity:LAN / Wi-Fi (model dependent)|Display:Touch / colour screen|Use:Attendance and access', 'Contactless|Fast verification|Suited to busy entrances'],
    ['RFID Card Access Controller', 'Card-based door access with entry logging.', 'Authentication:RFID card|Doors:1 / 2 (model dependent)|Interface:Relay to lock|Use:Offices and labs', 'Easy to issue and revoke cards|Entry records|Scalable'],
    ['Biometric Door Access System', 'Fingerprint and card access for secure doors.', 'Authentication:Fingerprint / card / PIN (model dependent)|Output:Relay / lock control|Connectivity:LAN options|Use:Restricted areas', 'Multi-method entry|Standalone or networked|Secure by design'],
    ['Smart Door Lock', 'Keyless locks for offices, rooms and homes.', 'Authentication:Fingerprint / PIN / card (model dependent)|Power:Batteries|Door:Wood / glass (model dependent)|Connectivity:Bluetooth / Wi-Fi on selected models', 'No keys to lose|Temporary codes on selected models|Neat installation'],
    ['Electromagnetic Lock', 'Fail-safe electromagnetic lock for access-controlled doors.', 'Type:EM lock|Holding Force:Model dependent|Power:12 V DC|Use:Controlled entries', 'Releases on power loss (fail-safe)|Durable|Pairs with controllers'],
    ['Video Door Phone', 'See and speak to visitors before opening the door.', 'Type:Video intercom|Screen:Colour monitor|Camera:Night vision|Use:Homes and offices', 'Safer entry screening|Door-release control|Clear audio'],
    ['Intruder Alarm System', 'Sensor-based alarm with siren and keypad.', 'Type:Alarm panel with sensors|Sensors:Motion, door, glass break (as required)|Alert:Siren / notification (model dependent)|Power:Backup battery', 'Immediate alerts|Zoned protection|Expandable'],
    ['Fire & Smoke Detection', 'Early-warning smoke and heat detection for premises.', 'Type:Smoke / heat detectors|Panel:Conventional / addressable (as required)|Alert:Sounders|Use:Offices and warehouses', 'Early warning|Planned to site layout|Compliance guidance'],
    ['Metal & Baggage Scanner', 'Screening devices for entrances and events.', 'Type:Door frame / hand-held metal detector|Use:Entry screening|Power:Mains / battery (model dependent)|Sensitivity:Adjustable', 'Visible deterrent|Quick screening|Portable options'],
  ],
}

export const CATALOGUE = Object.entries(LINES).flatMap(([categorySlug, rows]) =>
  rows.map(([name, short, specs, features], i) => ({
    slug: `${slugify(name)}`,
    name,
    short_description: short,
    description: `${specs.split('|').map((s) => s.replace(':', ': ')).join('\n')}`,
    features: features.split('|'),
    category_slug: categorySlug,
    category_name: PRODUCT_CATEGORY_CONTENT[categorySlug].name,
    image_url: P(CATEGORY_IMAGES[categorySlug][i % CATEGORY_IMAGES[categorySlug].length]),
    indicative: true,
    accent: i,
  }))
)

export const catalogueFor = (categorySlug) => CATALOGUE.filter((p) => p.category_slug === categorySlug)
export const findCatalogueItem = (slug) => CATALOGUE.find((p) => p.slug === slug)
