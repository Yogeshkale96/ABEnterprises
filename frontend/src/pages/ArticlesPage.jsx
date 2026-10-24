import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Newspaper } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import BlogCard from '../components/cards/BlogCard.jsx'
import { ARTICLE_CATEGORIES, ARTICLES } from '../data/articles.js'
import { setPageMeta } from '../utils/seo.js'

const ALL = 'All'

export default function ArticlesPage() {
  const [category, setCategory] = useState(ALL)
  const categories = [ALL, ...ARTICLE_CATEGORIES]
  const visible = category === ALL ? ARTICLES : ARTICLES.filter((a) => a.category === category)

  useEffect(() => {
    setPageMeta(
      'Latest News & IT Tips | AB Enterprises Private Limited',
      'Practical IT guides, buying advice and technology tips for businesses from AB Enterprises Private Limited.'
    )
  }, [])

  return (
    <>
      <section className="bg-navy-900 py-12 text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <Link to="/home" className="hover:text-cyan-400">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-white">Latest News &amp; IT Tips</span>
          </nav>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">Latest News &amp; IT Tips</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/70 sm:text-base">
            Practical guides, buying advice and technology tips to help your business make better IT decisions.
          </p>
        </Container>
      </section>

      <section className="bg-surface py-12 lg:py-16">
        <Container>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                  category === c
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'border border-line bg-white text-ink-soft hover:border-blue-400 hover:text-blue-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'article' : 'articles'}
            {category !== ALL && <> in {category}</>}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((a) => (
              <BlogCard key={a.slug} article={a} />
            ))}
          </div>
          {visible.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
              <Newspaper className="mx-auto h-10 w-10 text-blue-700/40" aria-hidden="true" />
              <p className="mt-3 font-semibold text-navy-900">No articles in this category yet</p>
              <button
                type="button"
                onClick={() => setCategory(ALL)}
                className="mt-4 text-sm font-semibold text-blue-700 hover:underline"
              >
                Show all articles
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
