'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isExpertLoggedIn: boolean
  expertEmail: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isExpertLoggedIn, setIsExpertLoggedIn] = useState(false)
  const [expertEmail, setExpertEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing login on mount
    const loggedIn = localStorage.getItem('expertLoggedIn') === 'true'
    const email = localStorage.getItem('expertEmail')
    
    setIsExpertLoggedIn(loggedIn)
    setExpertEmail(email)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'expert@odysia.com' && password === 'password123') {
          localStorage.setItem('expertLoggedIn', 'true')
          localStorage.setItem('expertEmail', email)
          setIsExpertLoggedIn(true)
          setExpertEmail(email)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem('expertLoggedIn')
    localStorage.removeItem('expertEmail')
    setIsExpertLoggedIn(false)
    setExpertEmail(null)
    // Use replace instead of push to avoid navigation history issues
    router.replace('/')
  }

  return (
    <AuthContext.Provider value={{
      isExpertLoggedIn,
      expertEmail,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 