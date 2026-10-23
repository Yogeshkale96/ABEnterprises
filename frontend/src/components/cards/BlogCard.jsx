import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock, Newspaper } from 'lucide-react'
import { formatDate } from '../../utils/formatters.js'

// Accent variants keep each card's chip/hover colour distinct within the palette.
const ACCENTS = {
  blue: {
    chip: 'bg-blue-700/90 text-white',
    border: 'group-hover:border-blue-600/60',
    link: 'text-blue-700 group-hover:text-blue-500',
  },
  cyan: {
    chip: 'bg-cyan-500/90 text-navy-900',
    border: 'group-hover:border-cyan-500/60',
    link: 'text-cyan-600 group-hover:text-cyan-500',
  },
  gold: {
    chip: 'bg-accent-yellow/95 text-navy-900',
    border: 'group-hover:border-accent-yellow/70',
    link: 'text-blue-700 group-hover:text-accent-yellow',
  },
}

export default function BlogCard({ article }) {
  const accent = ACCENTS[article.accent] || ACCENTS.blue
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${accent.border}`}
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 to-blue-700">
        {article.image_url ? (
          <>
            <img
              src={article.image_url}
              alt={article.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent"
            />
          </>
        ) : (
          <Newspaper className="h-12 w-12 text-white/30" aria-hidden="true" />
        )}
        {article.category && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm ${accent.chip}`}
          >
            {article.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
          {article.published_at && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(article.published_at)}
            </span>
          )}
          {article.read_minutes && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {article.read_minutes} min read
            </span>
          )}
        </div>
        <h3 className="mt-2.5 text-base font-bold leading-snug text-navy-900">{article.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
        <Link
          to={`/articles/${article.slug}`}
          className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${accent.link}`}
        >
          Read More
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
