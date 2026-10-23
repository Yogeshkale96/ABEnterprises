import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HeroSlide from './HeroSlide.jsx'
import HeroControls from './HeroControls.jsx'
import { heroSlides, HERO_SLIDE_COUNT } from '../../data/heroSlides.js'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference.js'

const AUTOPLAY_MS = 5500
const SWIPE_THRESHOLD = 60

/**
 * Full-width premium hero carousel: bottom-up wipe reveal, continuous
 * autoplay, arrow keys, pointer swipe and pagination.
 */
export default function HeroCarousel() {
  const reduced = useReducedMotionPreference()
  const [{ index }, setState] = useState({ index: 0, direction: 1 })
  const pointerStart = useRef(null)

  const goTo = useCallback(
    (i) =>
      setState((s) => {
        const target = ((i % HERO_SLIDE_COUNT) + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT
        return { index: target, direction: target >= s.index ? 1 : -1 }
      }),
    []
  )
  const next = useCallback(
    () => setState((s) => ({ index: (s.index + 1) % HERO_SLIDE_COUNT, direction: 1 })),
    []
  )
  const prev = useCallback(
    () =>
      setState((s) => ({
        index: (s.index - 1 + HERO_SLIDE_COUNT) % HERO_SLIDE_COUNT,
        direction: -1,
      })),
    []
  )

  // Continuous autoplay on a fixed interval; restarts after any manual change.
  useEffect(() => {
    if (HERO_SLIDE_COUNT < 2) return undefined
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [index, next])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
  }

  const onPointerDown = (e) => {
    pointerStart.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (pointerStart.current == null) return
    const dx = e.clientX - pointerStart.current
    pointerStart.current = null
    if (dx <= -SWIPE_THRESHOLD) next()
    else if (dx >= SWIPE_THRESHOLD) prev()
  }

  return (
    <section
      className="relative h-[500px] overflow-hidden bg-navy-950 sm:h-[460px] lg:h-[500px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="AB Enterprises highlights"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <AnimatePresence initial={false}>
        <HeroSlide
          key={heroSlides[index].key}
          slide={heroSlides[index]}
          index={index}
          count={HERO_SLIDE_COUNT}
          reduced={reduced}
        />
      </AnimatePresence>

      <HeroControls count={HERO_SLIDE_COUNT} index={index} onSelect={goTo} />
    </section>
  )
}
