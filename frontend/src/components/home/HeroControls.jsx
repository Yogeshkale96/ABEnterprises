/**
 * Carousel pagination dots — navigation arrows removed; slides advance via
 * autoplay, swipe, keyboard, or these dots.
 */
export default function HeroControls({ count, index, onSelect }) {
  return (
    <div
      className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
      role="tablist"
      aria-label="Choose slide"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
            i === index
              ? 'w-8 bg-accent-yellow'
              : 'w-2.5 bg-white/40 hover:bg-white/70'
          }`}
        />
      ))}
    </div>
  )
}
