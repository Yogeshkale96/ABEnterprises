import { useMemo } from 'react'
import {
  Building2,
  Cctv,
  Code2,
  FileText,
  Globe,
  Wallet,
  Headphones,
  KeyRound,
  Laptop,
  Mail,
  Megaphone,
  MessageSquarePlus,
  Network,
  PackageCheck,
  Phone,
  Search,
  User,
} from 'lucide-react'
import FormField, { iconInputCls, inputCls } from './FormField.jsx'
import SelectField from './SelectField.jsx'
import { ConsentCheckbox, FormAlert, FormHeader, SubmitButton } from './FormParts.jsx'
import SuccessModal from './SuccessModal.jsx'
import useEnquiryForm from '../../hooks/useEnquiryForm.js'
import {
  QUOTE_FIELD_ORDER,
  QUOTE_SERVICES,
  budgetOptionsFor,
  buildQuotePayload,
  quoteInitialValues,
  quoteValidators,
} from '../../utils/quoteValidation.js'

const SERVICE_ICONS = {
  'website-development': Globe,
  'software-development': Code2,
  'digital-marketing': Megaphone,
  'seo-social-media': Search,
  'computer-laptop-services': Laptop,
  'networking-solutions': Network,
  'cctv-installation': Cctv,
  'access-control-systems': KeyRound,
  'amc-support': Headphones,
  'institutional-it-supply': PackageCheck,
  'other-requirement': MessageSquarePlus,
}

const SERVICE_OPTIONS = QUOTE_SERVICES.map((s) => ({ ...s, icon: SERVICE_ICONS[s.value] }))

const compactInputCls = inputCls.replace('py-3.5', 'py-2.5').replace('text-[15px]', 'text-sm')
const compactIconInputCls = iconInputCls.replace('py-3.5', 'py-2.5').replace('text-[15px]', 'text-sm')

const QUOTE_ERROR =
  "We couldn't send your request right now. Please check your connection and try again."

export default function QuoteEnquiryForm({ defaultService = '' }) {
  const initialValues = useMemo(() => quoteInitialValues(defaultService), [defaultService])
  const f = useEnquiryForm({
    initialValues,
    validators: quoteValidators,
    order: QUOTE_FIELD_ORDER,
    buildPayload: buildQuotePayload,
    errorText: QUOTE_ERROR,
  })
  const { values, errors } = f
  const bind = (name) => ({ name, value: values[name], onChange: f.onChange, onBlur: f.onBlur })
  const budgetOptions = budgetOptionsFor(values.service)

  // Budget ranges depend on the chosen service, so clear a stale selection.
  const onServiceChange = (e) => {
    f.onChange(e)
    f.onChange({ target: { name: 'budget', value: '', type: 'select' } })
  }

  return (
    <>
      <form onSubmit={f.submit} noValidate className="space-y-4" aria-describedby="quote-form-intro">
        <FormHeader
          id="quote-form-intro"
          eyebrow="Get a Quote"
          title="Request a Quote"
          description="Share your requirement. Submitting is an enquiry and does not confirm an order."
        />

        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={f.onChange} />
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <FormField id="field-name" label="Full Name" required icon={User} error={errors.name}>
            {(a) => (
              <input {...a} {...bind('name')} className={compactIconInputCls} placeholder="Rahul Sharma" autoComplete="name" />
            )}
          </FormField>
          <FormField id="field-phone" label="Phone Number" required icon={Phone} error={errors.phone}>
            {(a) => (
              <input {...a} {...bind('phone')} type="tel" inputMode="tel" className={compactIconInputCls}
                placeholder="+91 98765 43210" autoComplete="tel" />
            )}
          </FormField>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <FormField id="field-email" label="Business Email" required icon={Mail} error={errors.email}>
            {(a) => (
              <input {...a} {...bind('email')} type="email" className={compactIconInputCls}
                placeholder="you@company.com" autoComplete="email" />
            )}
          </FormField>
          <FormField id="field-company" label="Company Name" icon={Building2} error={errors.company}>
            {(a) => (
              <input {...a} {...bind('company')} className={compactIconInputCls}
                placeholder="Your company" autoComplete="organization" />
            )}
          </FormField>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <FormField id="field-service" label="What do you need?" required error={errors.service}>
            {(a) => (
              <SelectField
                {...a}
                {...bind('service')}
                onChange={onServiceChange}
                compact
                options={SERVICE_OPTIONS}
                placeholder="Select a product or service"
                aria-label="Product or service"
              />
            )}
          </FormField>
          <FormField id="field-budget" label="Budget Range" icon={Wallet} error={errors.budget}>
            {(a) => (
              <SelectField
                {...a}
                {...bind('budget')}
                compact
                disabled={budgetOptions.length === 0}
                options={budgetOptions}
                placeholder={budgetOptions.length ? 'Select an approximate range' : 'Select a service first'}
                aria-label="Budget range"
              />
            )}
          </FormField>
        </div>

        <FormField
          id="field-message"
          label="Requirement Details"
          required
          error={errors.message}
          hint={
            values.service === 'other-requirement'
              ? 'Please describe your additional requirement here.'
              : `${values.message.trim().length} / 4,900 characters`
          }
        >
          {(a) => (
            <textarea {...a} {...bind('message')} rows={4} className={`${compactInputCls} resize-y`}
              placeholder="Quantities, specifications, timeline..." />
          )}
        </FormField>

        <ConsentCheckbox compact checked={values.consent} error={errors.consent} onChange={f.onChange} onBlur={f.onBlur}>
          I consent to AB ENTERPRISES contacting me about this request.
        </ConsentCheckbox>

        <FormAlert message={f.submitError} onRetry={f.submit} busy={f.submitting} />

        <SubmitButton compact busy={f.submitting} busyLabel="Submitting…">
          Request a Quote <FileText className="h-[18px] w-[18px]" aria-hidden="true" />
        </SubmitButton>
      </form>

      <SuccessModal
        open={Boolean(f.success)}
        title="Quote Request Submitted!"
        message="Thank you for sharing your requirements with AB ENTERPRISES PRIVATE LIMITED. Your request has been submitted successfully."
        reference={f.success?.id}
        onClose={f.closeSuccess}
      />
    </>
  )
}
