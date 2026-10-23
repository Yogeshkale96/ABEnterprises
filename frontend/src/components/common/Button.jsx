import { Link } from 'react-router-dom'

const VARIANTS = {
  primary:
    'bg-blue-700 text-white hover:bg-blue-500 focus-visible:outline-blue-500 shadow-sm',
  accent:
    'bg-accent-yellow text-navy-900 font-semibold hover:bg-accent-orange',
  outline:
    'border-2 border-white/80 text-white hover:bg-white hover:text-navy-900',
  outlineBlue:
    'border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white',
  ghost: 'text-blue-700 hover:bg-surface-blue',
  white: 'bg-white text-navy-900 font-semibold hover:bg-surface-blue shadow-sm',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  disabled = false,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
