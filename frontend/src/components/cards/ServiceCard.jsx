import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import * as icons from 'lucide-react'

export function DynamicIcon({ name, className = 'h-6 w-6' }) {
  const Icon = icons[name] || icons.Settings
  return <Icon className={className} aria-hidden="true" />
}

export default function ServiceCard({ service }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-blue text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
        <DynamicIcon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-navy-900">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {service.short_description || service.description}
      </p>
      <Link
        to={`/services/${service.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-500"
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </article>
  )
}
