'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HERO_CONTENT } from '@/constants/hero'
import Logo from '@/components/Logo'
import { 
  fadeInUp, 
  fadeInDown, 
  staggerContainer, 
  staggerItem, 
  floating, 
  parallax,
  hoverScale,
  buttonTap
} from '@/lib/animations'
import { useTypewriter, useCounter, useIsMobile, useTouchGestures } from '@/lib/hooks'

export default function Hero() {
  const typewriterText = useTypewriter(HERO_CONTENT.title, 50)
  const projectCount = useCounter(500, 3000)
  const successRate = useCounter(98, 2000)
  const isMobile = useIsMobile()

  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures(
    () => {/* Handle swipe left */},
    () => {/* Handle swipe right */}
  )

  return (
    <section 
      className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-bg dark:via-dark-surface dark:to-dark-card py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden min-h-screen flex items-center transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Animated background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"
          variants={floating}
          animate="animate"
        />
        <motion.div 
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-primary-300 dark:bg-primary-700 rounded-full opacity-20"
          variants={floating}
          animate="animate"
          transition={{ delay: 1 }}
        />
        
        {/* Additional floating elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 sm:w-4 sm:h-4 bg-primary-400 dark:bg-primary-600 rounded-full opacity-60"
          variants={floating}
          animate="animate"
          transition={{ delay: 0.5, duration: 4 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-3 h-3 sm:w-6 sm:h-6 bg-primary-500 dark:bg-primary-500 rounded-full opacity-40"
          variants={floating}
          animate="animate"
          transition={{ delay: 1.5, duration: 5 }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Logo with enhanced animation */}
          <motion.div 
            className="flex justify-center mb-6 sm:mb-8"
            variants={staggerItem}
          >
            <motion.div
              variants={hoverScale}
              whileHover="hover"
            >
              <Logo
                width={240}
                height={96}
                className="h-24 w-auto sm:h-28 md:h-32 lg:h-36"
                alt="Odysia Logo"
              />
            </motion.div>
          </motion.div>
          
          {/* Animated headline with improved text arrangement */}
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight break-words hero-text text-arrangement-fix"
            variants={fadeInUp}
          >
            <span className="block">
              {typewriterText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </span>
          </motion.h1>
          
          {/* Animated subtitle with improved spacing */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed tracking-wide text-arrangement-fix"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {HERO_CONTENT.subtitle}
          </motion.p>
          
          {/* Feature badges with stagger animation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0"
            variants={staggerContainer}
          >
            {HERO_CONTENT.features.map((feature, index) => (
              <motion.span
                key={feature}
                className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-white dark:bg-dark-card text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700 shadow-sm hover:shadow-md transition-shadow mobile-touch-target"
                variants={staggerItem}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.svg 
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
                {feature}
              </motion.span>
            ))}
          </motion.div>
          
          {/* CTA Buttons with enhanced hover effects */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              variants={buttonTap}
              whileTap="tap"
              className="w-full sm:w-auto"
            >
              <Link
                href="/start-project"
                className="bg-primary-600 dark:bg-primary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block w-full sm:w-auto text-center mobile-touch-target"
              >
                Start Your Project
              </Link>
            </motion.div>
            <motion.div
              variants={buttonTap}
              whileTap="tap"
              className="w-full sm:w-auto"
            >
              <Link
                href="/experts"
                className="border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white transform hover:scale-105 transition-all duration-200 inline-block w-full sm:w-auto text-center mobile-touch-target"
              >
                {HERO_CONTENT.secondaryCTA}
              </Link>
            </motion.div>
            <motion.div
              variants={buttonTap}
              whileTap="tap"
              className="w-full sm:w-auto"
            >
              <Link
                href="/client-login"
                className="bg-gray-800 dark:bg-gray-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-block w-full sm:w-auto text-center mobile-touch-target"
              >
                Client Login
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Animated statistics */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="text-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-xl shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">
                {projectCount}+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Projects Completed</div>
            </motion.div>
            <motion.div 
              className="text-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-xl shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">
                {successRate}%
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Success Rate</div>
            </motion.div>
          </motion.div>
          
          {/* Trust indicators with enhanced animation */}
          <motion.div 
            className="mt-12 sm:mt-16"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <motion.p 
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Trusted by leading companies
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60 px-4 sm:px-0"
              variants={staggerContainer}
            >
              {['TechCorp', 'InnovateLab', 'StartupHub', 'DigitalFlow'].map((company, index) => (
                <motion.div 
                  key={company}
                  className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm font-medium"
                  variants={staggerItem}
                  whileHover={{ 
                    scale: 1.1, 
                    color: '#9333ea',
                    transition: { duration: 0.2 }
                  }}
                >
                  {company}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 