import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../common/Container.jsx'
import HeroServiceBadges from './HeroServiceBadges.jsx'

/**
 * One hero slide: full-bleed image, directional navy overlay (denser on the
 * text side), alternating content column, CTAs and capsule badges.
 * If the slide image file is missing it hides itself and the themed navy
 * gradient underneath keeps the text readable.
 */
const WIPE_S = 1.4
const CONTENT_DELAY_S = 1.2

export default function HeroSlide({ slide, index, count, reduced }) {
  const [imgError, setImgError] = useState(false)
  const isFirst = index === 0
  const textRight = slide.textSide === 'right'

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: -26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: CONTENT_DELAY_S + delay, ease: 'easeOut' },
        }

  return (
    <motion.div
      className="absolute inset-0"
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}: ${slide.eyebrow}`}
      initial={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)' }}
      animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)' }}
      exit={{ opacity: 0.99, transition: { duration: reduced ? 0.3 : WIPE_S } }}
      transition={{ duration: reduced ? 0.3 : WIPE_S, ease: [0.45, 0.05, 0.25, 1] }}
    >
      {/* Themed fallback gradient — visible if image is absent or loading */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-blue-900"
        aria-hidden="true"
      />

      {!imgError && (
        <motion.img
          src={slide.image}
          alt={slide.imageAlt}
          loading={isFirst ? 'eager' : 'lazy'}
          fetchPriority={isFirst ? 'high' : undefined}
          decoding="async"
          onError={() => setImgError(true)}
          initial={{ scale: reduced ? 1 : 1.18 }}
          animate={{ scale: reduced ? 1 : 1.05 }}
          transition={{ duration: 6, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: slide.imagePosition }}
        />
      )}

      {/* Phase 2: overlays settle in once the image has wiped down */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduced ? 0 : 0.7, ease: 'easeOut' }}
      >
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${
          textRight
            ? 'bg-gradient-to-l from-navy-950/90 via-navy-900/50 to-transparent'
            : 'bg-gradient-to-r from-navy-950/90 via-navy-900/50 to-transparent'
        }`}
      />
      {/* Extra overlay for small screens where text covers the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-950/35 sm:bg-navy-950/15 lg:bg-transparent"
      />
      {/* Bottom vignette + soft ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-navy-900/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 40%, rgba(56,189,248,0.10) 0%, transparent 70%)',
        }}
      />
      </motion.div>

      <Container className="relative z-10 flex h-full items-center py-8 sm:py-10">
        <div className={`max-w-xl ${textRight ? 'lg:ml-auto lg:text-right' : ''}`}>
          <motion.p
            {...fade(0.15)}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400"
          >
            {slide.eyebrow}
          </motion.p>

          <motion.h2
            {...fade(0.25)}
            className="mt-5 text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_16px_rgba(4,21,46,0.45)]"
          >
            {slide.headingBefore}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-700 bg-clip-text text-transparent sm:block">
              {slide.highlight}
            </span>
            {slide.headingAfter}
          </motion.h2>

          <motion.p
            {...fade(0.35)}
            className={`mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg ${
              textRight ? 'lg:ml-auto' : ''
            }`}
          >
            {slide.description}
          </motion.p>

          <motion.div
            {...fade(0.45)}
            className={`mt-8 flex flex-wrap items-center gap-3.5 ${
              textRight ? 'lg:justify-end' : ''
            }`}
          >
            <Link
              to={slide.primary.to}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/40 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              {slide.primary.label}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link
              to={slide.secondary.to}
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              {slide.secondary.label}
            </Link>
          </motion.div>

          <motion.div
            {...fade(0.5)}
            className={`mt-8 border-t border-white/15 pt-6 ${
              textRight ? 'lg:flex lg:justify-end' : ''
            }`}
          >
            <HeroServiceBadges reduced={reduced} staggerFrom={0.55} alignRight={textRight} />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}
