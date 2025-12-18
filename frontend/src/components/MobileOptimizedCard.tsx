'use client'

import { motion } from 'framer-motion'
import { useIsMobile, useTouchGestures } from '@/lib/hooks'
import { hoverLift, scaleIn } from '@/lib/animations'

interface MobileOptimizedCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  variant?: 'default' | 'elevated' | 'flat'
}

export default function MobileOptimizedCard({
  children,
  className = '',
  onClick,
  onSwipeLeft,
  onSwipeRight,
  variant = 'default'
}: MobileOptimizedCardProps) {
  const isMobile = useIsMobile()
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures(onSwipeLeft, onSwipeRight)

  const baseClasses = "rounded-xl transition-all duration-300 touch-device"
  
  const variantClasses = {
    default: "bg-white dark:bg-dark-card shadow-lg hover:shadow-xl border border-gray-200 dark:border-dark-border",
    elevated: "bg-white dark:bg-dark-card shadow-xl hover:shadow-2xl border border-gray-200 dark:border-dark-border transform hover:-translate-y-1",
    flat: "bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border"
  }

  const mobileClasses = isMobile ? "mobile-touch-target active:scale-95" : ""

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${mobileClasses} ${className}`}
      variants={isMobile ? scaleIn : hoverLift}
      whileHover={!isMobile ? "hover" : undefined}
      whileTap={isMobile ? { scale: 0.98 } : undefined}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      {children}
    </motion.div>
  )
} 