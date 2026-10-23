import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../features/auth/AuthContext.jsx'

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '10px', background: '#0B2D5C', color: '#fff' },
          success: { iconTheme: { primary: '#16A34A', secondary: '#fff' } },
          error: { iconTheme: { primary: '#DC2626', secondary: '#fff' } },
        }}
      />
    </AuthProvider>
  )
}
