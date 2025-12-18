'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ABOUT_CONTENT } from '@/constants/about'
import Logo from '@/components/Logo'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function About() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="order-2 lg:order-1"
            variants={staggerItem}
          >
            {/* Logo */}
            <motion.div 
              className="flex justify-center lg:justify-start mb-8"
              variants={fadeInUp}
            >
              <Logo
                width={180}
                height={72}
                className="h-14 w-auto sm:h-16 md:h-18"
                alt="Odysia Logo"
              />
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-dark-text mb-6 sm:mb-8 leading-tight"
              variants={fadeInUp}
            >
              {ABOUT_CONTENT.title}
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary mb-8 sm:mb-10 leading-relaxed"
              variants={fadeInUp}
            >
              {ABOUT_CONTENT.description}
            </motion.p>
            <motion.div 
              className="space-y-6 sm:space-y-8"
              variants={staggerContainer}
            >
              {ABOUT_CONTENT.values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  variants={staggerItem}
                  whileHover={{ x: 8 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 sm:ml-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">{value.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            variants={staggerItem}
          >
            <motion.div 
              className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 dark:border-dark-border"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-6 sm:mb-8"
                variants={fadeInUp}
              >
                Why Choose Odysia?
              </motion.h3>
              <motion.div 
                className="space-y-6 sm:space-y-8"
                variants={staggerContainer}
              >
                {ABOUT_CONTENT.benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    variants={staggerItem}
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold text-lg sm:text-xl">{index + 1}</span>
                      </div>
                    </div>
                    <div className="ml-4 sm:ml-6">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-dark-text mb-2 sm:mb-3">{benefit.title}</h4>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-8 sm:mt-10 p-6 sm:p-8 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
                variants={fadeInUp}
              >
                <h4 className="font-semibold text-primary-900 dark:text-primary-300 mb-3 text-base sm:text-lg">Escrow Protection</h4>
                <p className="text-primary-700 dark:text-primary-400 text-sm sm:text-base leading-relaxed">
                  Your payments are held securely until project milestones are completed. 
                  Both clients and experts are protected throughout the entire process.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}