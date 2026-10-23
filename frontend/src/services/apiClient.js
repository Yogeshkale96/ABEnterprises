import axios from 'axios'
import siteConfig from '../config/siteConfig.js'

const apiClient = axios.create({
  baseURL: siteConfig.api.baseUrl,
  timeout: 12000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ECONNABORTED'
        ? 'Request timed out. Please try again.'
        : 'Unable to reach the server.')
    const normalized = new Error(message)
    normalized.status = error.response?.status
    normalized.code = error.response?.data?.code
    normalized.errors = error.response?.data?.errors
    normalized.isNetworkError = !error.response
    return Promise.reject(normalized)
  }
)

export default apiClient
