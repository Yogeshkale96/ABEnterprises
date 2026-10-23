import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Package, SearchX, Wrench } from 'lucide-react'
import Container from '../components/common/Container.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import searchService from '../services/searchService.js'
import { FALLBACK_PRODUCTS, FALLBACK_SERVICES, matchesSearch } from '../data/content.js'

function localSearch(q) {
  return {
    products: FALLBACK_PRODUCTS.filter((p) => matchesSearch(p, q)),
    services: FALLBACK_SERVICES.filter((s) => matchesSearch(s, q)),
  }
}

function ResultRow({ item, type }) {
  const to = item.to || (type === 'product' ? `/products/${item.slug}` : `/services/${item.slug}`)
  const Icon = type === 'product' ? Package : Wrench
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition-colors hover:border-blue-500/40 hover:bg-surface-blue/40"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-blue text-blue-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-navy-900">{item.name}</span>
        <span className="block truncate text-sm text-ink-soft">{item.short_description || item.category_name}</span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-blue-700" aria-hidden="true" />
    </Link>
  )
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const type = params.get('type') || 'all'
  const [results, setResults] = useState({ products: [], services: [] })
  const [status, setStatus] = useState('idle')
  const term = q.trim()
  const valid = term.length >= 2

  // Render-time adjustment when query/type changes.
  const stateKey = `${type}|${term}`
  const [prevKey, setPrevKey] = useState(stateKey)
  if (prevKey !== stateKey) {
    setPrevKey(stateKey)
    setStatus(valid ? 'loading' : 'idle')
    if (!valid) setResults({ products: [], services: [] })
  }

  useEffect(() => {
    document.title = q
      ? `Search: ${q} | AB Enterprises Private Limited`
      : 'Search | AB Enterprises Private Limited'
  }, [q])

  useEffect(() => {
    if (!valid) return
    let cancelled = false
    searchService
      .search(term, type)
      .then((data) => {
        if (!cancelled) {
          setResults(data)
          setStatus('ok')
        }
      })
      .catch(() => {
        if (cancelled) return
        const local = localSearch(term)
        setResults({
          products: type === 'services' ? [] : local.products,
          services: type === 'products' ? [] : local.services,
        })
        setStatus('ok')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateKey])

  const total = (results.products?.length || 0) + (results.services?.length || 0)
  const tabCls = (active) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-blue-700 text-white' : 'bg-white text-ink border border-line hover:border-blue-500 hover:text-blue-700'
    }`

  return (
    <section className="bg-surface py-14">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-navy-900">
            {q ? <>Search results for “{q}”</> : 'Search'}
          </h1>

          <div className="mt-5 flex gap-2.5" role="group" aria-label="Filter results">
            {['all', 'products', 'services'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setParams({ q, ...(t !== 'all' ? { type: t } : {}) })}
                className={tabCls(type === t || (t === 'all' && type === 'all'))}
              >
                {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {status === 'loading' && (
            <div className="flex justify-center py-16"><LoadingSpinner label={`Searching for “${q}”…`} /></div>
          )}

          {status === 'idle' && (
            <p className="mt-8 text-ink-soft">Type at least 2 characters in the search bar to find products and services.</p>
          )}

          {status === 'ok' && total === 0 && (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-10 text-center">
              <SearchX className="h-10 w-10 text-ink-soft/50" aria-hidden="true" />
              <p className="font-medium text-ink">No results for “{q}”</p>
              <p className="text-sm text-ink-soft">Try a different keyword, or <Link to="/contact" className="text-blue-700 underline">contact us</Link> — we likely stock it.</p>
            </div>
          )}

          {status === 'ok' && total > 0 && (
            <div className="mt-8 space-y-8">
              {results.products?.length > 0 && (
                <div>
                  <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-soft">Products</h2>
                  <div className="space-y-3">
                    {results.products.map((p) => <ResultRow key={p.slug} item={p} type="product" />)}
                  </div>
                </div>
              )}
              {results.services?.length > 0 && (
                <div>
                  <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-soft">Services</h2>
                  <div className="space-y-3">
                    {results.services.map((s) => <ResultRow key={s.slug} item={s} type="service" />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
