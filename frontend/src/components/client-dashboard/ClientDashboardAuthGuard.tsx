'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

interface ClientDashboardAuthGuardProps {
  children: React.ReactNode
}

export default function ClientDashboardAuthGuard({ children }: ClientDashboardAuthGuardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // Add your authentication logic here
        // For now, we'll simulate a successful client authentication
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Authentication failed:', error)
        router.push('/client-login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-dark-bg dark:via-dark-surface dark:to-dark-card flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <ArrowPathIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Router will handle redirect
  }

  return <>{children}</>
}
