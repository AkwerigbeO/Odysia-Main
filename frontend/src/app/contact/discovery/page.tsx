'use client'

import { useState } from 'react'
import Image from 'next/image'
import Logo from '@/components/Logo'

export default function DiscoveryPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: '',
    helpNeeded: '',
    clarity: '',
    techSolution: [] as string[],
    consultationDate: '',
    consultationTime: '',
    timezone: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm(prev => ({
        ...prev,
        techSolution: checked 
          ? [...prev.techSolution, value]
          : prev.techSolution.filter(item => item !== value)
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setForm({
        name: '', email: '', phone: '', contactMethod: '', helpNeeded: '',
        clarity: '', techSolution: [], consultationDate: '', consultationTime: '',
        timezone: '', notes: ''
      })
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Logo
              width={180}
              height={72}
              className="h-18 w-auto"
              alt="Odysia Logo"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">Discovery Consultation</h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Not sure where to start? Let&apos;s have a quick chat to understand your needs and find the right solution for you.
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-dark-border">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Thank you for reaching out to Odysia! We&apos;ll review your request and confirm your consultation slot via email or WhatsApp shortly.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
              placeholder="Your full name"
            />
              </div>
              <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
              placeholder="your@email.com"
            />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Phone Number or WhatsApp *
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
              placeholder="+1234567890"
            />
              </div>
              <div>
                            <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Preferred Contact Method *
            </label>
            <select
              id="contactMethod"
              name="contactMethod"
              value={form.contactMethod}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
            >
                  <option value="">Select contact method</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="zoom">Zoom</option>
                  <option value="google-meet">Google Meet</option>
                  <option value="phone">Phone Call</option>
                  <option value="telegram">Telegram</option>
                </select>
              </div>
            </div>

            <div>
                          <label htmlFor="helpNeeded" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              What do you need help with? *
            </label>
            <input
              type="text"
              id="helpNeeded"
              name="helpNeeded"
              value={form.helpNeeded}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
              placeholder="Briefly describe what you need help with..."
            />
            </div>

            <div>
                          <label htmlFor="clarity" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              How clear are you about your project or idea? *
            </label>
            <select
              id="clarity"
              name="clarity"
              value={form.clarity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
            >
                <option value="">Select clarity level</option>
                <option value="very-clear">Very clear</option>
                <option value="need-help">Need help shaping it</option>
                <option value="not-sure">Not sure at all</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                What kind of tech solution do you think you might need?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Website', 'Mobile App', 'UI/UX Design', 'Graphics',
                  'Backend/API', 'Tech Advice', 'Not sure'
                ].map((option) => (
                  <label key={option} className="flex items-center p-3 bg-gray-50 dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-100 dark:hover:bg-dark-card transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      name="techSolution"
                      value={option.toLowerCase().replace(/\s+/g, '-')}
                      checked={form.techSolution.includes(option.toLowerCase().replace(/\s+/g, '-'))}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-dark-border rounded"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 dark:text-dark-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                            <label htmlFor="consultationDate" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Preferred Consultation Date *
            </label>
            <input
              type="date"
              id="consultationDate"
              name="consultationDate"
              value={form.consultationDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
            />
              </div>
              <div>
                            <label htmlFor="consultationTime" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Preferred Consultation Time *
            </label>
            <input
              type="time"
              id="consultationTime"
              name="consultationTime"
              value={form.consultationTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
            />
              </div>
            </div>

            <div>
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Timezone (Optional)
            </label>
            <input
              type="text"
              id="timezone"
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
              placeholder="e.g. UTC+1, EST, PST"
            />
            </div>

            <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              Extra Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text"
              placeholder="Any additional information you'd like to share..."
            />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Schedule Discovery Call'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 