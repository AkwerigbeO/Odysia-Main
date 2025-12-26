'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BuildingOfficeIcon, EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/lib/contexts/AuthContext'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'

import { toast } from 'react-hot-toast'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const { forgotPassword } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const success = await forgotPassword(email)
            if (success) {
                setIsSent(true)
                toast.success('Reset email sent!')
            } else {
                toast.error('Failed to send reset email. Please try again.')
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred.')
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
                            Reset Password
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Enter your email to receive reset instructions
                        </p>
                    </motion.div>

                    {isSent ? (
                        <motion.div variants={fadeInUp} className="text-center space-y-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-green-700 dark:text-green-400">
                                Check your email! We have sent password reset instructions to {email}
                            </div>
                            <Link
                                href="/client-login"
                                className="block w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Back to Login
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={fadeInUp}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </motion.div>

                            <motion.button
                                variants={fadeInUp}
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </motion.button>
                        </motion.form>
                    )}

                    <motion.div variants={staggerItem} className="text-center">
                        <Link
                            href="/client-login"
                            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Back to Login
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
