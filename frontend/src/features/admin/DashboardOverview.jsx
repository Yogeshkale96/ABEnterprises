import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, FileText, Inbox, Loader2, Mail, MessageSquarePlus,
  TrendingUp, Wrench,
} from 'lucide-react'
import adminService from '../../services/adminService.js'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import EnquiryStatusBadge from './components/EnquiryStatusBadge.jsx'
import { formatDate } from '../../utils/formatters.js'
import { setPageMeta } from '../../utils/seo.js'

function StatCard({ Icon, label, value, tone }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="mt-3 text-2xl font-bold text-navy-900">{value}</p>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</p>
    </div>
  )
}

const TYPE_LABEL = { contact: 'Contact', quote: 'Quote', amc: 'AMC' }

export default function DashboardOverview() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setPageMeta(
      'Admin Dashboard | AB Enterprises Private Limited',
      'Manage customer enquiries and quote requests.'
    )
  }, [])

  useEffect(() => {
    let cancelled = false
    Promise.all([adminService.stats(), adminService.enquiries({ limit: 6 })])
      .then(([s, e]) => {
        if (cancelled) return
        setStats(s.data)
        setRecent(e.data.items)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [refreshKey])

  const retry = () => {
    setError(null)
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }

  const cards = stats
    ? [
        { Icon: Inbox, label: 'Total Enquiries', value: stats.total ?? 0, tone: 'bg-blue-50 text-blue-700' },
        { Icon: Mail, label: 'Contact Enquiries', value: stats.contact_count ?? 0, tone: 'bg-cyan-50 text-cyan-700' },
        { Icon: FileText, label: 'Quote Requests', value: stats.quote_count ?? 0, tone: 'bg-indigo-50 text-indigo-700' },
        { Icon: Wrench, label: 'AMC Requests', value: stats.amc_count ?? 0, tone: 'bg-purple-50 text-purple-700' },
        { Icon: MessageSquarePlus, label: 'New', value: stats.new_count ?? 0, tone: 'bg-blue-50 text-blue-700' },
        { Icon: Loader2, label: 'In Progress', value: stats.in_progress_count ?? 0, tone: 'bg-amber-50 text-amber-700' },
        { Icon: CheckCircle2, label: 'Resolved', value: stats.resolved_count ?? 0, tone: 'bg-emerald-50 text-emerald-700' },
        { Icon: TrendingUp, label: 'Last 30 Days', value: stats.last_30_days ?? 0, tone: 'bg-slate-100 text-slate-700' },
      ]
    : []

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-ink-soft">Real-time enquiry and quote request statistics.</p>
        </div>
        <Link to="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-500">
          View all enquiries <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {loading && <div className="flex justify-center py-20"><LoadingSpinner /></div>}
      {error && <ErrorMessage message={error} onRetry={retry} className="mt-6" />}

      {!loading && !error && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {cards.map((c) => <StatCard key={c.label} {...c} />)}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-navy-900">Recent Enquiries</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              {recent.length === 0 ? (
                <p className="p-10 text-center text-sm text-ink-soft">No enquiries received yet.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {recent.map((e) => (
                    <li key={e.id}>
                      <Link
                        to={`/admin/enquiries/${e.id}`}
                        className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-surface/70"
                      >
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                          e.type === 'quote' ? 'bg-indigo-50 text-indigo-700' : e.type === 'amc' ? 'bg-purple-50 text-purple-700' : 'bg-cyan-50 text-cyan-700'
                        }`}>
                          {e.type === 'quote' ? <FileText className="h-4 w-4" /> : e.type === 'amc' ? <Wrench className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-navy-900">
                            {e.name} <span className="font-normal text-ink-soft">· {TYPE_LABEL[e.type] || e.type}</span>
                          </p>
                          <p className="truncate text-xs text-ink-soft">
                            {e.subject || e.message}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <EnquiryStatusBadge status={e.status} />
                          <span className="text-xs text-ink-soft">{formatDate(e.created_at)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
