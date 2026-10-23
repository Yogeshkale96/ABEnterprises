import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DynamicIcon } from './ServiceCard.jsx'

export default function IndustryCard({ industry }) {
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-line bg-white p-6 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-card-hover"
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-surface-blue text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
        <DynamicIcon name={industry.icon} className="h-7 w-7" />
      </div>
      <h3 className="text-sm font-bold text-navy-900">{industry.name}</h3>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-700 opacity-0 transition-opacity group-hover:opacity-100">
        Solutions <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </span>
    </Link>
  )
}
