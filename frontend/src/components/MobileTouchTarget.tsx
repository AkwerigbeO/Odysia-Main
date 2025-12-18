'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'
import { ReactNode } from 'react'

interface MobileTouchTargetProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

export default function MobileTouchTarget({
  children,
  className = '',
  onClick,
  disabled = false,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  loading = false
}: MobileTouchTargetProps) {
  const isMobile = useIsMobile()

  const baseClasses = "flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mobile-touch-target"
  
  const sizeClasses = {
    sm: "min-h-[40px] min-w-[40px] px-3 py-2 text-sm",
    md: "min-h-[48px] min-w-[48px] px-4 py-3 text-base",
    lg: "min-h-[56px] min-w-[56px] px-6 py-4 text-lg"
  }

  const variantClasses = {
    default: "bg-white dark:bg-dark-card text-gray-900 dark:text-white border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface focus:ring-primary-500",
    primary: "bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 focus:ring-primary-500",
    secondary: "bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card focus:ring-gray-500",
    ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface focus:ring-gray-500"
  }

  const widthClasses = fullWidth ? "w-full" : ""

  const mobileClasses = isMobile ? "active:scale-95" : "hover:scale-105"

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${mobileClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      whileTap={isMobile ? { scale: 0.98 } : undefined}
      whileHover={!isMobile ? { scale: 1.02 } : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}
