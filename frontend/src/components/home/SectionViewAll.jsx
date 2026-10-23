import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/** Right-aligned "view all" pill placed between the heading and the card grid. */
export default function SectionViewAll({ to, children }) {
  return (
    <div className="-mt-4 mb-6 flex justify-end">
      <Link
        to={to}
        className="group inline-flex items-center gap-2 rounded-full border border-blue-700/30 bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:border-blue-700 hover:bg-blue-700 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        {children}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-blue-700">
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </Link>
    </div>
  )
}
