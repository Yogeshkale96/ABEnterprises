import { AlertCircle } from 'lucide-react'

const base =
  'w-full rounded-xl border bg-white py-3.5 pr-4 text-[15px] text-navy-900 shadow-sm transition-all duration-200 placeholder:text-ink-soft/55 focus:outline-none focus:ring-4'
const state =
  'border-line hover:border-blue-500/70 focus:border-blue-700 focus:ring-blue-500/15 aria-[invalid=true]:border-error aria-[invalid=true]:bg-error/[0.03] aria-[invalid=true]:focus:ring-error/15'

export const inputCls = `${base} ${state} pl-4`
export const iconInputCls = `${base} ${state} pl-11`

export default function FormField({ id, label, required, error, hint, icon: Icon, className = '', children }) {
  const errId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-center gap-1 text-[13px] font-bold tracking-wide text-navy-900">
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">*</span>
        ) : (
          <span className="text-[11px] font-medium text-ink-soft">(optional)</span>
        )}
      </label>
      <div className="group/field relative">
        {Icon && (
          <Icon
            className={`pointer-events-none absolute left-4 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 transition-colors duration-200 ${
              error ? 'text-error' : 'text-ink-soft/70 group-focus-within/field:text-blue-700'
            }`}
            aria-hidden="true"
          />
        )}
        {children({
          id,
          'aria-invalid': error ? 'true' : 'false',
          'aria-describedby': describedBy,
          'aria-required': required ? 'true' : undefined,
        })}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-ink-soft">{hint}</p>
      )}
      {error && (
        <p id={errId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-error">
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
