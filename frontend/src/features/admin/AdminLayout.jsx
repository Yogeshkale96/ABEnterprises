import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  FileText, LayoutDashboard, LogOut, Mail, Menu, MessagesSquare, X,
} from 'lucide-react'
import Logo from '../../components/common/Logo.jsx'
import { useAuth } from '../auth/useAuth.js'

const NAV = [
  { to: '/admin', end: true, Icon: LayoutDashboard, label: 'Dashboard Overview' },
  { to: '/admin/contact-enquiries', Icon: Mail, label: 'Contact Enquiries' },
  { to: '/admin/quote-requests', Icon: FileText, label: 'Get a Quote Requests' },
  { to: '/admin/enquiries', Icon: MessagesSquare, label: 'All Enquiries' },
]

const linkCls = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-700 text-white shadow-sm'
      : 'text-white/70 hover:bg-white/10 hover:text-white'
  }`

function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const signOut = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex h-full flex-col bg-navy-900 text-white">
      <div className="border-b border-white/10 px-4 py-4" onClick={onNavigate}>
        <Logo dark to="/admin" />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {NAV.map(({ to, end, Icon, label }) => (
          <NavLink key={to} to={to} end={end} className={linkCls} onClick={onNavigate}>
            <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 px-4 py-4">
        <p className="truncate text-sm font-semibold">{user?.name}</p>
        <p className="truncate text-xs text-white/50">{user?.email}</p>
        <button
          type="button"
          onClick={signOut}
          className="mt-3 flex w-full items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg border border-line p-2 text-ink hover:bg-surface-blue lg:hidden"
            aria-label="Open navigation menu"
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="hidden items-center gap-3 lg:flex">
            <span className="text-sm font-semibold text-navy-900">Admin Panel</span>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="text-right">
              <p className="text-sm font-semibold text-navy-900">{user?.name}</p>
              <p className="text-xs capitalize text-ink-soft">{user?.role}</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-700 text-sm font-bold text-white">
              {(user?.name || 'A').trim().charAt(0).toUpperCase()}
            </span>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
