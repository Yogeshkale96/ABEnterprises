import apiClient from './apiClient.js'

const enquiryService = {
  submit: (payload) => apiClient.post('/enquiries', payload).then((r) => r),
}

export default enquiryService
