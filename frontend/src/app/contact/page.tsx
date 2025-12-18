import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import Logo from '@/components/Logo'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo
              width={180}
              height={72}
              className="h-18 w-auto"
              alt="Odysia Logo"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Ready to transform your business? Let&apos;s discuss how we can help you achieve your technology goals.
          </p>
        </div>
        
        <ContactForm />
        
        <div className="text-center mt-12">
                      <div className="border-t border-gray-200 dark:border-dark-border pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">Not sure where to start?</h2>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-6 max-w-2xl mx-auto">
              If you&apos;re unsure about your project requirements or need guidance, we offer free discovery consultations to help clarify your needs.
            </p>
            <a
              href="/contact/discovery"
              className="inline-flex items-center bg-white dark:bg-dark-card border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-50 dark:hover:bg-dark-surface transition-colors duration-200 transform hover:scale-105"
            >
              Schedule Discovery Call
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 