'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CTA_CONTENT } from '@/constants/cta'
import { revealBlur, staggerDramatic, staggerItemDramatic, floatingSlow, floatingFast } from '@/lib/animations'

export default function CTA() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-purple-600 to-primary-800 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Enhanced background decoration with floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/90 to-purple-800/90" />

        {/* Floating orbs with different speeds */}
        <motion.div
          className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-xl"
          variants={floatingSlow}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 sm:w-32 sm:h-32 bg-cyan-400/10 rounded-full blur-xl"
          variants={floatingFast}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-20 sm:h-20 bg-pink-400/10 rounded-full blur-lg"
          variants={floatingSlow}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-yellow-400/10 rounded-full blur-lg"
          variants={floatingFast}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={revealBlur}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            {CTA_CONTENT.title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            {CTA_CONTENT.description}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-12"
          variants={staggerDramatic}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={staggerItemDramatic}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/start-project"
              className="bg-white text-primary-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl mobile-touch-target w-full sm:w-auto text-center inline-block glow-primary"
            >
              Start Your Project
            </Link>
          </motion.div>
          <motion.div
            variants={staggerItemDramatic}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/expert-application"
              className="border-2 border-white/80 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 mobile-touch-target w-full sm:w-auto text-center inline-block backdrop-blur-sm"
            >
              Apply as Expert
            </Link>
          </motion.div>
          <motion.div
            variants={staggerItemDramatic}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/client-login"
              className="bg-white/10 backdrop-blur-sm text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 mobile-touch-target w-full sm:w-auto text-center inline-block"
            >
              Client Login
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerDramatic}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CTA_CONTENT.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="text-center glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              variants={staggerItemDramatic}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">{benefit}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}