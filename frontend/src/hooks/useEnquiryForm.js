import { useCallback, useState } from 'react'
import enquiryService from '../services/enquiryService.js'
import { FIELD_GUARDS } from '../utils/inputGuards.js'

const GENERIC_ERROR =
  "We couldn't send your message right now. Please check your connection and try again."

export default function useEnquiryForm({
  initialValues,
  validators,
  order,
  buildPayload,
  errorText = GENERIC_ERROR,
}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(null)

  const validateField = useCallback(
    (name, value) => (validators[name] ? validators[name](value) : ''),
    [validators]
  )

  const onChange = (e) => {
    const { name, type, checked, value } = e.target
    const guard = FIELD_GUARDS[name]
    const next = type === 'checkbox' ? checked : guard ? guard(value) : value
    if (guard && next !== value) e.target.value = next
    setValues((v) => ({ ...v, [name]: next }))
    if (touched[name]) setErrors((er) => ({ ...er, [name]: validateField(name, next) }))
  }

  const onBlur = (e) => {
    const { name, type, checked, value } = e.target
    if (!validators[name]) return
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((er) => ({
      ...er,
      [name]: validateField(name, type === 'checkbox' ? checked : value),
    }))
  }

  const submit = async (e) => {
    e?.preventDefault()
    if (submitting) return
    const nextErrors = {}
    order.forEach((name) => {
      nextErrors[name] = validateField(name, values[name])
    })
    setErrors(nextErrors)
    setTouched(Object.fromEntries(order.map((n) => [n, true])))
    const firstInvalid = order.find((n) => nextErrors[n])
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus()
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await enquiryService.submit(buildPayload(values))
      if (res?.success !== true) throw new Error('Unconfirmed response')
      setSuccess({ id: res.data?.id ?? null })
      setValues(initialValues)
      setErrors({})
      setTouched({})
    } catch {
      setSubmitError(errorText)
    } finally {
      setSubmitting(false)
    }
  }

  const closeSuccess = useCallback(() => setSuccess(null), [])

  return { values, errors, submitting, submitError, success, onChange, onBlur, submit, closeSuccess }
}
