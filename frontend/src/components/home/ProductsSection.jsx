import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SectionViewAll from './SectionViewAll.jsx'
import { CARD_ACCENTS } from './cardAccents.js'
import { DynamicIcon } from '../cards/ServiceCard.jsx'

// Product photos live in public/images/products/; homehero artwork is used
// as a companion strip beside each photo. If either is missing the card
// falls back to the navy gradient + icon watermark via img onError.
const img = (name) => `${import.meta.env.BASE_URL}images/products/${name}`
const heroImg = (name) => `${import.meta.env.BASE_URL}homehero/${encodeURIComponent(name)}`

const PRODUCT_ACCENTS = ['indigo', 'teal', 'orange', 'rose', 'sky', 'emerald']

const PRODUCTS = [
  {
    slug: 'business-desktop-pcs',
    name: 'Desktops',
    short_description: 'Business & performance desktop computers.',
    category_name: 'Desktops',
    icon: 'Monitor',
    image: img('desktops.jpg'),
    imageAlt: 'Business desktop workstation',
    image2: heroImg('Futuristic Blue IT Workspace.png'),
  },
  {
    slug: 'business-laptops',
    name: 'Laptops',
    short_description: 'Business, student & professional laptops.',
    category_name: 'Laptops',
    icon: 'Laptop',
    image: img('laptops.jpg'),
    imageAlt: 'Business laptop on a work desk',
    image2: heroImg('High-Tech Electronics Repair Lab.png'),
  },
  {
    slug: 'laser-printers',
    name: 'Printers',
    short_description: 'Laser & multifunction office printers.',
    category_name: 'Printers',
    icon: 'Printer',
    image: img('printers.jpg'),
    imageAlt: 'Office laser and multifunction printer',
    image2: heroImg('Futuristic Blue Cloud Command Center.png'),
  },
  {
    slug: 'hd-cctv-camera-kits',
    name: 'CCTV Cameras',
    short_description: 'HD & IP surveillance camera kits.',
    category_name: 'CCTV',
    icon: 'Cctv',
    image: img('cctv.jpg'),
    imageAlt: 'Surveillance camera installation',
    image2: heroImg('High-Tech CCTV Control Room.png'),
  },
  {
    slug: 'managed-switches',
    name: 'Networking Devices',
    short_description: 'Routers, switches & access points.',
    category_name: 'Networking',
    icon: 'Network',
    image: img('networking.jpg'),
    imageAlt: 'Network switches and cabling',
    image2: heroImg('Futuristic Blue Data Center Network.png'),
  },
  {
    slug: 'line-interactive-ups',
    name: 'UPS & Batteries',
    short_description: 'Backup power for your equipment.',
    category_name: 'UPS',
    icon: 'BatteryCharging',
    image: img('ups.jpg'),
    imageAlt: 'UPS unit and backup batteries',
    image2: heroImg('High-Tech Electronics Repair Lab.png'),
  },
]

const hideOnError = (e) => {
  e.currentTarget.style.display = 'none'
}

export default function ProductsSection() {
  return (
    <section className="bg-surface py-16 lg:py-20" aria-labelledby="products-heading">
      <Container>
        <SectionHeading
          eyebrow="Our Products"
          title="Popular"
          highlight="IT Products"
          description="Genuine hardware from leading brands — supplied, installed and supported."
        />
        <SectionViewAll to="/products">View All Products</SectionViewAll>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const a = CARD_ACCENTS[PRODUCT_ACCENTS[i % PRODUCT_ACCENTS.length]]
            return (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-navy-900/10 ${a.soft} p-3 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-blue-600 ${a.border} ${a.shadow}`}
                aria-label={`${p.name} — view details`}
              >
                <div className="relative h-40 overflow-hidden rounded-2xl bg-navy-900 sm:h-44">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-900 via-blue-900 to-navy-800"
                  >
                    <DynamicIcon name={p.icon} className="h-16 w-16 text-white/10" />
                  </div>
                  <div className="relative flex h-full">
                    <div className="relative h-full w-[62%] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.imageAlt}
                        loading="lazy"
                        decoding="async"
                        onError={hideOnError}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="relative h-full w-[38%] overflow-hidden border-l-2 border-white/40">
                      <img
                        src={p.image2}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={hideOnError}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-t ${a.overlay} to-transparent`}
                  />
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-md ${a.solid}`}>
                    {p.category_name}
                  </span>
                </div>

                <div className="flex items-center gap-3 px-2 pb-2 pt-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${a.gradient} text-white shadow-md`}
                  >
                    <DynamicIcon name={p.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold leading-snug text-navy-900">{p.name}</h3>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{p.short_description}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 transition-all duration-300 group-hover:text-white ${a.ring} ${a.text} ${a.groupSolid}`}
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
