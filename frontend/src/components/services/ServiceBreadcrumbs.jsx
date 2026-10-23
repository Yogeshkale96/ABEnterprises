import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * Service breadcrumb trail — Home / Services / [current].
 * `current` may be a label string or { label, to } for a linked crumb.
 */
export default function ServiceBreadcrumbs({ current, dark = true }) {
  const linkCls = dark ? 'text-white/60 hover:text-cyan-400' : 'text-ink-soft hover:text-blue-700'
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? 'text-white/60' : 'text-ink-soft'}`}>
      <Link to="/home" className={`${linkCls} transition-colors`}>Home</Link>
      <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      <Link to="/services" className={`${linkCls} transition-colors`}>Services</Link>
      <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      {current?.to ? (
        <Link to={current.to} className={`${linkCls} transition-colors`}>{current.label}</Link>
      ) : (
        <span aria-current="page" className={dark ? 'font-medium text-white' : 'font-medium text-ink'}>
          {current?.label ?? current}
        </span>
      )}
    </nav>
  )
}
