import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import SectionViewAll from './SectionViewAll.jsx'
import { CARD_ACCENTS } from './cardAccents.js'
import { DynamicIcon } from '../cards/ServiceCard.jsx'

const IMG_BASE = `${import.meta.env.BASE_URL}homehero/`
const img = (name) => `${IMG_BASE}${encodeURIComponent(name)}`

const SERVICE_ACCENTS = ['sky', 'violet', 'emerald', 'rose', 'amber']

const services = [
  {
    slug: 'website-development',
    name: 'IT & Software Solutions',
    icon: 'Code2',
    image: img('Futuristic Blue IT Workspace.png'),
    imageAlt: 'Modern technology workspace for software development',
    short_description:
      'Websites, custom software and business applications tailored to your workflow.',
    labels: ['Website Development', 'Custom Software', 'Business Applications'],
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Services',
    icon: 'Megaphone',
    image: img('Futuristic Blue Cloud Command Center.png'),
    imageAlt: 'Analytics dashboards and campaign performance screens',
    short_description:
      'Digital marketing, SEO and social media to grow your online presence.',
    labels: ['SEO', 'Digital Marketing', 'Social Media'],
  },
  {
    slug: 'computer-laptop-services',
    name: 'IT Infrastructure & Hardware',
    icon: 'Server',
    image: img('High-Tech Electronics Repair Lab.png'),
    imageAlt: 'Professional workspace with computers, laptops and hardware',
    short_description:
      'Desktops, laptops, servers and complete office networking setup.',
    labels: ['Computers & Laptops', 'Servers', 'Networking'],
  },
  {
    slug: 'cctv-installation',
    name: 'Security Solutions',
    icon: 'ShieldCheck',
    image: img('High-Tech CCTV Control Room.png'),
    imageAlt: 'CCTV cameras and surveillance monitoring equipment',
    short_description:
      'CCTV surveillance, access control and security system installation.',
    labels: ['CCTV', 'Access Control', 'Surveillance'],
  },
  {
    slug: 'institutional-it-supply',
    name: 'Government & Business Solutions',
    icon: 'Landmark',
    image: img('Futuristic Blue Data Center Network.png'),
    imageAlt: 'Institutional data center and corporate IT environment',
    short_description:
      'Bulk IT procurement and managed services for institutions.',
    labels: ['Bulk Procurement', 'Institutional IT', 'Managed Services'],
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Comprehensive"
          highlight="IT Services"
          description="End-to-end technology services — from hardware supply to software and security."
        />
        <SectionViewAll to="/services">View All Services</SectionViewAll>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s, i) => {
            const a = CARD_ACCENTS[SERVICE_ACCENTS[i % SERVICE_ACCENTS.length]]
            return (
              <Link
                key={s.name}
                to={`/services/${s.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-navy-900/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-blue-600 ${a.border} ${a.shadow} ${
                  i === services.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
                aria-label={`${s.name} — explore service`}
              >
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r ${a.gradient}`} />
                <div className="relative h-36 overflow-hidden sm:h-40">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-t ${a.overlay} to-transparent`}
                  />
                </div>
                <span
                  className={`absolute left-4 top-36 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br ${a.gradient} text-white shadow-lg ring-4 ring-white sm:top-40`}
                >
                  <DynamicIcon name={s.icon} className="h-5 w-5" />
                </span>
                <div className="flex flex-1 flex-col p-4 pt-8">
                  <h3 className="text-base font-bold leading-snug text-navy-900">{s.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{s.short_description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.labels.map((label) => (
                      <li
                        key={label}
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${a.pill}`}
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                  <span className={`mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold transition-colors ${a.link}`}>
                    Explore Service
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
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
