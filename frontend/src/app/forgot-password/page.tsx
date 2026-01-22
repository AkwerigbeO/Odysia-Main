'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BuildingOfficeIcon, EnvelopeIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/lib/contexts/AuthContext'
import { staggerContainer, staggerItem, fadeInUp, floatingSlow, floatingFast } from '@/lib/animations'
import Logo from '@/components/Logo'
import { toast } from 'react-hot-toast'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const { forgotPassword } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter your email')
            return
        }
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
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 gradient-mesh opacity-20 dark:opacity-10 z-0" />

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-10 left-10 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl z-0"
                variants={floatingSlow}
                initial="initial"
                animate="animate"
            />
            <motion.div
                className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl z-0"
                variants={floatingFast}
                initial="initial"
                animate="animate"
            />

            <div className="w-full max-w-md p-4 sm:p-0 relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="glass-card p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 dark:border-gray-700/30"
                >
                    {/* Header */}
                    <motion.div variants={staggerItem} className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner ring-1 ring-primary-500/20">
                                <BuildingOfficeIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Reset Password
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Enter your email to receive recovery instructions
                        </p>
                    </motion.div>

                    {isSent ? (
                        <motion.div variants={fadeInUp} className="text-center space-y-6">
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
                                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-1">Check your inbox</h3>
                                <p className="text-green-600 dark:text-green-400 text-sm">
                                    We have sent password reset instructions to <span className="font-semibold">{email}</span>
                                </p>
                            </div>
                            <Link
                                href="/client-login"
                                className="block w-full btn-gradient py-3.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Back to Login
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={fadeInUp}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)]"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </motion.div>

                            <motion.button
                                variants={fadeInUp}
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-gradient py-3.5 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 glow-primary-hover disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </span>
                                ) : 'Send Reset Link'}
                            </motion.button>
                        </motion.form>
                    )}

                    {!isSent && (
                        <motion.div variants={staggerItem} className="mt-8 text-center border-t border-gray-200 dark:border-gray-700/50 pt-6">
                            <Link
                                href="/client-login"
                                className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                            >
                                <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to Login
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
