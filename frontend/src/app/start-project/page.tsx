'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import Logo from '@/components/Logo'

interface ProjectFormData {
  name: string
  email: string
  projectIdea: string
}

export default function StartProjectPage() {
  const router = useRouter()
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    email: '',
    projectIdea: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Implement actual API call
      console.log('Project discussion form:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Close modal and show success
      setShowProjectForm(false)
      setFormData({ name: '', email: '', projectIdea: '' })
      
      // TODO: Show success message or redirect
    } catch (error) {
      console.error('Error submitting project discussion:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const actionCards = [
    {
      id: 'signup',
      icon: UserPlusIcon,
      title: 'Sign Up',
      description: 'Create your account and start managing projects with confidence',
      ctaText: 'Get Started',
      action: () => router.push('/client-signup'),
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'login',
      icon: ArrowRightOnRectangleIcon,
      title: 'Login',
      description: 'Welcome back! Access your dashboard and continue your journey',
      ctaText: 'Sign In',
      action: () => router.push('/client-login'),
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      id: 'discuss',
      icon: ChatBubbleLeftRightIcon,
      title: 'Discuss a Project',
      description: 'Let\'s talk about your project idea and explore possibilities',
      ctaText: 'Start Discussion',
      action: () => setShowProjectForm(true),
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-card">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-12 lg:mb-16">
            <Link href="/" className="inline-block mb-8">
              <Logo width={200} height={70} className="h-16 w-auto" alt="Odysia Logo" />
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Project with Odysia
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Whether you&apos;re ready to launch, returning, or just exploring — we&apos;ve got you covered
            </p>
          </motion.div>

          {/* Main Content - 2 Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Illustration */}
            <motion.div variants={staggerItem} className="order-2 lg:order-1">
              <div className="relative">
                {/* Background Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl"
                />

                {/* Main Illustration */}
                <div className="relative z-10 p-8 lg:p-12">
                  <svg
                    viewBox="0 0 600 500"
                    className="w-full h-auto"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Circle */}
                    <motion.circle
                      cx="300"
                      cy="250"
                      r="200"
                      fill="url(#gradient1)"
                      opacity="0.1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />

                    {/* Central Building/Office */}
                    <motion.g
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      {/* Main Building */}
                      <rect x="200" y="150" width="200" height="150" rx="12" fill="url(#gradient2)" stroke="#3B82F6" strokeWidth="3"/>
                      
                      {/* Windows */}
                      <rect x="220" y="170" width="30" height="30" fill="#E5E7EB"/>
                      <rect x="270" y="170" width="30" height="30" fill="#E5E7EB"/>
                      <rect x="320" y="170" width="30" height="30" fill="#E5E7EB"/>
                      <rect x="220" y="220" width="30" height="30" fill="#E5E7EB"/>
                      <rect x="270" y="220" width="30" height="30" fill="#E5E7EB"/>
                      <rect x="320" y="220" width="30" height="30" fill="#E5E7EB"/>
                      
                      {/* Door */}
                      <rect x="270" y="270" width="40" height="30" fill="#3B82F6"/>
                    </motion.g>

                    {/* Floating Elements */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                    >
                      {/* Collaboration Icons */}
                      <circle cx="120" cy="120" r="25" fill="white" stroke="#10B981" strokeWidth="3"/>
                      <path d="M110 120 L115 125 L130 110" stroke="#10B981" strokeWidth="3" fill="none"/>
                      
                      <circle cx="480" cy="120" r="20" fill="white" stroke="#F59E0B" strokeWidth="3"/>
                      <path d="M470 120 L475 125 L490 110" stroke="#F59E0B" strokeWidth="3" fill="none"/>
                      
                      <circle cx="120" cy="380" r="22" fill="white" stroke="#8B5CF6" strokeWidth="3"/>
                      <path d="M110 380 L115 385 L130 370" stroke="#8B5CF6" strokeWidth="3" fill="none"/>
                    </motion.g>

                    {/* Connection Lines */}
                    <motion.path
                      d="M145 145 Q200 100 300 150"
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 2 }}
                    />
                    <motion.path
                      d="M455 145 Q400 100 300 150"
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 2.2 }}
                    />

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
                    </defs>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Action Cards */}
            <motion.div variants={staggerItem} className="order-1 lg:order-2">
              <div className="space-y-6">
                {actionCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 lg:p-8 border border-gray-100 dark:border-dark-border">
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <card.icon className="h-6 w-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {card.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {card.description}
                          </p>
                          <motion.button
                            onClick={card.action}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`inline-flex items-center px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r ${card.color} ${card.hoverColor} transition-all duration-300 shadow-md hover:shadow-lg`}
                          >
                            {card.ctaText}
                            <ArrowRightOnRectangleIcon className="ml-2 h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Project Discussion Modal */}
      {showProjectForm && (
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
            className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Discuss Your Project
              </h2>
              <button
                onClick={() => setShowProjectForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Idea *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectIdea}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectIdea: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white resize-none"
                  placeholder="Tell us about your project idea, requirements, or any questions you have..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProjectForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
