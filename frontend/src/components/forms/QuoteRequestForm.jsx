import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { FileText } from 'lucide-react'
import Button from '../common/Button.jsx'
import { Field } from './ContactForm.jsx'
import enquiryService from '../../services/enquiryService.js'
import { enquiryBaseFields } from '../../utils/validators.js'
import { guardCompany, guardEmail, guardEvent, guardName, guardPhone } from '../../utils/inputGuards.js'

const quoteSchema = z.object({
  ...enquiryBaseFields,
  requirement: z.string().trim().min(2, 'Please select a requirement').max(160),
  website: z.string().max(0).optional().or(z.literal('')),
})

const inputCls =
  'w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-soft/60 hover:border-blue-500 focus:border-blue-700 focus:outline-none'

const REQUIREMENTS = [
  'Computers / Laptops',
  'Printers & Scanners',
  'CCTV & Security',
  'Networking Solutions',
  'Website / Software Development',
  'Digital Marketing / SEO',
  'AMC & Technical Support',
  'Bulk / Institutional IT Supply',
  'Other',
]

export default function QuoteRequestForm({ defaultRequirement = '', type = 'quote', submitLabel = 'Request a Quote' }) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { requirement: defaultRequirement },
  })

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await enquiryService.submit({
        ...values,
        type,
        subject: `${type === 'amc' ? 'AMC Plan' : 'Quote'} request: ${values.requirement}`,
      })
      toast.success('Your request has been received. Our team will contact you shortly.')
      reset({ requirement: defaultRequirement })
    } catch (err) {
      toast.error(err.message || 'Could not submit the request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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

      <Field label="What do you need?" required error={errors.requirement}>
        <select {...register('requirement')} className={inputCls} defaultValue={defaultRequirement}>
          <option value="" disabled>Select a product or service…</option>
          {REQUIREMENTS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </Field>

      <Field label="Requirement Details" required error={errors.message}>
        <textarea
          {...register('message')}
          rows={5}
          className={inputCls}
          placeholder="Quantities, specifications, timeline…"
        />
      </Field>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-ink-soft">
          <input type="checkbox" {...register('consent')} className="mt-0.5 h-4 w-4 rounded border-line text-blue-700 focus:ring-blue-500" />
          I consent to AB Enterprises contacting me about this request.
        </label>
        {errors.consent && <p className="mt-1 text-xs text-error" role="alert">{errors.consent.message}</p>}
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? 'Submitting…' : submitLabel}
        {!submitting && <FileText className="h-4 w-4" aria-hidden="true" />}
      </Button>
    </form>
  )
}
