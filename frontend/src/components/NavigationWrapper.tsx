'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationWrapperProps {
  children: React.ReactNode
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    // Prevent layout shifts during navigation
    setIsNavigating(true)
    
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsNavigating(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={`page-transition ${isNavigating ? 'pointer-events-none' : ''}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
