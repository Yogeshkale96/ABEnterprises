import Container from '../common/Container.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import TestimonialCard from '../cards/TestimonialCard.jsx'
import { SAMPLE_TESTIMONIALS } from '../../data/content.js'

export default function TestimonialsSection({ testimonials }) {
  // Only render items explicitly marked as sample when no verified data exists.
  const items = testimonials?.length ? testimonials : SAMPLE_TESTIMONIALS

  return (
    <section className="overflow-hidden bg-surface py-16 lg:py-20" aria-labelledby="testimonials-heading">
      {/* RTL marquee — seamless loop via duplicated sequence; pauses on hover and for reduced-motion */}
      <style>{`
        @keyframes ab-marquee-rtl {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ab-testimonials-track { animation: ab-marquee-rtl 40s linear infinite; }
        .ab-testimonials:hover .ab-testimonials-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ab-testimonials-track { animation-play-state: paused; }
        }
      `}</style>
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our"
          highlight="Clients Say"
          description="Feedback from businesses that trust AB Enterprises for their IT needs."
        />
        <div className="ab-testimonials relative" aria-label="Client testimonials carousel">
          {/* Edge fades */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-surface to-transparent sm:w-24"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-surface to-transparent sm:w-24"
          />
          <ul className="ab-testimonials-track flex w-max items-stretch gap-5">
            {[...items, ...items].map((t, i) => (
              <li
                key={`${t.id || t.customer_name}-${i}`}
                aria-hidden={i >= items.length}
                className="group w-72 shrink-0 transition-transform duration-300 hover:-translate-y-1 sm:w-80 lg:w-96"
              >
                <TestimonialCard testimonial={t} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
