import axios from 'axios'
import siteConfig from '../config/siteConfig.js'
import { isNative, tokenStore } from './tokenStore.js'

const apiClient = axios.create({
  baseURL: siteConfig.api.baseUrl,
  timeout: 12000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// Native builds can't rely on cookies — attach the stored access token.
apiClient.interceptors.request.use(async (config) => {
  if (isNative() && !config.headers.Authorization) {
    const token = await tokenStore.accessToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Single-flight refresh so parallel 401s only rotate once.
let refreshPromise = null
export function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const body = isNative() ? { refreshToken: await tokenStore.refreshToken() } : {}
      const r = await axios.post(`${siteConfig.api.baseUrl}/auth/refresh`, body, {
        baseURL: '/',
        timeout: 10000,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      const { user, accessToken, refreshToken } = r.data.data
      await tokenStore.set({ accessToken, refreshToken })
      return user
    })().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const original = error.config
    // On an expired access token, rotate once and retry the original request.
    if (
      error.response?.status === 401 &&
      !original?.url?.includes('/auth/') &&
      !original?._retried
    ) {
      original._retried = true
      try {
        await refreshSession()
        return apiClient(original)
      } catch {
        await tokenStore.clear()
      }
    }
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
