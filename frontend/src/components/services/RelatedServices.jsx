import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DynamicIcon } from '../cards/ServiceCard.jsx'
import { SERVICE_DIRECTORY } from '../../data/servicesData.js'

/**
 * Related-services strip — image-thumb cards resolved from directory slugs.
 */
export default function RelatedServices({ slugs }) {
  const items = slugs
    .map((slug) => SERVICE_DIRECTORY.find((s) => s.slug === slug))
    .filter(Boolean)

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <Link
          key={s.slug}
          to={s.to}
          className="group flex overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/60 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <span className="relative w-28 shrink-0 overflow-hidden sm:w-32">
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/30 to-navy-950/10" />
            <span className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-lg border border-blue-600/50 bg-navy-950/80 text-cyan-400 backdrop-blur-sm">
              <DynamicIcon name={s.icon} className="h-4 w-4" />
            </span>
          </span>
          <span className="flex flex-1 flex-col p-4">
            <span className="block text-sm font-bold leading-snug text-navy-900">{s.name}</span>
            <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-ink-soft">{s.blurb}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-2.5 text-xs font-semibold text-blue-700 transition-colors group-hover:text-blue-500">
              Learn More
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}
