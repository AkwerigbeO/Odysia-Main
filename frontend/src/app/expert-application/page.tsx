'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  LinkIcon,
  DocumentTextIcon,
  PaperClipIcon,
  XMarkIcon,
  CheckCircleIcon
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

// Skills/Expertise options
const SKILLS_OPTIONS = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'Blockchain',
  'Game Development',
  'Digital Marketing',
  'Content Writing',
  'Video Editing',
  '3D Modeling',
  'Animation',
  'SEO',
  'Social Media Management',
  'E-commerce',
  'WordPress',
  'Shopify',
  'React',
  'Angular',
  'Vue.js',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'Flutter',
  'React Native',
  'AWS',
  'Azure',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Elasticsearch'
]

interface ApplicationData {
  fullName: string
  email: string
  phone: string
  country: string
  skills: string[]
  githubLink: string
  portfolioLink: string
  linkedinLink: string
  bio: string
  resume: File | null
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  country?: string
  skills?: string
  githubLink?: string
  portfolioLink?: string
  linkedinLink?: string
  bio?: string
  resume?: string
}

export default function ExpertApplication() {
  const router = useRouter()
  const [formData, setFormData] = useState<ApplicationData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    skills: [],
    githubLink: '',
    portfolioLink: '',
    linkedinLink: '',
    bio: '',
    resume: null
  })
  
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Handle skills selection
  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, resume: file }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: FormErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.country) newErrors.country = 'Please select your country'
    if (formData.skills.length === 0) newErrors.skills = 'Please select at least one skill'
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required'
    if (formData.bio.length < 50) newErrors.bio = 'Bio must be at least 50 characters'
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      
      try {
        // TODO: Implement actual API call to submit application
        console.log('Application data to submit:', formData)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Show success modal
        setShowSuccessModal(true)
      } catch (error) {
        console.error('Application submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-card">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Logo width={200} height={70} className="h-16 w-auto" alt="Odysia Logo" />
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Join Us as an Expert
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Apply to become a verified expert on our platform. Our team will review your application and get back to you within 3-5 business days.
            </p>
          </motion.div>

          {/* Application Form */}
          <motion.div
            variants={staggerItem}
            className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              {/* Skills/Expertise */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills / Expertise * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-4 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card">
                  {SKILLS_OPTIONS.map(skill => (
                    <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                    </label>
                  ))}
                </div>
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.skills}</p>
                )}
              </div>

              {/* Portfolio Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* GitHub */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.githubLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                {/* Portfolio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Portfolio Website
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.portfolioLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolioLink: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.linkedinLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedinLink: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Bio * (Tell us about your experience and expertise)
                </label>
                <div className="relative">
                  <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.bio ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
                    } bg-white dark:bg-dark-card text-gray-900 dark:text-white`}
                    placeholder="Describe your professional background, key achievements, and what makes you an expert in your field..."
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  {errors.bio && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.bio}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                    {formData.bio.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resume/CV (Optional)
                </label>
                <div className="relative">
                  <PaperClipIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </motion.button>

              {/* Info Note */}
              <div className="text-center text-gray-600 dark:text-gray-400">
                <p className="text-sm">
                  Your application will be reviewed by our team within 3-5 business days. 
                  We&apos;ll notify you via email about the status of your application.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
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
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Application Submitted!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for your interest in joining Odysia as an expert. We&apos;ve received your application and will review it within 3-5 business days. You&apos;ll receive an email notification about the status of your application.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(false)
                      router.push('/')
                    }}
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Back to Home
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
