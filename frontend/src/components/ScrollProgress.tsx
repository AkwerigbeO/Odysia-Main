'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from '@/lib/hooks'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1 bg-primary-500 z-50 origin-left"
      style={{
        scaleX: progress / 100,
        transformOrigin: '0% 50%'
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    />
  )
} 