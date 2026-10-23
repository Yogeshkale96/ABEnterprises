/**
 * Per-service supplementary content: dropdown taglines, solutions by
 * requirement size, and service-specific strengths. Written to describe
 * the scope of work only — no certifications or guarantees are claimed.
 */
export const SERVICE_EXTRAS = {
  'website-development': {
    tagline: 'Business sites & landing pages',
    requirementsHeading: 'Websites for Every Stage of Business',
    requirements: [
      { icon: 'Store', title: 'Small businesses', text: 'A clean company-profile site with services, contact details and enquiry forms, ready for mobile visitors.' },
      { icon: 'Building2', title: 'Growing companies', text: 'Multi-page sites with product or service catalogues, blog sections and integrations such as maps, WhatsApp and CRM forms.' },
      { icon: 'ShoppingCart', title: 'Online selling', text: 'Catalogue and e-commerce style builds with product listings, enquiry or checkout flows, scoped to your needs.' },
    ],
    why: [
      { icon: 'Layers', title: 'Built around your content', text: 'Structure and layout follow your services and customers, not a generic template.' },
      { icon: 'Smartphone', title: 'Responsive by default', text: 'Pages are designed and tested for phones, tablets and desktops.' },
      { icon: 'Gauge', title: 'Performance-minded', text: 'Optimised images and lean pages so visitors are not kept waiting.' },
      { icon: 'LifeBuoy', title: 'Support after launch', text: 'Updates and maintenance can be arranged once the site is live.' },
    ],
  },
  'software-development': {
    tagline: 'Custom apps & automation',
    requirementsHeading: 'Software Matched to Your Workflow',
    requirements: [
      { icon: 'ClipboardList', title: 'Small teams', text: 'Replace spreadsheets and paper registers with a simple application for records, billing or inventory.' },
      { icon: 'Workflow', title: 'Departments & offices', text: 'Workflow tools with approvals, role-based access and reports for day-to-day operations.' },
      { icon: 'Network', title: 'Multi-system setups', text: 'Integrations between existing software, databases and websites so data is entered once.' },
    ],
    why: [
      { icon: 'MessagesSquare', title: 'Requirement-first approach', text: 'We document how your work actually runs before anything is built.' },
      { icon: 'Puzzle', title: 'Fits existing tools', text: 'Integrations are planned so new software works alongside what you already use.' },
      { icon: 'BarChart3', title: 'Useful reporting', text: 'Dashboards and exports designed around the questions you ask each week.' },
      { icon: 'Wrench', title: 'Maintainable code', text: 'Structured builds that can be extended as your process changes.' },
    ],
  },
  'digital-marketing': {
    tagline: 'Campaigns & online growth',
    requirementsHeading: 'Marketing Support by Business Size',
    requirements: [
      { icon: 'Store', title: 'Local businesses', text: 'Google Business profile, local campaigns and social presence to bring in nearby customers.' },
      { icon: 'Megaphone', title: 'Product & service brands', text: 'Campaign planning, ad creatives and landing pages tied to a clear enquiry goal.' },
      { icon: 'Landmark', title: 'Institutions', text: 'Admission and awareness campaigns with consistent messaging across channels.' },
    ],
    why: [
      { icon: 'Target', title: 'Goal-led planning', text: 'Every campaign starts with what you want visitors to do.' },
      { icon: 'PenLine', title: 'Content that fits you', text: 'Messaging written for your audience, not copied from a template.' },
      { icon: 'LineChart', title: 'Measured results', text: 'Analytics reviewed regularly so spend follows what works.' },
      { icon: 'Eye', title: 'Clear reporting', text: 'Plain-language updates on reach, clicks and enquiries.' },
    ],
  },
  'seo-social-media': {
    tagline: 'Search visibility & social',
    requirementsHeading: 'Visibility for Different Needs',
    requirements: [
      { icon: 'MapPin', title: 'Local search', text: 'Business profile optimisation and local keywords so nearby customers can find you.' },
      { icon: 'Search', title: 'Website SEO', text: 'On-page, technical and content improvements to rank for the services you offer.' },
      { icon: 'Share2', title: 'Social media', text: 'Planned posting calendars, creatives and community replies across your active platforms.' },
    ],
    why: [
      { icon: 'SearchCheck', title: 'Audit before action', text: 'We review your current site and profiles before recommending changes.' },
      { icon: 'FileText', title: 'Content strategy', text: 'Topics chosen from what your customers actually search for.' },
      { icon: 'Calendar', title: 'Consistent publishing', text: 'A realistic schedule that your brand can keep up month after month.' },
      { icon: 'LineChart', title: 'Trackable progress', text: 'Rankings, traffic and engagement tracked and shared.' },
    ],
  },
  'computer-laptop-services': {
    tagline: 'Repair, upgrade & setup',
    requirementsHeading: 'Support for Every Setup',
    requirements: [
      { icon: 'User', title: 'Individuals & homes', text: 'Laptop and desktop repair, OS reinstalls, upgrades and data-safe troubleshooting.' },
      { icon: 'Briefcase', title: 'Small offices', text: 'Workstation setup, printer connectivity, software installation and routine fault handling.' },
      { icon: 'Building', title: 'Larger fleets', text: 'Batch configuration, standard images and scheduled health checks across many machines.' },
    ],
    why: [
      { icon: 'Stethoscope', title: 'Diagnose first', text: 'The fault is identified and explained before any repair is agreed.' },
      { icon: 'Cpu', title: 'Hardware & software', text: 'One team for component-level issues and operating-system problems.' },
      { icon: 'Timer', title: 'Practical turnaround', text: 'Common faults are handled promptly, with updates on longer repairs.' },
      { icon: 'ShieldCheck', title: 'Care with your data', text: 'Data safety is considered before any reinstall or replacement.' },
    ],
  },
  'networking-solutions': {
    tagline: 'LAN, Wi-Fi & cabling',
    requirementsHeading: 'Networks Sized to Your Space',
    requirements: [
      { icon: 'Home', title: 'Small offices & shops', text: 'Reliable router and Wi-Fi setup with tidy cabling for a handful of devices.' },
      { icon: 'Building2', title: 'Multi-room offices', text: 'Structured cabling, managed switches and access-point placement for steady coverage.' },
      { icon: 'Server', title: 'Campuses & enterprises', text: 'Racks, segmented networks, backbone links and documentation for larger sites.' },
    ],
    why: [
      { icon: 'Ruler', title: 'Site-based planning', text: 'Layout and coverage planned from how your space is actually used.' },
      { icon: 'Cable', title: 'Neat installation', text: 'Labelled, organised cabling that is easy to maintain.' },
      { icon: 'Wifi', title: 'Tested coverage', text: 'Connectivity and speeds verified before handover.' },
      { icon: 'Headphones', title: 'Ongoing support', text: 'Monitoring and troubleshooting can continue after installation.' },
    ],
  },
  'cctv-installation': {
    tagline: 'Cameras & surveillance',
    requirementsHeading: 'Surveillance for Every Premises',
    requirements: [
      { icon: 'Home', title: 'Homes & small shops', text: 'A few well-placed cameras with a recorder and mobile viewing.' },
      { icon: 'Building2', title: 'Offices & showrooms', text: 'Indoor and outdoor coverage of entrances, counters and storage areas with retained footage.' },
      { icon: 'Factory', title: 'Large premises', text: 'Multi-camera IP systems with central recording, night vision and remote monitoring.' },
    ],
    why: [
      { icon: 'MapPinned', title: 'Coverage planned on-site', text: 'Camera positions chosen after viewing blind spots and lighting.' },
      { icon: 'Camera', title: 'Right equipment', text: 'Camera type and resolution matched to the area being watched.' },
      { icon: 'Smartphone', title: 'Remote viewing', text: 'Live and recorded footage available on your phone where supported.' },
      { icon: 'Wrench', title: 'Service afterwards', text: 'Fault checks and maintenance available beyond installation.' },
    ],
  },
  'access-control-systems': {
    tagline: 'Biometric & card entry',
    requirementsHeading: 'Entry Control by Use Case',
    requirements: [
      { icon: 'DoorOpen', title: 'Single doors', text: 'A biometric or card reader on a main door with simple user management.' },
      { icon: 'Users', title: 'Staff attendance', text: 'Fingerprint or face-based terminals that record entry times for payroll reports.' },
      { icon: 'Building2', title: 'Multi-zone sites', text: 'Different access levels per person and door, with logs for each entry point.' },
    ],
    why: [
      { icon: 'Fingerprint', title: 'Multiple credential types', text: 'Fingerprint, card, PIN and mobile options discussed to suit you.' },
      { icon: 'ListChecks', title: 'Clear access rules', text: 'Who can enter where is defined and easy to change.' },
      { icon: 'FileBarChart', title: 'Usable records', text: 'Entry logs and attendance reports you can actually export.' },
      { icon: 'Plug', title: 'Works with other systems', text: 'Can be combined with CCTV and alarms where equipment allows.' },
    ],
  },
  'amc-support': {
    tagline: 'Preventive maintenance plans',
    requirementsHeading: 'AMC Coverage by Scale',
    requirements: [
      { icon: 'Briefcase', title: 'Small offices', text: 'Scheduled visits and remote help for a small set of computers and a network.' },
      { icon: 'Building2', title: 'Multi-department offices', text: 'Coverage across computers, printers, networks and CCTV under one agreement.' },
      { icon: 'Landmark', title: 'Institutions', text: 'Lab and campus coverage with planned maintenance windows and defined response scope.' },
    ],
    why: [
      { icon: 'CalendarCheck', title: 'Planned visits', text: 'Preventive checks are scheduled instead of waiting for failures.' },
      { icon: 'ClipboardCheck', title: 'Defined scope', text: 'What is covered, and how, is written down before the contract starts.' },
      { icon: 'Layers', title: 'One point of contact', text: 'Several equipment types handled under a single arrangement.' },
      { icon: 'FileText', title: 'Service records', text: 'Visits and fixes are documented for your reference.' },
    ],
  },
  'institutional-it-supply': {
    tagline: 'Bulk IT & equipment supply',
    requirementsHeading: 'Supply Built for Large Orders',
    requirements: [
      { icon: 'GraduationCap', title: 'Schools & colleges', text: 'Computer lab setups, projectors and networked classrooms supplied and installed together.' },
      { icon: 'Landmark', title: 'Government & public bodies', text: 'Specification-based quotations for bulk laptops, desktops, printers and peripherals.' },
      { icon: 'Building2', title: 'Corporate offices', text: 'Phased deliveries and standardised configurations across departments or branches.' },
    ],
    why: [
      { icon: 'FileSpreadsheet', title: 'Specification-based quotes', text: 'Quotations built from your exact requirement list.' },
      { icon: 'Truck', title: 'Coordinated delivery', text: 'Supply, configuration and installation planned as one project.' },
      { icon: 'BadgeCheck', title: 'Genuine products', text: 'Equipment sourced from established brands and channels.' },
      { icon: 'HeartHandshake', title: 'After-sales support', text: 'Warranty coordination and support available after delivery.' },
    ],
  },
}

export const svcExtras = (slug) => SERVICE_EXTRAS[slug]
