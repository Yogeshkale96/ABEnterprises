import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, Building2, CalendarDays, CheckCircle2, FileText, Globe, Mail,
  Phone, Send, StickyNote, Tag, User,
} from 'lucide-react'
import toast from 'react-hot-toast'
import adminService from '../../services/adminService.js'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import Button from '../../components/common/Button.jsx'
import EnquiryStatusBadge from './components/EnquiryStatusBadge.jsx'
import { STATUS_OPTIONS, statusLabel } from './components/enquiryStatus.js'
import { formatDate } from '../../utils/formatters.js'
import { setPageMeta } from '../../utils/seo.js'

const TYPE_LABEL = { contact: 'Contact Form', quote: 'Quote Request', amc: 'AMC Request' }

function InfoRow({ Icon, label, children }) {
  if (children === undefined || children === null || children === '') return null
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</p>
        <p className="mt-0.5 break-words text-sm text-ink">{children}</p>
      </div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">{title}</h2>
      <div className="mt-2 divide-y divide-line/60">{children}</div>
    </section>
  )
}

export default function EnquiryDetailsPage() {
  const { id } = useParams()
  const [enquiry, setEnquiry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [statusSaving, setStatusSaving] = useState(false)
  const [note, setNote] = useState('')
  const [noteSaving, setNoteSaving] = useState(false)

  useEffect(() => {
    setPageMeta(`Enquiry #${id} | Admin | AB Enterprises`, 'Enquiry details in the admin dashboard.')
  }, [id])

  useEffect(() => {
    let cancelled = false
    adminService
      .enquiry(id)
      .then((r) => {
        if (!cancelled) setEnquiry(r.data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [id, refreshKey])

  const refresh = () => {
    setError(null)
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }

  const updateStatus = async (status) => {
    setStatusSaving(true)
    try {
      await adminService.updateStatus(id, status)
      setEnquiry((e) => ({ ...e, status }))
      toast.success(`Status updated to ${statusLabel(status)}.`)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setStatusSaving(false)
    }
  }

  const submitNote = async (e) => {
    e.preventDefault()
    const text = note.trim()
    if (!text) return
    setNoteSaving(true)
    try {
      await adminService.addNote(id, text)
      setNote('')
      toast.success('Note added.')
      refresh()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setNoteSaving(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-24"><LoadingSpinner /></div>
  }
  if (error) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <ErrorMessage message={error} onRetry={refresh} />
        <div className="mt-6 text-center">
          <Button to="/admin/enquiries" variant="outlineBlue" size="md">Back to Enquiries</Button>
        </div>
      </div>
    )
  }
  if (!enquiry) return null

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All Enquiries
          </Link>
          <h1 className="mt-2 flex flex-wrap items-center gap-3 text-2xl font-bold text-navy-900">
            Enquiry #{enquiry.id}
            <EnquiryStatusBadge status={enquiry.status} />
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {TYPE_LABEL[enquiry.type] || enquiry.type} · Submitted {formatDate(enquiry.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <label htmlFor="status-update" className="text-sm font-medium text-ink">Status</label>
          <select
            id="status-update"
            value={enquiry.status}
            disabled={statusSaving}
            onChange={(e) => updateStatus(e.target.value)}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink focus:border-blue-700 focus:outline-none disabled:opacity-60"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{statusLabel(s)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Left: customer + message */}
        <div className="space-y-5 lg:col-span-2">
          <Card title="Customer Information">
            <InfoRow Icon={User} label="Full Name">{enquiry.name}</InfoRow>
            <InfoRow Icon={Building2} label="Company">{enquiry.company}</InfoRow>
            <InfoRow Icon={Mail} label="Email">
              <a href={`mailto:${enquiry.email}`} className="text-blue-700 hover:underline">{enquiry.email}</a>
            </InfoRow>
            <InfoRow Icon={Phone} label="Phone">
              <a href={`tel:${enquiry.phone}`} className="text-blue-700 hover:underline">{enquiry.phone}</a>
            </InfoRow>
          </Card>

          <Card title={enquiry.type === 'quote' ? 'Request Details' : 'Enquiry Details'}>
            <InfoRow Icon={Tag} label={enquiry.type === 'quote' ? 'Product / Service' : 'Subject'}>
              {enquiry.subject}
            </InfoRow>
            {enquiry.items?.length > 0 && (
              <div className="py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Requested Items</p>
                <ul className="mt-1.5 space-y-1">
                  {enquiry.items.map((it, i) => (
                    <li key={i} className="text-sm text-ink">
                      {it.item_name || `${it.itemType} #${it.itemId}`}
                      {it.quantity > 1 && <span className="text-ink-soft"> × {it.quantity}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Message</p>
              <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink">
                {enquiry.message}
              </p>
            </div>
          </Card>
        </div>

        {/* Right: meta + notes */}
        <div className="space-y-5">
          <Card title="Request Information">
            <InfoRow Icon={FileText} label="Enquiry ID">#{enquiry.id}</InfoRow>
            <InfoRow Icon={Globe} label="Type">{TYPE_LABEL[enquiry.type] || enquiry.type}</InfoRow>
            <InfoRow Icon={CalendarDays} label="Submitted">{formatDate(enquiry.created_at)}</InfoRow>
            <InfoRow Icon={CheckCircle2} label="Last Updated">{formatDate(enquiry.updated_at)}</InfoRow>
          </Card>

          <section className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-900">
              <StickyNote className="h-4 w-4 text-blue-700" aria-hidden="true" />
              Internal Notes
            </h2>
            <div className="mt-3 space-y-3">
              {enquiry.notes?.length ? (
                enquiry.notes.map((n) => (
                  <div key={n.id} className="rounded-lg border border-line bg-surface px-3.5 py-2.5">
                    <p className="whitespace-pre-wrap text-sm text-ink">{n.note}</p>
                    <p className="mt-1.5 text-xs text-ink-soft">
                      {n.author || 'Admin'} · {formatDate(n.created_at)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-ink-soft">No notes yet.</p>
              )}
            </div>
            <form onSubmit={submitNote} className="mt-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={2000}
                placeholder="Add an internal note (visible only to admins)…"
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-blue-700 focus:outline-none"
              />
              <Button type="submit" variant="primary" size="sm" disabled={noteSaving || !note.trim()} className="mt-2">
                {noteSaving ? 'Saving…' : 'Add Note'}
                {!noteSaving && <Send className="h-3.5 w-3.5" aria-hidden="true" />}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
