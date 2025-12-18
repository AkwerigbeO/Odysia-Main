'use client'

import { motion } from 'framer-motion'
import { hoverLift, scaleIn, staggerItem } from '@/lib/animations'

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
      className="group h-full flex flex-col bg-white dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-dark-border hover:border-primary-200 dark:hover:border-primary-600 relative overflow-hidden mobile-touch-target"
      variants={staggerItem}
      whileHover="hover"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-50 dark:from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Floating particles effect */}
      <motion.div
        className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-300 rounded-full opacity-0 group-hover:opacity-60 pointer-events-none"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8">
        <div className="flex items-center mb-5 sm:mb-6">
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center group-hover:bg-primary-600 dark:group-hover:bg-primary-500 transition-colors duration-300 shadow-sm"
            whileHover={{
              scale: 1.05,
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
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-3 sm:mb-4 leading-tight"
          whileHover={{ x: 5 }}
        >
          {service.title}
        </motion.h3>

        <motion.p
          className="text-base text-gray-600 dark:text-dark-text-secondary mb-6 sm:mb-8 leading-relaxed flex-grow"
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
                  className="w-1.5 h-1.5 rounded-full bg-primary-500"
                  whileHover={{ scale: 1.5 }}
                />
              </div>
              <span className="leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 dark:bg-primary-800/30 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      />
    </motion.div>
  )
} 