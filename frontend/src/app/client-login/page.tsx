'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  BuildingOfficeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp, floatingSlow, floatingFast } from '@/lib/animations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import { toast } from 'react-hot-toast'
import Logo from '@/components/Logo'

function ClientLoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()
  const { login } = useAuth()
  const searchParams = useSearchParams()

  // Check for success message from signup
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'signup-success') {
      setTimeout(() => toast.success('Account created successfully! Please check your email for verification.'), 500)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    setIsLoading(true)
    try {
      const user = await login(email, password)
      if (user) {
        toast.success('Logged in successfully!')
        if (user.role === 'admin') router.push('/admin/dashboard')
        else if (user.role === 'expert') router.push('/dashboard')
        else router.push('/client-dashboard')
      } else {
        toast.error('Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login')
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
          {/* Logo and Header */}
          <motion.div variants={staggerItem} className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
              <Logo width={140} height={50} className="h-10 w-auto" alt="Odysia Logo" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your dashboard
            </p>
          </motion.div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center space-x-3"
            >
              <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{successMessage}</p>
            </motion.div>
          )}

          {/* Login Form */}
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)]"
                  placeholder="name@company.com"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-center justify-between mb-2 pl-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={fadeInUp}
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-gradient py-3.5 px-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 glow-primary-hover disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </>
              )}
            </motion.button>

            <motion.div variants={fadeInUp} className="text-center pt-2">
              <p className="text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/client-signup"
                  className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </motion.div>
          </motion.form>

          {/* Security Badge */}
          <motion.div
            variants={staggerItem}
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50 flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400"
          >
            <ShieldCheckIcon className="h-4 w-4 text-green-500" />
            <span>Secured with enterprise encryption</span>
          </motion.div>
        </motion.div>

        {/* Back to Home - Floating outside */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium group"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Homepage</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function ClientLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <ClientLoginContent />
    </Suspense>
  )
}
