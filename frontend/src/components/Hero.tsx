'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HERO_CONTENT } from '@/constants/hero'
import Logo from '@/components/Logo'
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  floating,
  hoverScale,
  buttonTap
} from '@/lib/animations'
import { useTypewriter, useCounter, useIsMobile, useTouchGestures, useMousePosition } from '@/lib/hooks'

// Feature icons as inline SVGs for better control
const FeatureIcons = {
  'Web Development': (
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'UI/UX Design': (
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  'Cloud & DevOps': (
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  'Escrow Protection': (
    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

// Stats icons
const StatIcons = {
  projects: (
    <svg className="w-6 h-6 mb-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  success: (
    <svg className="w-6 h-6 mb-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  experts: (
    <svg className="w-6 h-6 mb-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  )
}

// Placeholder company logos (abstract tech shapes)
const CompanyLogos = [
  {
    name: 'TechCorp', svg: (
      <svg className="h-8 w-auto" viewBox="0 0 120 40" fill="currentColor">
        <rect x="5" y="10" width="20" height="20" rx="4" className="opacity-80" />
        <rect x="30" y="5" width="10" height="30" rx="2" className="opacity-60" />
        <text x="45" y="28" className="text-xs font-bold" style={{ fontSize: '14px' }}>TechCorp</text>
      </svg>
    )
  },
  {
    name: 'InnovateLab', svg: (
      <svg className="h-8 w-auto" viewBox="0 0 140 40" fill="currentColor">
        <circle cx="20" cy="20" r="12" className="opacity-70" />
        <circle cx="20" cy="20" r="6" className="opacity-40" />
        <text x="40" y="28" className="text-xs font-bold" style={{ fontSize: '14px' }}>InnovateLab</text>
      </svg>
    )
  },
  {
    name: 'StartupHub', svg: (
      <svg className="h-8 w-auto" viewBox="0 0 130 40" fill="currentColor">
        <polygon points="20,5 35,35 5,35" className="opacity-70" />
        <text x="42" y="28" className="text-xs font-bold" style={{ fontSize: '14px' }}>StartupHub</text>
      </svg>
    )
  },
  {
    name: 'DigitalFlow', svg: (
      <svg className="h-8 w-auto" viewBox="0 0 140 40" fill="currentColor">
        <path d="M5 20 Q15 5 25 20 Q35 35 45 20" stroke="currentColor" fill="none" strokeWidth="3" className="opacity-70" />
        <text x="52" y="28" className="text-xs font-bold" style={{ fontSize: '14px' }}>DigitalFlow</text>
      </svg>
    )
  },
  {
    name: 'CloudNine', svg: (
      <svg className="h-8 w-auto" viewBox="0 0 130 40" fill="currentColor">
        <ellipse cx="20" cy="22" rx="15" ry="10" className="opacity-60" />
        <ellipse cx="28" cy="18" rx="10" ry="7" className="opacity-80" />
        <text x="45" y="28" className="text-xs font-bold" style={{ fontSize: '14px' }}>CloudNine</text>
      </svg>
    )
  },
  {
    name: 'DataPulse', svg: (
      <svg className="h-8 w-auto" viewBox="0 0 130 40" fill="currentColor">
        <rect x="5" y="18" width="6" height="12" rx="1" className="opacity-50" />
        <rect x="14" y="12" width="6" height="18" rx="1" className="opacity-70" />
        <rect x="23" y="8" width="6" height="22" rx="1" className="opacity-90" />
        <text x="35" y="28" className="text-xs font-bold" style={{ fontSize: '14px' }}>DataPulse</text>
      </svg>
    )
  }
]

export default function Hero() {
  const typewriterText = useTypewriter(HERO_CONTENT.title, 50)
  const projectCount = useCounter(500, 3000)
  const successRate = useCounter(98, 2000)
  const expertCount = useCounter(150, 2500)
  const isMobile = useIsMobile()
  const mousePosition = useMousePosition()

  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures(
    () => {/* Handle swipe left */ },
    () => {/* Handle swipe right */ }
  )

  // Calculate parallax offset based on mouse position
  const parallaxX = isMobile ? 0 : (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.02
  const parallaxY = isMobile ? 0 : (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.02

  return (
    <section
      className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden min-h-screen flex items-center transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-80" />

      {/* Animated background decoration with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-96 sm:h-96 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-full opacity-20 blur-3xl"
          variants={floating}
          animate="animate"
          style={{
            x: parallaxX * 2,
            y: parallaxY * 2,
          }}
        />
        <motion.div
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"
          variants={floating}
          animate="animate"
          transition={{ delay: 1 }}
          style={{
            x: -parallaxX * 2,
            y: -parallaxY * 2,
          }}
        />

        {/* Additional floating elements with parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 sm:w-5 sm:h-5 bg-gradient-to-r from-primary-400 to-cyan-400 rounded-full opacity-60 blur-sm"
          variants={floating}
          animate="animate"
          transition={{ delay: 0.5, duration: 4 }}
          style={{
            x: parallaxX * 3,
            y: parallaxY * 3,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 blur-sm"
          variants={floating}
          animate="animate"
          transition={{ delay: 1.5, duration: 5 }}
          style={{
            x: -parallaxX * 4,
            y: -parallaxY * 4,
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-2 h-2 sm:w-4 sm:h-4 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full opacity-70"
          variants={floating}
          animate="animate"
          transition={{ delay: 2, duration: 6 }}
          style={{
            x: parallaxX * 2.5,
            y: parallaxY * 2.5,
          }}
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

          {/* Animated headline with gradient text */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight break-words hero-text"
            variants={fadeInUp}
          >
            <span className="block">
              Connect with{' '}
              <span className="gradient-text-animated">
                {typewriterText.includes('Vetted') ? 'Vetted Tech Experts' : ''}
              </span>
              {!typewriterText.includes('Vetted') && typewriterText.replace('Connect with ', '')}
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed tracking-wide"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          {/* Feature badges with unique icons and hover effects */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0"
            variants={staggerContainer}
          >
            {HERO_CONTENT.features.map((feature) => (
              <motion.span
                key={feature}
                className="inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-medium bg-white/80 dark:bg-gray-800/80 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50 shadow-sm hover:shadow-lg hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 backdrop-blur-sm mobile-touch-target group"
                variants={staggerItem}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
              >
                <span className="text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {FeatureIcons[feature as keyof typeof FeatureIcons]}
                </span>
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
            {/* Primary CTA - Gradient button */}
            <motion.div
              variants={buttonTap}
              whileTap="tap"
              className="w-full sm:w-auto"
            >
              <Link
                href="/start-project"
                className="btn-gradient px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg inline-flex items-center justify-center w-full sm:w-auto transition-all duration-300 glow-primary-hover mobile-touch-target group"
              >
                Start Your Project
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Secondary CTA - Gradient border */}
            <motion.div
              variants={buttonTap}
              whileTap="tap"
              className="w-full sm:w-auto"
            >
              <Link
                href="/expert-application"
                className="relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 inline-flex items-center justify-center w-full sm:w-auto transition-all duration-300 hover:shadow-lg gradient-border mobile-touch-target group"
              >
                {HERO_CONTENT.secondaryCTA}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Tertiary CTA */}
            <motion.div
              variants={buttonTap}
              whileTap="tap"
              className="w-full sm:w-auto"
            >
              <Link
                href="/client-login"
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center w-full sm:w-auto mobile-touch-target"
              >
                Client Login
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated statistics with glassmorphism - 3 cards now */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            {/* Projects stat */}
            <motion.div
              className="text-center p-5 sm:p-6 glass-card rounded-2xl"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {StatIcons.projects}
              <div className="text-2xl sm:text-3xl font-bold gradient-text-animated mb-1 sm:mb-2">
                {projectCount}+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">Projects Completed</div>
            </motion.div>

            {/* Success rate stat */}
            <motion.div
              className="text-center p-5 sm:p-6 glass-card rounded-2xl"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {StatIcons.success}
              <div className="text-2xl sm:text-3xl font-bold gradient-text-animated mb-1 sm:mb-2">
                {successRate}%
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">Success Rate</div>
            </motion.div>

            {/* Experts stat - NEW */}
            <motion.div
              className="text-center p-5 sm:p-6 glass-card rounded-2xl"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {StatIcons.experts}
              <div className="text-2xl sm:text-3xl font-bold gradient-text-animated mb-1 sm:mb-2">
                {expertCount}+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">Verified Experts</div>
            </motion.div>
          </motion.div>

          {/* Trust indicators with company logos marquee */}
          <motion.div
            className="mt-12 sm:mt-16"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <motion.p
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 font-medium uppercase tracking-wider"
            >
              Trusted by leading companies
            </motion.p>

            {/* Logo marquee container */}
            <div className="relative overflow-hidden py-4">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-primary-50 dark:from-gray-950 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-primary-50 dark:from-gray-950 to-transparent z-10" />

              {/* First row - scrolls left */}
              <div className="flex animate-marquee mb-4">
                {/* Double the logos for seamless loop */}
                {[...CompanyLogos, ...CompanyLogos].map((company, index) => (
                  <div
                    key={`row1-${company.name}-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-8 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 text-gray-400 dark:text-gray-500 grayscale hover:grayscale-0 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer"
                  >
                    {company.svg}
                  </div>
                ))}
              </div>

              {/* Second row - scrolls right (reverse) */}
              <div className="flex animate-marquee-reverse">
                {/* Double the logos for seamless loop */}
                {[...CompanyLogos, ...CompanyLogos].reverse().map((company, index) => (
                  <div
                    key={`row2-${company.name}-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-8 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 text-gray-400 dark:text-gray-500 grayscale hover:grayscale-0 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
                  >
                    {company.svg}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}