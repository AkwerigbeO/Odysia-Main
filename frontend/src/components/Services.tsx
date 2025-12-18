'use client'

import { motion } from 'framer-motion'
import { SERVICES_DATA } from '@/constants/services'
import ServiceCard from '@/components/ServiceCard'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function Services() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-dark-text mb-6 sm:mb-8 leading-tight">
            Our Core Services
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-dark-text-secondary max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed">
            Expert tech talent for your web development, UI/UX design, and cloud infrastructure needs
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SERVICES_DATA.map((service, index) => (
            <motion.div 
              key={service.id} 
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary mb-4 sm:mb-6">Need a custom solution?</p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors mobile-touch-target text-base sm:text-lg group"
          >
            Let&apos;s discuss your project
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
} 