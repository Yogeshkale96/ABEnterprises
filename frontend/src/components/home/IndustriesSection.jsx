import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../common/Container.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import { DynamicIcon } from '../cards/ServiceCard.jsx'
import { FALLBACK_INDUSTRIES } from '../../data/content.js'

// Each card cycles through a palette accent — chip + top line colours vary.
const ACCENTS = [
  {
    chip: 'border-white/20 bg-blue-700/85 text-white group-hover:bg-blue-700 group-hover:text-cyan-300',
    line: 'from-blue-700 to-cyan-500',
  },
  {
    chip: 'border-white/20 bg-cyan-500/85 text-navy-950 group-hover:bg-cyan-400 group-hover:text-navy-950',
    line: 'from-cyan-500 to-blue-700',
  },
  {
    chip: 'border-white/20 bg-accent-yellow/90 text-navy-950 group-hover:bg-accent-yellow group-hover:text-navy-950',
    line: 'from-accent-yellow to-cyan-500',
  },
  {
    chip: 'border-white/20 bg-navy-950/85 text-cyan-400 group-hover:bg-navy-900 group-hover:text-cyan-300',
    line: 'from-navy-800 to-cyan-400',
  },
]

export default function IndustriesSection() {
  return (
    <section className="bg-white py-16 lg:py-20" aria-labelledby="industries-heading">
      <Container>
        <SectionHeading
          eyebrow="Who We Serve"
          title="Industries"
          highlight="We Serve"
          description="Tailored IT solutions for every sector — offices, institutions and homes."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {FALLBACK_INDUSTRIES.map((ind, i) => {
            const accent = ACCENTS[i % ACCENTS.length]
            return (
            <Link
              key={ind.slug}
              to={`/industries/${ind.slug}`}
              className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-950 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/60 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-blue-600 sm:h-52"
              aria-label={`${ind.name} — solutions`}
            >
              {/* Highlighted thematic photo — info sits on top via the navy gradient */}
              <img
                src={ind.image}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/25 transition-colors duration-300 group-hover:from-navy-950"
              />
              {/* Subtle top accent line on hover */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${accent.line} transition-transform duration-300 group-hover:scale-x-100`}
              />
              <div className="relative flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ${accent.chip}`}>
                  <DynamicIcon name={ind.icon} className="h-5 w-5" />
                </span>
                <ArrowRight
                  className="h-4 w-4 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-400"
                  aria-hidden="true"
                />
              </div>
              <div className="relative">
                <h3 className="text-sm font-bold leading-snug text-white sm:text-base">
                  {ind.name}
                </h3>
                <p className="mt-1 hidden text-[13px] leading-relaxed text-white/75 sm:block">
                  {ind.description}
                </p>
              </div>
            </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
