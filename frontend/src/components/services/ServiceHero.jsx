import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'
import ServiceBreadcrumbs from './ServiceBreadcrumbs.jsx'

/* Per-page image treatment — crop, overlay direction and glow vary by variant. */
const VARIANTS = [
  {
    pos: 'center',
    overlay: 'bg-gradient-to-r from-navy-950/85 via-navy-950/65 to-navy-900/30',
    vignette: 'bg-gradient-to-t from-navy-950/50 via-transparent to-navy-900/15',
    glow: 'radial-gradient(55% 45% at 75% 40%, rgba(56,189,248,0.12) 0%, transparent 70%)',
  },
  {
    pos: 'center 30%',
    overlay: 'bg-gradient-to-br from-navy-950/85 via-navy-900/60 to-blue-900/30',
    vignette: 'bg-gradient-to-l from-navy-950/45 via-transparent to-navy-900/15',
    glow: 'radial-gradient(50% 50% at 25% 30%, rgba(59,130,246,0.16) 0%, transparent 70%)',
  },
  {
    pos: 'center 70%',
    overlay: 'bg-gradient-to-tr from-navy-950/80 via-navy-950/60 to-blue-800/35',
    vignette: 'bg-gradient-to-b from-navy-900/30 via-transparent to-navy-950/45',
    glow: 'radial-gradient(55% 45% at 70% 75%, rgba(34,211,238,0.14) 0%, transparent 70%)',
  },
]

/**
 * Service hero — full-bleed background image with a directional navy overlay,
 * pill eyebrow, gradient-highlight heading, highlight chips and capsule CTAs.
 * `variant` (0–2) changes crop/overlay/glow so each page reads differently.
 */
export default function ServiceHero({ service, quoteTo, variant = 0 }) {
  const reduce = useReducedMotion()
  const v = VARIANTS[variant % VARIANTS.length]
  const fade = (d = 0) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: d, ease: 'easeOut' } }

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white" aria-labelledby="service-hero-heading">
      {/* Themed fallback gradient behind the photo */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-blue-900" />
      {/* Full-bleed background image — crop varies per variant */}
      <img
        src={service.image}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        style={{ objectPosition: v.pos }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Directional overlays — denser on the copy side */}
      <div aria-hidden="true" className={`absolute inset-0 ${v.overlay}`} />
      <div aria-hidden="true" className={`absolute inset-0 ${v.vignette}`} />
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: v.glow }}
      />

      <Container className="relative py-5 sm:py-6 lg:py-7">
        <ServiceBreadcrumbs current={service.name} />
        <div className="mt-4 max-w-2xl">
          <motion.p
            {...fade(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400"
          >
            {service.eyebrow}
          </motion.p>
          <motion.h1
            id="service-hero-heading"
            {...fade(0.15)}
            className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_16px_rgba(4,21,46,0.45)] sm:text-4xl"
          >
            {service.heading}{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {service.headingHighlight}
            </span>
          </motion.h1>
          <motion.p {...fade(0.25)} className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            {service.description}
          </motion.p>
          <motion.ul {...fade(0.35)} className="mt-5 flex flex-wrap gap-2.5">
            {service.highlights.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden="true" />
                {h}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.45)} className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              to={quoteTo}
              variant="primary"
              size="md"
              className="group rounded-full border border-white/20 bg-gradient-to-b from-cyan-500 via-blue-600 to-blue-800 py-1 pl-5 pr-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(0,0,0,0.35),0_10px_24px_-8px_rgba(37,99,235,0.6)] transition-all duration-300 hover:border-slate-300 hover:from-white hover:via-white hover:to-slate-200 hover:text-navy-900 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(148,163,184,0.5),0_10px_24px_-8px_rgba(37,99,235,0.4)]"
            >
              {service.primaryCta.label}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-blue-700 group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Button>
            {service.secondaryCta && (
              <Button
                to={service.secondaryCta.to}
                variant="outline"
                size="md"
                className="rounded-full border border-white/30 bg-gradient-to-b from-white/15 to-white/5 px-5 py-2 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_18px_-10px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/70 hover:from-cyan-400/35 hover:to-blue-600/25 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-8px_rgba(34,211,238,0.5)]"
              >
                {service.secondaryCta.label}
              </Button>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
