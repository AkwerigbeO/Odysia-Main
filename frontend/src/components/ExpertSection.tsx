'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealBlur, staggerDramatic, staggerItemDramatic, bounceIn } from '@/lib/animations'

export default function ExpertSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          variants={revealBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight">
            Join Our <span className="gradient-text-animated">Expert Network</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed">
            Access quality projects with guaranteed payments and professional support
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          variants={staggerDramatic}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="glass-card rounded-2xl shadow-lg p-8 sm:p-10 glow-primary-hover group"
            variants={staggerItemDramatic}
            whileHover={{ y: -8 }}
          >
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
              variants={bounceIn}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Guaranteed Payments</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">Get paid securely through our escrow system with milestone-based payments.</p>
          </motion.div>

          <motion.div
            className="glass-card rounded-2xl shadow-lg p-8 sm:p-10 glow-primary-hover group"
            variants={staggerItemDramatic}
            whileHover={{ y: -8 }}
          >
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
              variants={bounceIn}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Quality Projects</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">Access pre-vetted clients and well-scoped projects that match your skills.</p>
          </motion.div>

          <motion.div
            className="glass-card rounded-2xl shadow-lg p-8 sm:p-10 sm:col-span-2 lg:col-span-1 glow-primary-hover group"
            variants={staggerItemDramatic}
            whileHover={{ y: -8 }}
          >
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
              variants={bounceIn}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Professional Support</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">Get project management support and dispute resolution when needed.</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-12 sm:mt-16"
          variants={revealBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/expert-application"
              className="btn-gradient px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl inline-flex items-center justify-center transition-all duration-300 glow-primary-hover mobile-touch-target group"
            >
              Apply as Expert
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}