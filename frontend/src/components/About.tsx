'use client'

import { motion } from 'framer-motion'
import { ABOUT_CONTENT } from '@/constants/about'
import Logo from '@/components/Logo'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function About() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight"
              variants={fadeInUp}
            >
              {ABOUT_CONTENT.title}
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 leading-relaxed"
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
                  className="flex items-start group"
                  variants={staggerItem}
                  whileHover={{ x: 8 }}
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-primary-500/25 transition-shadow duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="ml-4 sm:ml-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{value.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
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
              className="glass-card rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-hidden glow-primary-hover"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card shimmer effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8"
                variants={fadeInUp}
              >
                Why Choose <span className="gradient-text-animated">Odysia</span>?
              </motion.h3>
              <motion.div
                className="space-y-6 sm:space-y-8"
                variants={staggerContainer}
              >
                {ABOUT_CONTENT.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start group"
                    variants={staggerItem}
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 rounded-xl flex items-center justify-center group-hover:from-primary-500 group-hover:to-cyan-500 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="font-bold text-lg sm:text-xl text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300">{index + 1}</span>
                      </motion.div>
                    </div>
                    <div className="ml-4 sm:ml-6">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{benefit.title}</h4>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Escrow Protection Card with gradient border */}
              <motion.div
                className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-2xl relative gradient-border bg-gradient-to-br from-primary-50 to-cyan-50 dark:from-primary-900/30 dark:to-cyan-900/30"
                variants={fadeInUp}
              >
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <h4 className="font-bold text-primary-900 dark:text-primary-300 text-base sm:text-lg">Escrow Protection</h4>
                </div>
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