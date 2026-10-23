import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { DynamicIcon } from '../cards/ServiceCard.jsx'

/**
 * Compact directory tile — rounded thumbnail with an icon chip on the left,
 * title / two-line blurb / highlight dots on the right and a circular arrow
 * that fills on hover. A thin accent bar grows along the left edge.
 */
export default function ServiceDirectoryCard({ service, index = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        to={service.to}
        className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-navy-900/10 bg-white p-3 pr-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600/50 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-blue-600"
        aria-label={`${service.name} — explore service`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-3 left-0 w-1 origin-center scale-y-0 rounded-r-full bg-gradient-to-b from-cyan-400 to-blue-700 transition-transform duration-300 group-hover:scale-y-100"
        />

        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-[104px] sm:w-[104px]">
          <img
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 left-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-navy-950/75 text-cyan-400 backdrop-blur-sm"
          >
            <DynamicIcon name={service.icon} className="h-4 w-4" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-extrabold tracking-[0.2em] text-blue-700/70">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-0.5 text-[15px] font-bold leading-snug text-navy-900">{service.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">{service.blurb}</p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
            {service.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex items-center gap-1 text-[10px] font-semibold text-navy-800/70">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan-500" />
                <span className="truncate">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-blue-700 transition-all duration-300 group-hover:border-transparent group-hover:bg-blue-700 group-hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        </span>
      </Link>
    </motion.div>
  )
}
