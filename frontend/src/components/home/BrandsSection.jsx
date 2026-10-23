import { useState } from 'react'
import Container from '../common/Container.jsx'
import SectionHeading from '../common/SectionHeading.jsx'

const IMG_BASE = `${import.meta.env.BASE_URL}homehero/`
const img = (name) => `${IMG_BASE}${encodeURIComponent(name)}`

// Official logo SVGs live in public/images/brands/<slug>.svg. If a local
// file is missing (currently: canon) the Simple Icons CDN is tried next,
// then a styled wordmark as the final fallback.
const BRANDS = [
  { name: 'Dell', slug: 'dell' },
  { name: 'HP', slug: 'hp' },
  { name: 'Lenovo', slug: 'lenovo' },
  { name: 'Canon', slug: 'canon' },
  { name: 'ASUS', slug: 'asus' },
  { name: 'Acer', slug: 'acer' },
  { name: 'Samsung', slug: 'samsung' },
]

// Blended tint per card — soft accent gradients so each logo sits on its own colourway.
const CARD_ACCENTS = [
  'border-blue-600/25 bg-gradient-to-br from-blue-600/10 via-white to-cyan-500/15 hover:border-blue-600/60',
  'border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-white to-blue-700/10 hover:border-cyan-500/60',
  'border-accent-yellow/40 bg-gradient-to-br from-accent-yellow/15 via-white to-cyan-500/10 hover:border-accent-yellow/70',
  'border-navy-700/25 bg-gradient-to-br from-navy-800/10 via-white to-cyan-500/15 hover:border-navy-700/60',
]

function BrandLogo({ name, slug }) {
  // stage 0 = local asset, 1 = CDN, 2 = text fallback
  const [stage, setStage] = useState(0)
  if (stage === 2) {
    return (
      <span className="text-xl font-extrabold tracking-wide text-navy-900 sm:text-2xl lg:text-3xl">
        {name}
      </span>
    )
  }
  const src =
    stage === 0
      ? `${import.meta.env.BASE_URL}images/brands/${slug}.svg`
      : `https://cdn.simpleicons.org/${slug}`
  return (
    <img
      src={src}
      alt={`${name} official logo`}
      loading="lazy"
      decoding="async"
      onError={() => setStage((s) => s + 1)}
      className="h-16 w-auto max-w-[85%] object-contain drop-shadow-sm sm:h-20 lg:h-24"
    />
  )
}

export default function BrandsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 lg:py-16" aria-labelledby="brands-heading">
      {/* Translucent layered background — radial blue glow + corner ambient lights */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-blue-700/10 blur-3xl" />
      </div>
      {/* Marquee keyframes — kept with the component; paused on hover and for reduced-motion users */}
      <style>{`
        @keyframes ab-marquee-ltr {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .ab-marquee-track { animation: ab-marquee-ltr 36s linear infinite; }
        .ab-marquee:hover .ab-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ab-marquee-track { animation-play-state: paused; }
        }
      `}</style>
      <Container className="relative">
        <div className="relative">
          <SectionHeading
            eyebrow="Trusted Brands"
            title="Products from"
            highlight="Leading Brands"
            description="We source and supply reliable technology products from globally recognized brands for businesses of every size."
          />
          {/* AI-generated showroom artwork — decorative accent beside the heading */}
          <div className="absolute right-0 top-0 hidden h-24 w-40 overflow-hidden rounded-2xl border border-navy-900/10 shadow-card lg:block">
            <img
              src={img('Futuristic Blue IT Workspace.png')}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-navy-950/15" />
          </div>
        </div>

        <div className="ab-marquee relative" aria-label="Brand logo carousel">
          {/* Edge fades over the carousel */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent sm:w-24"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent sm:w-24"
          />
          <ul className="ab-marquee-track flex w-max items-stretch gap-4 sm:gap-5">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <li
                key={`${brand.slug}-${i}`}
                aria-hidden={i >= BRANDS.length}
                className={`flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:w-48 lg:h-28 lg:w-56 ${CARD_ACCENTS[i % CARD_ACCENTS.length]}`}
              >
                <BrandLogo name={brand.name} slug={brand.slug} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
