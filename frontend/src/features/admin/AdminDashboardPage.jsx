import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Inbox, Loader2, LogOut, MailOpen, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import apiClient from '../../services/apiClient.js'
import { useAuth } from '../auth/useAuth.js'
import Logo from '../../components/common/Logo.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import { formatDate } from '../../utils/formatters.js'

const STATUSES = ['new', 'in_progress', 'resolved', 'closed']

export default function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [enquiries, setEnquiries] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  // Render-time adjustment when the status filter changes.
  const [prevFilter, setPrevFilter] = useState(statusFilter)
  if (prevFilter !== statusFilter) {
    setPrevFilter(statusFilter)
    setLoading(true)
    setError(null)
  }

  useEffect(() => {
    document.title = 'Admin Dashboard | AB Enterprises Private Limited'
  }, [])

  useEffect(() => {
    let cancelled = false
    Promise.all([
      apiClient.get('/admin/stats'),
      apiClient.get('/admin/enquiries', {
        params: { status: statusFilter || undefined, limit: 20 },
      }),
    ])
      .then(([s, e]) => {
        if (cancelled) return
        setStats(s.data)
        setEnquiries(e.data.items)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [statusFilter, refreshKey])

  const retry = () => {
    setError(null)
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }

  const updateStatus = async (id, status) => {
    try {
      await apiClient.patch(`/admin/enquiries/${id}/status`, { status })
      toast.success('Status updated.')
      setEnquiries((list) => list.map((e) => (e.id === id ? { ...e, status } : e)))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const signOut = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  const statCards = [
    { Icon: Inbox, label: 'Total Enquiries', value: stats?.total ?? '—' },
    { Icon: MailOpen, label: 'New', value: stats?.new_count ?? '—' },
    { Icon: Loader2, label: 'In Progress', value: stats?.in_progress_count ?? '—' },
    { Icon: TrendingUp, label: 'Last 30 Days', value: stats?.last_30_days ?? '—' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3 sm:px-8">
        <Logo to="/admin/dashboard" />
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-ink-soft sm:block">
            {user?.name} <span className="text-ink-soft/60">({user?.role})</span>
          </span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-surface-blue hover:text-blue-700"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(({ Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
              <p className="mt-3 text-2xl font-bold text-navy-900">{value}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Recent Enquiries</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-blue-700 focus:outline-none"
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        {loading && <div className="flex justify-center py-16"><LoadingSpinner /></div>}
        {error && <ErrorMessage message={error} onRetry={retry} className="mt-4" />}

        {!loading && !error && (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
            {enquiries.length === 0 ? (
              <p className="p-10 text-center text-sm text-ink-soft">No enquiries yet.</p>
            ) : (
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface text-xs uppercase tracking-wide text-ink-soft">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={e.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                      <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{formatDate(e.created_at)}</td>
                      <td className="px-4 py-3 capitalize text-ink">{e.type}</td>
                      <td className="px-4 py-3 font-medium text-navy-900">{e.name}</td>
                      <td className="px-4 py-3 text-ink-soft">
                        <div>{e.email}</div>
                        <div className="text-xs">{e.phone}</div>
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-ink-soft" title={e.message}>
                        {e.message}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={e.status}
                          onChange={(ev) => updateStatus(e.id, ev.target.value)}
                          className="rounded-md border border-line bg-white px-2 py-1 text-xs focus:border-blue-700 focus:outline-none"
                          aria-label={`Status for enquiry from ${e.name}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
