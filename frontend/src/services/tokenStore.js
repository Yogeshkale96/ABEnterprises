import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'

/**
 * Token storage strategy:
 * - Browser: tokens live in memory only. Sessions are maintained by HttpOnly
 *   cookies, so nothing sensitive is ever written to web storage.
 * - Native (Capacitor): cookies don't reliably persist in WebViews, so the
 *   access/refresh pair is kept in @capacitor/preferences (Secure Enclave /
 *   EncryptedSharedPreferences on device) and sent as Bearer headers.
 */
export const isNative = () => Capacitor.isNativePlatform()

const KEYS = { access: 'abe_access_token', refresh: 'abe_refresh_token' }

let memoryAccess = null
let memoryRefresh = null

export const tokenStore = {
  async set({ accessToken, refreshToken }) {
    memoryAccess = accessToken
    memoryRefresh = refreshToken
    if (!isNative()) return
    if (accessToken) await Preferences.set({ key: KEYS.access, value: accessToken })
    if (refreshToken) await Preferences.set({ key: KEYS.refresh, value: refreshToken })
  },

  async accessToken() {
    if (memoryAccess) return memoryAccess
    if (!isNative()) return null
    const { value } = await Preferences.get({ key: KEYS.access })
    memoryAccess = value
    return value
  },

  async refreshToken() {
    if (memoryRefresh) return memoryRefresh
    if (!isNative()) return null
    const { value } = await Preferences.get({ key: KEYS.refresh })
    memoryRefresh = value
    return value
  },

  async clear() {
    memoryAccess = null
    memoryRefresh = null
    if (!isNative()) return
    await Preferences.remove({ key: KEYS.access })
    await Preferences.remove({ key: KEYS.refresh })
  },
}
