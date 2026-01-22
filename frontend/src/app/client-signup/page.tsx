'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import { fadeInUp, staggerContainer, staggerItem, floatingFast, floatingSlow } from '@/lib/animations'
import { useAuth } from '@/lib/contexts/AuthContext'
import { toast } from 'react-hot-toast'

// Countries list
const COUNTRIES = [
  'Algeria', 'Angola', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Bolivia', 'Botswana', 'Brazil',
  'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China',
  'Colombia', 'Comoros', 'Congo', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo',
  'Denmark', 'Djibouti', 'Ecuador', 'Egypt', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Finland',
  'France', 'Gabon', 'Germany', 'Ghana', 'Greece', 'Guyana', 'Hungary', 'India', 'Indonesia', 'Ireland',
  'Italy', 'Ivory Coast', 'Japan', 'Kenya', 'Latvia', 'Lesotho', 'Libya', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Malta', 'Mauritius', 'Mexico', 'Mozambique', 'Namibia',
  'Netherlands', 'Niger', 'Nigeria', 'Norway', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Rwanda', 'Senegal', 'Seychelles', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa',
  'South Korea', 'Spain', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Tunisia',
  'Uganda', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela', 'Vietnam', 'Zambia', 'Zimbabwe'
]

const CLIENT_TYPES = [
  { value: 'individual', label: 'Individual' },
  { value: 'business', label: 'Business' },
  { value: 'startup', label: 'Startup' }
]

const COMMUNICATION_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'both', label: 'Both' }
]

interface FormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  clientType: string
  companyName: string
  country: string
  communicationMethod: string
}

export default function ClientSignUp() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    clientType: '',
    companyName: '',
    country: '',
    communicationMethod: 'email'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Password strength validation
  const validatePassword = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<FormData> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.clientType) newErrors.clientType = 'Please select your client type'
    if (!formData.country) newErrors.country = 'Please select your country'
    if (!formData.communicationMethod) newErrors.communicationMethod = 'Please select preferred communication method'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setShowTermsModal(true)
    }
  }

  const handleAgreeAndSignup = async () => {
    if (!hasAgreed) return
    setIsSubmitting(true)
    try {
      const success = await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone,
        clientType: formData.clientType,
        companyName: formData.companyName,
        country: formData.country,
        communicationMethod: formData.communicationMethod
      })
      if (success) {
        router.push('/client-login?message=signup-success')
      } else {
        toast.error('Registration failed. Please try again.')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error(error.message || 'An error occurred during registration')
    } finally {
      setIsSubmitting(false)
      setShowTermsModal(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300 py-10">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20 dark:opacity-10 z-0" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl z-0"
        variants={floatingSlow}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl z-0"
        variants={floatingFast}
        initial="initial"
        animate="animate"
      />

      <div className="w-full max-w-3xl p-4 sm:p-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="glass-card p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 dark:border-gray-700/30"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-10">
            <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
              <Logo width={160} height={60} className="h-12 w-auto" alt="Odysia Logo" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Join Our Client Network
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Connect with top-tier verified experts and manage your projects with confidence.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div variants={staggerContainer} className="space-y-6">

              {/* Personal Info Section */}
              <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] ${errors.fullName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Phone Number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Country</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] ${errors.country ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Password Section */}
              <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className={`block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Business Info Section */}
              <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Client Type</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <select
                      value={formData.clientType}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientType: e.target.value }))}
                      className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] ${errors.clientType ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <option value="">Select Type</option>
                      {CLIENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* Company Name (Conditional) */}
                {(formData.clientType === 'business' || formData.clientType === 'startup') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">Company Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)]"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div variants={staggerItem}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 pl-1">Preferred Communication</label>
                <div className="grid grid-cols-3 gap-4">
                  {COMMUNICATION_METHODS.map(method => (
                    <label key={method.value}
                      className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${formData.communicationMethod === method.value ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-300' : 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        value={method.value}
                        checked={formData.communicationMethod === method.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, communicationMethod: e.target.value }))}
                      />
                      <ChatBubbleLeftRightIcon className={`h-5 w-5 mr-2 ${formData.communicationMethod === method.value ? 'text-primary-500' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

            </motion.div>

            <motion.div variants={staggerItem} className="pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-gradient py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 glow-primary-hover"
              >
                <span>Create Account</span>
                <ArrowRightIcon className="h-5 w-5" />
              </motion.button>
            </motion.div>

            <motion.div variants={staggerItem} className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/client-login" className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline">
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </form>

          {/* Security Badge */}
          <motion.div variants={staggerItem} className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50 flex justify-center items-center space-x-2 text-xs text-gray-500 text-center">
            <ShieldCheckIcon className="h-4 w-4 text-green-500" />
            <span>Secure Registration. Your data is protected.</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h2>
                <button onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="prose dark:prose-invert text-sm max-w-none">
                  <h3>1. Acceptance of Terms</h3>
                  <p>By using Odysia, you agree to these terms.</p>
                  <h3>2. Responsibilities</h3>
                  <p>You agree to provide accurate information and maintain professional conduct.</p>
                  <h3>3. Payments</h3>
                  <p>All payments are processed securely via our escrow system.</p>
                  <h3>4. Privacy</h3>
                  <p>We value your privacy. Your data is encrypted and secure.</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <label className="flex items-center space-x-3 mb-4 cursor-pointer">
                  <input type="checkbox" checked={hasAgreed} onChange={(e) => setHasAgreed(e.target.checked)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-5 h-5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">I agree to the Terms & Conditions</span>
                </label>
                <div className="flex gap-4">
                  <button onClick={() => setShowTermsModal(false)} className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">Cancel</button>
                  <button
                    onClick={handleAgreeAndSignup}
                    disabled={!hasAgreed || isSubmitting}
                    className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg"
                  >
                    {isSubmitting ? 'Creating...' : 'Agree & Sign Up'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
