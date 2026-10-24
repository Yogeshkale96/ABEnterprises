import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BatteryCharging, Cctv, Headphones, Laptop, Loader2, Monitor, Printer } from 'lucide-react'
import Logo from '../components/common/Logo.jsx'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference.js'
import siteConfig from '../config/siteConfig.js'

const highlights = [
  { Icon: Laptop, label: 'Laptop' },
  { Icon: Monitor, label: 'Desktop' },
  { Icon: Printer, label: 'Printer' },
  { Icon: Cctv, label: 'CCTV' },
  { Icon: Headphones, label: 'Accessories' },
  { Icon: BatteryCharging, label: 'UPS' },
]

const REDIRECT_DELAY_MS = 3000

export default function LandingPage() {
  const reducedMotion = useReducedMotionPreference()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [navigate])

  const anim = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: 'easeOut' },
        }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-navy-900">
      {/* Decorative tech background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <svg className="circuit-pulse absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M10 10 h40 v30 h40 M60 10 v40 M10 80 h30 v30 M90 60 v50 h20" stroke="#00C8F0" strokeWidth="1" fill="none" opacity="0.5" />
              <circle cx="10" cy="10" r="2.5" fill="#00C8F0" opacity="0.7" />
              <circle cx="90" cy="40" r="2.5" fill="#168BFF" opacity="0.7" />
              <circle cx="40" cy="110" r="2.5" fill="#FFB800" opacity="0.6" />
              <circle cx="110" cy="110" r="2.5" fill="#00C8F0" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <main
        className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-6"
      >
        <motion.div {...anim(0)} className="rounded-2xl bg-white/95 p-4 shadow-2xl sm:p-5">
          <Logo to={null} className="h-16 w-auto sm:h-20" />
        </motion.div>

        <motion.h1
          {...anim(0.15)}
          className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          {siteConfig.company.legalName}
        </motion.h1>

        <motion.p
          {...anim(0.25)}
          className="mt-2 text-lg font-medium italic text-cyan-400 sm:text-xl"
        >
          “{siteConfig.company.tagline}”
        </motion.p>

        <motion.p
          {...anim(0.35)}
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
        >
          {siteConfig.company.shortIntro} From hardware supply to software development and
          annual maintenance — one trusted partner for all your technology needs.
        </motion.p>

        <motion.div {...anim(0.45)} className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {highlights.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur"
            >
              <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div {...anim(0.55)} className="mt-6 flex flex-col items-center gap-2.5">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" aria-hidden="true" />
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-accent-yellow"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: REDIRECT_DELAY_MS / 1000, ease: 'easeInOut' }
              }
            />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60" role="status">
            Loading experience…
          </p>
        </motion.div>
      </main>

      <footer className="relative z-10 pb-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {siteConfig.company.legalName}
      </footer>
    </div>
  )
}
