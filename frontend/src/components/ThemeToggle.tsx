'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-4 sm:w-12 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-full p-0.5 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        minHeight: '32px',
        minWidth: '40px',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      <motion.div
        className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full shadow-md"
        animate={{
          x: theme === 'dark' ? (window.innerWidth < 640 ? 20 : 24) : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      
      {/* Animated Sun icon */}
      <motion.div
        className="absolute left-0.5 sm:left-1 top-0.5 sm:top-1 w-1.5 h-1.5 sm:w-2 sm:h-2"
        animate={{
          opacity: theme === 'light' ? 1 : 0,
          scale: theme === 'light' ? 1 : 0.5,
          rotate: theme === 'light' ? 360 : 0,
        }}
        transition={{ 
          duration: 0.3,
          rotate: { duration: 0.6, ease: "easeInOut" }
        }}
      >
        <svg
          className="w-full h-full text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Sun center */}
          <circle cx="12" cy="12" r="4" />
          {/* Sun rays */}
          <motion.path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34l-1.41 1.41M19.07 19.07l-1.41 1.41"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              opacity: theme === 'light' ? 1 : 0,
            }}
            transition={{ duration: 0.2, delay: 0.1 }}
          />
        </svg>
      </motion.div>
      
      {/* Animated Moon icon */}
      <motion.div
        className="absolute right-0.5 sm:right-1 top-0.5 sm:top-1 w-1.5 h-1.5 sm:w-2 sm:h-2"
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
          scale: theme === 'dark' ? 1 : 0.5,
          rotate: theme === 'dark' ? 360 : 0,
        }}
        transition={{ 
          duration: 0.3,
          rotate: { duration: 0.6, ease: "easeInOut" }
        }}
      >
        <svg
          className="w-full h-full text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Moon shape */}
          <motion.path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            animate={{
              scale: theme === 'dark' ? [1, 1.1, 1] : 1,
            }}
            transition={{ 
              duration: 2,
              repeat: theme === 'dark' ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          {/* Stars */}
          <motion.circle
            cx="8"
            cy="8"
            r="0.5"
            fill="currentColor"
            animate={{
              opacity: theme === 'dark' ? [0.3, 1, 0.3] : 0,
              scale: theme === 'dark' ? [0.8, 1.2, 0.8] : 0,
            }}
            transition={{ 
              duration: 1.5,
              repeat: theme === 'dark' ? Infinity : 0,
              delay: 0.2
            }}
          />
          <motion.circle
            cx="16"
            cy="6"
            r="0.3"
            fill="currentColor"
            animate={{
              opacity: theme === 'dark' ? [0.5, 1, 0.5] : 0,
              scale: theme === 'dark' ? [0.6, 1.1, 0.6] : 0,
            }}
            transition={{ 
              duration: 1.8,
              repeat: theme === 'dark' ? Infinity : 0,
              delay: 0.5
            }}
          />
        </svg>
      </motion.div>
    </motion.button>
  )
} 