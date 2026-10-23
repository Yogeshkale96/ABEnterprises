import { Loader2, ShieldCheck } from 'lucide-react'

export function ConsentCheckbox({ checked, error, onChange, onBlur, compact = false, children }) {
  return (
    <div>
      <label
        htmlFor="field-consent"
        className={`flex cursor-pointer items-start gap-3 rounded-xl border text-sm leading-relaxed transition-colors ${
          compact ? 'p-3 text-[13px]' : 'p-4'
        } ${
          error ? 'border-error/50 bg-error/[0.04]' : 'border-line bg-surface-blue/50 hover:border-blue-500/50'
        }`}
      >
        <input
          id="field-consent"
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'field-consent-error' : undefined}
          aria-required="true"
          className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-line text-blue-700 focus:ring-blue-500"
        />
        <span className="text-ink-soft">{children}</span>
      </label>
      {error && (
        <p id="field-consent-error" role="alert" className="mt-1.5 text-xs font-medium text-error">{error}</p>
      )}
    </div>
  )
}

export function FormAlert({ message, onRetry, busy }) {
  if (!message) return null
  return (
    <div role="alert" className="rounded-xl border border-error/30 bg-error/5 p-4 text-sm text-error">
      <p>{message}</p>
      <button
        type="button"
        onClick={onRetry}
        disabled={busy}
        className="mt-2 font-bold underline underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-error/40"
      >
        Try again
      </button>
    </div>
  )
}

export function SubmitButton({ busy, busyLabel, compact = false, children }) {
  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-8 ${compact ? 'py-3 text-sm' : 'py-4 text-[15px]'} font-bold text-white shadow-lg shadow-blue-700/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0`}
      >
        {busy ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> {busyLabel}
          </>
        ) : (
          children
        )}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-ink-soft">
        <ShieldCheck className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
        Your details are kept private and used only to respond to you.
      </p>
    </div>
  )
}

export function FormHeader({ id, eyebrow, title, description }) {
  return (
    <div className="border-b border-line pb-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-[28px]">{title}</h2>
      <p id={id} className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
    </div>
  )
}
