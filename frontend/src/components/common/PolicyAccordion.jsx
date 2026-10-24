import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Numbered accordion cards for legal/policy pages. Each section renders a
 * compact card with a step-number badge and title; clicking the title row
 * expands the detailed body copy.
 */
export default function PolicyAccordion({ sections, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className="space-y-3">
      {sections.map((s, i) => {
        const isOpen = openIndex === i
        const contentId = `policy-section-${i}`
        const Icon = s.icon
        return (
          <div
            key={s.title}
            className={`rounded-xl border-2 bg-white transition-all duration-200 ${
              isOpen
                ? 'border-blue-600/60 shadow-card'
                : 'border-line hover:border-blue-600/40 hover:shadow-sm'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex w-full items-center gap-3.5 px-4 py-4 text-left sm:px-5"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                  isOpen ? 'bg-blue-700 text-white' : 'bg-surface-blue text-blue-700'
                }`}
                aria-hidden="true"
              >
                {Icon ? <Icon className="h-5 w-5" /> : i + 1}
              </span>
              <span
                className={`shrink-0 text-sm font-bold transition-colors ${
                  isOpen ? 'text-blue-700' : 'text-blue-700/60'
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-900 sm:text-base">
                {s.title}
              </span>
              <ChevronDown
                className={`h-4.5 w-4.5 shrink-0 text-ink-soft transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-blue-700' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={contentId}
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="mx-4 mb-4 rounded-lg bg-surface/70 px-4 py-3.5 sm:mx-5">
                  <p className="text-sm font-medium leading-relaxed text-ink">
                    {s.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
