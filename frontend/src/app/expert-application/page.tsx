'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  LinkIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import { fadeInUp, staggerContainer, staggerItem, floatingSlow, floatingFast } from '@/lib/animations'
import FileUpload from '@/components/ui/FileUpload'
import toast from 'react-hot-toast'

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
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
  'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cloud Computing',
  'DevOps', 'Cybersecurity', 'Blockchain', 'Game Development',
  'Digital Marketing', 'Content Writing', 'Video Editing', '3D Modeling',
  'Animation', 'SEO', 'Social Media Management', 'E-commerce',
  'WordPress', 'Shopify', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Python', 'Java', 'C++', 'C#', 'PHP',
  'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter',
  'React Native', 'AWS', 'Azure', 'Google Cloud', 'Docker',
  'Kubernetes', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'
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
  resume: string | null
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
  const { register } = useAuth()
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
  const [submitError, setSubmitError] = useState('')

  // Handle skills selection
  const handleSkillToggle = (skill: string) => {
    setSubmitError('') // Clear error on interaction
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  // Handle file upload
  const handleUploadSuccess = (fileData: any) => {
    setFormData(prev => ({ ...prev, resume: fileData.fileId }))
    toast.success('Resume uploaded successfully!')
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: any = {}
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
        const response = await fetch('/api/expert-applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setShowSuccessModal(true)
        } else {
          const data = await response.json();
          setSubmitError(data.message || 'Application submission failed. Please try again.')
        }
      } catch (error) {
        console.error('Application submission error:', error)
        setSubmitError('An unexpected error occurred. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Scroll to top error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast.error('Please complete all required fields')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20 dark:opacity-10 z-0" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[100px] z-0 pointer-events-none"
        variants={floatingSlow}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[100px] z-0 pointer-events-none"
        variants={floatingFast}
        initial="initial"
        animate="animate"
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-10 sm:mb-14">
            <Link href="/" className="inline-block mb-8 hover:scale-105 transition-transform duration-300">
              <Logo width={220} height={80} className="h-20 w-auto" alt="Odysia Logo" />
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-6 leading-tight">
              Join Our <span className="gradient-text-animated">Expert Network</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Apply to become a verified expert. Access global projects, guaranteed payments, and a growing community of top-tier talent.
            </p>
          </motion.div>

          {/* Application Form */}
          <motion.div
            variants={staggerItem}
            className="glass-card rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
          >
            {/* Progress/Banner Line */}
            <div className="h-2 bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 w-full" />

            <div className="p-6 sm:p-10 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                {submitError && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">{submitError}</p>
                  </div>
                )}

                {/* Section 1: Personal Information */}
                <motion.div variants={staggerContainer} className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <UserIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          className={`w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] outline-none ${errors.fullName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                            } text-gray-900 dark:text-white placeholder-gray-400`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.fullName && <p className="mt-1 text-sm text-red-500 font-medium pl-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] outline-none ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                            } text-gray-900 dark:text-white placeholder-gray-400`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-500 font-medium pl-1">{errors.email}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className={`w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] outline-none ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                            } text-gray-900 dark:text-white placeholder-gray-400`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-500 font-medium pl-1">{errors.phone}</p>}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <GlobeAltIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                          className={`w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] outline-none ${errors.country ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                            } text-gray-900 dark:text-white appearance-none`}
                        >
                          <option value="">Select your country</option>
                          {COUNTRIES.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none user-select-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                      {errors.country && <p className="mt-1 text-sm text-red-500 font-medium pl-1">{errors.country}</p>}
                    </div>
                  </div>
                </motion.div>

                {/* Section 2: Expertise */}
                <motion.div variants={staggerContainer} className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <StarIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Expertise & Skills</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 pl-1">
                      Select your Core Skills <span className="text-red-500">*</span>
                      <span className="text-gray-500 font-normal ml-2 list-none font-sans text-xs">(Select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-gray-50/30 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-200 dark:border-gray-700/50 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                      {SKILLS_OPTIONS.map(skill => (
                        <label key={skill} className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-all ${formData.skills.includes(skill) ? 'bg-primary-50 dark:bg-primary-900/20 shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.skills.includes(skill) ? 'bg-primary-600 border-primary-600' : 'border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700'}`}>
                            {formData.skills.includes(skill) && <CheckCircleIcon className="w-4 h-4 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={formData.skills.includes(skill)}
                            onChange={() => handleSkillToggle(skill)}
                            className="hidden"
                          />
                          <span className={`text-sm ${formData.skills.includes(skill) ? 'font-medium text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>{skill}</span>
                        </label>
                      ))}
                    </div>
                    {errors.skills && <p className="mt-1 text-sm text-red-500 font-medium pl-1">{errors.skills}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4">
                    {/* Links */}
                    {[
                      { label: 'GitHub Profile', key: 'githubLink', icon: <LinkIcon className="h-5 w-5" /> },
                      { label: 'Portfolio Website', key: 'portfolioLink', icon: <GlobeAltIcon className="h-5 w-5" /> },
                      { label: 'LinkedIn Profile', key: 'linkedinLink', icon: <LinkIcon className="h-5 w-5" /> },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                          {field.label}
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                            {field.icon}
                          </div>
                          <input
                            type="url"
                            value={formData[field.key as keyof ApplicationData] as string}
                            onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] outline-none text-gray-900 dark:text-white placeholder-gray-400"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                      Professional Bio <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <DocumentTextIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={5}
                        className={`w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary-500-rgb),0.1)] outline-none ${errors.bio ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } text-gray-900 dark:text-white placeholder-gray-400 resize-none`}
                        placeholder="Describe your professional background, key achievements, and what makes you an expert in your field..."
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      {errors.bio && <span className="text-red-500 font-medium pl-1">{errors.bio}</span>}
                      <span className="text-gray-400 ml-auto">{formData.bio.length} chars</span>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                      Resume / CV <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileUpload
                        accept=".pdf,.doc,.docx"
                        maxSize={5}
                        label="Upload your resume (PDF, DOC, DOCX)"
                        onUpload={handleUploadSuccess}
                        onError={(err) => toast.error(err)}
                        uploadUrl="/upload/public"
                      />
                      {formData.resume && (
                        <div className="mt-3 flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-300">
                          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                          Resume uploaded successfully
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Submit Action */}
                <motion.div variants={staggerItem} className="pt-6 border-t border-gray-200 dark:border-gray-700/50">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full btn-gradient py-4 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 glow-primary-hover disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing Application...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </motion.div>
              </form>
            </div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-dark-surface rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600" />

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6"
                >
                  <CheckCircleIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Application Received!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Thank you for applying to Odysia. Our team will review your profile and get back to you within 3-5 business days.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowSuccessModal(false)
                      router.push('/')
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Return Home
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(false)
                      router.push('/dashboard')
                    }}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Go to Dashboard
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
