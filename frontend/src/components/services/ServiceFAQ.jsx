import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Clock,
  Code2,
  FileText,
  Headphones,
  HelpCircle,
  KeyRound,
  Laptop,
  Megaphone,
  Network,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  Video,
  Wallet,
} from 'lucide-react'

/* Pick an icon that matches the question's topic. */
const QUESTION_ICONS = [
  [/cost|price|pricing|quote|charge|budget/i, Wallet],
  [/time|long|duration|fast|deadline/i, Clock],
  [/amc|maintenance|contract|cover|warranty/i, ShieldCheck],
  [/support|help|on.?site|service/i, Headphones],
  [/start|information|required|begin|need/i, FileText],
  [/seo|rank|search|google/i, Search],
  [/cctv|camera|surveillance|security/i, Video],
  [/network|wi-?fi|lan|router/i, Network],
  [/software|app|develop|code|website|web|design/i, Code2],
  [/repair|fix|laptop|computer|device/i, Laptop],
  [/supply|bulk|institution|equipment/i, PackageCheck],
  [/access|entry|biometric|card/i, KeyRound],
  [/marketing|brand|social|campaign/i, Megaphone],
]
const iconFor = (q) => {
  for (const [re, Icon] of QUESTION_ICONS) if (re.test(q)) return Icon
  return HelpCircle
}

/**
 * Accessible FAQ accordion — uniform centred cards with numbered badges,
 * a rotating plus indicator and a gradient-tinted open state.
 * First item open by default.
 */
export default function ServiceFAQ({ faqs, idPrefix = 'faq' }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(0)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-4">
      {faqs.map((faq, i) => {
        const isOpen = open === i
        const btnId = `${idPrefix}-btn-${i}`
        const panelId = `${idPrefix}-panel-${i}`
        return (
          <motion.div
            key={faq.q}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
            className={`group relative w-full overflow-hidden rounded-2xl border shadow-card transition-all duration-300 ${
              isOpen
                ? 'border-blue-600/50 bg-gradient-to-b from-surface-blue/60 to-white shadow-card-hover'
                : 'border-line bg-gradient-to-b from-white to-surface/40 hover:-translate-y-0.5 hover:border-blue-600/40 hover:shadow-card-hover'
            }`}
          >
            {/* Soft corner glow on open */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl transition-opacity duration-500 ${
                isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
              }`}
            />
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="relative flex w-full items-center justify-center px-16 py-5 text-center text-base font-bold text-navy-900 transition-colors sm:px-20 sm:text-lg"
              >
                {/* Topic icon + number tag — left */}
                <span
                  aria-hidden="true"
                  className={`absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-blue-700 bg-gradient-to-br from-blue-700 to-cyan-500 text-white'
                      : 'border-blue-600/25 bg-surface-blue/60 text-blue-700 group-hover:border-blue-600/50'
                  }`}
                >
                  {(() => {
                    const QIcon = iconFor(faq.q)
                    return <QIcon className="h-5 w-5" />
                  })()}
                  <span
                    className={`absolute -left-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[9px] font-extrabold leading-none transition-all duration-300 ${
                      isOpen ? 'bg-white text-blue-700' : 'bg-accent-yellow text-navy-950'
                    }`}
                  >
                    {i + 1}
                  </span>
                </span>
                <span className="leading-snug">{faq.q}</span>
                {/* Plus indicator — right */}
                <span
                  aria-hidden="true"
                  className={`absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? 'rotate-45 border-blue-700 bg-gradient-to-br from-blue-700 to-cyan-500 text-white'
                      : 'border-cyan-500/40 bg-cyan-400/10 text-cyan-600 group-hover:border-cyan-500/70'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={reduce ? {} : { height: 'auto', opacity: 1 }}
                  exit={reduce ? {} : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 text-center sm:px-10">
                    <span aria-hidden="true" className="mx-auto mb-3 block h-0.5 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
                    <p className="text-[15px] leading-relaxed text-ink-soft">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
