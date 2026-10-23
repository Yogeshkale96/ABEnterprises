import { Mail, MapPin, Phone } from 'lucide-react'
import SocialIcon from '../common/SocialIcon.jsx'
import siteConfig from '../../config/siteConfig.js'

export default function TopBar() {
  const { contact, social } = siteConfig

  return (
    <div className="bg-navy-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
        {/* Left — location only */}
        <span className="inline-flex items-center gap-1.5 text-white/85">
          <MapPin className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
          {contact.address}
        </span>

        {/* Right — phone, email, then socials */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <div className="flex items-center gap-x-5">
          <a
            href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
            className="inline-flex items-center gap-1.5 text-white/85 transition-colors hover:text-cyan-400"
          >
            <Phone className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 text-white/85 transition-colors hover:text-cyan-400"
          >
            <Mail className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
            {contact.email}
          </a>
          </div>
        <div
          className="flex items-center gap-3 border-l border-white/20 pl-4"
          aria-label="Social media links"
        >
          {[
            { name: 'facebook', href: social.facebook, label: 'Facebook' },
            { name: 'instagram', href: social.instagram, label: 'Instagram' },
            { name: 'linkedin', href: social.linkedin, label: 'LinkedIn' },
            { name: 'twitter', href: social.twitter, label: 'Twitter' },
          ].map(({ name, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-white/70 transition-colors hover:text-cyan-400"
            >
              <SocialIcon name={name} className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}
