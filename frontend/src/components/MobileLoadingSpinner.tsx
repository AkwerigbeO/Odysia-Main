'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface MobileLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'white'
  text?: string
  fullScreen?: boolean
  className?: string
}

export default function MobileLoadingSpinner({
  size = 'md',
  variant = 'default',
  text,
  fullScreen = false,
  className = ''
}: MobileLoadingSpinnerProps) {
  const isMobile = useIsMobile()

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  const variantClasses = {
    default: "border-primary-600 dark:border-primary-400",
    primary: "border-primary-600 dark:border-primary-400",
    white: "border-white"
  }

  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dark-bg"
    : "flex items-center justify-center"

  const spinnerContent = (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full ${variantClasses[variant]}`}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: isMobile ? 0.8 : 1, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      {text && (
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        className={containerClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {spinnerContent}
      </motion.div>
    )
  }

  return spinnerContent
}

// Skeleton loading component for mobile
export function MobileSkeleton({ 
  className = '', 
  lines = 3, 
  height = 'h-4' 
}: { 
  className?: string
  lines?: number
  height?: string
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={`${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  )
}

// Card skeleton for mobile
export function MobileCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white dark:bg-dark-card rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/5" />
      </div>
    </div>
  )
}

// List skeleton for mobile
export function MobileListSkeleton({ 
  items = 5, 
  className = '' 
}: { 
  items?: number
  className?: string 
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-3 p-3 bg-white dark:bg-dark-card rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
