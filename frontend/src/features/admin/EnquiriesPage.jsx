import { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Eye, Inbox, RefreshCw, Search, X,
} from 'lucide-react'
import adminService from '../../services/adminService.js'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import EnquiryStatusBadge from './components/EnquiryStatusBadge.jsx'
import { STATUS_OPTIONS, statusLabel } from './components/enquiryStatus.js'
import { formatDate } from '../../utils/formatters.js'
import { setPageMeta } from '../../utils/seo.js'

const PAGE_SIZE = 15

const TYPE_LABEL = { contact: 'Contact', quote: 'Quote', amc: 'AMC' }

const TITLES = {
  contact: { title: 'Contact Enquiries', desc: 'Messages submitted through the Contact Us form.' },
  quote: { title: 'Get a Quote Requests', desc: 'Quote requests submitted through the request-a-quote form.' },
  all: { title: 'All Enquiries', desc: 'Every enquiry across contact, quote and AMC forms.' },
}

const inputCls =
  'rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 hover:border-blue-500 focus:border-blue-700 focus:outline-none'

export default function EnquiriesPage({ type = 'all' }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState({ items: [], total: 0, page: 1, limit: PAGE_SIZE })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [searchDraft, setSearchDraft] = useState(searchParams.get('search') || '')

  const filters = {
    status: searchParams.get('status') || '',
    search: searchParams.get('search') || '',
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    page: Math.max(1, parseInt(searchParams.get('page'), 10) || 1),
  }

  const setParam = useCallback((key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      if (key !== 'page') next.delete('page') // reset paging when filters change
      return next
    })
  }, [setSearchParams])

  useEffect(() => {
    const t = TITLES[type] || TITLES.all
    setPageMeta(
      `${t.title} | Admin | AB Enterprises`,
      'Manage customer enquiries in the admin dashboard.'
    )
  }, [type])

  useEffect(() => {
    let cancelled = false
    adminService
      .enquiries({
        type: type === 'all' ? '' : type,
        status: filters.status,
        search: filters.search,
        from: filters.from,
        to: filters.to,
        page: filters.page,
        limit: PAGE_SIZE,
      })
      .then((r) => {
        if (!cancelled) setData(r.data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [type, filters.status, filters.search, filters.from, filters.to, filters.page, refreshKey])

  const applySearch = (e) => {
    e.preventDefault()
    setParam('search', searchDraft.trim())
  }

  const refresh = () => {
    setError(null)
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }

  const totalPages = Math.max(1, Math.ceil((data.total || 0) / (data.limit || PAGE_SIZE)))
  const t = TITLES[type] || TITLES.all
  const showTypeCol = type === 'all'

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{t.title}</h1>
          <p className="mt-1 text-sm text-ink-soft">{t.desc}</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink hover:bg-surface-blue hover:text-blue-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5 rounded-2xl border border-line bg-white p-3 shadow-card">
        <form onSubmit={applySearch} className="relative min-w-52 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
          <input
            type="search"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder="Search name, email, phone, company…"
            className={`${inputCls} w-full pl-9 pr-8`}
            aria-label="Search enquiries"
          />
          {searchDraft && (
            <button
              type="button"
              onClick={() => { setSearchDraft(''); setParam('search', '') }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
        <select
          value={filters.status}
          onChange={(e) => setParam('status', e.target.value)}
          className={inputCls}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{statusLabel(s)}</option>
          ))}
        </select>
        <input
          type="date"
          value={filters.from}
          onChange={(e) => setParam('from', e.target.value)}
          className={inputCls}
          aria-label="From date"
        />
        <input
          type="date"
          value={filters.to}
          onChange={(e) => setParam('to', e.target.value)}
          className={inputCls}
          aria-label="To date"
        />
      </div>

      {loading && <div className="flex justify-center py-16"><LoadingSpinner /></div>}
      {error && <ErrorMessage message={error} onRetry={refresh} className="mt-4" />}

      {!loading && !error && (
        <>
          <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
            {data.total} {data.total === 1 ? 'enquiry' : 'enquiries'}
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
            {data.items.length === 0 ? (
              <div className="p-12 text-center">
                <Inbox className="mx-auto h-10 w-10 text-blue-700/30" aria-hidden="true" />
                <p className="mt-3 font-semibold text-navy-900">No enquiries found</p>
                <p className="mt-1 text-sm text-ink-soft">Try adjusting the filters or check back later.</p>
              </div>
            ) : (
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-ink-soft">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Date</th>
                    {showTypeCol && <th className="px-4 py-3">Type</th>}
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">{showTypeCol ? 'Subject' : type === 'quote' ? 'Service' : 'Subject'}</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((e) => (
                    <tr key={e.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                      <td className="px-4 py-3 text-ink-soft">#{e.id}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{formatDate(e.created_at)}</td>
                      {showTypeCol && <td className="px-4 py-3 text-ink">{TYPE_LABEL[e.type] || e.type}</td>}
                      <td className="px-4 py-3">
                        <p className="font-medium text-navy-900">{e.name}</p>
                        {e.company && <p className="text-xs text-ink-soft">{e.company}</p>}
                      </td>
                      <td className="px-4 py-3 text-ink-soft">
                        <div className="max-w-52 truncate">{e.email}</div>
                        <div className="text-xs">{e.phone}</div>
                      </td>
                      <td className="max-w-52 truncate px-4 py-3 text-ink-soft" title={e.subject || e.message}>
                        {e.subject || e.message}
                      </td>
                      <td className="px-4 py-3"><EnquiryStatusBadge status={e.status} /></td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/enquiries/${e.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-surface-blue"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-ink-soft">Page {data.page} of {totalPages}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={data.page <= 1}
                  onClick={() => setParam('page', String(data.page - 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink disabled:opacity-40 hover:enabled:bg-surface-blue"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
                </button>
                <button
                  type="button"
                  disabled={data.page >= totalPages}
                  onClick={() => setParam('page', String(data.page + 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink disabled:opacity-40 hover:enabled:bg-surface-blue"
                >
                  Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
