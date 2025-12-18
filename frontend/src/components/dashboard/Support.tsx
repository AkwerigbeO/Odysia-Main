'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'

export default function Support() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  })

  const faqs = [
    {
      id: 1,
      question: 'How do I get paid for my completed projects?',
      answer: 'Payments are automatically released to your account once the client approves your work. You can request withdrawals from your earnings dashboard. Payments are typically processed within 2-3 business days.'
    },
    {
      id: 2,
      question: 'What happens if a client disputes my work?',
      answer: 'If a client disputes your work, our support team will review the case and mediate between both parties. We encourage clear communication and documentation to resolve disputes amicably.'
    },
    {
      id: 3,
      question: 'How can I increase my project success rate?',
      answer: 'Maintain clear communication with clients, deliver work on time, provide regular updates, and ensure high-quality deliverables. Building a strong portfolio and maintaining good ratings also helps.'
    },
    {
      id: 4,
      question: 'Can I work on multiple projects simultaneously?',
      answer: 'Yes, you can work on multiple projects as long as you can manage your time effectively and meet all deadlines. Make sure to communicate your availability clearly with clients.'
    },
    {
      id: 5,
      question: 'How do I handle project revisions?',
      answer: 'Revisions are part of the creative process. Always review client feedback carefully and make requested changes within the agreed scope. If revisions exceed the original agreement, discuss additional compensation with the client.'
    }
  ]

  const supportChannels = [
    {
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-blue-500',
      available: true
    },
    {
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: EnvelopeIcon,
      color: 'bg-green-500',
      available: true
    },
    {
      name: 'Phone Support',
      description: 'Call us during business hours',
      icon: PhoneIcon,
      color: 'bg-purple-500',
      available: false
    }
  ]

  const handleSubmitContact = () => {
    // Here you would typically submit the contact form
    // TODO: Implement actual contact form submission
    setContactForm({ subject: '', message: '', priority: 'medium' })
  }

  const handleReportDispute = () => {
    // Here you would typically open a dispute reporting form
    // TODO: Implement dispute reporting functionality
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Support & Help
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get help and support for your projects
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReportDispute}
            className="flex items-center space-x-2 bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium"
          >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <span>Report a Problem</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <motion.div 
          variants={staggerItem}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center space-x-2 mb-6">
              <QuestionMarkCircleIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                    className="w-full px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      {activeFAQ === faq.id ? (
                        <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {activeFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div 
          variants={staggerItem}
          className="space-y-6"
        >
          {/* Support Channels */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Support
            </h2>
            
            <div className="space-y-4">
              {supportChannels.map((channel) => (
                <motion.div
                  key={channel.name}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${
                    channel.available
                      ? 'border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface cursor-pointer'
                      : 'border-gray-200 dark:border-dark-border opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`${channel.color} p-3 rounded-lg`}>
                    <channel.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {channel.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {channel.description}
                    </p>
                  </div>
                  {!channel.available && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Coming Soon
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Send us a Message
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  placeholder="What can we help you with?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={contactForm.priority}
                  onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 resize-none"
                  placeholder="Please provide details about your issue..."
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitContact}
                disabled={!contactForm.subject || !contactForm.message}
                className="w-full bg-primary-600 dark:bg-primary-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
                <span>Send Message</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        variants={staggerItem}
        className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 text-center">
              Start Live Chat
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReportDispute}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
            <span className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300 text-center">
              Report Dispute
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <QuestionMarkCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 text-center">
              View Help Center
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
} 