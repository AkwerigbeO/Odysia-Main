'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  CalendarIcon,
  StarIcon,
  PaperAirplaneIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  PaperClipIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function ClientSupportPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general',
    attachment: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLiveChat, setShowLiveChat] = useState(false)

  const faqs = [
    {
      id: 1,
      question: 'How do I create a new project?',
      answer: 'To create a new project, click the "Create New Project" button on your dashboard. Fill in the project details including title, description, budget, and timeline. Once submitted, experts will be able to view and submit proposals for your project.',
      category: 'Projects'
    },
    {
      id: 2,
      question: 'How do I release payments to experts?',
      answer: 'When a milestone is completed and approved, you can release the payment from the Payments section. Go to "Pending Milestones" and click "Release Payment" for completed work. Payments are held securely in escrow until you approve the milestone.',
      category: 'Payments'
    },
    {
      id: 3,
      question: 'How does the escrow payment system work?',
      answer: 'When you accept a proposal, the agreed amount is held in escrow. Payments are released to the expert in milestones as work is completed and approved. This ensures both parties are protected throughout the project.',
      category: 'Payments'
    },
    {
      id: 4,
      question: 'What if I\'m not satisfied with the expert\'s work?',
      answer: 'If you\'re not satisfied with the work, you can request revisions within the agreed scope. For major issues, you can dispute the milestone and our support team will mediate. We encourage clear communication to resolve issues amicably.',
      category: 'Disputes'
    },
    {
      id: 5,
      question: 'How do I communicate with experts?',
      answer: 'You can message experts directly through the Messages section in your dashboard. All project-related communication is tracked and stored for reference. You can also schedule video calls through the platform.',
      category: 'Communication'
    },
    {
      id: 6,
      question: 'Can I cancel a project after it has started?',
      answer: 'You can cancel a project, but this may incur fees depending on the work completed. Review the cancellation policy in your project agreement. We recommend discussing any concerns with the expert before cancellation.',
      category: 'Projects'
    },
    {
      id: 7,
      question: 'How do I know if an expert is qualified?',
      answer: 'All experts on Odysia are vetted and verified. You can review their portfolio, ratings, completed projects, and client reviews before hiring. We also provide expert verification badges and skill assessments.',
      category: 'Experts'
    },
    {
      id: 8,
      question: 'What happens if an expert doesn\'t complete the work?',
      answer: 'If an expert fails to complete the work according to the agreed terms, you can dispute the milestone. Our support team will review the case and may refund your escrow payment. We have strict policies to protect clients.',
      category: 'Disputes'
    },
    {
      id: 9,
      question: 'How do I track project progress?',
      answer: 'You can track project progress through the Projects section. Each project shows milestones, deadlines, and current status. Experts are required to provide regular updates and submit work for review.',
      category: 'Projects'
    },
    {
      id: 10,
      question: 'What payment methods are accepted?',
      answer: 'We accept major credit cards, bank transfers, and digital wallets. All payments are processed securely through our escrow system. You can add multiple payment methods to your account.',
      category: 'Payments'
    }
  ]

  const supportChannels = [
    {
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-blue-500',
      available: true,
      responseTime: '2-5 minutes',
      action: () => setShowLiveChat(true)
    },
    {
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: EnvelopeIcon,
      color: 'bg-green-500',
      available: true,
      responseTime: '24 hours',
      action: () => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      name: 'Phone Support',
      description: 'Call us during business hours',
      icon: PhoneIcon,
      color: 'bg-purple-500',
      available: false,
      responseTime: 'Business hours',
      action: () => window.open('tel:+1-800-ODYSSIA')
    }
  ]

  const helpResources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn how to create your first project and hire experts',
      icon: BookOpenIcon,
      link: '/help/getting-started',
      color: 'bg-blue-500'
    },
    {
      title: 'Payment & Escrow Guide',
      description: 'Understand how our secure payment system works',
      icon: CreditCardIcon,
      link: '/help/payments',
      color: 'bg-green-500'
    },
    {
      title: 'Expert Hiring Guide',
      description: 'Tips for finding and working with the right experts',
      icon: UsersIcon,
      link: '/help/hiring',
      color: 'bg-purple-500'
    },
    {
      title: 'Dispute Resolution',
      description: 'Learn about our dispute resolution process',
      icon: ShieldCheckIcon,
      link: '/help/disputes',
      color: 'bg-orange-500'
    }
  ]

  const handleSubmitContact = () => {
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setContactForm({
        subject: '',
        message: '',
        priority: 'medium',
        category: 'general',
        attachment: null
      })
      alert('Your message has been sent! We\'ll get back to you within 24 hours.')
    }, 2000)
  }

  const handleReportDispute = () => {
    // TODO: Implement dispute reporting
    console.log('Opening dispute form')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setContactForm(prev => ({ ...prev, attachment: file }))
  }

  const handleLiveChat = () => {
    setShowLiveChat(true)
    // TODO: Implement live chat functionality
    console.log('Opening live chat')
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
        {/* Header */}
        <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support & Help</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Get help with your projects and account
              </p>
            </div>
            
            <motion.button
              onClick={handleLiveChat}
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Start Live Chat</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Support Channels */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((channel) => {
            const Icon = channel.icon
            return (
              <motion.div
                key={channel.name}
                variants={staggerItem}
                className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-dark-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${channel.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{channel.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{channel.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Response: {channel.responseTime}
                    </p>
                  </div>
                </div>
                <button
                  onClick={channel.action}
                  disabled={!channel.available}
                  className={`mt-4 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    channel.available
                      ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {channel.available ? 'Contact Now' : 'Unavailable'}
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FAQ Section */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={staggerItem}
                  className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{faq.category}</p>
                    </div>
                    {activeFAQ === faq.id ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  
                  {activeFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <EnvelopeIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Support</h2>
            </div>
            
            <form id="contact-form" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white transition-colors"
                  >
                    <option value="general">General</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="dispute">Dispute</option>
                    <option value="project">Project Related</option>
                    <option value="account">Account Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Attachment (Optional)
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors">
                    <PaperClipIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Choose File</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                    />
                  </label>
                  {contactForm.attachment && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {contactForm.attachment.name}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleSubmitContact}
                disabled={isSubmitting || !contactForm.subject || !contactForm.message}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed mobile-touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <PaperAirplaneIcon className="h-4 w-4" />
                    <span>Send Message</span>
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Help Resources */}
        <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpenIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Help Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpResources.map((resource) => {
              const Icon = resource.icon
              return (
                <motion.a
                  key={resource.title}
                  href={resource.link}
                  variants={staggerItem}
                  className="block p-4 border border-gray-200 dark:border-dark-border rounded-lg hover:shadow-md transition-all hover:scale-105 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${resource.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Live Chat Modal */}
        {showLiveChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLiveChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Chat</h3>
                <button
                  onClick={() => setShowLiveChat(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <ChevronUpIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="text-center py-8">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Connecting to Support...</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our support team will be with you shortly.
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Waiting for agent...</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
  )
}

