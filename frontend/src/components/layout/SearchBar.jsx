import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import SearchSuggestions from './SearchSuggestions.jsx'
import searchService from '../../services/searchService.js'
import { useDebounce } from '../../hooks/useDebounce.js'
import {
  FALLBACK_PRODUCTS,
  FALLBACK_SERVICES,
  POPULAR_SEARCHES,
  matchesSearch,
} from '../../data/content.js'

const MIN_QUERY = 2

function localSuggestions(q) {
  return {
    products: FALLBACK_PRODUCTS.filter((p) => matchesSearch(p, q)).slice(0, 5),
    services: FALLBACK_SERVICES.filter((s) => matchesSearch(s, q)).slice(0, 5),
    popular: POPULAR_SEARCHES.filter((p) => p.includes(q.toLowerCase())).slice(0, 3),
  }
}

export default function SearchBar({ autoFocus = false, onNavigate }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState(null)
  const [highlight, setHighlight] = useState(-1)
  const debounced = useDebounce(query, 280)
  const boxRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Render-time adjustment when the debounced query changes.
  const [prevDebounced, setPrevDebounced] = useState(debounced)
  if (prevDebounced !== debounced) {
    setPrevDebounced(debounced)
    if (debounced.trim().length < MIN_QUERY) {
      setSuggestions(null)
      setLoading(false)
    } else {
      setLoading(true)
    }
  }

  useEffect(() => {
    if (debounced.trim().length < MIN_QUERY) return
    const controller = new AbortController()
    searchService
      .suggestions(debounced.trim(), controller.signal)
      .then(setSuggestions)
      .catch(() => setSuggestions(localSuggestions(debounced.trim())))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [debounced])

  const flatItems = suggestions
    ? [
        ...(suggestions.products || []).map((p) => ({ ...p, _type: 'product' })),
        ...(suggestions.services || []).map((s) => ({ ...s, _type: 'service' })),
        ...(suggestions.popular || []).map((p) => ({ name: p, _type: 'popular' })),
      ]
    : []

  const go = (q) => {
    const term = q.trim()
    if (!term) return
    setOpen(false)
    setQuery(term)
    navigate(`/search?q=${encodeURIComponent(term)}`)
    onNavigate?.()
  }

  const pick = (item) => {
    setOpen(false)
    if (item._type === 'product') navigate(item.to || `/products/${item.slug}`)
    else if (item._type === 'service') navigate(item.to || `/services/${item.slug}`)
    else go(item.name)
    onNavigate?.()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) setOpen(true)
      setHighlight((h) => {
        const next = e.key === 'ArrowDown' ? h + 1 : h - 1
        if (next < 0) return flatItems.length - 1
        return next % Math.max(flatItems.length, 1)
      })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlight >= 0 && flatItems[highlight]) pick(flatItems[highlight])
      else go(query)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={boxRef} className="relative w-full" role="search">
      <div className="group/search relative flex items-center">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft transition-colors group-focus-within/search:text-blue-700"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setHighlight(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products, services, brands…"
          aria-label="Search products, services, brands"
          aria-expanded={open}
          aria-controls="search-suggestions"
          aria-activedescendant={highlight >= 0 ? `search-opt-${highlight}` : undefined}
          role="combobox"
          className="w-full rounded-full border border-line bg-white py-2 pl-9 pr-[4.5rem] text-sm text-ink shadow-sm transition-all duration-200 placeholder:text-ink-soft/70 hover:border-cyan-400 hover:shadow-md focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/15 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('')
              setHighlight(-1)
            }}
            className="absolute right-11 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          aria-label="Search"
          onClick={() => go(query)}
          className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-blue-700 text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-md active:scale-95"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {open && (
        <SearchSuggestions
          id="search-suggestions"
          query={query}
          loading={loading}
          suggestions={suggestions}
          flatItems={flatItems}
          highlight={highlight}
          onPick={pick}
          onSubmit={go}
          onHover={setHighlight}
        />
      )}
    </div>
  )
}
