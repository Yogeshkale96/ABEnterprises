import { motion, useReducedMotion } from 'framer-motion'
import { DynamicIcon } from '../cards/ServiceCard.jsx'

const ACCENTS = [
  { chip: 'border-blue-500/50 bg-blue-700/20 text-cyan-300 group-hover:bg-blue-600 group-hover:text-white', line: 'bg-blue-500', glow: 'bg-blue-600/15', dot: 'bg-cyan-400' },
  { chip: 'border-cyan-400/50 bg-cyan-500/15 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-navy-950', line: 'bg-cyan-500', glow: 'bg-cyan-500/20', dot: 'bg-cyan-400' },
  { chip: 'border-accent-yellow/50 bg-accent-yellow/15 text-accent-yellow group-hover:bg-accent-yellow group-hover:text-navy-950', line: 'bg-accent-yellow', glow: 'bg-accent-yellow/25', dot: 'bg-accent-yellow' },
]

// Different crops of the same photo keep cards visually distinct.
const CROPS = ['15% 40%', '50% 45%', '85% 60%', '30% 70%', '70% 30%', '50% 15%']
const DIRECTIONS = ['bg-gradient-to-br', 'bg-gradient-to-tr', 'bg-gradient-to-b']

/**
 * Offerings grid — photo-backed navy panels (photo under a navy overlay
 * tinted with the service colour) with accent icon chips and a corner glow.
 * Falls back to the classic white style when no `image` is provided.
 */
export default function ServiceFeatureGrid({ offerings, image, theme, variant = 0 }) {
  const direction = DIRECTIONS[variant % DIRECTIONS.length]
  const tint = theme?.dark || 'from-navy-950 via-navy-900 to-blue-900'
  const reduce = useReducedMotion()
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {offerings.map(({ icon, title, items }, i) => {
        const a = ACCENTS[i % ACCENTS.length]
        return (
          <motion.article
            key={title}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: 'easeOut' }}
            className={`group relative overflow-hidden rounded-2xl border p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover ${
              image
                ? 'border-white/10 bg-navy-950 text-white hover:border-cyan-400/40'
                : 'border-line bg-white hover:border-blue-600/50'
            }`}
          >
            {image && (
              <>
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: CROPS[(i + variant) % CROPS.length] }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div aria-hidden="true" className={`absolute inset-0 ${direction} ${tint} opacity-[0.86]`} />
              </>
            )}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150 ${a.glow}`}
            />
            <span
              aria-hidden="true"
              className={`absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 ${a.line}`}
            />
            <span className={`relative flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 ${a.chip}`}>
              <DynamicIcon name={icon} className="h-5 w-5" />
            </span>
            <h3 className={`relative mt-4 font-bold ${image ? 'text-white' : 'text-navy-900'}`}>{title}</h3>
            <ul className="relative mt-3 space-y-2">
              {items.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-2.5 text-sm leading-relaxed ${image ? 'text-white/85' : 'text-ink-soft'}`}
                >
                  <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        )
      })}
    </div>
  )
}
