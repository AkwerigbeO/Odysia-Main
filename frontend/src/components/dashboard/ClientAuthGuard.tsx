'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { motion } from 'framer-motion'

interface ClientAuthGuardProps {
    children: React.ReactNode
}

export default function ClientAuthGuard({ children }: ClientAuthGuardProps) {
    const { user, isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push('/client-login')
            } else if (user?.role !== 'client') {
                // If expert, redirect to expert dashboard (admin/dashboard seems to be the one)
                // Or if admin, allow? Usually admin can view all. But let's stick to client for now.
                if (user?.role === 'expert') {
                    router.push('/admin/dashboard')
                } else if (user?.role === 'admin') {
                    // Admin might want to view client dashboard? If so, allow. 
                    // For now, redirect strictly.
                    router.push('/admin/dashboard')
                } else {
                    router.push('/')
                }
            }
        }
    }, [isAuthenticated, user, loading, router])

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Verifying access...</p>
                </motion.div>
            </div>
        )
    }

    // Prevent rendering if not authenticated or not authorized
    // Allow if role is client OR admin (for debugging/super-user access)
    if (!isAuthenticated || (user?.role !== 'client' && user?.role !== 'admin')) {
        return null
    }

    return <>{children}</>
}
