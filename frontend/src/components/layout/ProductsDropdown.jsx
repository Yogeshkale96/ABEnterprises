import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BatteryCharging,
  Cctv,
  HardDrive,
  Keyboard,
  Laptop,
  Monitor,
  Network,
  Printer,
  Router,
  ShieldCheck,
} from 'lucide-react'
import { productsMenu } from '../../config/navigation.js'

/* Icon, gradient and tagline per menu entry (same order as productsMenu). */
const ITEM_STYLES = [
  { Icon: Monitor, grad: 'from-sky-500 to-sky-700', tag: 'Business & performance PCs' },
  { Icon: Laptop, grad: 'from-indigo-500 to-indigo-700', tag: 'Work, study & professional' },
  { Icon: Printer, grad: 'from-amber-400 to-amber-600', tag: 'Laser & multifunction' },
  { Icon: Cctv, grad: 'from-red-500 to-red-700', tag: 'HD & IP camera kits' },
  { Icon: Network, grad: 'from-teal-500 to-teal-700', tag: 'Connectivity hardware' },
  { Icon: Router, grad: 'from-cyan-500 to-cyan-700', tag: 'Routers, switches & APs' },
  { Icon: BatteryCharging, grad: 'from-orange-400 to-orange-600', tag: 'Backup power' },
  { Icon: Keyboard, grad: 'from-violet-500 to-violet-700', tag: 'Peripherals & add-ons' },
  { Icon: HardDrive, grad: 'from-emerald-500 to-emerald-700', tag: 'Drives & memory' },
  { Icon: ShieldCheck, grad: 'from-rose-500 to-rose-700', tag: 'Locks, alarms & more' },
]

export default function ProductsDropdown({ onNavigate }) {
  return (
    <div
      role="menu"
      aria-label="Products menu"
      className="w-max max-w-[94vw] overflow-hidden rounded-xl border border-white/10 bg-navy-950/95 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid grid-cols-2 gap-x-0.5 gap-y-0 p-1.5">
        {productsMenu.map((item, i) => {
          const { Icon, grad, tag } = ITEM_STYLES[i % ITEM_STYLES.length]
          return (
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={onNavigate}
              className="group flex w-[13.75rem] items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${grad} text-white shadow-md transition-transform duration-200 group-hover:scale-110`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold leading-tight text-white">{item.label}</span>
                <span className="block truncate text-[10px] leading-tight text-white/55 transition-colors group-hover:text-white/75">
                  {tag}
                </span>
              </span>
              <ArrowRight
                className="h-3 w-3 shrink-0 -translate-x-1 text-cyan-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>
      <Link
        to="/products"
        onClick={onNavigate}
        className="flex items-center justify-center gap-1.5 border-t border-white/10 bg-gradient-to-r from-blue-700 to-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
      >
        View All Products
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  )
}
