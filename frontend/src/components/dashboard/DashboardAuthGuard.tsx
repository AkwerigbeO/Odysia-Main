'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { motion } from 'framer-motion'

interface DashboardAuthGuardProps {
  children: React.ReactNode
}

export default function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const { isExpertLoggedIn, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isExpertLoggedIn) {
      router.push('/expert-login')
    }
  }, [isExpertLoggedIn, loading, router])

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

  if (!isExpertLoggedIn) {
    return null // Will redirect to login
  }

  return <>{children}</>
} 