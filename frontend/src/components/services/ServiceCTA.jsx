import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'
import ServiceBackdrop from './ServiceBackdrop.jsx'

/**
 * Closing inquiry strip — image-backed navy panel with gradient overlay,
 * eyebrow + heading left, capsule CTAs right. Matches the About CTA.
 */
export default function ServiceCTA({
  heading,
  text,
  image,
  theme,
  eyebrow = 'Let’s Work Together',
  primaryTo,
  primaryLabel,
  secondaryTo,
  secondaryHref,
  secondaryLabel,
}) {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-navy-950 py-10 text-white lg:py-12" aria-labelledby="service-cta-heading">
      {theme ? (
        <ServiceBackdrop src={image} theme={theme} tint="opacity-80" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-blue-900" />
      )}
      {!theme && image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-900/70 to-blue-700/45" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(50% 60% at 80% 50%, rgba(56,189,248,0.10) 0%, transparent 70%)' }}
      />
      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:gap-10 lg:text-left"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{eyebrow}</p>
            <h2 id="service-cta-heading" className="mt-1.5 text-xl font-extrabold sm:text-2xl">
              {heading}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">{text}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <Button
              to={primaryTo}
              variant="primary"
              size="md"
              className="group rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-6 pr-1.5 text-sm shadow-lg shadow-blue-700/30 hover:from-blue-600 hover:to-cyan-400"
            >
              {primaryLabel}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Button>
            {secondaryTo && (
              <Button
                to={secondaryTo}
                variant="outline"
                size="md"
                className="rounded-full border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50 hover:bg-white/20"
              >
                {secondaryLabel}
              </Button>
            )}
            {!secondaryTo && secondaryHref && (
              <Button
                href={secondaryHref}
                variant="outline"
                size="md"
                className="rounded-full border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50 hover:bg-white/20"
              >
                {secondaryLabel}
              </Button>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
