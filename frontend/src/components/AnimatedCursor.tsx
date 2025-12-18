'use client'

import { motion } from 'framer-motion'
import { useMousePosition } from '@/lib/hooks'

export default function AnimatedCursor() {
  const { x, y } = useMousePosition()

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: x - 8,
          y: y - 8,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
          stiffness: 400,
          damping: 40
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary-400 rounded-full pointer-events-none z-40 opacity-50"
        animate={{
          x: x - 16,
          y: y - 16,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 200,
          damping: 30
        }}
      />
      
      {/* Cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-primary-200 rounded-full pointer-events-none z-30 opacity-30 blur-sm"
        animate={{
          x: x - 24,
          y: y - 24,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 100,
          damping: 20
        }}
      />
    </>
  )
} 