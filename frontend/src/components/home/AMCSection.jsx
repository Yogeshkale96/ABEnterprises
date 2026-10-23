import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Wrench } from 'lucide-react'
import Container from '../common/Container.jsx'
import { DynamicIcon } from '../cards/ServiceCard.jsx'

const items = [
  { label: 'Computer & Laptop AMC', icon: 'Laptop' },
  { label: 'Printer AMC', icon: 'Printer' },
  { label: 'CCTV AMC', icon: 'Cctv' },
  { label: 'Networking Support', icon: 'Network' },
  { label: 'Complete IT Support', icon: 'Wrench' },
  { label: 'On-Site Service', icon: 'MapPin' },
]

export default function AMCSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white lg:py-20" aria-labelledby="amc-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-700/15 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
            AMC & Technical Support
          </p>
          <h2 id="amc-heading" className="mt-5 text-3xl font-bold md:text-4xl">
            Keep Your IT Running with <span className="text-accent-yellow">Annual Maintenance</span>
          </h2>
          <p className="mt-4 max-w-lg text-white/75">
            Preventive maintenance, priority support and fast repairs — so your business never
            stops. Choose an AMC plan that fits your equipment and budget.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/request-quote?type=amc"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/40 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              Get AMC Plan
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            <Link
              to="/amc-support"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              View AMC Plans
            </Link>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map(({ label, icon }) => (
            <li
              key={label}
              className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-600/50 bg-navy-950/60 text-cyan-400">
                <DynamicIcon name={icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1 text-sm font-semibold leading-snug">{label}</span>
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-cyan-400/50 transition-colors duration-300 group-hover:text-cyan-400"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
