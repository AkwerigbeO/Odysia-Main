'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon, UserIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/lib/contexts/AuthContext'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'

function ExpertLoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for success message from signup
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'signup-success') {
      setSuccessMessage('Account created successfully! Please sign in with your credentials.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const success = await login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-gray-900">
      {/* Header */}
      <motion.header 
        className="bg-white dark:bg-dark-surface shadow-sm border-b border-gray-200 dark:border-dark-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Clickable to homepage */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link href="/">
                <Logo
                  width={140}
                  height={45}
                  className="h-10 w-auto"
                  alt="Odysia Logo"
                />
              </Link>
            </motion.div>

            {/* Dark Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Expert Login
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your expert account to manage your projects
              </p>
            </motion.div>

            {/* Back to Home Button */}
            <motion.div variants={fadeInUp} className="text-center mb-6">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-dark-card rounded-xl shadow-lg border border-gray-200 dark:border-dark-border p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </motion.div>
                )}

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

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  Want to join as an expert?{' '}
                  <Link href="/expert-application" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                    Apply here
                  </Link>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Demo credentials: expert@odysia.com / password123
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Animated SVG */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Circles */}
              <motion.circle
                cx="200"
                cy="200"
                r="180"
                fill="rgba(255,255,255,0.1)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.circle
                cx="200"
                cy="200"
                r="140"
                fill="rgba(255,255,255,0.05)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />

              {/* Floating Elements */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Code Blocks */}
                <motion.rect
                  x="80"
                  y="120"
                  width="60"
                  height="40"
                  rx="8"
                  fill="rgba(255,255,255,0.2)"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.rect
                  x="90"
                  y="130"
                  width="40"
                  height="4"
                  rx="2"
                  fill="rgba(255,255,255,0.6)"
                />
                <motion.rect
                  x="90"
                  y="140"
                  width="30"
                  height="4"
                  rx="2"
                  fill="rgba(255,255,255,0.4)"
                />

                <motion.rect
                  x="260"
                  y="180"
                  width="60"
                  height="40"
                  rx="8"
                  fill="rgba(255,255,255,0.2)"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.rect
                  x="270"
                  y="190"
                  width="40"
                  height="4"
                  rx="2"
                  fill="rgba(255,255,255,0.6)"
                />
                <motion.rect
                  x="270"
                  y="200"
                  width="35"
                  height="4"
                  rx="2"
                  fill="rgba(255,255,255,0.4)"
                />

                {/* Design Elements */}
                <motion.circle
                  cx="120"
                  cy="280"
                  r="20"
                  fill="rgba(255,255,255,0.15)"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="280"
                  cy="120"
                  r="15"
                  fill="rgba(255,255,255,0.1)"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Connection Lines */}
                <motion.path
                  d="M 140 140 Q 200 160 260 200"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.path
                  d="M 100 280 Q 150 250 200 200"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />

                {/* Central Hub */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="30"
                  fill="rgba(255,255,255,0.25)"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="15"
                  fill="rgba(255,255,255,0.6)"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />

                {/* Floating Icons */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  {/* Briefcase Icon */}
                  <motion.rect
                    x="60"
                    y="80"
                    width="24"
                    height="18"
                    rx="2"
                    fill="rgba(255,255,255,0.3)"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.rect
                    x="66"
                    y="86"
                    width="12"
                    height="6"
                    rx="1"
                    fill="rgba(255,255,255,0.6)"
                  />

                  {/* Chart Icon */}
                  <motion.rect
                    x="320"
                    y="280"
                    width="20"
                    height="20"
                    fill="rgba(255,255,255,0.3)"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.rect
                    x="322"
                    y="295"
                    width="4"
                    height="3"
                    fill="rgba(255,255,255,0.6)"
                  />
                  <motion.rect
                    x="328"
                    y="290"
                    width="4"
                    height="8"
                    fill="rgba(255,255,255,0.6)"
                  />
                  <motion.rect
                    x="334"
                    y="285"
                    width="4"
                    height="13"
                    fill="rgba(255,255,255,0.6)"
                  />
                </motion.g>
              </motion.g>

              {/* Particle Effects */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={100 + Math.random() * 200}
                    cy={100 + Math.random() * 200}
                    r="2"
                    fill="rgba(255,255,255,0.4)"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.g>
            </svg>

            {/* Text Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-center mt-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome Back, Expert!
              </h2>
              <p className="text-white/80 text-sm">
                Ready to showcase your skills and manage your projects?
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function ExpertLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExpertLoginContent />
    </Suspense>
  )
} 