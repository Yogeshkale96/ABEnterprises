import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Button from '../components/common/Button.jsx'
import ServiceDirectoryCard from '../components/services/ServiceDirectoryCard.jsx'
import ServiceProcess from '../components/services/ServiceProcess.jsx'
import ServiceFAQ from '../components/services/ServiceFAQ.jsx'
import ServiceCTA from '../components/services/ServiceCTA.jsx'
import { DynamicIcon } from '../components/cards/ServiceCard.jsx'
import ServiceBackdrop from '../components/services/ServiceBackdrop.jsx'
import { SERVICE_THEMES } from '../data/serviceThemes.js'
import { setPageMeta } from '../utils/seo.js'
import serviceService from '../services/serviceService.js'
import {
  SERVICE_DIRECTORY,
  CUSTOMER_TYPES,
  WORK_PROCESS,
  WHY_POINTS,
  MAIN_FAQS,
  SVC_IMAGES,
} from '../data/servicesData.js'

const TRUST_CHIPS = ['Products, Services & Support', 'For Business & Institutions', 'On-Site Assistance']

const CUST_ACCENTS = [
  { chip: 'border-blue-600/30 bg-blue-700/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white', glow: 'bg-blue-600/15', item: 'text-blue-700' },
  { chip: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-navy-950', glow: 'bg-cyan-500/20', item: 'text-cyan-600' },
  { chip: 'border-accent-yellow/50 bg-accent-yellow/15 text-amber-600 group-hover:bg-accent-yellow group-hover:text-navy-950', glow: 'bg-accent-yellow/25', item: 'text-amber-600' },
  { chip: 'border-navy-700/30 bg-navy-900/10 text-navy-800 group-hover:bg-navy-900 group-hover:text-cyan-400', glow: 'bg-navy-800/15', item: 'text-navy-800' },
]

export default function ServicesPage() {
  const reduce = useReducedMotion()
  const [apiBlurbs, setApiBlurbs] = useState({})

  useEffect(() => {
    setPageMeta(
      'Our Services | AB Enterprises Private Limited',
      'Website & software development, digital marketing, IT support, networking, CCTV, access control, AMC plans and institutional IT supply — one trusted team.'
    )
  }, [])

  // Keep the API integration: when reachable, its descriptions enrich the directory.
  useEffect(() => {
    let cancelled = false
    serviceService
      .list({ limit: 50 })
      .then((data) => {
        if (cancelled || !Array.isArray(data?.items)) return
        const map = {}
        for (const s of data.items) {
          if (s?.slug && s?.short_description) map[s.slug] = s.short_description
        }
        setApiBlurbs(map)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const fade = (d = 0) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: d, ease: 'easeOut' } }

  const rise = (d = 0) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.55, delay: d, ease: 'easeOut' } }

  const directory = SERVICE_DIRECTORY.map((s) =>
    apiBlurbs[s.slug] ? { ...s, blurb: apiBlurbs[s.slug] } : s
  )

  return (
    <>
      {/* ===== 1. Hero — full-bleed image, copy left ===== */}
      <section className="relative overflow-hidden bg-navy-950 text-white" aria-labelledby="services-hero-heading">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-blue-900" />
        <img
          src={SVC_IMAGES('services-hero.jpg')}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/65 to-navy-900/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-navy-900/15" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(55% 45% at 75% 40%, rgba(56,189,248,0.12) 0%, transparent 70%)' }}
        />
        <Container className="relative py-5 sm:py-6 lg:py-7">
          <div className="max-w-2xl">
            <motion.p
              {...fade(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400"
            >
              Our Services
            </motion.p>
            <motion.h1
              id="services-hero-heading"
              {...fade(0.15)}
              className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_16px_rgba(4,21,46,0.45)] sm:text-4xl"
            >
              Technology Solutions Designed{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent sm:block">
                Around Your Business
              </span>
            </motion.h1>
            <motion.p {...fade(0.25)} className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              AB ENTERPRISES PRIVATE LIMITED provides technology products, digital development,
              IT infrastructure, security systems and technical support to help businesses,
              institutions and individuals operate more efficiently.
            </motion.p>
            <motion.div {...fade(0.35)} className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                href="#service-directory"
                variant="primary"
                size="md"
                className="group rounded-full border border-white/20 bg-gradient-to-b from-cyan-500 via-blue-600 to-blue-800 py-1 pl-5 pr-1 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(0,0,0,0.35),0_10px_24px_-8px_rgba(37,99,235,0.6)] transition-all duration-300 hover:border-slate-300 hover:from-white hover:via-white hover:to-slate-200 hover:text-navy-900 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(148,163,184,0.5),0_10px_24px_-8px_rgba(37,99,235,0.4)]"
              >
                Explore Our Services
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-blue-700 group-hover:text-white">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="md"
                className="rounded-full border border-white/30 bg-gradient-to-b from-white/15 to-white/5 px-5 py-2 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_18px_-10px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/70 hover:from-cyan-400/35 hover:to-blue-600/25 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-8px_rgba(34,211,238,0.5)]"
              >
                Request a Consultation
              </Button>
            </motion.div>
            <motion.ul {...fade(0.45)} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-white/15 pt-4">
              {TRUST_CHIPS.map((t) => (
                <li key={t} className="flex items-center gap-2 text-xs font-semibold text-white/80">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </section>

      {/* ===== 2. Service directory ===== */}
      <section id="service-directory" className="scroll-mt-20 bg-surface py-16 lg:py-20" aria-labelledby="directory-heading">
        <Container>
          <SectionHeading
            id="directory-heading"
            eyebrow="Service Directory"
            title="Complete Technology Solutions"
            highlight="Under One Roof"
            description="Discover our website, software, digital marketing, IT support, networking, security and institutional technology solutions."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {directory.map((s, i) => (
              <ServiceDirectoryCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ===== 3. Solutions by customer type ===== */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-20" aria-labelledby="customers-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>
        <Container className="relative">
          <SectionHeading
            id="customers-heading"
            eyebrow="Who We Serve"
            title="Technology for Every"
            highlight="Working Environment"
            description="Different environments need different combinations — here is how our services map to yours."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CUSTOMER_TYPES.map(({ icon, name, text, services, image, imageAlt }, i) => {
              const a = CUST_ACCENTS[i % CUST_ACCENTS.length]
              return (
                <motion.article
                  key={name}
                  {...rise((i % 3) * 0.06)}
                  className="group relative overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-950 p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:shadow-card-hover"
                >
                  {/* Environment photo behind the card content */}
                  <img
                    src={image}
                    alt={imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-navy-950/85 via-navy-950/70 to-blue-900/40"
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-150 ${a.glow}`}
                  />
                  <span className={`relative flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 ${a.chip}`}>
                    <DynamicIcon name={icon} className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-4 font-bold text-white">{name}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-white/80">{text}</p>
                  <ul className="relative mt-4 flex flex-wrap gap-1.5">
                    {services.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-200 backdrop-blur-sm"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ===== 4. How we work ===== */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="process-heading">
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="How We Work"
            title="A Clear and"
            highlight="Professional Process"
            description="From first conversation to ongoing support — the same structured approach on every engagement."
          />
          <ServiceProcess steps={WORK_PROCESS} />
        </Container>
      </section>

      {/* ===== 5. Why choose us — asymmetric ===== */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="why-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                id="why-heading"
                align="left"
                eyebrow="Why Choose Us"
                title="Why AB ENTERPRISES"
                highlight="PRIVATE LIMITED?"
                description="One team for technology products, services and support — with recommendations made for your situation, not our convenience."
              />
              <div className="group relative overflow-hidden rounded-2xl border border-blue-700/25 bg-gradient-to-b from-navy-950 to-blue-900 p-6 text-white shadow-card">
                <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl" />
                <p className="relative text-sm font-semibold text-cyan-400">One accountable partner</p>
                <p className="relative mt-2 text-sm leading-relaxed text-white/75">
                  Products, installation, development and support from the same team — so nothing
                  falls between vendors when something needs attention.
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              {WHY_POINTS.map(({ icon, title, text }, i) => (
                <motion.li
                  key={title}
                  {...rise(i * 0.04)}
                  className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600/50 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-600/30 bg-blue-700/10 text-blue-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                    <DynamicIcon name={icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-navy-900">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ===== 6. Featured spotlight — editorial frame ===== */}
      <section className="bg-surface py-16 lg:py-20" aria-labelledby="spotlight-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...rise()} className="relative pb-8 pr-4 sm:pr-6">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border-2 border-cyan-400/50"
              />
              <span
                aria-hidden="true"
                className="absolute right-10 top-4 z-10 h-3 w-3 rounded-full bg-accent-yellow shadow"
              />
              <img
                src={SVC_IMAGES('spotlight.jpg')}
                alt="IT professional configuring networking and security equipment"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-card-hover"
              />
            </motion.div>
            <motion.div {...rise(0.1)}>
              <SectionHeading
                align="left"
                eyebrow="Business Technology"
                title="Build a More Reliable"
                highlight="Technology Environment"
              />
              <p className="leading-relaxed text-ink-soft">
                The right combination of IT equipment, connectivity, security and maintenance keeps
                an organisation running — fewer interruptions, faster support and infrastructure
                that was planned rather than accumulated.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  'Infrastructure matched to your actual workload',
                  'Connectivity designed for your space',
                  'Security systems integrated, not bolted on',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm font-semibold text-navy-900">
                    <span className="h-2 w-2 rounded-full bg-accent-yellow" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <Button to="/services/networking-solutions" variant="primary" size="md" className="group mt-7 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-6 pr-1.5 hover:from-blue-600 hover:to-cyan-400">
                Explore IT Solutions
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== 7. AMC promotion ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-16 text-white lg:py-20" aria-labelledby="amc-promo-heading">
        <ServiceBackdrop src={SVC_IMAGES('computer-laptop-services.jpg')} theme={SERVICE_THEMES['amc-support']} tint="opacity-80" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(55% 55% at 80% 50%, rgba(56,189,248,0.10) 0%, transparent 70%)' }}
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <motion.p
              {...rise()}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400"
            >
              AMC Support
            </motion.p>
            <motion.h2 {...rise(0.08)} id="amc-promo-heading" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Keep Your Technology{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Running Smoothly
              </span>
            </motion.h2>
            <motion.p {...rise(0.14)} className="mt-4 max-w-xl leading-relaxed text-white/75">
              An Annual Maintenance Contract replaces reactive break-fix with scheduled preventive
              care — defined coverage, periodic health checks and support for the equipment your
              work depends on.
            </motion.p>
            <motion.ul {...rise(0.2)} className="mt-6 space-y-2.5">
              {[
                'Preventive maintenance instead of surprise breakdowns',
                'Clearly defined scope — one-time support vs ongoing AMC coverage',
                'Computers, networks, CCTV and more under one arrangement',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-medium text-white/85">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </motion.ul>
            <motion.div {...rise(0.26)} className="mt-8">
              <Button
                to="/amc-support"
                variant="accent"
                size="md"
                className="group rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 py-1.5 pl-6 pr-1.5 text-white shadow-lg shadow-blue-700/30 hover:from-blue-600 hover:to-cyan-400"
              >
                View AMC Plans
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== 8. FAQ ===== */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="faq-heading">
        <Container className="max-w-2xl">
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="Frequently Asked"
            highlight="Questions"
            description="Straight answers about our services, quotations and how to get started."
          />
          <ServiceFAQ faqs={MAIN_FAQS} idPrefix="main-faq" />
        </Container>
      </section>

      {/* ===== 9. Closing CTA ===== */}
      <ServiceCTA
        heading="Let’s Find the Right Technology Solution for Your Business"
        text="Tell us what you need, and our team can help you explore the appropriate technology products and services."
        image={`${import.meta.env.BASE_URL}images/industries/ca-offices.jpg`}
        theme={SERVICE_THEMES['institutional-it-supply']}
        primaryTo="/contact"
        primaryLabel="Request a Consultation"
        secondaryHref="#service-directory"
        secondaryLabel="Browse All Services"
      />
    </>
  )
}
