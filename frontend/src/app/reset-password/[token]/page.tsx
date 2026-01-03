'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    BuildingOfficeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/lib/contexts/AuthContext'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import { toast } from 'react-hot-toast'

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params)
    const router = useRouter()
    const { resetPassword } = useAuth()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setIsLoading(true)

        try {
            const success = await resetPassword(password, token)
            if (success) {
                setIsSuccess(true)
                toast.success('Password reset successfully!')
                setTimeout(() => {
                    router.push('/client-login')
                }, 3000)
            } else {
                toast.error('Failed to reset password. Link may be expired.')
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-md w-full"
            >
                <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Header */}
                    <motion.div variants={staggerItem} className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                                <BuildingOfficeIcon className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Set New Password
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create a new secure password for your account
                        </p>
                    </motion.div>

                    {isSuccess ? (
                        <motion.div variants={fadeInUp} className="text-center space-y-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center justify-center space-x-2 text-green-700 dark:text-green-400">
                                <CheckCircleIcon className="h-6 w-6" />
                                <span>Password reset successfully! Redirecting...</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </div>
                            )}

                            <motion.div variants={fadeInUp}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                    >
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </motion.div>

                            <motion.button
                                variants={fadeInUp}
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </motion.button>
                        </motion.form>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
