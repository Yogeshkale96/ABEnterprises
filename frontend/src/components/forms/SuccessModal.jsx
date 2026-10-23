import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessModal({ open, title, message, reference, onClose }) {
  const buttonRef = useRef(null)
  const returnFocusRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    returnFocusRef.current = document.activeElement
    const root = document.getElementById('root')
    root?.setAttribute('inert', '')
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    buttonRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      root?.removeAttribute('inert')
      document.body.style.overflow = prevOverflow
      returnFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-desc"
        className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
          <CheckCircle2 className="h-8 w-8 text-blue-600" aria-hidden="true" />
        </span>
        <h2 id="success-modal-title" className="mt-5 text-2xl font-extrabold text-navy-900">
          {title}
        </h2>
        <p id="success-modal-desc" className="mt-2 text-sm leading-relaxed text-ink-soft">
          {message}
        </p>
        {reference && (
          <p className="mt-4 rounded-lg bg-surface px-3 py-2 text-sm text-ink">
            Reference number: <strong className="text-navy-900">#{reference}</strong>
          </p>
        )}
        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
        >
          Done
        </button>
      </div>
    </div>,
    document.body
  )
}
