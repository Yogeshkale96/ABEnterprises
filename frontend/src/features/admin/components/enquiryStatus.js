/** Shared enquiry status constants + label helper (kept out of component files for fast refresh). */
export const STATUS_OPTIONS = ['new', 'in_progress', 'resolved', 'closed']

const LABELS = {
  new: 'New',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
}

export const statusLabel = (s) => LABELS[s] || s

export const STATUS_STYLES = {
  new: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  in_progress: 'bg-amber-50 text-amber-700 ring-amber-600/25',
  resolved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  closed: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}
