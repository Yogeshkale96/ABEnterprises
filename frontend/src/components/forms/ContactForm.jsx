import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'
import Button from '../common/Button.jsx'
import enquiryService from '../../services/enquiryService.js'
import { enquiryBaseFields } from '../../utils/validators.js'
import { guardCompany, guardEmail, guardEvent, guardName, guardPhone } from '../../utils/inputGuards.js'

const contactSchema = z.object({
  ...enquiryBaseFields,
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
})

const inputCls =
  'w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-soft/60 hover:border-blue-500 focus:border-blue-700 focus:outline-none'
const labelCls = 'mb-1.5 block text-sm font-medium text-ink'
const errCls = 'mt-1 text-xs text-error'

export function Field({ label, error, required, children }) {
  return (
    <div>
      <label className={labelCls}>
        {label} {required && <span className="text-error" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p className={errCls} role="alert">{error.message}</p>}
    </div>
  )
}

export default function ContactForm({ type = 'contact', heading }) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await enquiryService.submit({ ...values, type })
      toast.success('Thank you! Your enquiry has been received. We will get back to you soon.')
      reset()
    } catch (err) {
      toast.error(err.message || 'Could not submit the form. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {heading && <h2 className="text-xl font-bold text-navy-900">{heading}</h2>}

      {/* Honeypot — hidden from humans */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.name}>
          <input {...register('name', { onChange: guardEvent(guardName) })} className={inputCls} placeholder="Your full name" autoComplete="name" />
        </Field>
        <Field label="Business Email" required error={errors.email}>
          <input {...register('email', { onChange: guardEvent(guardEmail) })} type="email" className={inputCls} placeholder="you@company.com" autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" required error={errors.phone}>
          <input {...register('phone', { onChange: guardEvent(guardPhone) })} type="tel" inputMode="tel" className={inputCls} placeholder="+91 XXXXX XXXXX" autoComplete="tel" />
        </Field>
        <Field label="Company Name" error={errors.company}>
          <input {...register('company', { onChange: guardEvent(guardCompany) })} className={inputCls} placeholder="Your company (optional)" autoComplete="organization" />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject}>
        <input {...register('subject')} className={inputCls} placeholder="What is this about? (optional)" />
      </Field>

      <Field label="Message" required error={errors.message}>
        <textarea {...register('message')} rows={5} className={inputCls} placeholder="Describe your requirement…" />
      </Field>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-ink-soft">
          <input type="checkbox" {...register('consent')} className="mt-0.5 h-4 w-4 rounded border-line text-blue-700 focus:ring-blue-500" />
          I consent to AB Enterprises contacting me about this enquiry.
        </label>
        {errors.consent && <p className={errCls} role="alert">{errors.consent.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? 'Sending…' : 'Send Message'}
        {!submitting && <Send className="h-4 w-4" aria-hidden="true" />}
      </Button>
    </form>
  )
}
