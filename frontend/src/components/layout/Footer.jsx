import { Link } from 'react-router-dom'
import { BadgeCheck, ChevronRight, Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Logo from '../common/Logo.jsx'
import SocialIcon from '../common/SocialIcon.jsx'
import Container from '../common/Container.jsx'
import siteConfig from '../../config/siteConfig.js'
import { footerLinks, productsMenu } from '../../config/navigation.js'

// Social tiles use each platform's original brand colour.
const SOCIALS = [
  { name: 'facebook', key: 'facebook', label: 'Facebook', tile: 'bg-[#1877F2] hover:bg-[#0d5fd6]' },
  {
    name: 'instagram',
    key: 'instagram',
    label: 'Instagram',
    tile: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-110',
  },
  { name: 'linkedin', key: 'linkedin', label: 'LinkedIn', tile: 'bg-[#0A66C2] hover:bg-[#084d8f]' },
  { name: 'twitter', key: 'twitter', label: 'X (Twitter)', tile: 'bg-black hover:bg-[#1a1a1a]' },
]

// Shared list-item style — chevron accent, semibold text, slide on hover.
function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group/link flex items-center gap-1.5 text-sm font-semibold text-white/75 transition-all duration-200 hover:translate-x-0.5 hover:text-white"
      >
        <ChevronRight
          className="h-3.5 w-3.5 shrink-0 text-cyan-500 transition-colors group-hover/link:text-cyan-400"
          aria-hidden="true"
        />
        {children}
      </Link>
    </li>
  )
}

function ColumnHeading({ children }) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-white">
      {children}
      <span
        aria-hidden="true"
        className="h-0.5 w-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
      />
    </h3>
  )
}

export default function Footer() {
  const { company, contact, social } = siteConfig
  const year = new Date().getFullYear()

  const contactItems = [
    {
      icon: MapPin,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`,
      label: contact.address,
      external: true,
    },
    { icon: Phone, href: `tel:${contact.phone.replace(/[^+\d]/g, '')}`, label: contact.phone },
    {
      icon: MessageCircle,
      href: `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, '')}`,
      label: `WhatsApp: ${contact.phone}`,
      external: true,
    },
    { icon: Mail, href: `mailto:${contact.email}`, label: contact.email },
    {
      icon: Globe,
      href: `https://${contact.website}`,
      label: contact.website,
      external: true,
    },
    { icon: BadgeCheck, label: `GST No. ${contact.gst}` },
  ]

  return (
    <footer className="bg-navy-950 text-white">
      {/* Thin gradient rule to separate footer from page content */}
      <div aria-hidden="true" className="h-0.5 bg-gradient-to-r from-blue-800 via-cyan-500 to-blue-800" />
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div>
          <Logo dark to="/home" />
          <p className="mt-3 text-sm leading-relaxed text-white/70">{company.shortIntro}</p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIALS.map(({ name, key, label, tile }) => (
              <a
                key={label}
                href={social[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${tile}`}
              >
                <SocialIcon name={name} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <ColumnHeading>Quick Links</ColumnHeading>
          <ul className="space-y-2.5">
            {footerLinks.quickLinks.map((l) => (
              <FooterLink key={l.to} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Our services">
          <ColumnHeading>Our Services</ColumnHeading>
          <ul className="space-y-2.5">
            {footerLinks.services.map((l) => (
              <FooterLink key={l.to} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </ul>
        </nav>

        {/* Popular products */}
        <nav aria-label="Popular products">
          <ColumnHeading>Products</ColumnHeading>
          <ul className="space-y-2.5">
            {productsMenu.slice(0, 6).map((l) => (
              <FooterLink key={l.to} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <ColumnHeading>Contact Us</ColumnHeading>
          <ul className="space-y-3 text-sm">
            {contactItems.map(({ icon: Icon, href, label, external }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex gap-2.5 font-semibold text-white/75 transition-colors hover:text-white"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                    <span className="min-w-0 break-words">{label}</span>
                  </a>
                ) : (
                  <span className="flex gap-2.5 font-semibold text-white/75">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                    <span className="min-w-0 break-words">{label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs font-bold text-white/70 sm:flex-row">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerLinks.legal.map((l) => (
              <Link key={l.to} to={l.to} className="font-bold transition-colors hover:text-cyan-400">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}
