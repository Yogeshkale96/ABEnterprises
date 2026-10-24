import { STATUS_STYLES, statusLabel } from './enquiryStatus.js'

export default function EnquiryStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_STYLES[status] || STATUS_STYLES.new}`}
    >
      {statusLabel(status)}
    </span>
  )
}
