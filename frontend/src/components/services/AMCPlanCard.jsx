import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../common/Button.jsx'

/**
 * AMC plan comparison card — label/value field list, no invented pricing.
 * `featured` gets the navy gradient treatment with a pill badge.
 */
export default function AMCPlanCard({ plan, quoteTo, index = 0 }) {
  const reduce = useReducedMotion()
  const featured = !!plan.featured
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
        featured
          ? 'border-blue-700/30 bg-gradient-to-b from-navy-950 to-blue-900 text-white'
          : 'border-line bg-white hover:border-blue-600/50'
      }`}
    >
      {/* corner glow */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150 ${
          featured ? 'bg-cyan-400/15' : 'bg-blue-600/10'
        }`}
      />
      {featured && (
        <span className="relative mb-3 inline-flex w-fit items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
          Popular for Offices
        </span>
      )}
      <h3 className={`relative text-lg font-extrabold ${featured ? 'text-white' : 'text-navy-900'}`}>{plan.name}</h3>
      <p className={`relative mt-1 text-sm ${featured ? 'text-white/70' : 'text-ink-soft'}`}>{plan.tagline}</p>
      <dl
        className={`relative mt-5 flex-1 space-y-3 border-t pt-5 text-sm ${featured ? 'border-white/10' : 'border-line'}`}
      >
        {plan.fields.map((f) => (
          <div key={f.label} className="flex flex-col gap-0.5">
            <dt className={`text-[11px] font-bold uppercase tracking-wider ${featured ? 'text-cyan-400' : 'text-blue-700'}`}>
              {f.label}
            </dt>
            <dd className={featured ? 'text-white/85' : 'text-ink'}>{f.value}</dd>
          </div>
        ))}
      </dl>
      <Button
        to={quoteTo}
        variant={featured ? 'primary' : 'outlineBlue'}
        size="md"
        className={`relative mt-6 w-full rounded-full ${
          featured ? 'bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-5 pr-1.5 hover:from-blue-600 hover:to-cyan-400' : ''
        }`}
      >
        Request a Quote
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </Button>
    </motion.article>
  )
}
