import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../common/Container.jsx'

export default function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 py-8 text-white lg:py-10"
      aria-labelledby="cta-heading"
    >
      {/* AI artwork background with a softened navy overlay — less saturated than a flat gradient */}
      <img
        src={`${import.meta.env.BASE_URL}homehero/${encodeURIComponent('Futuristic Blue Data Center Network.png')}`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-950/70" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
      <Container className="relative flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 id="cta-heading" className="text-xl font-bold sm:text-2xl">
            Need a Customized IT Solution?
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-white/70">
            Tell us your requirement — hardware, software, security or support — and our team
            will prepare a tailored quote for your business.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <Link
            to="/request-quote"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/40 focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            Request a Quote
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  )
}
