'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import api from '../axios'

interface User {
  _id: string
  name: string
  email: string
  role: string
  avatar?: string
  country?: string
  hourlyRate?: number
  bio?: string
  skills?: string[]
  companyName?: string
  phone?: string
  portfolioLink?: string
  githubLink?: string
  linkedinLink?: string
  activeChats?: number
  pendingActions?: number
  rating?: number
  verified?: boolean
}

export interface RegistrationData {
  name: string
  email: string
  password: string
  confirmPassword?: string
  phone: string
  clientType: string
  companyName?: string
  country: string
  communicationMethod: string
  // Expert fields
  role?: string
  skills?: string[]
  bio?: string
  title?: string
  hourlyRate?: number
  avatar?: string
  portfolioLink?: string
  githubLink?: string
  linkedinLink?: string
  verified?: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<User | false>
  register: (userData: RegistrationData) => Promise<boolean>
  forgotPassword: (email: string) => Promise<boolean>
  resetPassword: (password: string, token: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadUser = async () => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      setToken(storedToken)
      try {
        const { data } = await api.get('/auth/me')
        setUser(data)
      } catch (error) {
        console.error('Failed to load user', error)
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    loadUser()
  }, [])

  const login = async (email: string, password: string): Promise<User | false> => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      setToken(data.token)

      // Fetch full user data after login to get all fields
      const { data: userData } = await api.get('/auth/me')
      setUser(userData)
      return userData
    } catch (error) {
      console.error('Login failed', error)
      return false
    }
  }

  const register = async (userData: RegistrationData): Promise<boolean> => {
    try {
      const { data } = await api.post('/auth/register', userData)
      localStorage.setItem('token', data.token)
      setToken(data.token)

      // Fetch full user data after register
      const { data: fullUserData } = await api.get('/auth/me')
      setUser(fullUserData)
      return true
    } catch (error) {
      console.error('Registration failed', error)
      return false
    }
  }

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      await api.post('/auth/forgotpassword', { email })
      return true
    } catch (error) {
      console.error('Forgot password failed', error)
      return false
    }
  }

  const resetPassword = async (password: string, token: string): Promise<boolean> => {
    try {
      const { data } = await api.put(`/auth/resetpassword/${token}`, { password })
      localStorage.setItem('token', data.token)
      setToken(data.token)
      await loadUser()
      return true
    } catch (error) {
      console.error('Reset password failed', error)
      return false
    }
  }

  const refreshUser = async () => {
    await loadUser()
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    router.replace('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      forgotPassword,
      resetPassword,
      logout,
      refreshUser,
      loading,
      isAuthenticated: !!user
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
