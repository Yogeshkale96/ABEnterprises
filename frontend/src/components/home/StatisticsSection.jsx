import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../common/Container.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { DynamicIcon } from '../cards/ServiceCard.jsx'
import siteConfig from '../../config/siteConfig.js'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference.js'

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function Stat({ value, suffix, label, icon, navy, animate }) {
  const [display, setDisplay] = useState(() => (animate ? 0 : value))
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!animate) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, animate])

  return (
    <motion.li
      ref={ref}
      variants={itemVariants}
      whileHover={animate ? { y: -4 } : undefined}
      className={`relative flex items-center gap-4 rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover ${
        navy
          ? 'border-navy-900/20 bg-gradient-to-br from-navy-900 via-blue-900 to-navy-800 text-white'
          : 'border-navy-900/10 bg-white'
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
          navy
            ? 'border-cyan-400/30 bg-white/10 text-cyan-400'
            : 'border-blue-600/30 bg-surface-blue text-blue-700'
        }`}
      >
        <DynamicIcon name={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <p className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {display}
          <span className={navy ? 'text-cyan-400' : 'text-accent-yellow'}>{suffix}</span>
        </p>
        <p
          className={`mt-0.5 text-[11px] font-semibold uppercase tracking-wider ${
            navy ? 'text-white/70' : 'text-ink-soft'
          }`}
        >
          {label}
        </p>
      </span>
    </motion.li>
  )
}

export default function StatisticsSection() {
  const reducedMotion = useReducedMotionPreference()
  const stats = siteConfig.stats
  if (!stats?.length) return null

  return (
    <section
      className="relative overflow-hidden bg-surface py-16 lg:py-20"
      aria-label="Company statistics"
    >
      {/* Subtle ambient texture — soft blue glows on the light background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-700/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <Container className="relative">
        <SectionHeading
          eyebrow="Trust • Experience • Performance"
          title="Our Impact"
          highlight="in Numbers"
          description="Consistent delivery and lasting partnerships across Amravati and beyond."
        />
        <div className="relative">
          {/* Slim connector line weaving behind the cards on desktop */}
          <span
            aria-hidden="true"
            className="absolute inset-x-6 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent lg:block"
          />
          <motion.ul
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={listVariants}
            className="relative grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >
            {stats.map((s, i) => (
              <Stat key={s.label} {...s} navy={i % 2 === 1} animate={!reducedMotion} />
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  )
}
