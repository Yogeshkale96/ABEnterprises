/**
 * Services module content model.
 *
 * SERVICE_DIRECTORY powers the Services landing page directory, related-service
 * links and the services dropdown content. SERVICE_DETAILS carries the rich,
 * per-service page content consumed by ServiceDetailsPage. AMC_DATA powers the
 * dedicated /amc-support page.
 *
 * Where the backend API returns data for a slug, pages merge it over this local
 * content so the API stays the source of truth when reachable.
 *
 * Note: descriptions, plan labels and FAQ answers are proposal-level copy —
 * confirm commercial terms, capabilities and coverage before launch.
 */

const SVCIMG = (name) => `${import.meta.env.BASE_URL}images/services/${name}`

export const SVC_IMAGES = SVCIMG

/** QuoteRequestForm requirement options — used to preselect the inquiry form. */
export const REQ = {
  computers: 'Computers / Laptops',
  printers: 'Printers & Scanners',
  cctv: 'CCTV & Security',
  networking: 'Networking Solutions',
  web: 'Website / Software Development',
  marketing: 'Digital Marketing / SEO',
  amc: 'AMC & Technical Support',
  supply: 'Bulk / Institutional IT Supply',
}

export const quoteUrl = (requirement) => `/request-quote?service=${encodeURIComponent(requirement)}`

/**
 * Deterministic visual variant (0–2) per service slug — used to vary image
 * crop, overlay direction, glow placement and layout order so each service
 * page reads differently while staying on-brand.
 */
export const svcVariant = (slug = '') => {
  let h = 0
  for (const c of slug) h = (h + c.charCodeAt(0)) % 997
  return h % 3
}

/* ------------------------------------------------------------------ */
/* Service directory — shown on the main Services page                 */
/* ------------------------------------------------------------------ */

export const SERVICE_DIRECTORY = [
  {
    slug: 'website-development',
    to: '/services/website-development',
    icon: 'Globe',
    name: 'Website Development',
    blurb:
      'Professional, responsive websites built around your business identity, content and goals — from company profiles to campaign landing pages.',
    highlights: ['Business websites & landing pages', 'Responsive, user-friendly layouts', 'Website improvement & maintenance options'],
    image: SVCIMG('website-development.jpg'),
    imageAlt: 'Web developer building a responsive business website on a desktop setup',
  },
  {
    slug: 'software-development',
    to: '/services/software-development',
    icon: 'Code2',
    name: 'Software Development',
    blurb:
      'Custom applications designed around your workflows — record keeping, reporting, dashboards and internal tools that reduce manual work.',
    highlights: ['Business workflow applications', 'Custom software solutions', 'Data management & reporting apps'],
    image: SVCIMG('software-development.jpg'),
    imageAlt: 'Software developer working on application dashboards and workflow code',
  },
  {
    slug: 'digital-marketing',
    to: '/services/digital-marketing',
    icon: 'Megaphone',
    name: 'Digital Marketing',
    blurb:
      'Structured digital marketing activity planned around your audience and objectives — campaigns you can measure and improve.',
    highlights: ['Campaign planning & execution', 'Online brand visibility', 'Marketing performance measurement'],
    image: SVCIMG('digital-marketing.jpg'),
    imageAlt: 'Marketing professional reviewing campaign dashboards and performance data',
  },
  {
    slug: 'seo-social-media',
    to: '/services/seo-social-media',
    icon: 'Search',
    name: 'SEO & Social Media',
    blurb:
      'Search optimisation and consistent social media communication to strengthen how customers find and experience your business online.',
    highlights: ['On-page & technical SEO review', 'Social media content & management', 'Online presence improvement'],
    image: SVCIMG('seo-social-media.jpg'),
    imageAlt: 'Marketing specialist reviewing search analytics and social media dashboards',
  },
  {
    slug: 'computer-laptop-services',
    to: '/services/computer-laptop-services',
    icon: 'Laptop',
    name: 'Computer & Laptop Services',
    blurb:
      'Diagnostics, troubleshooting and maintenance for desktops and laptops — keeping everyday devices reliable for work and study.',
    highlights: ['Device troubleshooting & repair', 'Hardware & software support', 'Maintenance & performance help'],
    image: SVCIMG('computer-laptop-services.jpg'),
    imageAlt: 'Technician inspecting a laptop motherboard at a clean service workstation',
  },
  {
    slug: 'networking-solutions',
    to: '/services/networking-solutions',
    icon: 'Network',
    name: 'Networking Solutions',
    blurb:
      'Office connectivity planned around your space — LAN, Wi-Fi, routers, switches and the troubleshooting to keep it all running.',
    highlights: ['Network design & setup', 'Wired & wireless connectivity', 'Troubleshooting & support'],
    image: SVCIMG('networking-solutions.jpg'),
    imageAlt: 'Network cabling and switching equipment in a server rack',
  },
  {
    slug: 'cctv-installation',
    to: '/services/cctv-installation',
    icon: 'Video',
    name: 'CCTV Installation',
    blurb:
      'Video surveillance planned around your premises — camera placement, recording setup and monitoring configured to your requirements.',
    highlights: ['Camera placement planning', 'Installation & configuration', 'Recording & monitoring setup'],
    image: SVCIMG('cctv-installation.jpg'),
    imageAlt: 'Wall-mounted CCTV surveillance cameras on an exterior wall',
  },
  {
    slug: 'access-control-systems',
    to: '/services/access-control-systems',
    icon: 'KeyRound',
    name: 'Access Control Systems',
    blurb:
      'Controlled entry solutions for offices, institutions and restricted areas — cards, PINs and compatible biometric access.',
    highlights: ['Controlled entry solutions', 'Device installation & configuration', 'Access management support'],
    image: SVCIMG('access-control-systems.jpg'),
    imageAlt: 'Smart door lock controlled by a phone access app',
  },
  {
    slug: 'amc-support',
    to: '/amc-support',
    icon: 'ShieldCheck',
    name: 'AMC Support',
    blurb:
      'Annual maintenance arrangements that keep covered equipment checked, serviced and supported instead of waiting for breakdowns.',
    highlights: ['Annual maintenance options', 'Preventive maintenance & troubleshooting', 'Ongoing support as per plan'],
    image: SVCIMG('amc-support.jpg'),
    imageAlt: 'IT technician performing preventive maintenance on office equipment',
  },
  {
    slug: 'institutional-it-supply',
    to: '/services/institutional-it-supply',
    icon: 'PackageCheck',
    name: 'Institutional IT Supply',
    blurb:
      'Computers, laptops, peripherals and technology equipment sourced to your institution\u2019s specifications, quantities and budget.',
    highlights: ['Computers & laptops', 'Peripherals & accessories', 'Institutional equipment sourcing'],
    image: SVCIMG('institutional-it-supply.jpg'),
    imageAlt: 'Organised rows of laptops being configured for institutional deployment',
  },
]

/* ------------------------------------------------------------------ */
/* Main Services page supporting content                               */
/* ------------------------------------------------------------------ */

const INDIMG = (name) => `${import.meta.env.BASE_URL}images/industries/${name}`

export const CUSTOMER_TYPES = [
  {
    icon: 'Building2',
    name: 'Small & Medium Businesses',
    text: 'Websites, software, digital marketing and dependable IT support that scale with a growing business.',
    services: ['Website Development', 'Software Development', 'Digital Marketing', 'AMC Support'],
    image: INDIMG('industries.jpg'),
    imageAlt: 'Modern industrial and small business workspace',
  },
  {
    icon: 'Briefcase',
    name: 'Corporate Offices',
    text: 'Reliable workstations, secure networks and monitored premises that keep daily operations running.',
    services: ['Computer & Laptop Services', 'Networking Solutions', 'CCTV & Access Control', 'AMC Support'],
    image: INDIMG('ca-offices.jpg'),
    imageAlt: 'Corporate office floor with workstations and network infrastructure',
  },
  {
    icon: 'GraduationCap',
    name: 'Educational Institutions',
    text: 'Computer labs, campus networking and bulk equipment supply matched to institutional requirements.',
    services: ['Institutional IT Supply', 'Networking Solutions', 'Computer Support', 'AMC Support'],
    image: INDIMG('schools-colleges.jpg'),
    imageAlt: 'School computer lab with rows of workstations',
  },
  {
    icon: 'Store',
    name: 'Commercial Establishments',
    text: 'Billing-ready systems, surveillance and connectivity for shops, showrooms and service businesses.',
    services: ['CCTV Installation', 'Networking Solutions', 'Computer Services', 'Digital Presence'],
    image: INDIMG('shops-showrooms.jpg'),
    imageAlt: 'Retail showroom with billing counter and display systems',
  },
  {
    icon: 'Home',
    name: 'Homes & Individual Users',
    text: 'Laptop repairs, Wi-Fi setup and home security — practical technology help without the jargon.',
    services: ['Computer & Laptop Services', 'Networking Solutions', 'CCTV Installation'],
    image: INDIMG('residential.jpg'),
    imageAlt: 'Home workspace with laptop and smart devices',
  },
]

export const WORK_PROCESS = [
  { title: 'Understand Your Requirements', text: 'We discuss your goals, technical needs, budget and constraints before recommending anything.' },
  { title: 'Recommend the Right Solution', text: 'You get a clear proposal of the services, equipment and approach that fit your situation.' },
  { title: 'Plan & Implement', text: 'Our team carries out the agreed development, installation, supply or support work.' },
  { title: 'Test & Review', text: 'Completed work is checked against the agreed requirements before handover.' },
  { title: 'Ongoing Assistance', text: 'Follow-up support or maintenance continues under the service agreement you choose.' },
]

export const WHY_POINTS = [
  { icon: 'Layers', title: 'Multiple Service Categories', text: 'Software, hardware, networking, security and digital services from a single team — no juggling vendors.' },
  { icon: 'Compass', title: 'Business-Focused Recommendations', text: 'Solutions suggested around your actual requirement and budget, not around what is easiest to sell.' },
  { icon: 'Wrench', title: 'Practical IT Support', text: 'Hands-on technicians who troubleshoot real-world equipment, not just tickets and callbacks.' },
  { icon: 'PackageCheck', title: 'Technology Product Sourcing', text: 'Computers, peripherals and equipment procured to specification for offices and institutions.' },
  { icon: 'ShieldCheck', title: 'Security & Networking Capability', text: 'CCTV, access control and network infrastructure designed to work together.' },
  { icon: 'RefreshCw', title: 'Maintenance & AMC Options', text: 'Structured maintenance contracts that keep supported equipment checked and serviced.' },
  { icon: 'MessagesSquare', title: 'Customer-Oriented Communication', text: 'Clear explanations, written quotations and support you can actually reach.' },
]

export const MAIN_FAQS = [
  {
    q: 'What services does AB ENTERPRISES PRIVATE LIMITED provide?',
    a: 'We provide website and software development, digital marketing, SEO and social media support, computer and laptop services, networking, CCTV installation, access control systems, institutional IT supply and Annual Maintenance Contracts (AMC).',
  },
  {
    q: 'Can I request more than one service?',
    a: 'Yes. Many customers combine services — for example a website with SEO, or CCTV with networking and an AMC. Tell us what you need and we will propose a combined scope.',
  },
  {
    q: 'How can I request a service quotation?',
    a: 'Use the Request a Quote form or the Contact page. Describe your requirement and our team will get back to you with options and pricing.',
  },
  {
    q: 'Do you provide computer and networking support?',
    a: 'Yes — computer and laptop troubleshooting, upgrades and maintenance, plus LAN, Wi-Fi and network equipment support for offices and institutions.',
  },
  {
    q: 'Can businesses request institutional IT equipment?',
    a: 'Yes. Send us your requirement list with specifications and quantities and we will confirm availability and prepare a quotation.',
  },
  {
    q: 'What is an Annual Maintenance Contract (AMC)?',
    a: 'An AMC is an agreement covering maintenance and support for defined equipment over an agreed period. Coverage depends on the plan — see the AMC page for details.',
  },
  {
    q: 'How can I discuss a custom technology requirement?',
    a: 'Contact us with the details — even if it is not listed here. We will tell you honestly whether it is something we can deliver or help you scope it.',
  },
]

/* ------------------------------------------------------------------ */
/* Per-service detail content — keyed by route slug                    */
/* ------------------------------------------------------------------ */

export const SERVICE_DETAILS = {
  'website-development': {
    slug: 'website-development',
    name: 'Website Development',
    icon: 'Globe',
    eyebrow: 'Website Development',
    heading: 'Websites Built for',
    headingHighlight: 'Your Business Goals',
    description:
      'Create a professional digital presence with responsive website experiences designed around your business identity, content, audience and objectives.',
    image: SVCIMG('website-development.jpg'),
    imageAlt: 'Web developer building a responsive business website on a desktop setup',
    highlights: ['Responsive on every device', 'Structured around your content', 'Inquiry-ready contact forms'],
    requirement: REQ.web,
    primaryCta: { label: 'Discuss Your Website' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Why Your Business Needs a Professional Website',
    intro: [
      'Your website is often the first place a customer evaluates your business. A well-structured site builds credibility, presents your services clearly and makes it easy for people to reach you — on any device, at any hour.',
      'We build websites around your actual content and goals: what your customers need to see, what actions you want them to take, and how your business should be presented — not around a generic template.',
    ],
    offeringsHeading: 'Website Development Services',
    offerings: [
      { icon: 'Building', title: 'Business & Corporate Websites', items: ['Company profile and service pages', 'Structured content presentation', 'Team and about sections'] },
      { icon: 'MousePointerClick', title: 'Landing & Campaign Pages', items: ['Focused single-purpose pages', 'Campaign and offer pages', 'Lead capture layouts'] },
      { icon: 'LayoutGrid', title: 'Product & Service Showcases', items: ['Catalogue-style presentation', 'Category and detail layouts', 'Inquiry-linked listings'] },
      { icon: 'Smartphone', title: 'Responsive Design', items: ['Mobile-first layouts', 'Tablet and desktop adaptation', 'Touch-friendly navigation'] },
      { icon: 'Mail', title: 'Forms & Integrations', items: ['Contact and inquiry forms', 'Map and social links', 'Basic on-page SEO structure'] },
      { icon: 'RefreshCw', title: 'Redesign & Maintenance', items: ['Existing-site improvements', 'Content updates', 'Maintenance where agreed in scope'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'A professional online presence that supports credibility',
      'Clear presentation of your services and products',
      'Usable on mobiles, tablets and desktops',
      'Easier customer inquiries through structured forms',
      'A structure that can grow with your business',
    ],
    process: [
      { title: 'Requirement Discovery', text: 'We gather your goals, content, branding and feature requirements.' },
      { title: 'Sitemap & Content Planning', text: 'Pages and navigation are mapped before any design work starts.' },
      { title: 'UI/UX Design', text: 'Layouts are designed around your brand and your audience.' },
      { title: 'Development', text: 'Frontend and backend work proceeds according to the agreed scope.' },
      { title: 'Testing', text: 'Responsive behaviour, forms and content are checked across devices.' },
      { title: 'Deployment & Handover', text: 'The site goes live and is handed over as per the agreement.' },
    ],
    audiences: ['Small & Medium Businesses', 'Corporate Offices', 'Professionals & Portfolios', 'Commercial Establishments'],
    faqs: [
      { q: 'What information is required to start a website?', a: 'Your business profile, services, logo and branding assets, any existing content, and an idea of what you want visitors to do. We help you organise the rest.' },
      { q: 'Can the website work on mobile devices?', a: 'Yes. Every website we build is responsive — designed to work on phones, tablets and desktops from the start.' },
      { q: 'Can an existing website be redesigned?', a: 'Yes. We can review your current site and propose an improvement or a complete redesign depending on its condition.' },
      { q: 'Can inquiry forms be integrated?', a: 'Yes. Contact forms, inquiry forms and similar lead-capture features can be built into the site.' },
      { q: 'Can the website include a backend or admin panel?', a: 'Where content needs regular updates, an admin or content-management layer can be discussed as part of the scope.' },
      { q: 'What determines the project timeline and cost?', a: 'The number of pages, design complexity, content readiness and any custom features. We share a clear scope and quotation before starting.' },
      { q: 'Is ongoing maintenance available?', a: 'Yes — maintenance and update arrangements can be included in scope or covered under a support plan.' },
    ],
    related: ['software-development', 'seo-social-media', 'digital-marketing'],
    ctaHeading: 'Ready to Build Your Website?',
    ctaText: 'Tell us about your business and goals — we will recommend the right website approach.',
  },

  'software-development': {
    slug: 'software-development',
    name: 'Software Development',
    icon: 'Code2',
    eyebrow: 'Software Development',
    heading: 'Software Solutions Designed Around',
    headingHighlight: 'Your Workflow',
    description:
      'Explore software applications tailored to your business processes, information management, reporting requirements and operational challenges.',
    image: SVCIMG('software-development.jpg'),
    imageAlt: 'Software developer working on application dashboards and workflow code',
    highlights: ['Built around your process', 'Reporting & dashboards', 'Expandable over time'],
    requirement: REQ.web,
    primaryCta: { label: 'Discuss Your Software' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Understanding Business Software Needs',
    intro: [
      'Off-the-shelf software rarely matches how a business actually works. Custom software can organise repetitive work, centralise information, improve visibility across teams and support consistent processes — instead of spreadsheets and paperwork.',
      'We start from your workflow: what is slow, manual or error-prone today, and what a tool would need to do to fix it. Scope and feasibility are agreed before development begins.',
    ],
    offeringsHeading: 'Potential Software Solutions',
    offerings: [
      { icon: 'Workflow', title: 'Business Applications', items: ['Custom internal tools', 'Workflow & process automation', 'Task and record management'] },
      { icon: 'Database', title: 'Data Management', items: ['Data-entry systems', 'Record keeping & search', 'Import and export utilities'] },
      { icon: 'BarChart3', title: 'Reporting & Dashboards', items: ['Operational dashboards', 'Summary and detail reports', 'Exportable report formats'] },
      { icon: 'Package', title: 'Operations Software', items: ['Inventory applications', 'Order and billing tools', 'Branch or team management'] },
      { icon: 'PanelTop', title: 'Admin Panels & CMS', items: ['Content management', 'User and role management', 'Configuration interfaces'] },
      { icon: 'Plug', title: 'Integrations & Maintenance', items: ['API and data exchange', 'Existing-tool improvements', 'Maintenance as agreed'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Less manual and repetitive work',
      'Information centralised instead of scattered',
      'Better visibility through reports and dashboards',
      'A tool that matches how your team actually works',
      'Scope that can be expanded in later phases',
    ],
    process: [
      { title: 'Requirement Gathering', text: 'We document your workflows, users and what the software must accomplish.' },
      { title: 'Scope Definition', text: 'Features, integrations and exclusions are agreed in a written scope.' },
      { title: 'Architecture & Data Planning', text: 'The application structure and data model are designed.' },
      { title: 'Development', text: 'Interfaces and functionality are built in the agreed stack.' },
      { title: 'Integration & Testing', text: 'The system is tested against real usage scenarios.' },
      { title: 'Deployment & Handover', text: 'Go-live, documentation and support as per the agreement.' },
    ],
    audiences: ['Small & Medium Businesses', 'Corporate Offices', 'Educational Institutions', 'Commercial Establishments'],
    faqs: [
      { q: 'Can software be customised for our workflow?', a: 'Yes — that is the point of custom development. We document your workflow first, then design the application around it.' },
      { q: 'Can an admin dashboard be included?', a: 'Yes. Admin panels for managing users, records and configuration are a common part of the scope.' },
      { q: 'Can existing systems be integrated?', a: 'Where the existing system exposes an interface or data export, integration can usually be discussed — feasibility is confirmed during scoping.' },
      { q: 'How are requirements and scope defined?', a: 'Through requirement discussions that produce a written scope: features, screens, integrations and what is excluded.' },
      { q: 'Can the application be expanded later?', a: 'Yes. A well-scoped first phase can be extended in later phases as needs evolve.' },
      { q: 'How is software maintenance handled?', a: 'Maintenance and update arrangements are agreed separately — either per-change or under a support plan.' },
    ],
    related: ['website-development', 'institutional-it-supply', 'computer-laptop-services'],
    ctaHeading: 'Have a Workflow That Needs Software?',
    ctaText: 'Describe the process you want to improve — we will tell you what a practical solution looks like.',
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'Megaphone',
    eyebrow: 'Digital Marketing',
    heading: 'Reach the Right Audience With a',
    headingHighlight: 'Smarter Digital Strategy',
    description:
      'Build a structured digital marketing approach around your business objectives, audience, brand identity and measurable campaign activity.',
    image: SVCIMG('digital-marketing.jpg'),
    imageAlt: 'Marketing professional reviewing campaign dashboards and performance data',
    highlights: ['Audience-first planning', 'Measurable campaigns', 'Transparent reporting'],
    requirement: REQ.marketing,
    primaryCta: { label: 'Discuss Your Marketing' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Digital Marketing That Starts With Strategy',
    intro: [
      'Effective digital marketing is not random posting or boosting. It starts with understanding your customers, choosing the right channels and running campaigns whose performance can actually be measured.',
      'We plan marketing activity around your objectives — awareness, inquiries or leads — and keep the reporting honest about what is working and what is not.',
    ],
    offeringsHeading: 'Potential Marketing Services',
    offerings: [
      { icon: 'Target', title: 'Strategy & Planning', items: ['Audience research', 'Channel selection', 'Campaign calendar planning'] },
      { icon: 'Megaphone', title: 'Campaign Execution', items: ['Paid advertising management where offered', 'Brand awareness campaigns', 'Lead-generation campaigns'] },
      { icon: 'PenLine', title: 'Content Planning', items: ['Campaign creatives direction', 'Messaging and copy frameworks', 'Landing page content'] },
      { icon: 'FileChartColumn', title: 'Performance Reporting', items: ['Campaign metrics review', 'Conversion tracking setup', 'Optimization recommendations'] },
      { icon: 'Globe', title: 'Landing Page Improvement', items: ['Conversion-focused layouts', 'Form and CTA optimisation', 'Message alignment'] },
      { icon: 'TrendingUp', title: 'Analytics & Optimization', items: ['Performance monitoring', 'Budget allocation review', 'Iterative improvement'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Marketing tied to business objectives, not guesswork',
      'Reach the audience most likely to convert',
      'Clear visibility into what campaigns deliver',
      'Budgets directed by measured performance',
      'A consistent, professional online presence',
    ],
    process: [
      { title: 'Understand the Business', text: 'Your goals, customers, market and budget are discussed first.' },
      { title: 'Define the Audience', text: 'We identify who the campaigns should reach and where they are.' },
      { title: 'Select Channels', text: 'The right mix of search, social and content channels is chosen.' },
      { title: 'Plan Content & Assets', text: 'Campaign messaging, creatives and landing pages are prepared.' },
      { title: 'Launch Campaigns', text: 'Approved campaigns go live with tracking in place.' },
      { title: 'Measure & Adjust', text: 'Performance is reviewed and campaigns refined accordingly.' },
    ],
    audiences: ['Small & Medium Businesses', 'Commercial Establishments', 'Professionals & Portfolios', 'Educational Institutions'],
    faqs: [
      { q: 'Which businesses can benefit from digital marketing?', a: 'Any business whose customers are online — retail, services, institutions and B2B alike. The approach changes per business, not the need.' },
      { q: 'How are suitable channels selected?', a: 'Based on where your audience is, what you sell and what objective you have — awareness, inquiries or leads.' },
      { q: 'What affects campaign costs?', a: 'Channels chosen, audience competition, creative requirements and your advertising budget. Management fees and ad spend are always separated clearly.' },
      { q: 'Can campaign performance be measured?', a: 'Yes. Reach, clicks, visits, inquiries and conversions are tracked where the channels support it, and reported back to you.' },
      { q: 'How often are campaigns reviewed?', a: 'Campaigns are monitored continuously and reviewed at agreed intervals — typically monthly for reporting and adjustments.' },
      { q: 'Are advertising budgets separate from management fees?', a: 'Yes. Ad spend goes to the platform (Google, Meta, etc.); our management fee covers planning, execution and reporting. Both are shown separately in every quotation.' },
    ],
    related: ['seo-social-media', 'website-development', 'software-development'],
    ctaHeading: 'Want Marketing You Can Actually Measure?',
    ctaText: 'Tell us your business objective — we will propose a realistic digital marketing approach.',
  },
  'seo-social-media': {
    slug: 'seo-social-media',
    name: 'SEO & Social Media',
    icon: 'Search',
    eyebrow: 'SEO & Social Media',
    heading: 'Strengthen Your Search Visibility and',
    headingHighlight: 'Social Presence',
    description:
      'Improve the structure of your online presence through search optimisation, relevant content and consistent social media communication.',
    image: SVCIMG('seo-social-media.jpg'),
    imageAlt: 'Marketing specialist reviewing search analytics and social media dashboards',
    highlights: ['Search-friendly structure', 'Consistent social presence', 'Measured improvement'],
    requirement: REQ.marketing,
    primaryCta: { label: 'Improve My Online Presence' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Search Optimisation & Social Media, Done Properly',
    intro: [
      'Customers look for businesses on search engines and social platforms before they ever call. A structured online presence — well-optimised pages, consistent profiles and relevant content — decides whether they find you and what they think when they do.',
      'We focus on the fundamentals that actually matter: technical and on-page SEO, honest content, and social channels managed with a plan rather than sporadic posts.',
    ],
    offeringsHeading: 'SEO & Social Media Services',
    offerings: [
      { icon: 'FileSearch', title: 'SEO Review & On-Page Work', items: ['Website and page-level review', 'Titles, meta descriptions & headings', 'Internal linking improvements'] },
      { icon: 'Search', title: 'Keyword & Intent Research', items: ['Search terms your customers use', 'Content relevance mapping', 'Local search recommendations'] },
      { icon: 'Settings2', title: 'Technical SEO', items: ['Crawlability and index checks', 'Mobile usability review', 'Image alt text and optimisation'] },
      { icon: 'Share2', title: 'Social Media Management', items: ['Platform selection & profile setup', 'Content calendars', 'Publishing coordination'] },
      { icon: 'PenSquare', title: 'Content & Creatives', items: ['Brand-consistent post planning', 'Captions and hashtag planning', 'Creative direction'] },
      { icon: 'LineChart', title: 'Monitoring & Reporting', items: ['Performance tracking', 'Engagement monitoring', 'Monthly review of what worked'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Better chance of being found for relevant searches',
      'Consistent, professional social presence',
      'Content planned ahead instead of ad-hoc posting',
      'Clear reporting on what changed and why',
      'An online presence that compounds over time',
    ],
    process: [
      { title: 'Audit Existing Presence', text: 'We review your website, search visibility and social profiles as they stand.' },
      { title: 'Define Goals & Audiences', text: 'What success looks like and who you want to reach are agreed upfront.' },
      { title: 'Prepare the Plan', text: 'An optimisation and content plan is prepared and shared for approval.' },
      { title: 'Implement Changes', text: 'Approved SEO fixes and social content go live on schedule.' },
      { title: 'Monitor Performance', text: 'Rankings, traffic and engagement are tracked against the plan.' },
      { title: 'Review & Refine', text: 'The approach is adjusted based on measured results.' },
    ],
    audiences: ['Small & Medium Businesses', 'Commercial Establishments', 'Professionals & Portfolios', 'Corporate Offices'],
    faqs: [
      { q: 'How does SEO differ from paid advertising?', a: 'SEO improves how your site performs in unpaid (organic) search results over time. Paid ads buy placement immediately but stop when the budget does. They work best together.' },
      { q: 'Which social platforms are suitable for a business?', a: 'It depends on your audience — Instagram and Facebook suit most consumer businesses, LinkedIn suits B2B. We recommend rather than copy-paste.' },
      { q: 'How is SEO performance measured?', a: 'Through search impressions, clicks, position tracking for target queries, and the inquiries those visits produce — reported in plain language.' },
      { q: 'Can existing website pages be optimised?', a: 'Yes. Most SEO work starts with improving what already exists — titles, headings, content structure and technical issues.' },
      { q: 'Is social media content included in every package?', a: 'Content scope depends on the agreed plan. Some arrangements cover posting and creatives; others cover strategy and review only.' },
      { q: 'How long can SEO improvements take?', a: 'Typically months, not days — it depends on competition, site condition and content. We are honest about this: nobody can guarantee instant rankings.' },
    ],
    related: ['digital-marketing', 'website-development', 'software-development'],
    ctaHeading: 'Want to Be Found More Easily Online?',
    ctaText: 'Share your website and goals — we will review your presence and recommend a realistic plan.',
  },

  'computer-laptop-services': {
    slug: 'computer-laptop-services',
    name: 'Computer & Laptop Services',
    icon: 'Laptop',
    eyebrow: 'Computer & Laptop Services',
    heading: 'Reliable Support for',
    headingHighlight: 'Your Everyday Technology',
    description:
      'Get assistance with computer and laptop troubleshooting, hardware concerns, software issues, performance problems and maintenance requirements.',
    image: SVCIMG('computer-laptop-services.jpg'),
    imageAlt: 'Technician inspecting a laptop motherboard at a clean service workstation',
    highlights: ['Diagnostics first, then fix', 'Hardware & software help', 'Honest recommendations'],
    requirement: REQ.computers,
    primaryCta: { label: 'Get Device Support' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Computer & Laptop Support That Fixes the Actual Problem',
    intro: [
      'When a work computer slows down or fails, everything else slows down with it. Good support means accurate diagnosis first — not guesswork, unnecessary replacements or vague advice.',
      'We handle desktops and laptops for offices, institutions and individuals: from slow startups and software errors to upgrades, peripherals and preventive maintenance.',
    ],
    offeringsHeading: 'Service Categories',
    offerings: [
      { icon: 'Stethoscope', title: 'Diagnostics & Troubleshooting', items: ['Hardware issue diagnosis', 'Boot and crash investigation', 'Error and fault tracing'] },
      { icon: 'MemoryStick', title: 'Upgrades & Hardware', items: ['RAM and storage upgrades where compatible', 'Component replacement after approval', 'Peripheral and driver setup'] },
      { icon: 'AppWindow', title: 'Software & OS Support', items: ['Operating system troubleshooting', 'Software installation and configuration', 'Driver and update issues'] },
      { icon: 'Printer', title: 'Peripheral Connectivity', items: ['Printer and scanner setup', 'Accessory connectivity help', 'Shared device configuration'] },
      { icon: 'ShieldAlert', title: 'Security & Cleanup', items: ['Virus and malware troubleshooting', 'Unwanted software removal', 'Safer-use guidance'] },
      { icon: 'Activity', title: 'Preventive Maintenance', items: ['Health checks and cleanup', 'Backup guidance', 'Ongoing business computer support'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Devices that run faster and more reliably',
      'Repairs recommended only after diagnosis',
      'Clear approval before any chargeable work',
      'Guidance on backups and safe usage',
      'Ongoing support options for offices',
    ],
    process: [
      { title: 'Record the Issue', text: 'You describe the problem; we note symptoms and device details.' },
      { title: 'Diagnose the Device', text: 'The device is inspected to identify the actual cause.' },
      { title: 'Explain the Work', text: 'We explain what is needed and what it will cost.' },
      { title: 'Get Your Approval', text: 'Repairs or replacements proceed only after your approval.' },
      { title: 'Complete the Service', text: 'The agreed work is carried out carefully.' },
      { title: 'Test & Communicate', text: 'The device is tested and the outcome explained to you.' },
    ],
    audiences: ['Corporate Offices', 'Educational Institutions', 'Homes & Individual Users', 'Small & Medium Businesses'],
    faqs: [
      { q: 'Can both desktops and laptops be checked?', a: 'Yes — we service both. Bring the device in or ask about on-site support for office setups.' },
      { q: 'Can slow performance be investigated?', a: 'Yes. Slowdowns usually have identifiable causes — storage health, memory, startup load or malware — and most are fixable.' },
      { q: 'Are hardware upgrades possible?', a: 'Where the device supports them — RAM and storage upgrades are the most common. Compatibility is checked before recommending anything.' },
      { q: 'Can software issues be diagnosed?', a: 'Yes — operating system errors, software conflicts, driver problems and update failures are all covered.' },
      { q: 'Are replacement components included in service charges?', a: 'Parts are quoted separately and fitted only after your approval — no surprise additions.' },
      { q: 'Is on-site support available?', a: 'For offices and businesses, on-site visits can be arranged. Individual devices are usually faster at our service location.' },
      { q: 'Can businesses discuss ongoing computer maintenance?', a: 'Yes — an AMC arrangement covers scheduled maintenance and support for multiple devices. See the AMC page.' },
    ],
    related: ['networking-solutions', 'amc-support', 'institutional-it-supply'],
    ctaHeading: 'Device Giving You Trouble?',
    ctaText: 'Describe the symptoms — we will tell you honestly whether it is worth repairing and what it will take.',
  },

  'networking-solutions': {
    slug: 'networking-solutions',
    name: 'Networking Solutions',
    icon: 'Network',
    eyebrow: 'Networking Solutions',
    heading: 'Connected Workspaces Built for',
    headingHighlight: 'Reliable Communication',
    description:
      'Plan, configure and troubleshoot business connectivity solutions based on your environment, devices, coverage requirements and network needs.',
    image: SVCIMG('networking-solutions.jpg'),
    imageAlt: 'Network cabling and switching equipment in a server rack',
    highlights: ['Designed for your space', 'Wired & wireless', 'Documented handover'],
    requirement: REQ.networking,
    primaryCta: { label: 'Plan Your Network' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Networks Designed for How You Actually Work',
    intro: [
      'A network that drops, crawls or leaves dead zones costs more in lost productivity than it ever saves. Proper networking starts with the space — layout, walls, device count and coverage — not with whichever router was on sale.',
      'We design and implement wired and wireless networks for offices, institutions and commercial premises, and we troubleshoot the networks you already have.',
    ],
    offeringsHeading: 'Networking Services',
    offerings: [
      { icon: 'DraftingCompass', title: 'Planning & Design', items: ['Site and requirement assessment', 'Network layout planning', 'Coverage and capacity planning'] },
      { icon: 'Cable', title: 'LAN & Cabling', items: ['Structured cabling installation', 'Cable termination and testing', 'Rack and port organisation'] },
      { icon: 'Wifi', title: 'Wi-Fi Deployment', items: ['Access point placement', 'Coverage configuration', 'Interference and dead-zone resolution'] },
      { icon: 'Router', title: 'Routers & Switches', items: ['Router and switch configuration', 'Network segmentation where needed', 'Device and port management'] },
      { icon: 'Cctv', title: 'Security-Device Readiness', items: ['Network prepared for CCTV', 'Access control device connectivity', 'IP addressing and management'] },
      { icon: 'LifeBuoy', title: 'Troubleshooting & Support', items: ['Connectivity issue diagnosis', 'Network expansion', 'Maintenance as agreed'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Consistent connectivity across the workspace',
      'Fewer dead zones and dropped connections',
      'A network documented enough to maintain',
      'Ready foundation for CCTV and access systems',
      'Scalable design that grows with the office',
    ],
    process: [
      { title: 'Site & Requirement Assessment', text: 'We review the premises, device count and connectivity needs.' },
      { title: 'Network Design', text: 'Layout, equipment and cabling are planned for your environment.' },
      { title: 'Installation & Configuration', text: 'Cabling, switches, routers and access points are installed.' },
      { title: 'Coverage Testing', text: 'Connectivity, speed and coverage are verified on-site.' },
      { title: 'Documentation & Handover', text: 'Network layout and credentials are documented for you.' },
      { title: 'Ongoing Support', text: 'Maintenance and troubleshooting continue under the agreed arrangement.' },
    ],
    audiences: ['Corporate Offices', 'Educational Institutions', 'Commercial Establishments', 'Homes & Individual Users'],
    faqs: [
      { q: 'Can a network be designed for an office?', a: 'Yes — that is the core of this service. The design follows your floor plan, device count and usage, not a generic template.' },
      { q: 'Can Wi-Fi coverage issues be investigated?', a: 'Yes. Dead zones and weak areas usually trace to access point placement, interference or capacity — we diagnose and fix the cause.' },
      { q: 'Can existing routers and switches be reused?', a: 'Where they are adequate and healthy, yes. We assess existing equipment before recommending anything new.' },
      { q: 'Can a network be expanded later?', a: 'Yes. Networks designed properly scale — additional points, switches or coverage can be added without starting over.' },
      { q: 'Can CCTV systems use the same network infrastructure?', a: 'Often yes — IP cameras and recorders can share properly planned infrastructure. We account for this during design.' },
      { q: 'Is network maintenance available?', a: 'Yes, through per-visit support or under an AMC arrangement for ongoing maintenance.' },
    ],
    related: ['cctv-installation', 'access-control-systems', 'amc-support'],
    ctaHeading: 'Need Connectivity That Actually Reaches Everywhere?',
    ctaText: 'Tell us about your space and requirements — we will plan a network around them.',
  },

  'cctv-installation': {
    slug: 'cctv-installation',
    name: 'CCTV Installation',
    icon: 'Video',
    eyebrow: 'CCTV Installation',
    heading: 'Smarter Video Surveillance for',
    headingHighlight: 'Your Premises',
    description:
      'Explore video surveillance solutions planned around your property\u2019s layout, monitoring objectives, camera placement and recording requirements.',
    image: SVCIMG('cctv-installation.jpg'),
    imageAlt: 'Technician installing a CCTV dome camera on a ceiling',
    highlights: ['Planned camera placement', 'Recording & remote viewing', 'Professional installation'],
    requirement: REQ.cctv,
    primaryCta: { label: 'Plan Your Surveillance' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Surveillance That Covers What Actually Matters',
    intro: [
      'A camera pointed in the wrong direction is decoration, not security. Effective CCTV starts with the premises — entry points, blind spots, lighting and what you need to see — then works backwards to the right equipment.',
      'We plan, install and configure CCTV systems for offices, institutions, commercial premises and homes, including remote viewing and recording setup where the equipment supports it.',
    ],
    offeringsHeading: 'CCTV Services',
    offerings: [
      { icon: 'MapPinned', title: 'Site Assessment & Planning', items: ['Entry and coverage point review', 'Camera count and placement plan', 'Indoor and outdoor positioning'] },
      { icon: 'Video', title: 'Camera Installation', items: ['Dome, bullet and PTZ cameras', 'Analog and IP camera options', 'Clean cabling and mounting'] },
      { icon: 'HardDrive', title: 'Recording Setup', items: ['DVR / NVR configuration', 'Storage capacity planning', 'Playback and export setup'] },
      { icon: 'Smartphone', title: 'Remote Viewing', items: ['Mobile and desktop viewing', 'Where supported by equipment', 'Secure access configuration'] },
      { icon: 'PlugZap', title: 'Connectivity & Testing', items: ['Camera connectivity verification', 'Angle and image quality checks', 'Night-vision verification'] },
      { icon: 'Wrench', title: 'Maintenance & Support', items: ['Camera cleaning and checks', 'Recording verification', 'Troubleshooting and repairs'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Coverage planned around actual entry points and blind spots',
      'Recording that is actually retrievable when needed',
      'Remote viewing where the system supports it',
      'Equipment matched to lighting and environment',
      'A system explained properly at handover',
    ],
    process: [
      { title: 'Understand Requirements', text: 'What you need to monitor and why shapes the whole design.' },
      { title: 'Site Assessment', text: 'We review entry points, lighting, layout and network availability.' },
      { title: 'Plan Camera Locations', text: 'Placement, camera types and equipment are mapped.' },
      { title: 'Install & Configure', text: 'Cameras, recorder and viewing systems are set up.' },
      { title: 'Test Everything', text: 'Recording, playback, night mode and remote access are verified.' },
      { title: 'Customer Handover', text: 'We explain operation, playback and basic maintenance to you.' },
    ],
    audiences: ['Corporate Offices', 'Commercial Establishments', 'Educational Institutions', 'Homes & Individual Users'],
    faqs: [
      { q: 'How are suitable camera locations decided?', a: 'By assessing entry points, coverage goals, blind spots, lighting and mounting positions during the site visit.' },
      { q: 'What is the difference between DVR and NVR?', a: 'DVR works with analog cameras over coax; NVR works with IP cameras over the network. We recommend based on your requirements and any existing equipment.' },
      { q: 'Can cameras be viewed remotely?', a: 'Where the recorder and network support it, yes — on phone or computer. We configure secure access during installation.' },
      { q: 'What affects recording storage duration?', a: 'Camera count, resolution, recording mode (continuous vs motion) and hard disk capacity. We size storage to your retention needs.' },
      { q: 'Can an existing CCTV system be upgraded?', a: 'Often yes — cameras, recorder or storage can be upgraded while retaining usable cabling. We assess what can be kept.' },
      { q: 'Is maintenance available?', a: 'Yes — camera cleaning, recording checks and troubleshooting, per visit or under an AMC.' },
      { q: 'What determines installation cost?', a: 'Camera count and type, cabling distance, recording equipment and any special mounting or environment requirements.' },
    ],
    related: ['access-control-systems', 'networking-solutions', 'amc-support'],
    ctaHeading: 'Ready to Secure Your Premises?',
    ctaText: 'Tell us about your property and monitoring needs — we will plan the right camera coverage.',
  },

  'access-control-systems': {
    slug: 'access-control-systems',
    name: 'Access Control Systems',
    icon: 'KeyRound',
    eyebrow: 'Access Control Systems',
    heading: 'Structured Entry Management for',
    headingHighlight: 'Modern Workspaces',
    description:
      'Explore access control options designed to help manage entry to offices, commercial spaces, institutions and restricted areas.',
    image: SVCIMG('access-control-systems.jpg'),
    imageAlt: 'Employee using an access card reader at a modern office entrance',
    highlights: ['Cards, PIN & biometric options', 'Per-door permissions', 'Expandable systems'],
    requirement: REQ.cctv,
    primaryCta: { label: 'Discuss Access Control' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'Know Who Enters, and When',
    intro: [
      'Keys get copied and never returned. Access control replaces them with credentials you can issue, restrict and revoke — and, where the system supports it, a record of who entered and when.',
      'We install and configure card, PIN and compatible biometric entry systems for offices, institutions and commercial premises, matched to your doors and user requirements.',
    ],
    offeringsHeading: 'Access Control Solutions',
    offerings: [
      { icon: 'Nfc', title: 'Card & RFID Systems', items: ['Access card readers', 'Credential issue and revocation', 'Multi-door configurations'] },
      { icon: 'Hash', title: 'PIN-Based Entry', items: ['Keypad entry systems', 'Changeable access codes', 'Simple standalone doors'] },
      { icon: 'Fingerprint', title: 'Biometric Access', items: ['Compatible fingerprint readers', 'Biometric + card combinations', 'Where equipment supports it'] },
      { icon: 'DoorClosedLocked', title: 'Door & Lock Integration', items: ['Electronic lock hardware', 'Reader and controller placement', 'Exit device integration'] },
      { icon: 'Users', title: 'Permission Management', items: ['Per-user access levels', 'Time-based permissions where supported', 'Administrator training'] },
      { icon: 'Clock', title: 'Attendance & Records', items: ['Entry records where supported', 'Attendance integrations where compatible', 'Maintenance and troubleshooting'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Entry restricted to the people who should have it',
      'Credentials revoked instantly — no lock changes',
      'Entry records where the system supports them',
      'Different permissions for different doors and users',
      'A system that can add doors as you grow',
    ],
    process: [
      { title: 'Assess Entry Points', text: 'Doors, users and security requirements are reviewed on-site.' },
      { title: 'Choose Compatible Equipment', text: 'Reader types, locks and controllers matched to your doors.' },
      { title: 'Plan Placement', text: 'Reader, lock and controller positions are mapped.' },
      { title: 'Install & Configure', text: 'Hardware is installed and the system configured.' },
      { title: 'Test Permissions', text: 'Access levels and functions are verified per user type.' },
      { title: 'Admin Handover', text: 'We train your administrator on managing users and credentials.' },
    ],
    audiences: ['Corporate Offices', 'Educational Institutions', 'Commercial Establishments', 'Small & Medium Businesses'],
    faqs: [
      { q: 'What types of access control systems are available?', a: 'Card/RFID readers, PIN keypads and compatible biometric systems — from single-door standalone units to multi-door managed systems.' },
      { q: 'Can different access permissions be assigned?', a: 'Yes. Different users or groups can have different doors or time-based permissions, depending on the system selected.' },
      { q: 'Can the system work with existing doors?', a: 'Usually yes. Door material, frame type and existing hardware are assessed during the site visit to confirm compatibility.' },
      { q: 'Can supported attendance systems be integrated?', a: 'Where the chosen equipment supports attendance reporting or integration, yes — we confirm this during equipment selection.' },
      { q: 'What happens during a power or network interruption?', a: 'It depends on the configuration — fail-safe vs fail-secure locks and backup power options are discussed during planning.' },
      { q: 'Can additional doors or users be added?', a: 'Yes — most systems scale. Adding doors later is planned for during the initial design.' },
      { q: 'Is ongoing maintenance available?', a: 'Yes — reader checks, credential audits and troubleshooting, per visit or under an AMC.' },
    ],
    related: ['cctv-installation', 'networking-solutions', 'amc-support'],
    ctaHeading: 'Want Controlled Entry for Your Premises?',
    ctaText: 'Tell us about your doors and users — we will recommend the right access control approach.',
  },

  'institutional-it-supply': {
    slug: 'institutional-it-supply',
    name: 'Institutional IT Supply',
    icon: 'PackageCheck',
    eyebrow: 'Institutional IT Supply',
    heading: 'Technology Equipment for',
    headingHighlight: 'Institutions & Organizations',
    description:
      'Source IT equipment and supporting technology products based on your institution\u2019s requirements, quantities, compatibility needs and approved budget.',
    image: SVCIMG('institutional-it-supply.jpg'),
    imageAlt: 'Organised rows of laptops being configured for institutional deployment',
    highlights: ['Specification-matched sourcing', 'Quantity quotations', 'Coordinated delivery'],
    requirement: REQ.supply,
    primaryCta: { label: 'Request a Quotation' },
    secondaryCta: { label: 'Explore Our Services', to: '/services' },
    introHeading: 'IT Procurement That Matches Your Actual Requirements',
    intro: [
      'Institutional purchases fail when specifications, quantities or compatibility are assumed instead of confirmed. A computer lab, office fit-out or equipment refresh needs sourcing that starts from your requirement list — not from what happens to be in stock.',
      'We supply computers, laptops, peripherals, networking equipment and related technology products for offices, schools, institutions and organisations, with quotations organised around your specifications.',
    ],
    offeringsHeading: 'Supply Categories',
    offerings: [
      { icon: 'Monitor', title: 'Computers & Laptops', items: ['Desktop computers', 'Laptops and notebooks', 'Workstations where specified'] },
      { icon: 'Projector', title: 'Displays & Peripherals', items: ['Monitors and display equipment', 'Keyboards, mice and accessories', 'Webcams and audio devices'] },
      { icon: 'Printer', title: 'Printers & Imaging', items: ['Office printers', 'Scanners', 'Related accessories and consumables'] },
      { icon: 'Network', title: 'Networking Equipment', items: ['Routers and switches', 'Access points', 'Cabling and connectivity accessories'] },
      { icon: 'HardDrive', title: 'Storage & Accessories', items: ['External storage', 'UPS and power accessories', 'Cables and adapters'] },
      { icon: 'Video', title: 'Security Equipment', items: ['CCTV cameras and recorders', 'Access control devices', 'Compatible surveillance accessories'] },
    ],
    benefitsHeading: 'Key Benefits',
    benefits: [
      'Equipment matched to your specifications, not approximations',
      'Single point of contact across product categories',
      'Quotations organised for institutional purchasing',
      'Availability confirmed before you commit',
      'Delivery and setup coordinated as agreed',
    ],
    process: [
      { title: 'Receive Requirement List', text: 'You share specifications, quantities and any compliance needs.' },
      { title: 'Confirm Specifications', text: 'We verify compatibility, alternatives and exact configurations.' },
      { title: 'Prepare Quotation', text: 'A written quotation organised by item, quantity and specification.' },
      { title: 'Confirm Terms', text: 'Availability, pricing, delivery and payment terms are agreed.' },
      { title: 'Coordinate Supply', text: 'Equipment is sourced, checked and delivered as agreed.' },
      { title: 'Handover & Support', text: 'Setup assistance and after-supply support where included.' },
    ],
    audiences: ['Educational Institutions', 'Corporate Offices', 'Government & Public Bodies', 'Commercial Establishments'],
    faqs: [
      { q: 'Can institutions submit bulk IT requirements?', a: 'Yes — send us your requirement list with specifications and quantities and we will prepare a structured quotation.' },
      { q: 'Can equipment be quoted according to specifications?', a: 'Yes. Quotations are organised by item, specification and quantity — suitable for institutional review and approval processes.' },
      { q: 'Can multiple product categories be included?', a: 'Yes — computers, peripherals, networking, printers and security equipment can all be covered in a single requirement.' },
      { q: 'Is product availability confirmed before an order?', a: 'Yes. We confirm availability and expected timelines before finalising any order — nothing is assumed in stock.' },
      { q: 'Can compatible accessories be included?', a: 'Yes — matching accessories, cables and peripherals are included in the quotation where needed.' },
      { q: 'What determines delivery timelines?', a: 'Product availability, quantity, and sourcing requirements. Timelines are confirmed in the quotation rather than promised blindly.' },
      { q: 'How can an institution request a quotation?', a: 'Through the Request a Quote form or Contact page — include your requirement list or a summary of what you need.' },
    ],
    related: ['computer-laptop-services', 'networking-solutions', 'amc-support'],
    ctaHeading: 'Have an Equipment Requirement List?',
    ctaText: 'Share your specifications and quantities — we will confirm availability and prepare a quotation.',
  },
}

/* ------------------------------------------------------------------ */
/* AMC page content                                                    */
/* ------------------------------------------------------------------ */

export const AMC_DATA = {
  eyebrow: 'Annual Maintenance Contracts',
  heading: 'Proactive IT Maintenance for',
  headingHighlight: 'Greater Operational Continuity',
  description:
    'Explore ongoing technology maintenance and support arrangements designed around your equipment, operational needs and agreed service scope.',
  image: SVCIMG('amc-support.jpg'),
  imageAlt: 'IT technician performing preventive maintenance on office equipment',
  highlights: ['Scheduled preventive care', 'Agreed scope in writing', 'Priority support for AMC customers'],
  requirement: REQ.amc,
  primaryCta: { label: 'Request an AMC Consultation' },
  secondaryCta: { label: 'Explore Our Services', to: '/services' },

  definitions: [
    { title: 'One-Time Support', text: 'A single troubleshooting or repair visit for a specific issue. Good for occasional problems, with no ongoing coverage.', icon: 'Wrench' },
    { title: 'Preventive Maintenance', text: 'Scheduled check-ups that catch wear, dust, outdated software and early faults before they become breakdowns.', icon: 'ShieldCheck' },
    { title: 'Corrective Maintenance', text: 'Repairs carried out when something does fail — diagnosis, parts and fixes under the agreed scope.', icon: 'Hammer' },
    { title: 'Ongoing AMC Support', text: 'A defined period of maintenance and support for specified equipment — the coverage, visit frequency and terms written into the agreement.', icon: 'RefreshCw' },
  ],

  coverage: [
    { icon: 'Laptop', title: 'Computer & Laptop Maintenance', text: 'Health checks, cleaning, software troubleshooting and performance upkeep for covered devices.' },
    { icon: 'Cpu', title: 'Basic IT Hardware Troubleshooting', text: 'Diagnosis and support for covered hardware issues within the agreed scope.' },
    { icon: 'Network', title: 'Network Equipment Support', text: 'Checks and troubleshooting for covered routers, switches and connectivity equipment.' },
    { icon: 'HeartPulse', title: 'System Health Checks', text: 'Periodic review of device condition, storage health and software status.' },
    { icon: 'CalendarCheck', title: 'Preventive Visits', text: 'Scheduled maintenance visits, where included in the selected agreement.' },
    { icon: 'AppWindow', title: 'Software Troubleshooting', text: 'Operating system and application issues within the agreed scope.' },
    { icon: 'Video', title: 'CCTV & Access Control Maintenance', text: 'Maintenance for covered security systems, where specified in the agreement.' },
    { icon: 'PhoneCall', title: 'Technical Assistance', text: 'Support access for covered equipment through the agreed channels.' },
  ],

  plans: [
    {
      name: 'Essential Support',
      tagline: 'Scheduled upkeep for smaller setups',
      fields: [
        { label: 'Suitable for', value: 'Small offices & individual device sets' },
        { label: 'Maintenance scope', value: 'Preventive checks & basic troubleshooting' },
        { label: 'Visit frequency', value: 'Defined in agreement' },
        { label: 'Support channel', value: 'Phone & on-site, per terms' },
        { label: 'Coverage period', value: 'Annual, per agreement' },
        { label: 'Exclusions', value: 'Parts & components quoted separately' },
      ],
    },
    {
      name: 'Business Support',
      tagline: 'Balanced coverage for working offices',
      featured: true,
      fields: [
        { label: 'Suitable for', value: 'Offices with multiple systems' },
        { label: 'Maintenance scope', value: 'Preventive + corrective, per scope' },
        { label: 'Visit frequency', value: 'Scheduled + on-call, per terms' },
        { label: 'Support channel', value: 'Priority phone, remote & on-site' },
        { label: 'Coverage period', value: 'Annual, per agreement' },
        { label: 'Exclusions', value: 'Parts & out-of-scope work separate' },
      ],
    },
    {
      name: 'Comprehensive Support',
      tagline: 'Broader coverage for larger environments',
      fields: [
        { label: 'Suitable for', value: 'Institutions & multi-equipment sites' },
        { label: 'Maintenance scope', value: 'Broadest scope, incl. security systems' },
        { label: 'Visit frequency', value: 'Scheduled + priority on-call' },
        { label: 'Support channel', value: 'Priority support channel' },
        { label: 'Coverage period', value: 'Annual, per agreement' },
        { label: 'Exclusions', value: 'Per agreed terms & conditions' },
      ],
    },
  ],
  plansNote:
    'Plan names are indicative. Final coverage, visit frequency and pricing are confirmed after an equipment assessment — Request a Quote to start.',

  enrollment: [
    { title: 'Discuss Requirements', text: 'Share the equipment and support needs you want covered.' },
    { title: 'Environment Assessment', text: 'We review the current condition and inventory of your equipment.' },
    { title: 'Define Coverage', text: 'The proposed scope — what is covered, how often, through which channels.' },
    { title: 'Review Terms', text: 'Scope, exclusions and commercial terms in writing for your review.' },
    { title: 'Confirm Agreement', text: 'The AMC starts once terms are agreed and confirmed.' },
    { title: 'Deliver & Support', text: 'Scheduled maintenance and support delivered as agreed.' },
  ],

  faqs: [
    { q: 'What does an AMC cover?', a: 'It depends on the agreement — typically preventive maintenance and troubleshooting for specified equipment. Coverage, frequency and exclusions are written into your contract.' },
    { q: 'How is AMC different from one-time repair?', a: 'One-time repair fixes a single issue once. An AMC provides scheduled preventive care plus defined support over the contract period — usually more economical for multiple devices.' },
    { q: 'Can multiple types of equipment be included?', a: 'Yes — computers, printers, networking equipment and security systems can be combined in one agreement, subject to scope.' },
    { q: 'Are replacement parts included?', a: 'Parts and components are generally quoted separately unless the agreement explicitly includes them. This is confirmed before you sign.' },
    { q: 'How is the maintenance schedule determined?', a: 'Based on equipment count, usage environment and the plan selected — agreed with you during the assessment.' },
    { q: 'Can an existing setup be assessed for AMC?', a: 'Yes. We start with a free assessment of your current equipment and environment before proposing coverage.' },
    { q: 'How can I request an AMC quotation?', a: 'Use the Request a Quote form with AMC selected, or contact us directly. An assessment precedes any pricing.' },
  ],

  related: ['computer-laptop-services', 'networking-solutions', 'cctv-installation'],
  ctaHeading: 'Plan Your IT Maintenance With Confidence',
  ctaText: 'Tell us about your equipment — we will assess it and propose the right coverage.',
}
