'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { motion } from 'framer-motion'

interface DashboardAuthGuardProps {
  children: React.ReactNode
}

export default function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/expert-login')
      } else if (user?.role !== 'expert') {
        if (user?.role === 'client') {
          router.push('/client-dashboard')
        } else {
          router.push('/')
        }
      }
    }
  }, [isAuthenticated, user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'expert') {
    return null // Will redirect to login
  }

  return <>{children}</>
} 