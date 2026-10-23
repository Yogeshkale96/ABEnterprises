export default function LoadingSpinner({ label = 'Loading…', className = '' }) {
  return (
    <div role="status" aria-live="polite" className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="h-6 w-6 animate-spin rounded-full border-[3px] border-line border-t-blue-700"
      />
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  )
}
