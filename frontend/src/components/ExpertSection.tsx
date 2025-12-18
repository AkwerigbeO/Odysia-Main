'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function ExpertSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-dark-text mb-6 sm:mb-8 leading-tight">
            Join Our Expert Network
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-dark-text-secondary max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed">
            Access quality projects with guaranteed payments and professional support
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 sm:p-10"
            variants={staggerItem}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text mb-4">Guaranteed Payments</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">Get paid securely through our escrow system with milestone-based payments.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 sm:p-10"
            variants={staggerItem}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text mb-4">Quality Projects</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">Access pre-vetted clients and well-scoped projects that match your skills.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 sm:p-10 sm:col-span-2 lg:col-span-1"
            variants={staggerItem}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text mb-4">Professional Support</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">Get project management support and dispute resolution when needed.</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/expert-application"
            className="bg-primary-600 dark:bg-primary-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors mobile-touch-target inline-block transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Apply as Expert
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 