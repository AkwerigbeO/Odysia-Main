'use client'

import { motion } from 'framer-motion'
import { staggerItem } from '@/lib/animations'

interface ServiceCardProps {
  service: {
    id: string
    title: string
    description: string
    features: string[]
    icon: React.ReactNode
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      className="group h-full flex flex-col glass-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50 dark:border-gray-700/50 hover:border-primary-300/50 dark:hover:border-primary-500/50 relative overflow-hidden mobile-touch-target glow-primary-hover"
      variants={staggerItem}
      whileHover="hover"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['200% 200%', '-200% -200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />

      {/* Floating particles effect */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-primary-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-60 pointer-events-none blur-sm"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-4 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-50 pointer-events-none"
        animate={{
          y: [0, -10, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8">
        <div className="flex items-center mb-5 sm:mb-6">
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 rounded-2xl flex items-center justify-center group-hover:from-primary-500 group-hover:to-primary-600 dark:group-hover:from-primary-500 dark:group-hover:to-primary-600 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/25"
            whileHover={{
              scale: 1.08,
              rotate: 5
            }}
          >
            <motion.div
              className="text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {service.icon}
            </motion.div>
          </motion.div>
        </div>

        <motion.h3
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-3 sm:mb-4 leading-tight"
          whileHover={{ x: 5 }}
        >
          {service.title}
        </motion.h3>

        <motion.p
          className="text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed flex-grow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {service.description}
        </motion.p>

        <motion.ul className="space-y-2.5 sm:space-y-3 mt-auto">
          {service.features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start text-sm sm:text-base text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mt-1.5 mr-3 flex-shrink-0">
                <motion.div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500"
                  whileHover={{ scale: 1.5 }}
                />
              </div>
              <span className="leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Corner accent with gradient */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      />

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}