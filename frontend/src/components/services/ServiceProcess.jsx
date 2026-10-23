import { motion, useReducedMotion } from 'framer-motion'

const COLS = { 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6' }

/**
 * Numbered process timeline — gradient step pills connected by a dashed
 * line on desktop, stacked vertically on mobile.
 */
export default function ServiceProcess({ steps }) {
  const reduce = useReducedMotion()
  const cols = COLS[steps.length] || 'lg:grid-cols-5'
  return (
    <ol className={`relative grid gap-x-5 gap-y-8 md:grid-cols-3 ${cols}`}>
      {/* connector line — desktop only */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-6 hidden h-px w-full border-t-2 border-dashed border-blue-600/25 lg:block"
      />
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
          className="group relative"
        >
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-blue-600/40 bg-gradient-to-br from-navy-950 to-blue-800 text-sm font-extrabold text-cyan-400 shadow-card transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-4 text-sm font-bold text-navy-900">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.text}</p>
        </motion.li>
      ))}
    </ol>
  )
}
