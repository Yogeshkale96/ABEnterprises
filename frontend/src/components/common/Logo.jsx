import { Link } from 'react-router-dom'
import logoCompact from '../../assets/brand/ab-enterprises-logo-compact.svg'

// Official logo lives in /public — served as a static asset.
const logoFull = `${import.meta.env.BASE_URL}ablogo.png`

/**
 * Shared brand logo. The full logo is the official PNG artwork in the
 * public folder — this component keeps proportions correct automatically
 * (height constrained, width auto).
 */
export default function Logo({ variant = 'full', dark = false, to = '/home', className = '' }) {
  const isCompact = variant === 'compact'
  const src = isCompact ? logoCompact : logoFull
  const alt = isCompact
    ? 'AB Enterprises monogram'
    : 'AB Enterprises Private Limited — Tech Solutions for Every Need'
  const sizeCls = className || (isCompact ? 'h-11' : 'h-12 md:h-14')

  const img = (
    <img
      src={src}
      alt={alt}
      className={`w-auto object-contain ${sizeCls}`}
      width={isCompact ? 44 : 178}
      height={isCompact ? 44 : 100}
      loading={isCompact ? 'eager' : 'eager'}
      decoding="async"
    />
  )

  if (!to) return img
  return (
    <Link
      to={to}
      aria-label="AB Enterprises Private Limited — home"
      className={`inline-flex shrink-0 items-center overflow-hidden rounded-lg ${dark ? 'ring-1 ring-white/15' : ''}`}
    >
      {img}
    </Link>
  )
}
