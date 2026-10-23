import { AlertTriangle } from 'lucide-react'
import Button from './Button.jsx'

export default function ErrorMessage({ message = 'Something went wrong.', onRetry, className = '' }) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center gap-3 rounded-xl border border-error/20 bg-error/5 p-6 text-center ${className}`}
    >
      <AlertTriangle className="h-8 w-8 text-error" aria-hidden="true" />
      <p className="text-sm font-medium text-ink">{message}</p>
      {onRetry && (
        <Button variant="outlineBlue" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
