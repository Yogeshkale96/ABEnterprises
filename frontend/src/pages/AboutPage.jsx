import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  Headphones,
  HeartHandshake,
  Home,
  ShieldCheck,
  Target,
  Wallet,
  Wrench,
} from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Button from '../components/common/Button.jsx'
import { DynamicIcon } from '../components/cards/ServiceCard.jsx'
import siteConfig from '../config/siteConfig.js'

const img = (name) => `${import.meta.env.BASE_URL}images/about/${name}`

const values = [
  {
    Icon: Target,
    title: 'Our Mission',
    text: 'To make reliable, affordable IT solutions accessible to every business and home.',
    detail: 'We focus on dependable hardware, correct installation and long-term support — so every client gets technology that simply works.',
    img: 'mission-card.jpg',
    overlay: 'from-navy-950/90 via-navy-900/75 to-blue-800/50',
    chip: 'bg-cyan-400/15 text-cyan-400',
    line: 'bg-cyan-400',
  },
  {
    Icon: Eye,
    title: 'Our Vision',
    text: 'To be the most trusted technology partner in the region — known for quality and support.',
    detail: 'Growing alongside our clients with the right products, honest guidance and technology that keeps their business moving forward.',
    img: 'vision-card.jpg',
    overlay: 'from-navy-950/90 via-navy-900/75 to-cyan-800/50',
    chip: 'bg-accent-yellow/20 text-accent-yellow',
    line: 'bg-accent-yellow',
  },
  { Icon: HeartHandshake, title: 'Our Promise', text: 'Genuine products, transparent pricing and support you can count on.' },
]

// Placeholder team — replace names/roles/quotes with verified staff details before launch.
const teamImg = (name) => `${import.meta.env.BASE_URL}images/team/${name}`
const TEAM = [
  {
    photo: 'member-1.jpg',
    name: 'Rahul Sharma',
    role: 'Full Stack Developer',
    quote: 'We build solutions end to end — from the database to the interface, everything works as one system.',
  },
  {
    photo: 'member-2.jpg',
    name: 'Amit Patel',
    role: 'Web Developer',
    quote: 'A good website should be fast, clean and easy for every visitor — that is the standard we build to.',
  },
  {
    photo: 'member-3.jpg',
    name: 'Priya Verma',
    role: 'Technical Support Engineer',
    quote: 'Good support is fast, honest and consistent — our clients should never feel stuck.',
  },
  {
    photo: 'member-4.jpg',
    name: 'Vikram Singh',
    role: 'Network Engineer',
    quote: 'A stable network is invisible — it just works, and that is exactly how it should be.',
  },
  {
    photo: 'member-5.jpg',
    name: 'Sneha Joshi',
    role: 'Solutions Consultant',
    quote: 'The right product at the right budget — we recommend what fits, not what costs more.',
  },
  {
    photo: 'member-6.jpg',
    name: 'Arjun Desai',
    role: 'AMC & Maintenance Lead',
    quote: 'Systems that are maintained well simply last longer — prevention beats repair.',
  },
]

const TRUST = [
  { Icon: BadgeCheck, label: 'Quality-Focused Solutions' },
  { Icon: Headphones, label: 'Expert Technical Support' },
  { Icon: HeartHandshake, label: 'Reliable After-Sales Service' },
]

const DIFFERENTIATORS = [
  { Icon: ShieldCheck, title: 'Quality Products & Services', text: 'Genuine, high-quality IT products supplied with professional service.', accent: 'blue' },
  { Icon: Headphones, title: 'Expert Technical Support', text: 'Experienced professionals providing reliable, timely assistance.', accent: 'cyan' },
  { Icon: Wallet, title: 'Affordable Solutions', text: 'Cost-effective IT solutions matched to every budget and requirement.', accent: 'gold' },
  { Icon: Home, title: 'Home & Office Service Available', text: 'On-site support for homes, offices and institutions.', accent: 'navy' },
  { Icon: Wrench, title: 'AMC & Maintenance Support', text: 'Regular maintenance and AMCs that keep systems performing.', accent: 'blue' },
  { Icon: HeartHandshake, title: 'Customer-Focused Assistance', text: 'We understand requirements first, then recommend the right solution.', accent: 'cyan' },
]

const ACCENT = {
  blue: {
    chip: 'border-blue-600/30 bg-blue-700/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
    line: 'bg-blue-600',
    glow: 'bg-blue-600/15',
  },
  cyan: {
    chip: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-navy-950',
    line: 'bg-cyan-500',
    glow: 'bg-cyan-500/20',
  },
  gold: {
    chip: 'border-accent-yellow/50 bg-accent-yellow/15 text-amber-600 group-hover:bg-accent-yellow group-hover:text-navy-950',
    line: 'bg-accent-yellow',
    glow: 'bg-accent-yellow/25',
  },
  navy: {
    chip: 'border-navy-700/30 bg-navy-900/10 text-navy-800 group-hover:bg-navy-900 group-hover:text-cyan-400',
    line: 'bg-navy-800',
    glow: 'bg-navy-800/15',
  },
}

// Count-up that respects prefers-reduced-motion.
function useCountUp(target, start, reduce) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start || reduce) return undefined
    const t0 = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - t0) / 1200, 1)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, reduce])
  return reduce ? target : v
}

function StatInline({ stat, started, reduce }) {
  const value = useCountUp(stat.value, started, reduce)
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-white/10">
      <DynamicIcon name={stat.icon} className="h-6 w-6 shrink-0 text-cyan-400" />
      <div>
        <p className="text-3xl font-extrabold leading-none tracking-tight">
          {value}
          <span className="text-accent-yellow">{stat.suffix}</span>
        </p>
        <p className="mt-1.5 text-xs font-semibold text-white/70">{stat.label}</p>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const reduce = useReducedMotion()
  const statsRef = useRef(null)
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    document.title = 'About Us | AB Enterprises Private Limited'
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.55, delay, ease: 'easeOut' },
        }

  return (
    <>
      {/* ===== Hero — full-bleed image, copy left ===== */}
      <section className="relative overflow-hidden bg-navy-950 text-white" aria-labelledby="about-hero-heading">
        <img
          src={`${import.meta.env.BASE_URL}homehero/${encodeURIComponent('Futuristic Blue IT Workspace.png')}`}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-900/35"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"
        />
        <Container className="relative py-5 sm:py-6 lg:py-7">
          <motion.div {...rise()} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              About AB Enterprises
            </p>
            <h1 id="about-hero-heading" className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Technology That{' '}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Empowers Every Business
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              We deliver reliable IT products, technology services, security solutions, and
              business-focused digital support to help organizations work smarter and grow
              confidently.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                to="/services"
                variant="primary"
                size="md"
                className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 pl-6 pr-2 shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-cyan-400"
              >
                Explore Our Expertise
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="md"
                className="rounded-full border-white/40 bg-white/5 backdrop-blur-sm hover:border-cyan-400 hover:text-cyan-300"
              >
                Contact Our Team
              </Button>
            </div>
            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {TRUST.map(({ Icon, label }) => (
                <li key={label} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs font-semibold text-white/80">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </section>

      {/* ===== Editorial intro — image left, copy right ===== */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="about-intro-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...rise()} className="relative pb-10 pr-6 sm:pb-12">
              {/* Decorative frame + gold accent behind the collage */}
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border-2 border-cyan-400/50"
              />
              <span
                aria-hidden="true"
                className="absolute right-14 top-6 z-10 h-3 w-3 rounded-full bg-accent-yellow shadow"
              />
              {/* Main photo */}
              <img
                src={img('intro-technician.jpg')}
                alt="IT technician working on computer hardware"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/3] w-[88%] rounded-2xl object-cover shadow-card-hover"
              />
              {/* Overlapping second photo */}
              <img
                src={img('expertise-work.jpg')}
                alt="IT professional configuring networking equipment"
                loading="lazy"
                decoding="async"
                className="absolute bottom-0 right-0 aspect-square w-2/5 rounded-2xl border-4 border-white object-cover shadow-card-hover"
              />
            </motion.div>
            <motion.div {...rise(0.1)}>
              <SectionHeading
                id="about-intro-heading"
                align="left"
                eyebrow="Who We Are"
                title="Your Trusted Partner"
                highlight="in Technology"
                description="A dedicated team supplying reliable IT products, services and support for businesses and homes."
              />
              <p className="leading-relaxed text-ink-soft">
                <strong className="font-semibold text-navy-900">AB ENTERPRISES PRIVATE LIMITED</strong>{' '}
                is a dedicated IT solutions provider offering a wide range of IT products and
                technology services for businesses, institutions, and individuals. We focus on{' '}
                <span className="font-semibold text-blue-700">delivering reliable hardware, software,</span>{' '}
                networking, security solutions, and digital services with a strong commitment to
                quality, customer support, and long-term relationships.
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Our goal is to make technology simple, accessible, and effective for every
                business by providing{' '}
                <span className="font-semibold text-blue-700">
                  the right products, professional services, and continuous support
                </span>
                .
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Statistics — navy feature panel + three cards ===== */}
      <section className="bg-surface py-14 lg:py-16" aria-labelledby="about-stats-heading">
          <motion.div
            ref={statsRef}
            {...rise()}
            className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-800 px-5 py-8 text-white sm:px-8 lg:px-12"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
              {/* Inline label panel */}
              <div className="shrink-0 lg:max-w-[210px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                  Our Impact
                </p>
                <h2 id="about-stats-heading" className="mt-1.5 text-lg font-extrabold leading-snug">
                  Numbers That Reflect Our Commitment
                </h2>
                <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent-yellow" />
              </div>
              {/* Single stats row */}
              <div className="grid flex-1 grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {siteConfig.stats.map((stat) => (
                  <StatInline key={stat.label} stat={stat} started={statsStarted} reduce={reduce} />
                ))}
              </div>
            </div>
          </motion.div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="mission-vision-heading">
        <Container>
          <SectionHeading
            id="mission-vision-heading"
            eyebrow="What Drives Us"
            title="Our Mission &"
            highlight="Vision"
            description="The principles behind everything we deliver."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {values.slice(0, 2).map(({ Icon, title, text, detail, img: bg, overlay, chip, line }, i) => (
              <motion.div
                key={title}
                {...rise(i * 0.1)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950 p-8 text-white shadow-card"
              >
                {/* Thematic background image — zooms on hover */}
                <img
                  src={img(bg)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${overlay}`} />
                <span
                  aria-hidden="true"
                  className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${chip}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 text-xl font-extrabold text-white">{title}</h3>
                <p className="relative mt-3 leading-relaxed text-white/85">{text}</p>
                {/* Expands on hover, collapses on leave */}
                <div className="relative grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                  <p className="overflow-hidden border-l-2 border-cyan-400/60 pl-3 pt-0 text-sm leading-relaxed text-cyan-100/90 group-hover:pt-3">
                    {detail}
                  </p>
                </div>
                <span aria-hidden="true" className={`relative mt-6 block h-0.5 w-10 rounded-full ${line}`} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== What Makes Us Different ===== */}
      <section className="relative overflow-hidden bg-surface py-16 lg:py-20" aria-labelledby="different-heading">
        {/* Soft ambient glows behind the grid */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
        <Container className="relative">
          <SectionHeading
            id="different-heading"
            eyebrow="Why Choose Us"
            title="What Makes Us"
            highlight="Different"
            description="We combine quality products, professional services, and customer-focused support to deliver the right technology solutions for every business."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map(({ Icon, title, text, accent }, i) => (
              <motion.div
                key={title}
                {...rise(0.05 * i)}
                className={`group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-600/50 hover:shadow-card-hover ${
                  i === 0 || i === 5 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Soft accent glow blooming from the corner on hover */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150 ${ACCENT[accent].glow}`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-1 origin-top scale-y-0 ${ACCENT[accent].line} transition-transform duration-300 group-hover:scale-y-100`}
                />
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${ACCENT[accent].chip}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-navy-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Supporting visual — light editorial split ===== */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="expertise-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...rise()}>
              <SectionHeading
                id="expertise-heading"
                align="left"
                eyebrow="Our Expertise"
                title="Practical IT Expertise,"
                highlight="Built Around Your Business"
                description="End-to-end capability across hardware, networking, security and software."
              />
              <p className="leading-relaxed text-ink-soft">
                From hardware setup and networking to security systems and software solutions, we
                help businesses implement dependable technology and get the right support at every
                stage.
              </p>
              <ul className="mt-5 space-y-2.5">
                {['Dependable on-site implementation', 'Right support at every stage'].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm font-semibold text-navy-900">
                    <span className="h-2 w-2 rounded-full bg-accent-yellow" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <Button to="/contact" variant="outlineBlue" size="md" className="mt-7 rounded-full">
                Talk to Our Team <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>
            <motion.div {...rise(0.1)} className="relative">
              <div
                aria-hidden="true"
                className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border-2 border-accent-yellow/60"
              />
              <img
                src={img('expertise-work.jpg')}
                alt="IT professional configuring networking equipment"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-card-hover"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-4 left-6 h-3 w-3 rounded-full bg-cyan-500 shadow"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== Meet the Team ===== */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="team-heading">
        <Container>
          <SectionHeading
            id="team-heading"
            eyebrow="Our People"
            title="Meet the"
            highlight="Team"
            description="The people behind the products, installations and support."
          />
          <div className="relative overflow-hidden">
            {/* Edge fades */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent"
            />
            {/* Duplicated track scrolling right-to-left */}
            <div className="flex w-max gap-6 motion-safe:animate-[ab-team-marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
              {[...TEAM, ...TEAM].map((m, i) => (
                <figure
                  key={`${m.photo}-${i}`}
                  aria-hidden={i >= TEAM.length}
                  className="group w-64 shrink-0 overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={teamImg(m.photo)}
                      alt={i >= TEAM.length ? '' : `${m.role} — ${siteConfig.company.name} team`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-navy-950/60 to-transparent"
                    />
                  </div>
                  <figcaption className="p-4">
                    <p className="font-bold text-navy-900">{m.name}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{m.role}</p>
                    <blockquote className="mt-2 border-l-2 border-accent-yellow/70 pl-3 text-xs italic leading-relaxed text-ink-soft">
                      “{m.quote}”
                    </blockquote>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
        <style>{`
          @keyframes ab-team-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ===== Closing CTA ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-8 text-white lg:py-10" aria-labelledby="about-cta-heading">
        <img
          src={img('network-globe.jpg')}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-blue-700/60"
        />
        <Container className="relative">
          <motion.div
            {...rise()}
            className="flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:gap-8 lg:text-left"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                Let’s Work Together
              </p>
              <h2 id="about-cta-heading" className="mt-1.5 text-xl font-extrabold sm:text-2xl">
                Let’s Build a Smarter{' '}
                <span className="text-cyan-400">Technology Environment</span>
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                Connect with our team to discuss your IT requirements and find the right solution
                for your business.
              </p>
            </div>
            <Button
              to="/contact"
              variant="primary"
              size="md"
              className="shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 pl-6 pr-2 shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-cyan-400"
            >
              Contact Us
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Button>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
