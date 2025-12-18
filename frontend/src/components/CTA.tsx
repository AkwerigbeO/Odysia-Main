'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CTA_CONTENT } from '@/constants/cta'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function CTA() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 opacity-90"></div>
        <motion.div 
          className="absolute top-10 right-10 w-16 h-16 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-12 h-12 sm:w-24 sm:h-24 bg-white opacity-10 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            {CTA_CONTENT.title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-primary-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            {CTA_CONTENT.description}
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/start-project"
              className="bg-white text-primary-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mobile-touch-target w-full sm:w-auto text-center inline-block"
            >
              Start Your Project
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/expert-application"
              className="border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-200 mobile-touch-target w-full sm:w-auto text-center inline-block"
            >
              Apply as Expert
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/client-login"
              className="bg-primary-800 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:bg-primary-900 transform hover:scale-105 transition-all duration-200 mobile-touch-target w-full sm:w-auto text-center inline-block"
            >
              Client Login
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {CTA_CONTENT.benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              variants={staggerItem}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-primary-100 font-medium leading-relaxed">{benefit}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 