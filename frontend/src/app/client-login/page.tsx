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
  UserIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  HomeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function ClientLoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for success message from signup
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'signup-success') {
      setSuccessMessage('Account created successfully! Please check your email for verification.')
      // Clear the message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }
    
    if (!email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }
    
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      
      // Simple validation for demo purposes
      if (email === 'client@example.com' && password === 'password123') {
        // Login successful - redirect to dashboard
        router.push('/client-dashboard')
      } else {
        // For any other credentials, still allow access (demo mode)
        // Handle login error
        router.push('/client-dashboard')
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
      {/* Left Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-8"
        >
          {/* Logo and Header */}
          <motion.div variants={staggerItem} className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-xl flex items-center justify-center">
                <BuildingOfficeIcon className="h-8 w-8 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                Odysia
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Client Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to Odysia - Manage your projects with confidence
            </p>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div variants={staggerItem} className="text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={fadeInUp}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div variants={fadeInUp} className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Forgot your password?
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.button
              variants={fadeInUp}
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Login as Client</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/client-signup"
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </motion.form>

          {/* Demo Note */}
          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 Demo: Use any email and password to login
            </p>
          </motion.div>

          {/* Security Notice */}
          <motion.div variants={fadeInUp} className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Your data is protected with enterprise-grade security</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column - Animated SVG */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 items-center justify-center p-8">
        <div className="flex flex-col items-center justify-center w-full max-w-lg">
          {/* Main Illustration Container */}
          <div className="relative mb-8">
            {/* Background Circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center"
            >
              {/* Inner Circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-64 h-64 bg-white/5 rounded-full flex items-center justify-center"
              >
                {/* Central Building */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative"
                >
                  {/* Building Base */}
                  <div className="w-24 h-32 bg-white rounded-lg shadow-lg relative">
                    {/* Windows Grid */}
                    <div className="absolute top-3 left-3 grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-5 h-5 bg-blue-400 rounded"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 1 + i * 0.05 }}
                        />
                      ))}
                    </div>
                    
                    {/* Door */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-t-lg" />
                  </div>
                  
                  {/* Roof */}
                  <motion.div
                    className="absolute -top-2 left-0 w-24 h-3 bg-gray-300 rounded-t-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute inset-0"
            >
              {/* Top Left - Chart */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <ChartBarIcon className="h-6 w-6 text-primary-600" />
              </motion.div>

              {/* Top Right - Settings */}
              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <CogIcon className="h-5 w-5 text-primary-600" />
              </motion.div>

              {/* Bottom Left - User */}
              <motion.div
                className="absolute -bottom-4 -left-4 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                whileHover={{ scale: 1.1 }}
              >
                <UserIcon className="h-5 w-5 text-primary-600" />
              </motion.div>

              {/* Bottom Right - Building */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />
              </motion.div>
            </motion.div>

            {/* Connection Lines */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <motion.path
                d="M 160 160 Q 200 140 240 160"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 2.6 }}
              />
              <motion.path
                d="M 320 160 Q 280 140 240 160"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 2.8 }}
              />
              <motion.path
                d="M 160 240 Q 200 220 240 240"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 3.0 }}
              />
              <motion.path
                d="M 320 240 Q 280 220 240 240"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 3.2 }}
              />
            </motion.svg>
          </div>

          {/* Text Content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-3">
              Welcome to Odysia
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Where great projects come to life through<br />
              trusted collaboration and expert talent
            </p>
          </motion.div>
        </div>
      </div>
         </div>
   )
 }

export default function ClientLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientLoginContent />
    </Suspense>
  )
}
