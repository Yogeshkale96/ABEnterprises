import { BadgeCheck, Headphones, Home, IndianRupee, Wrench, Zap } from 'lucide-react'
import Container from '../common/Container.jsx'

const benefits = [
  { Icon: BadgeCheck, label: 'Quality Products & Services' },
  { Icon: Home, label: 'Home & Office Service Available' },
  { Icon: Zap, label: 'Fast & Friendly Service' },
  { Icon: Headphones, label: 'Great Support' },
  { Icon: IndianRupee, label: 'Affordable Pricing' },
  { Icon: Wrench, label: 'AMC & Maintenance' },
]

/**
 * Filled navy benefits band — a seamless continuation of the hero/navbar.
 * Single row on desktop, 3-across on tablet, 2-across on mobile.
 */
export default function BenefitsStrip() {
  return (
    <section
      className="border-t border-cyan-400/15 bg-gradient-to-r from-navy-950/95 via-navy-800/85 to-navy-950/95 py-5 sm:py-6"
      aria-label="Why choose us"
    >
      <Container>
        <ul className="grid grid-cols-2 divide-white/10 max-lg:gap-y-3 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {benefits.map(({ Icon, label }) => (
            <li
              key={label}
              className="group flex items-center justify-center gap-2.5 rounded-lg px-3 py-2.5 text-center transition-colors duration-200 hover:bg-white/5 sm:px-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-cyan-400 transition-all duration-200 group-hover:scale-110 group-hover:bg-blue-700 group-hover:text-white">
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span className="text-left text-xs font-semibold leading-snug text-white/85 transition-colors duration-200 group-hover:text-white sm:text-[13px]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
