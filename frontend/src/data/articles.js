/**
 * Latest News & IT Tips — article library.
 *
 * Every entry is general educational content (guides, checklists and best
 * practices) written for Indian small and medium businesses. No invented news
 * events, statistics or announcements: articles are clearly labelled as tips
 * and buying guidance.
 *
 * When an articles API becomes available, map API records onto this shape and
 * pass them into <BlogSection articles={…}> — the card and detail components
 * already accept this structure.
 */

const IMG = (path) => `${import.meta.env.BASE_URL}images/${path}`

const AUTHOR = 'AB Enterprises Editorial Team'

export const ARTICLES = [
  {
    slug: 'choose-right-laptop-business',
    title: 'How to Choose the Right Laptop for Your Business',
    category: 'Buying Guide',
    excerpt:
      'Key specs, warranty tips and budgets to consider before buying laptops for your team.',
    published_at: '2026-09-12',
    author: AUTHOR,
    read_minutes: 6,
    accent: 'blue',
    image_url: IMG('articles/laptop-guide.jpg'),
    image_alt: 'Business laptop on a desk in an office',
    meta_description:
      'A practical guide to choosing business laptops: processor, RAM, storage, warranty and budget decisions explained for Indian offices.',
    intro:
      'Buying laptops for a business is different from buying one for home. You are not just choosing a machine — you are choosing how smoothly your team works for the next three to five years, how much downtime you tolerate, and how often you pay for repairs. This guide walks through the decisions that actually matter.',
    sections: [
      {
        heading: 'Start With the Work, Not the Model Name',
        paragraphs: [
          'The biggest buying mistake is picking a laptop by brand or by the latest launch. Start instead with what each user does all day. An accounts person running Tally and Excel needs a very different machine from a designer running CAD or a salesperson who lives in video calls.',
          'Group your users into three simple profiles before you look at a single listing: basic office work (documents, billing, browser), heavy multitasking (large spreadsheets, many tabs, light design tools), and specialist work (CAD, video editing, development).',
        ],
        bullets: [
          'Basic office work: Core i3 / Ryzen 3 class, 8 GB RAM, SSD',
          'Heavy multitasking: Core i5 / Ryzen 5 class, 16 GB RAM, 512 GB SSD',
          'Specialist work: Core i7 / Ryzen 7 or mobile workstation with dedicated GPU',
        ],
      },
      {
        heading: 'Specs That Actually Change Daily Work',
        paragraphs: [
          'RAM and storage matter more than processor generation for most office use. A laptop with 8 GB of RAM and an SSD will feel faster than a newer processor paired with a slow hard drive. For business machines, treat an SSD as non-negotiable — it is the single upgrade with the biggest effect on boot time and responsiveness.',
          'Display and keyboard are easy to underestimate. A 14-inch Full HD screen is the sweet spot for staff who carry the laptop often; 15.6-inch suits desk-heavy roles. If the laptop stays on a desk most of the time, a larger screen reduces eye strain more than any spec bump.',
        ],
        bullets: [
          'SSD first: even 256 GB SSD beats a 1 TB hard drive for daily feel',
          'Full HD (1080p) minimum for anything used more than a few hours a day',
          'Check ports: HDMI for projectors, enough USB for dongle-free work',
        ],
      },
      {
        heading: 'Business Series vs Consumer Series',
        paragraphs: [
          'Manufacturers sell similar-looking laptops in consumer and business lines. Business series (such as commercial ranges from major brands) cost a little more but buy you better hinges, spill-resistant keyboards, longer spare-part availability and warranty options designed for working hours.',
          'For a business, the warranty terms matter as much as the laptop. On-site warranty, next-business-day support and accidental-damage cover can save days of downtime compared with sending a consumer model to a service centre.',
        ],
        image: 'products/laptops-6.jpg',
        image_alt: 'Row of business laptops',
        image_caption: 'Business-series laptops are built and warranted for daily office use.',
      },
      {
        heading: 'Buying in Bulk and Budgeting',
        paragraphs: [
          'When equipping a team, standardise on one or two configurations. Identical machines are cheaper to maintain, easier to image and faster to support than a mixed fleet of whatever was on sale.',
          'Leave room in the budget for the things around the laptop: a bag, a mouse, an extended warranty and — for critical staff — a spare charger. These small extras prevent most day-one complaints.',
        ],
      },
    ],
    takeaways: [
      'Match the laptop to a usage profile, not to a brand or launch hype',
      '8–16 GB RAM and an SSD are the baseline for business use',
      'Business series and on-site warranty reduce downtime more than a faster CPU',
      'Standardise configurations when buying for a team',
    ],
    recommendations: [
      'List your users in three profiles (basic, multitasking, specialist) before requesting quotes',
      'Insist on SSD storage and Full HD displays as minimums',
      'Ask for on-site warranty and accidental-damage options in the quotation',
      'Standardise on one or two SKUs for easier imaging and support',
    ],
  },
  {
    slug: 'cctv-benefits-businesses',
    title: '5 Benefits of CCTV Surveillance for Businesses',
    category: 'Security',
    excerpt:
      'Why CCTV is one of the most cost-effective security investments for any premises.',
    published_at: '2026-09-28',
    author: AUTHOR,
    read_minutes: 5,
    accent: 'cyan',
    image_url: IMG('articles/cctv-benefits.jpg'),
    image_alt: 'CCTV camera mounted on a building wall',
    meta_description:
      'Five practical reasons CCTV surveillance pays for itself in shops, offices and warehouses — deterrence, evidence, remote monitoring and more.',
    intro:
      'A CCTV system is one of the few business purchases that works twenty-four hours a day without a salary. Beyond recording incidents, a well-planned camera setup changes behaviour, settles disputes and lets owners keep an eye on premises from anywhere. Here are the five benefits we see matter most to businesses.',
    sections: [
      {
        heading: '1. Visible Deterrence',
        paragraphs: [
          'The cheapest incident is the one that never happens. Visible cameras at entrances, cash counters and stock areas discourage theft, shoplifting and after-hours trespassing before they start. Staff, visitors and delivery people all behave differently when they know an area is covered.',
        ],
      },
      {
        heading: '2. Reliable Evidence When Something Goes Wrong',
        paragraphs: [
          'When a dispute arises — a missing parcel, a damaged vehicle in the parking area, a disagreement at a counter — recorded footage settles it quickly and fairly. For insurance claims and police complaints, clear video is often the difference between a resolved case and a write-off.',
          'Footage quality matters here: cameras chosen and positioned properly capture faces and number plates, not just shapes. Resolution, lens angle and lighting all affect whether an image is actually usable.',
        ],
        bullets: [
          'Cover entrances, cash counters and stock movement paths first',
          'Ensure entrance cameras face people at face height',
          'Keep at least 15–30 days of recordings with adequate storage',
        ],
      },
      {
        heading: '3. Remote Monitoring From Anywhere',
        paragraphs: [
          'Modern DVRs and NVRs let owners and managers view live and recorded footage on a phone or laptop. For owners running multiple counters or branches, that means checking a shop after closing hours or watching a delivery arrive without physically being there.',
        ],
        image: 'products/cctv-n2.jpg',
        image_alt: 'Wall-mounted CCTV camera',
        image_caption: 'A properly positioned camera covers entrances and high-value areas.',
      },
      {
        heading: '4. Staff Safety and Accountability',
        paragraphs: [
          'Cameras protect honest employees as much as they protect the business. They document cash handling at counters, record who entered a storeroom, and provide footage if a staff member faces a false accusation. In clinics, schools and offices, they also help keep common areas safe.',
        ],
      },
      {
        heading: '5. Lower Security Costs Over Time',
        paragraphs: [
          'Cameras do not replace every guard, but they stretch each rupee spent on security. One system covers multiple areas continuously, works through power cuts when paired with a UPS, and pays for itself the first time it prevents or resolves a single significant loss.',
        ],
      },
    ],
    takeaways: [
      'Visible cameras deter theft and misbehaviour before incidents happen',
      'Good footage resolves disputes, claims and complaints quickly',
      'Remote viewing lets owners monitor premises from anywhere',
      'CCTV reduces the effective cost of security over time',
    ],
    recommendations: [
      'Walk the premises and list the points that must be covered before choosing cameras',
      'Prefer weather-resistant (IP66+) cameras for gates and exteriors',
      'Size storage so recordings are retained for at least a few weeks',
      'Pair the DVR/NVR with a small UPS so recording continues through power cuts',
    ],
  },
  {
    slug: 'reliable-business-network',
    title: 'Building a Reliable Business Network',
    category: 'Networking',
    excerpt:
      'Router, switch and cabling best practices for a stable office network.',
    published_at: '2026-10-05',
    author: AUTHOR,
    read_minutes: 7,
    accent: 'gold',
    image_url: IMG('articles/business-network-hero.jpg'),
    image_alt: 'Network switch with organised Ethernet patch cables',
    meta_description:
      'How to plan a reliable small-office network: cabling, switches, Wi-Fi placement and segmentation explained without jargon.',
    intro:
      'Almost every office complaint — slow billing, dropped video calls, printers that vanish — traces back to the network. A reliable network is not about expensive equipment; it is about getting a handful of basics right from day one. This guide covers the decisions that separate a stable office network from a daily headache.',
    sections: [
      {
        heading: 'Cabling: The Foundation You Cannot Upgrade Easily',
        paragraphs: [
          'Cables inside walls are the hardest part of a network to change, so they deserve the most care. Use Cat6 for new cabling runs — it comfortably supports gigabit speeds and costs little more than Cat5e. Label both ends of every cable; the ten minutes spent labelling save hours later.',
          'Terminate cables properly into patch panels and keystones rather than crimping plugs directly onto long runs. A loose crimp is the most common cause of a port that “works sometimes”.',
        ],
        image: 'products/networking-2.jpg',
        image_alt: 'Patch panel with labelled network cables',
        image_caption: 'Patch panels and labelling keep structured cabling maintainable.',
      },
      {
        heading: 'Choose the Right Switches',
        paragraphs: [
          'For most offices, an unmanaged gigabit switch handles desk connections perfectly. Move to a managed switch when you need VLANs (separating guest Wi-Fi from office systems), traffic monitoring, or when you simply want to see which port is misbehaving.',
          'If you run IP cameras or access points, a PoE switch sends power and data over one cable — no electrician needed at each camera point.',
        ],
        bullets: [
          'Unmanaged gigabit: simple desk and printer connections',
          'Managed gigabit: VLANs, monitoring and troubleshooting',
          'PoE switch: powers cameras, access points and phones over Ethernet',
        ],
      },
      {
        heading: 'Wi-Fi: Coverage Beats Raw Speed',
        paragraphs: [
          'One router in the corner of an office will not cover it evenly, whatever its antenna count promises. Multiple ceiling access points wired back to the switch give far better results than one powerful router pushing through walls.',
          'Place access points where people actually work, keep them away from metal cabinets and heavy machinery, and use a controller or a simple app to see which users are on which access point.',
        ],
        image: 'products/networking-n1.jpg',
        image_alt: 'Business network switch with connected ports',
        image_caption: 'Wired access points back to a central switch give consistent coverage.',
      },
      {
        heading: 'Keep Business and Guest Traffic Separate',
        paragraphs: [
          'Visitor phones and customer devices should never share the same network as billing machines and file shares. A separate guest SSID with client isolation is a one-time configuration that removes a whole category of risk and slowdown.',
        ],
      },
    ],
    takeaways: [
      'Cat6 cabling and labelling are cheap insurance for years of stability',
      'Managed switches earn their cost the first time you need to troubleshoot',
      'Several wired access points beat one powerful router for coverage',
      'Guest Wi-Fi should be isolated from business systems',
    ],
    recommendations: [
      'Draw a simple floor map of cable runs and access point locations before installing',
      'Use a patch panel and label every cable at both ends',
      'Choose PoE for camera and access point points',
      'Set up a separate guest SSID with client isolation',
      'Add a small UPS to the router and switch so Wi-Fi survives power blips',
    ],
  },
  {
    slug: 'cybersecurity-habits-small-business',
    title: 'Cybersecurity Habits Every Small Business Needs',
    category: 'Cybersecurity',
    excerpt:
      'Simple, low-cost security practices that protect your data, accounts and devices.',
    published_at: '2026-10-08',
    author: AUTHOR,
    read_minutes: 6,
    accent: 'blue',
    image_url: IMG('articles/cybersecurity.jpg'),
    image_alt: 'Server racks in a datacenter room',
    meta_description:
      'Practical cybersecurity habits for small businesses: passwords, updates, backups and email awareness — no jargon, no expensive tools required.',
    intro:
      'Most attacks on small businesses do not involve sophisticated hacking — they exploit unlocked doors: reused passwords, unpatched software, and staff who open a convincing fake invoice. The good news is that closing those doors costs far less than dealing with a breach. These habits cover the ground that matters.',
    sections: [
      {
        heading: 'Passwords and Accounts',
        paragraphs: [
          'Reused passwords are the single most common way small businesses lose accounts. When one service leaks a password, attackers try it everywhere. Every important account — email, banking, accounting software, social media — needs its own unique password.',
          'A shared team password written on a sticky note near the computer is a risk twice over. Use a password manager for shared credentials instead, and change passwords when staff leave.',
        ],
        bullets: [
          'Unique password for every important account',
          'A password manager for shared or team credentials',
          'Turn on two-factor authentication for email and banking first',
        ],
        image: 'products/security-6.jpg',
        image_alt: 'Padlock representing account security',
        image_caption: 'Unique passwords and two-factor authentication close the easiest entry points.',
      },
      {
        heading: 'Updates Are Security, Not Just Features',
        paragraphs: [
          'Windows updates, browser updates and firmware updates fix holes that attackers actively use. Postponing them for months is like leaving a known broken lock unrepaired. Schedule updates for end-of-day and let them run.',
        ],
      },
      {
        heading: 'Email and Phishing Awareness',
        paragraphs: [
          'Phishing — fake emails asking for passwords, payments or “urgent” action — is how most breaches begin. Train the team to slow down on anything unexpected: check the sender’s actual address, do not open unexpected attachments, and verify payment requests by phone.',
          'A simple rule prevents most payment fraud: any request to change bank details or make an urgent transfer gets confirmed by calling the person on a known number.',
        ],
      },
      {
        heading: 'Backups as a Security Control',
        paragraphs: [
          'Ransomware that locks your files is only frightening if the locked copy is your only copy. A clean, recent backup turns a potential catastrophe into an inconvenience. Keep at least one backup that is not permanently connected to the computer — ransomware encrypts connected drives too.',
        ],
      },
    ],
    takeaways: [
      'Unique passwords plus two-factor authentication stop most account takeovers',
      'Regular updates close known holes attackers actively exploit',
      'A phone-call verification habit defeats most payment fraud',
      'Offline or disconnected backups defeat ransomware',
    ],
    recommendations: [
      'Enable two-factor authentication on email and banking this week',
      'Set Windows and browsers to update automatically',
      'Make “verify by phone” a fixed rule for any payment-detail change',
      'Keep at least one backup on a drive that is not always connected',
      'Review who has admin access whenever someone leaves',
    ],
  },
  {
    slug: 'ai-practical-small-business',
    title: 'Practical Ways Small Businesses Can Use AI Tools',
    category: 'Technology',
    excerpt:
      'Where AI genuinely saves time in a small business — and where it still needs human judgment.',
    published_at: '2026-10-10',
    author: AUTHOR,
    read_minutes: 5,
    accent: 'cyan',
    image_url: IMG('articles/ai-technology.jpg'),
    image_alt: 'Humanoid service robot on display',
    meta_description:
      'Practical, low-risk uses of AI tools for small businesses — drafting, summarising, analysis — plus the limits to respect.',
    intro:
      'AI tools have moved from novelty to genuinely useful business tools — for specific tasks. Used well, they cut hours of drafting and summarising work. Used carelessly, they produce confident errors and expose business data. This guide separates the helpful uses from the hype.',
    sections: [
      {
        heading: 'Where AI Saves Real Time Today',
        paragraphs: [
          'AI assistants are strongest at turning rough input into polished output: drafting professional emails and replies, rewriting product descriptions, summarising long documents or meeting notes, and brainstorming options — names, taglines, ideas — to pick from.',
          'For spreadsheets and documents, AI can explain formulas, suggest better ways to organise data, and draft reports from numbers you provide.',
        ],
        bullets: [
          'Drafting and polishing emails, replies and product descriptions',
          'Summarising long documents, contracts and meeting notes',
          'Brainstorming and comparing options quickly',
          'Explaining and generating spreadsheet formulas',
        ],
      },
      {
        heading: 'Where Human Judgment Stays Essential',
        paragraphs: [
          'AI tools can state wrong information confidently. Anything that goes to a customer — prices, terms, commitments, legal or financial content — needs a human check before it leaves the building. Treat AI output as a fast first draft, never as a finished answer.',
          'Never paste confidential data — customer lists, financial figures, passwords, employee records — into public AI tools. If the data would hurt if leaked, it does not belong there.',
        ],
      },
      {
        heading: 'Start Small and Measure',
        paragraphs: [
          'Pick one repetitive task — drafting routine customer replies, for example — and use AI for it consistently for a month. If it reliably saves time with a quick human review, expand to the next task. Paying for tools before you know the workflow rarely pays off.',
        ],
      },
      {
        heading: 'What This Means for Your Hardware',
        paragraphs: [
          'Most business use of AI happens through cloud services in a browser, so it does not demand new hardware. A reliable computer, decent internet and a good screen matter more than any “AI-ready” marketing label on a machine.',
        ],
      },
    ],
    takeaways: [
      'AI is most useful for drafting, summarising and brainstorming',
      'Always have a human review anything sent to customers',
      'Never paste confidential business data into public AI tools',
      'Cloud AI tools need a good browser and internet, not special hardware',
    ],
    recommendations: [
      'Start with one repetitive writing task and a short trial period',
      'Write a simple internal rule about what data may not go into AI tools',
      'Use AI for first drafts; keep humans on final review',
      'Reassess the tool after a month — keep it only if it measurably saves time',
    ],
  },
  {
    slug: 'custom-software-vs-ready',
    title: 'Custom Software or Ready-Made: How to Decide',
    category: 'Software',
    excerpt:
      'When off-the-shelf software is enough, and when a custom build starts making sense.',
    published_at: '2026-10-12',
    author: AUTHOR,
    read_minutes: 6,
    accent: 'blue',
    image_url: IMG('articles/software-development.jpg'),
    image_alt: 'Program code on a computer screen',
    meta_description:
      'Custom software vs ready-made tools: cost, fit, maintenance and when each option makes sense for a growing business.',
    intro:
      'Every growing business hits the same question: keep bending our process around ready-made software, or pay to build something that fits? Neither answer is always right. The decision comes down to how unique your process really is, and what the workaround is actually costing you.',
    sections: [
      {
        heading: 'Ready-Made Is Usually the Right First Step',
        paragraphs: [
          'For common needs — accounting, invoicing, payroll, email, basic CRM — established products are almost always better value. They are tested by thousands of businesses, updated regularly, and cheaper than building the same thing yourself. If a ready tool covers 80% of your process, adapt the process rather than paying for bespoke code.',
        ],
      },
      {
        heading: 'Signs You Have Outgrown Ready-Made Tools',
        paragraphs: [
          'Custom software starts making sense when the workarounds themselves are costing money: staff re-typing the same data between three systems, Excel spreadsheets that have quietly become your real business software, or a process that is genuinely different from how standard tools assume you work.',
        ],
        bullets: [
          'Staff manually re-enter the same data in multiple systems',
          'A shared spreadsheet has become business-critical and fragile',
          'Your workflow is genuinely unusual and standard tools cannot model it',
          'You need customer-facing features no product offers',
        ],
      },
      {
        heading: 'Think in Total Cost, Not Just Build Cost',
        paragraphs: [
          'Ready-made software costs a subscription; custom software costs a build plus ongoing maintenance, hosting, updates and the developer’s availability forever. A cheaper upfront build that nobody maintains becomes an expensive problem in two years.',
          'Ask who will fix it, update it and secure it — and what that costs per year — before comparing a custom quote against a subscription.',
        ],
      },
      {
        heading: 'A Middle Path: Integrate First',
        paragraphs: [
          'Before commissioning a full custom build, check whether existing tools can be connected. Many products can share data through integrations or simple exports. A modest integration project often removes the double-entry problem for a fraction of a custom build’s cost.',
        ],
      },
    ],
    takeaways: [
      'Established tools win for standard needs like accounting, invoicing and email',
      'Custom software earns its cost when workarounds are costing real time or money',
      'Total cost includes maintenance, hosting and updates — not just the build',
      'Connecting existing tools often solves the problem without a rebuild',
    ],
    recommendations: [
      'Write down the actual workflow before evaluating any software',
      'Test a ready-made tool with a real task before rejecting it',
      'Price the workaround (staff hours, errors, delays) before pricing a build',
      'Ask about maintenance and updates before accepting any custom quote',
    ],
  },
  {
    slug: 'extend-pc-lifespan-upgrades',
    title: 'Extend Your Computers’ Life With Smart Upgrades',
    category: 'Hardware',
    excerpt:
      'Affordable upgrades — SSD, RAM, cleaning — that give older office PCs a second life.',
    published_at: '2026-10-14',
    author: AUTHOR,
    read_minutes: 5,
    accent: 'gold',
    image_url: IMG('articles/hardware-upgrade.jpg'),
    image_alt: 'RAM memory modules ready for installation',
    meta_description:
      'Which upgrades actually extend an office PC’s life: SSD, RAM, cleaning and power protection — and when replacement is smarter.',
    intro:
      'A slow office PC is not always a dead PC. Before replacing machines wholesale, it is worth knowing which upgrades genuinely revive an older computer and which waste money. For most office machines, two or three targeted upgrades can add years of useful life at a fraction of replacement cost.',
    sections: [
      {
        heading: 'The Single Best Upgrade: SSD',
        paragraphs: [
          'If an office PC still has a hard disk drive, replacing it with a solid-state drive is the most dramatic improvement money can buy. Boot times drop from minutes to seconds, applications open immediately, and the machine feels new — because the bottleneck was the drive, not the processor.',
          'The existing hard drive can often be re-used as a secondary data drive or as a backup disk, so nothing is wasted.',
        ],
        bullets: [
          '256 GB SATA SSD covers most office workloads',
          'Clone the old drive first so no data or software is lost',
          'Keep the old HDD as a spare or backup drive',
        ],
      },
      {
        heading: 'RAM: Cheap Headroom for Multitasking',
        paragraphs: [
          'If a machine slows down when many browser tabs and documents are open, it is running out of memory. Moving from 4 GB to 8 GB — or 8 GB to 16 GB — is inexpensive and directly reduces the freezing and “not responding” pauses staff live with daily.',
        ],
        image: 'products/desktops-10.jpg',
        image_alt: 'Inside a desktop PC during an upgrade',
        image_caption: 'An SSD plus extra RAM transforms most older office PCs.',
      },
      {
        heading: 'Cleaning and Cooling Matter More Than You Think',
        paragraphs: [
          'Dust inside a cabinet clogs fans and makes components run hot, which slows them down and shortens their life. A periodic internal cleaning — fans, heatsinks, vents — and making sure the PC has room to breathe prevent a surprising number of “slow and noisy” complaints.',
        ],
      },
      {
        heading: 'Know When to Replace Instead',
        paragraphs: [
          'Upgrades are not always the answer. If the processor is very old, the motherboard limits RAM, or the machine fails intermittently, replacement is the honest advice. A good rule: if the cost of parts and labour approaches half the price of a capable new machine, buy new.',
        ],
      },
    ],
    takeaways: [
      'An SSD is the single most effective upgrade for an older office PC',
      'More RAM directly reduces slowdowns when multitasking',
      'Cleaning dust and keeping vents clear extends component life',
      'Replace rather than upgrade when repair cost nears half the new price',
    ],
    recommendations: [
      'Upgrade HDD machines to SSD before considering replacement',
      'Raise RAM to 8 GB minimum for daily office use',
      'Add internal cleaning to your annual maintenance routine',
      'Test upgrades on one machine before rolling out to the whole fleet',
    ],
  },
  {
    slug: 'local-seo-basics',
    title: 'Local SEO Basics: Getting Found by Nearby Customers',
    category: 'Marketing',
    excerpt:
      'Simple, honest steps that help local customers find your business on search and maps.',
    published_at: '2026-10-15',
    author: AUTHOR,
    read_minutes: 5,
    accent: 'cyan',
    image_url: IMG('articles/digital-marketing.jpg'),
    image_alt: 'Analytics charts overlaid on a person typing',
    meta_description:
      'Local SEO basics for small businesses: Google Business Profile, consistent contact details, reviews and website essentials — explained simply.',
    intro:
      'When a nearby customer searches for what you sell, the businesses that appear are not there by accident. Local search visibility comes from a handful of free, honest practices — no tricks required. This guide covers the basics that genuinely move the needle for a local business.',
    sections: [
      {
        heading: 'Your Google Business Profile Is the Foundation',
        paragraphs: [
          'For most local searches, the map results shown at the top come from Google Business Profile listings — and creating one is free. Complete every field: correct name, exact address, accurate hours, categories that match what you actually do, and real photos of your premises and work.',
        ],
        bullets: [
          'Claim and verify your free Google Business Profile',
          'Keep hours, phone number and address accurate and current',
          'Add real photos — premises, team, completed work',
        ],
      },
      {
        heading: 'Consistency Everywhere Else',
        paragraphs: [
          'Search engines trust your business more when the same name, address and phone number appear consistently across your website, directories and social profiles. A different phone number on one site and a slightly different address on another quietly weakens your local ranking.',
        ],
      },
      {
        heading: 'Reviews Are a Ranking Factor',
        paragraphs: [
          'Genuine customer reviews directly influence local visibility and, more importantly, whether a searcher calls you. Ask satisfied customers to leave a review — politely, after a good interaction — and reply to reviews, including the negative ones, professionally.',
        ],
      },
      {
        heading: 'Your Website Still Matters',
        paragraphs: [
          'A basic fast website with your services, location and contact details — clearly written for a human reader — supports everything else. Pages that name your city, describe your services plainly, and load quickly on a phone do more for local search than any clever keyword trick.',
        ],
      },
    ],
    takeaways: [
      'A complete Google Business Profile is the highest-impact free step',
      'Consistent name, address and phone details build search-engine trust',
      'Real reviews and professional replies influence both ranking and calls',
      'A fast, clear, mobile-friendly website supports local search',
    ],
    recommendations: [
      'Claim and fully complete your Google Business Profile this week',
      'Audit your contact details across listings and fix inconsistencies',
      'Build a polite review request into your post-service routine',
      'Make sure your website loads fast and works properly on phones',
    ],
  },
  {
    slug: 'preventive-it-maintenance-checklist',
    title: 'A Preventive IT Maintenance Checklist for Offices',
    category: 'IT Maintenance',
    excerpt:
      'The monthly and quarterly checks that prevent most IT emergencies before they happen.',
    published_at: '2026-10-17',
    author: AUTHOR,
    read_minutes: 6,
    accent: 'gold',
    image_url: IMG('articles/it-maintenance.jpg'),
    image_alt: 'Server racks and cabling in an IT equipment room',
    meta_description:
      'A practical preventive maintenance checklist for office IT: monthly and quarterly tasks that prevent downtime, data loss and emergency callouts.',
    intro:
      'Most IT emergencies announce themselves quietly weeks before they happen — a backup that silently failed, a UPS battery that no longer holds charge, a PC filling up with dust. A simple recurring checklist catches these while they are cheap to fix. Here is the routine we recommend for small offices.',
    sections: [
      {
        heading: 'Every Month',
        paragraphs: [
          'A monthly pass takes under an hour and catches the most common failures before they hurt.',
        ],
        bullets: [
          'Verify backups ran and can actually be restored (test one file)',
          'Check Windows and antivirus updates are current on every machine',
          'Confirm UPS units hold a charge and are not beeping or hot',
          'Clear desk-side dust from PC vents and check fans are spinning',
          'Review storage space on shared drives before they fill up',
        ],
      },
      {
        heading: 'Every Quarter',
        paragraphs: [
          'Quarterly checks cover the slower-moving risks — hardware wear, cabling and permissions.',
        ],
        bullets: [
          'Internal cleaning of PCs and printers (fans, rollers, vents)',
          'Check cables, power strips and UPS batteries for wear or swelling',
          'Review who has access to what; remove ex-employee accounts',
          'Test that CCTV is recording and footage is being retained',
          'Note any PC that is noticeably slower than before',
        ],
        image: 'products/networking-7.jpg',
        image_alt: 'Network switch and fibre cabling under maintenance',
        image_caption: 'Regular checks on switches, cabling and power prevent most outages.',
      },
      {
        heading: 'Why “If It Ain’t Broke” Fails',
        paragraphs: [
          'IT equipment rarely warns you before failing — a dying hard drive, a swollen UPS battery or a clogged fan works silently until it does not. The cost of an emergency callout plus lost work time almost always exceeds years of simple preventive checks.',
        ],
      },
      {
        heading: 'When an AMC Makes Sense',
        paragraphs: [
          'An Annual Maintenance Contract turns this checklist into a scheduled service: someone accountable does the checks, keeps records, and responds on a priority basis when something does break. For offices that depend on their systems daily, it is usually cheaper than the emergency-callout alternative.',
        ],
      },
    ],
    takeaways: [
      'Test backups by restoring a file — a backup that cannot restore is not a backup',
      'Monthly checks catch most common failures cheaply',
      'Quarterly cleaning and battery/cable checks prevent bigger failures',
      'An AMC makes preventive maintenance someone’s scheduled job',
    ],
    recommendations: [
      'Put the monthly checklist on a calendar with a named owner',
      'Test-restore one file from every backup each month',
      'Add UPS battery and fan checks to the quarterly routine',
      'Remove access for former staff the day they leave',
    ],
  },
  {
    slug: 'business-data-backup-basics',
    title: 'Business Data Backup: The Basics Done Right',
    category: 'Backup & Recovery',
    excerpt:
      'What a real backup looks like — and the mistakes that leave businesses with nothing to restore.',
    published_at: '2026-10-19',
    author: AUTHOR,
    read_minutes: 5,
    accent: 'blue',
    image_url: IMG('articles/data-backup.jpg'),
    image_alt: 'Internal mechanism of hard disk drives',
    meta_description:
      'Backup basics for small businesses: what to back up, the 3-2-1 rule, and why copying files to the same computer is not a backup.',
    intro:
      'Every business assumes it has a backup until the day it needs one — and discovers the “backup” was a folder on the same computer that just failed. Real backup is not complicated, but it does require getting a few fundamentals right. This is what a backup that actually protects you looks like.',
    sections: [
      {
        heading: 'A Copy on the Same Computer Is Not a Backup',
        paragraphs: [
          'If the copy sits on the same disk, it is a folder — not a backup. Anything that destroys the original (drive failure, theft, fire, ransomware) takes the copy with it. A backup must live somewhere physically separate from the data it protects.',
        ],
      },
      {
        heading: 'The 3-2-1 Rule',
        paragraphs: [
          'The standard guidance that has protected businesses for decades: keep 3 copies of important data, on 2 different types of storage, with 1 copy off-site. For a small business this usually means the working files, a local backup drive, and a cloud or off-site copy.',
        ],
        bullets: [
          '3 copies: the working file plus two backups',
          '2 media types: for example, your computer plus an external drive or cloud',
          '1 off-site: a copy outside your office against fire, theft or disaster',
        ],
        image: 'products/storage-n1.jpg',
        image_alt: 'Internal hard drive used for backups',
        image_caption: 'An external drive gives a local copy; a cloud or off-site copy protects against disasters.',
      },
      {
        heading: 'Automate It — Memory Fails, Schedules Do Not',
        paragraphs: [
          'Manual backups depend on someone remembering, and people forget during busy weeks — exactly when data matters most. Set backups to run automatically on a schedule, and check occasionally that they are actually completing, not just scheduled.',
        ],
      },
      {
        heading: 'Test a Restore Before You Need One',
        paragraphs: [
          'The only backup that counts is one you have successfully restored from. Once a month, pick a file and restore it from the backup. This five-minute test catches failed backups, wrong settings and corrupted media before they matter.',
        ],
      },
    ],
    takeaways: [
      'A copy on the same device is not a backup',
      '3-2-1: three copies, two media types, one off-site',
      'Automated scheduled backups beat remembered manual ones',
      'A backup is only proven when you test-restore from it',
    ],
    recommendations: [
      'Connect an external drive and set up automatic scheduled backups',
      'Add one off-site or cloud copy for critical business data',
      'Test-restore one file every month to verify the backup works',
      'Include backup status in your monthly maintenance checklist',
    ],
  },
]

/** Unique list of categories used by the articles, for filters. */
export const ARTICLE_CATEGORIES = [...new Set(ARTICLES.map((a) => a.category))]

export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug) || null

/**
 * Related articles for the detail page: same category first, then others.
 * Always excludes the current article and returns up to `count` items.
 */
export const relatedArticles = (article, count = 3) => {
  if (!article) return []
  const others = ARTICLES.filter((a) => a.slug !== article.slug)
  const same = others.filter((a) => a.category === article.category)
  const rest = others.filter((a) => a.category !== article.category)
  return [...same, ...rest].slice(0, count)
}
