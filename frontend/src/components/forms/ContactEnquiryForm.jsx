import { Building2, Mail, Phone, Send, Tag, User } from 'lucide-react'
import FormField, { iconInputCls, inputCls } from './FormField.jsx'
import { ConsentCheckbox, FormAlert, FormHeader, SubmitButton } from './FormParts.jsx'
import SuccessModal from './SuccessModal.jsx'
import useEnquiryForm from '../../hooks/useEnquiryForm.js'
import {
  CONTACT_FIELD_ORDER,
  buildContactPayload,
  contactInitialValues,
  contactValidators,
} from '../../utils/contactValidation.js'

export default function ContactEnquiryForm() {
  const f = useEnquiryForm({
    initialValues: contactInitialValues,
    validators: contactValidators,
    order: CONTACT_FIELD_ORDER,
    buildPayload: buildContactPayload,
  })
  const { values, errors } = f
  const bind = (name) => ({ name, value: values[name], onChange: f.onChange, onBlur: f.onBlur })

  return (
    <>
      <form onSubmit={f.submit} noValidate className="space-y-6" aria-describedby="contact-form-intro">
        <FormHeader
          id="contact-form-intro"
          eyebrow="Contact Form"
          title="Send Us a Message"
          description="Complete the form below and provide enough information for our team to understand your inquiry."
        />

        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={f.onChange} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="field-name" label="Full Name" required icon={User} error={errors.name}>
            {(a) => (
              <input {...a} {...bind('name')} className={iconInputCls} placeholder="Rahul Sharma" autoComplete="name" />
            )}
          </FormField>
          <FormField id="field-phone" label="Phone Number" required icon={Phone} error={errors.phone}>
            {(a) => (
              <input {...a} {...bind('phone')} type="tel" inputMode="tel" className={iconInputCls}
                placeholder="+91 98765 43210" autoComplete="tel" />
            )}
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="field-email" label="Business Email" required icon={Mail} error={errors.email}>
            {(a) => (
              <input {...a} {...bind('email')} type="email" className={iconInputCls}
                placeholder="you@company.com" autoComplete="email" />
            )}
          </FormField>
          <FormField id="field-company" label="Company Name" icon={Building2} error={errors.company}>
            {(a) => (
              <input {...a} {...bind('company')} className={iconInputCls}
                placeholder="Your company" autoComplete="organization" />
            )}
          </FormField>
        </div>

        <FormField id="field-subject" label="Subject" icon={Tag} error={errors.subject}>
          {(a) => (
            <input {...a} {...bind('subject')} className={iconInputCls} placeholder="What is this about?" />
          )}
        </FormField>

        <FormField id="field-message" label="Your Message" required error={errors.message}
          hint={`${values.message.trim().length} / 5,000 characters`}>
          {(a) => (
            <textarea {...a} {...bind('message')} rows={5} className={`${inputCls} resize-y`}
              placeholder="Describe your requirement, products or services of interest..." />
          )}
        </FormField>

        <ConsentCheckbox checked={values.consent} error={errors.consent} onChange={f.onChange} onBlur={f.onBlur}>
          I consent to AB ENTERPRISES contacting me about this enquiry.
        </ConsentCheckbox>

        <FormAlert message={f.submitError} onRetry={f.submit} busy={f.submitting} />

        <SubmitButton busy={f.submitting} busyLabel="Sending…">
          Send Message <Send className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </SubmitButton>
      </form>

      <SuccessModal
        open={Boolean(f.success)}
        title="Message Sent Successfully!"
        message="Thank you for contacting AB ENTERPRISES PRIVATE LIMITED. Our team has received your enquiry."
        reference={f.success?.id}
        onClose={f.closeSuccess}
      />
    </>
  )
}
