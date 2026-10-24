import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import Logo from '../../components/common/Logo.jsx'
import Button from '../../components/common/Button.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import { useAuth } from '../auth/useAuth.js'
import { setPageMeta } from '../../utils/seo.js'

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const inputCls =
  'w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-soft/60 hover:border-blue-500 focus:border-blue-700 focus:outline-none'

export default function AdminLoginPage() {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) })

  useEffect(() => {
    setPageMeta('Admin Login | AB Enterprises Private Limited', 'Administrator sign-in.')
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-900">
        <LoadingSpinner label="Checking session…" />
      </div>
    )
  }
  if (user) {
    return <Navigate to={location.state?.from || '/admin'} replace />
  }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await login(values.email, values.password)
      toast.success('Welcome back.')
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (err) {
      toast.error(err.message || 'Login failed. Check your credentials.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex justify-center">
          <Logo to={null} className="h-14 rounded-xl shadow-sm" />
        </div>
        <h1 className="mt-6 text-center text-xl font-bold text-navy-900">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-ink-soft">
          Sign in to manage enquiries and content.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
          <div>
            <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-ink">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              className={inputCls}
              placeholder="admin@example.com"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-xs text-error" role="alert">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-ink">Password</label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`${inputCls} pr-11`}
                placeholder="••••••••"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft transition-colors hover:text-blue-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-error" role="alert">{errors.password.message}</p>}
          </div>
          <Button type="submit" variant="primary" size="lg" disabled={submitting} className="w-full">
            {submitting ? 'Signing in…' : 'Sign In'}
            {!submitting && <LogIn className="h-4 w-4" aria-hidden="true" />}
          </Button>
        </form>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink-soft">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          Restricted area — authorised staff only.
        </p>
      </div>
    </div>
  )
}
