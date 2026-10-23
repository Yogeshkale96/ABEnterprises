import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Cctv, Clock, Laptop, MapPin, Network, ShieldCheck } from 'lucide-react'

const HERO_BADGES = [
  { Icon: ShieldCheck, label: 'Expert Team' },
  { Icon: Clock, label: 'Fast Service' },
  { Icon: Award, label: 'Genuine Products' },
  { Icon: MapPin, label: 'Pan India Support' },
  { Icon: Laptop, label: 'Computers & Laptops' },
  { Icon: Cctv, label: 'CCTV & Security' },
  { Icon: Network, label: 'Networking' },
]

/**
 * Compact capsule badges shown inside the hero slide. Staggered entrance,
 * soft spring hover — no continuous bouncing.
 */
export default function HeroServiceBadges({
  reduced = false,
  staggerFrom = 0.55,
  count = 4,
  alignRight = false,
}) {
  // Each slide shows a random subset (default 4) so badges differ per slide.
  // Lazy initializer runs once per mount — each slide gets a fresh shuffle.
  const [badges] = useState(() =>
    [...HERO_BADGES].sort(() => Math.random() - 0.5).slice(0, count)
  )

  return (
    <ul
      className={`flex flex-wrap gap-1.5 sm:gap-2 ${
        alignRight ? 'lg:justify-end' : ''
      }`}
      aria-label="Service highlights"
    >
      {badges.map(({ Icon, label }, i) => (
        <motion.li
          key={label}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.4, delay: staggerFrom + i * 0.05, ease: 'easeOut' }
          }
          whileHover={
            reduced
              ? undefined
              : { y: -3, scale: 1.05, transition: { type: 'spring', stiffness: 420, damping: 16 } }
          }
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cyan-400/35 bg-navy-900/55 px-3 py-1.5 text-[11px] font-medium text-white shadow-[0_6px_18px_-6px_rgba(56,189,248,0.4)] backdrop-blur-md sm:text-xs"
        >
          <Icon className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
          {label}
        </motion.li>
      ))}
    </ul>
  )
}
