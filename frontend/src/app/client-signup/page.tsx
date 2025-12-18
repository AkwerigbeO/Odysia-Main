'use client'

import { useState, useEffect } from 'react'
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
  CheckIcon
} from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

// Countries list (alphabetically ordered)
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

// Client types
const CLIENT_TYPES = [
  { value: 'individual', label: 'Individual' },
  { value: 'business', label: 'Business' },
  { value: 'startup', label: 'Startup' }
]

// Communication methods
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
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

  // Handle terms agreement and signup
  const handleAgreeAndSignup = async () => {
    if (!hasAgreed) return
    
    setIsSubmitting(true)
    
    try {
      // TODO: Implement actual signup API call
      console.log('Form data to submit:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to client login with success message
      router.push('/client-login?message=signup-success')
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsSubmitting(false)
      setShowTermsModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-card">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            {/* Header */}
            <motion.div variants={staggerItem} className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <Logo width={180} height={60} className="h-12 w-auto" alt="Odysia Logo" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Join Odysia as a Client
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with verified experts and bring your projects to life
              </p>
            </motion.div>

            {/* Sign Up Form */}
            <motion.div
              variants={staggerItem}
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.password ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Client Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type of Client *
                  </label>
                  <div className="relative">
                    <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.clientType}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientType: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.clientType ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                    >
                      <option value="">Select client type</option>
                      {CLIENT_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.clientType && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.clientType}</p>
                  )}
                </div>

                {/* Company Name (conditional) */}
                {(formData.clientType === 'business' || formData.clientType === 'startup') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company/Organization Name
                    </label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                        placeholder="Enter company name (optional)"
                      />
                    </div>
                  </div>
                )}

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <div className="relative">
                    <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.country ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                      } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                    >
                      <option value="">Select your country</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>
                  )}
                </div>

                {/* Communication Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Communication Method *
                  </label>
                  <div className="space-y-3">
                    {COMMUNICATION_METHODS.map(method => (
                      <label key={method.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="communicationMethod"
                          value={method.value}
                          checked={formData.communicationMethod === method.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, communicationMethod: e.target.value }))}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{method.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.communicationMethod && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.communicationMethod}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Create Client Account
                </motion.button>

                {/* Login Link */}
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link href="/client-login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Circle */}
              <circle cx="200" cy="200" r="180" fill="url(#gradient1)" opacity="0.1"/>
              
              {/* Main Building/Office */}
              <rect x="120" y="140" width="160" height="120" rx="8" fill="url(#gradient2)" stroke="#3B82F6" strokeWidth="2"/>
              <rect x="140" y="160" width="30" height="30" fill="#E5E7EB"/>
              <rect x="180" y="160" width="30" height="30" fill="#E5E7EB"/>
              <rect x="220" y="160" width="30" height="30" fill="#E5E7EB"/>
              <rect x="140" y="200" width="30" height="30" fill="#E5E7EB"/>
              <rect x="180" y="200" width="30" height="30" fill="#E5E7EB"/>
              <rect x="220" y="200" width="30" height="30" fill="#E5E7EB"/>
              
              {/* Roof */}
              <path d="M110 140 L200 100 L290 140" stroke="#3B82F6" strokeWidth="3" fill="none"/>
              
              {/* Door */}
              <rect x="185" y="220" width="30" height="40" fill="#3B82F6"/>
              
              {/* Security Shield */}
              <circle cx="320" cy="120" r="40" fill="url(#gradient3)" stroke="#10B981" strokeWidth="3"/>
              <path d="M305 120 L315 130 L335 110" stroke="#10B981" strokeWidth="3" fill="none"/>
              
              {/* Connection Lines */}
              <path d="M280 160 Q300 140 320 120" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5"/>
              <path d="M280 200 Q300 180 320 120" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5"/>
              
              {/* Floating Elements */}
              <circle cx="80" cy="100" r="8" fill="#F59E0B"/>
              <circle cx="320" cy="80" r="6" fill="#EF4444"/>
              <circle cx="90" cy="300" r="10" fill="#8B5CF6"/>
              
              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6"/>
                  <stop offset="100%" stopColor="#8B5CF6"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F3F4F6"/>
                  <stop offset="100%" stopColor="#E5E7EB"/>
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D1FAE5"/>
                  <stop offset="100%" stopColor="#A7F3D0"/>
                </linearGradient>
              </defs>
            </svg>
            
            <div className="text-center mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Collaboration Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with verified experts through our secure escrow system
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Terms & Conditions
                  </h2>
                  <button
                    onClick={() => setShowTermsModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="max-h-96 overflow-y-auto pr-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using Odysia&apos;s platform, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Client Responsibilities</h3>
                    <p>
                      As a client on our platform, you agree to provide accurate project requirements, 
                      maintain professional communication, and pay for services as agreed upon.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Payment Terms</h3>
                    <p>
                      Payments will be processed through our secure escrow system. Funds are held until 
                      project completion and your approval. Platform fees apply as outlined in our fee structure.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Project Management</h3>
                    <p>
                      You are responsible for providing clear project requirements and timely feedback. 
                      Communication through our platform ensures project transparency and security.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">5. Dispute Resolution</h3>
                    <p>
                      Any disputes will be resolved through our internal dispute resolution process. 
                      We reserve the right to mediate and make final decisions on project-related disputes.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">6. Privacy Policy</h3>
                    <p>
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform, 
                      to understand our practices regarding the collection and use of your information.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By clicking &quot;I Agree&quot;, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-dark-border flex space-x-4">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAgreeAndSignup}
                  disabled={!hasAgreed || isSubmitting}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    hasAgreed && !isSubmitting
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Creating Account...' : 'I Agree & Sign Up'}
                </button>
              </div>

              {/* Agreement Checkbox */}
              <div className="px-6 pb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I have read and agree to the Terms & Conditions and Privacy Policy
                  </span>
                </label>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
