import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DynamicIcon } from '../cards/ServiceCard.jsx'
import { SERVICE_DIRECTORY } from '../../data/servicesData.js'
import { svcTheme } from '../../data/serviceThemes.js'
import { svcExtras } from '../../data/serviceExtras.js'

export default function ServicesDropdown({ onNavigate }) {
  return (
    <div
      role="menu"
      aria-label="Services menu"
      className="w-max max-w-[94vw] overflow-hidden rounded-xl border border-white/10 bg-navy-950/95 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid grid-cols-2 gap-x-0.5 gap-y-0 p-1.5">
        {SERVICE_DIRECTORY.map(({ slug, to, name, icon }) => {
          const theme = svcTheme(slug)
          return (
            <Link
              key={slug}
              to={to}
              role="menuitem"
              onClick={onNavigate}
              className="group flex w-[13.75rem] items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${theme.grad} text-white shadow-md transition-transform duration-200 group-hover:scale-110`}
              >
                <DynamicIcon name={icon} className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold leading-tight text-white">{name}</span>
                <span className="block truncate text-[10px] leading-tight text-white/55 transition-colors group-hover:text-white/75">
                  {svcExtras(slug)?.tagline || 'Explore this service'}
                </span>
              </span>
              <ArrowRight
                className="h-3 w-3 shrink-0 -translate-x-1 text-cyan-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>

      <Link
        to="/services"
        onClick={onNavigate}
        className="flex items-center justify-center gap-1.5 border-t border-white/10 bg-gradient-to-r from-blue-700 to-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
      >
        View All Services
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  )
}
