import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Building2, Clock, Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Container from '../common/Container.jsx'
import siteConfig from '../../config/siteConfig.js'
import { directionsHref, mailHref, scrollToId, telHref, waHref } from './contactLinks.js'

const { contact } = siteConfig
const img = (name) => `${import.meta.env.BASE_URL}images/contact/${name}`

export function PageHero({ crumb, eyebrow, title, description, ctaLabel, targetId, image }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <img
        src={img(image)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40 md:via-navy-950/80"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
      />
      <Container className="relative py-12 md:py-14">
        <nav aria-label="Breadcrumb" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          <Link to="/home" className="transition-colors hover:text-sky-300">Home</Link>
          <span className="mx-2 text-sky-300" aria-hidden="true">/</span>
          <span aria-current="page" className="text-white/85">{crumb}</span>
        </nav>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">{eyebrow}</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">{description}</p>
        <button
          type="button"
          onClick={() => scrollToId(targetId)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-yellow px-6 py-3 text-sm font-bold text-navy-950 shadow-[0_10px_24px_-8px_rgba(255,184,0,0.6)] transition-all hover:-translate-y-0.5 hover:bg-yellow-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300/50"
        >
          {ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </Container>
    </section>
  )
}

export function ContactInfoCards() {
  const cards = [
    { Icon: Phone, title: 'Call Us', value: contact.phone, sub: contact.hours, href: telHref },
    { Icon: Mail, title: 'Email Us', value: contact.email, href: mailHref },
    { Icon: MessageCircle, title: 'WhatsApp', value: contact.phone, sub: 'Chat with our team', href: waHref, external: true },
    { Icon: MapPin, title: 'Visit Our Office', value: contact.address, sub: 'Get directions', href: directionsHref, external: true },
  ]
  return (
    <section aria-label="Contact details" className="bg-surface py-10">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, value, sub, href, external }) => (
            <li key={title}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-full flex-col items-center rounded-2xl border border-line bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40 hover:shadow-card-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-sm font-bold uppercase tracking-wide text-navy-900">{title}</h2>
                <p className="mt-1 break-words text-sm font-medium text-blue-700">{value}</p>
                {sub && <p className="mt-0.5 text-xs text-ink-soft">{sub}</p>}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function InfoPanel({ image, heading, description, children }) {
  const rows = [
    { Icon: Phone, label: 'Phone', value: contact.phone, href: telHref },
    { Icon: Mail, label: 'Email', value: contact.email, href: mailHref },
    { Icon: MessageCircle, label: 'WhatsApp', value: contact.phone, href: waHref, external: true },
    { Icon: Globe, label: 'Website', value: contact.website, href: `https://${contact.website}`, external: true },
    { Icon: MapPin, label: 'Office', value: contact.address, href: directionsHref, external: true },
    { Icon: Clock, label: 'Business Hours', value: contact.hours },
  ]
  const details = [
    { Icon: Building2, label: 'Company', value: siteConfig.company.legalName },
    { Icon: BadgeCheck, label: 'GSTIN', value: contact.gst },
    { Icon: MapPin, label: 'Registered Office', value: contact.address },
  ]
  return (
    <aside className="relative h-full overflow-hidden bg-navy-950 p-7 text-white sm:p-9">
      <img src={img(image)} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/85 to-blue-900/80" />
      <div className="relative">
        <h2 className="text-2xl font-extrabold leading-tight md:text-3xl">{heading}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{description}</p>
        <ul className="mt-7 space-y-5">
          {rows.map(({ Icon, label, value, href, external }) => (
            <li key={label} className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-300/30 bg-sky-300/10 text-accent-yellow">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-white/55">{label}</span>
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="break-words text-sm font-medium text-white transition-colors hover:text-sky-300"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-white">{value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-7 rounded-xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">Company Details</p>
          <dl className="mt-3 space-y-3">
            {details.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-yellow" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/55">{label}</dt>
                  <dd className="break-words text-[13px] font-medium text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        {children}
      </div>
    </aside>
  )
}

export function ClosingCta({ heading, description, primary, secondary }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-14 text-white">
      <img src={img('cta-network.jpg')} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-blue-900/70" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight md:text-4xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">{description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link
            to={primary.to}
            className="inline-flex items-center gap-2 rounded-full bg-accent-yellow px-7 py-3 text-sm font-bold text-navy-950 transition-all hover:-translate-y-0.5 hover:bg-yellow-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300/50"
          >
            {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to={secondary.to}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-sky-400/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
          >
            {secondary.label}
          </Link>
        </div>
      </Container>
    </section>
  )
}
