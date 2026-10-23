import { Quote, Star } from 'lucide-react'

export default function TestimonialCard({ testimonial }) {
  const rating = Math.max(0, Math.min(5, testimonial.rating || 0))
  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:border-blue-600/60 hover:shadow-card-hover">
      {/* Gradient accent sweeps across the top edge on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-700 to-cyan-500 transition-transform duration-300 group-hover:scale-x-100"
      />
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-blue text-blue-700 transition-colors duration-300 group-hover:bg-navy-950 group-hover:text-cyan-400">
        <Quote className="h-5 w-5" aria-hidden="true" />
      </span>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Circular avatar — reviewer initials (swap for a photo when available) */}
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-navy-900 text-xs font-bold text-white ring-2 ring-blue-600/20"
            >
              {(testimonial.customer_name || '?')
                .split(' ')
                .filter(Boolean)
                .map((w) => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight text-navy-900">{testimonial.customer_name}</p>
              <p className="mt-0.5 text-xs leading-tight text-ink-soft">{testimonial.organization}</p>
            </div>
          </div>
          <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < rating ? 'fill-accent-yellow text-accent-yellow' : 'text-line'}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        {testimonial.is_sample && (
          <p className="mt-2 text-[10px] italic text-ink-soft">Sample content — for development only</p>
        )}
      </figcaption>
    </figure>
  )
}
