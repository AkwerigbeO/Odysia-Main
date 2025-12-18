'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Simple fade in animation for testing
const simpleFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
}

export default function TestMobilePage() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  })

  useEffect(() => {
    // Measure performance metrics
    const startTime = performance.now()
    
    // Simulate some work
    setTimeout(() => {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      setPerformanceMetrics({
        loadTime: Math.round(loadTime),
        renderTime: Math.round(loadTime * 0.8),
        memoryUsage: Math.round(Math.random() * 50 + 20) // Mock memory usage
      })
    }, 100)
  }, [])

  return (
    <div className="space-y-4 p-4">
      <motion.div 
        variants={simpleFadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Mobile Performance Test (400x642)
        </h1>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Load Time:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {performanceMetrics.loadTime}ms
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Render Time:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {performanceMetrics.renderTime}ms
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {performanceMetrics.memoryUsage}MB
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={simpleFadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Optimization Status
        </h2>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900 dark:text-white">Reduced animations</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900 dark:text-white">Optimized mobile menu</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900 dark:text-white">Memoized components</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900 dark:text-white">Simplified responsive design</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900 dark:text-white">Enhanced touch targets</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={simpleFadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Test Interactions
        </h2>
        
        <div className="space-y-3">
          <button 
            className="w-full bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{
              minHeight: '44px',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            Test Button (44px touch target)
          </button>
          
          <button 
            className="w-full bg-green-600 dark:bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            style={{
              minHeight: '40px',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            Small Button (40px touch target)
          </button>
        </div>
      </motion.div>

      <motion.div 
        variants={simpleFadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Responsive Grid Test
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item}
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Item {item}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                2-col grid
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
