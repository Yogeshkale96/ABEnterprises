import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react'
import Container from '../common/Container.jsx'
import siteConfig from '../../config/siteConfig.js'

const HERO_BASE = `${import.meta.env.BASE_URL}homehero/`
const img = (name) => `${HERO_BASE}${encodeURIComponent(name)}`

const MAIN_IMAGE = img('Futuristic Blue IT Workspace.png')
const ACCENT_IMAGE = img('High-Tech Electronics Repair Lab.png')

const points = [
  'One partner for hardware, software, security & support',
  'Genuine products with transparent pricing',
  'Experienced team for installation & AMC',
  'Pan-India sales and service coverage',
]

export default function AboutPreview() {
  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="about-preview-heading">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-card-hover ring-1 ring-line">
            <img
              src={MAIN_IMAGE}
              alt="AB Enterprises IT workspace — computers, laptops and managed technology"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-3 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-card-hover sm:block lg:w-56">
            <img
              src={ACCENT_IMAGE}
              alt="Technicians servicing devices in the AB Enterprises repair lab"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute right-3 top-4 rounded-xl bg-navy-900/95 px-4 py-3 text-center shadow-lg sm:-right-2 sm:top-6">
            <p className="text-lg font-extrabold leading-none text-cyan-400">Pan-India</p>
            <p className="mt-1 text-[11px] font-medium text-white/70">Sales & Support</p>
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-700/20 bg-surface-blue px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700">
            Who We Are
          </span>
          <h2
            id="about-preview-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl"
          >
            One Company.{' '}
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              Complete IT Solutions.
            </span>
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {siteConfig.company.legalName} brings product supply, software development and
            technical support together — so you never have to coordinate multiple vendors.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-3 py-2 text-[13px] font-medium leading-snug text-ink shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-blue text-blue-700">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-surface-blue/50 p-4 sm:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-extrabold leading-none text-navy-900">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1.5 text-[11px] font-medium leading-snug text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden="true" />
              {siteConfig.contact.address}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden="true" />
              {siteConfig.contact.hours}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/40 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              More About Us
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-700/40 hover:bg-surface-blue hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
