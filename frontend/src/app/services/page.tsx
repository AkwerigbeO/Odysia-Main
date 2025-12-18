import Image from 'next/image'
import { SERVICES_DATA } from '@/constants/services'
import ServiceCard from '@/components/ServiceCard'
import Logo from '@/components/Logo'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto">
            Comprehensive technology solutions to drive your business forward
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-dark-surface rounded-2xl shadow-lg p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose from our comprehensive services and let our expert team bring your vision to life
          </p>
          <a
            href="/start-project"
            className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Project
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
} 