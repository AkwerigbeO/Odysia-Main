'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { LockClosedIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import api from '@/lib/axios'

export default function ExpertSetup() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth() // We might use this or just rely on the token returned

    const [token, setToken] = useState<string | null>(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const tokenParam = searchParams.get('token')
        if (tokenParam) {
            setToken(tokenParam)
        } else {
            setError('Invalid or missing setup token. Please check your email link.')
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!password || password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (!token) {
            setError('Missing setup token')
            return
        }

        setIsSubmitting(true)

        try {
            const { data } = await api.post('/auth/expert-setup', {
                token,
                password
            })

            if (data.success && data.token) {
                // Auto-login logic
                localStorage.setItem('token', data.token)
                // We might want to trigger a context reload here, but a hard redirect usually works
                setSuccess(true)
                setTimeout(() => {
                    window.location.href = '/dashboard'
                }, 2000)
            }

        } catch (err: any) {
            console.error('Setup failed', err)
            setError(err.response?.data?.message || 'Setup failed. Please try again or contact support.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg px-4">
                <div className="max-w-md w-full bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
                        <CheckCircleIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Setup Complete!</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Your password has been set successfully. You are being redirected to your dashboard...
                    </p>
                    <div className="animate-pulse w-full h-2 bg-primary-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-600 w-1/2 animate-progress"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg px-4 py-12">
            <div className="mb-8">
                <Logo width={180} height={60} className="h-12 w-auto" alt="Odysia Logo" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Set Your Password</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Complete your expert account setup to access the dashboard.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
                        <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !token}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                        {isSubmitting ? 'Setting Password...' : 'Complete Setup'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}
