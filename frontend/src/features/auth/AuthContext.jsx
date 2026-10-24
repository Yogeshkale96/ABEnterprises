import { useCallback, useEffect, useState } from 'react'
import apiClient, { refreshSession } from '../../services/apiClient.js'
import { isNative, tokenStore } from '../../services/tokenStore.js'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const bootstrap = async () => {
      try {
        const r = await apiClient.get('/auth/me')
        if (!cancelled) setUser(r.data.user)
      } catch {
        // Access token may just be expired — try rotating via refresh token.
        try {
          const u = await refreshSession()
          if (!cancelled) setUser(u)
        } catch {
          if (!cancelled) setUser(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    bootstrap()
    return () => { cancelled = true }
  }, [])

  const login = useCallback(async (email, password) => {
    const r = await apiClient.post('/auth/login', { email, password })
    const { user, accessToken, refreshToken } = r.data
    await tokenStore.set({ accessToken, refreshToken })
    setUser(user)
    return user
  }, [])

  const logout = useCallback(async () => {
    try {
      const refreshToken = isNative() ? await tokenStore.refreshToken() : undefined
      await apiClient.post('/auth/logout', refreshToken ? { refreshToken } : {})
    } catch {
      // Always clear local session even if the server call fails.
    } finally {
      await tokenStore.clear()
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
