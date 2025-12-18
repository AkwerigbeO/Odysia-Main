'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface MobileTestingUtilsProps {
  showInProduction?: boolean
}

export default function MobileTestingUtils({ showInProduction = false }: MobileTestingUtilsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentBreakpoint, setCurrentBreakpoint] = useState('')
  const isMobile = useIsMobile()

  // Only show in development or if explicitly enabled
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null
  }

  const breakpoints = [
    { name: 'Mobile S', width: '320px' },
    { name: 'Mobile M', width: '375px' },
    { name: 'Mobile L', width: '425px' },
    { name: 'Tablet', width: '768px' },
    { name: 'Laptop', width: '1024px' },
    { name: 'Desktop', width: '1440px' },
    { name: 'Full', width: '100%' }
  ]

  const handleBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint)
    // In a real implementation, you might want to dispatch a custom event
    // or use a context to communicate with the parent component
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg mobile-touch-target"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </motion.button>

      {/* Mobile Testing Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
          >
            <motion.div
              className="absolute top-4 left-4 right-4 bg-white dark:bg-dark-card rounded-lg shadow-xl p-6 max-w-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mobile Testing Tools
                </h3>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Current Device Info */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Device
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Screen Width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</div>
                  <div>Screen Height: {typeof window !== 'undefined' ? window.innerHeight : 'N/A'}px</div>
                  <div>Device Type: {isMobile ? 'Mobile' : 'Desktop'}</div>
                  <div>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</div>
                </div>
              </div>

              {/* Breakpoint Testing */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Breakpoints
                </h4>
                <div className="space-y-2">
                  {breakpoints.map((breakpoint) => (
                    <button
                      key={breakpoint.name}
                      onClick={() => handleBreakpointChange(breakpoint.width)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        currentBreakpoint === breakpoint.width
                          ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                          : 'bg-gray-50 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card'
                      }`}
                    >
                      {breakpoint.name} ({breakpoint.width})
                    </button>
                  ))}
                </div>
              </div>

              {/* Touch Target Testing */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Touch Target Test
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 bg-red-500 text-white rounded text-xs mobile-touch-target">
                    Small (32px)
                  </button>
                  <button className="p-3 bg-yellow-500 text-white rounded text-xs mobile-touch-target">
                    Medium (44px)
                  </button>
                  <button className="p-4 bg-green-500 text-white rounded text-xs mobile-touch-target">
                    Large (56px)
                  </button>
                  <button className="p-5 bg-blue-500 text-white rounded text-xs mobile-touch-target">
                    XL (64px)
                  </button>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Performance
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>FPS: {typeof window !== 'undefined' ? '~60' : 'N/A'}</div>
                  <div>Memory: {typeof performance !== 'undefined' && 'memory' in performance ? Math.round(((performance as any).memory?.usedJSHeapSize || 0) / 1024 / 1024) + 'MB' : 'N/A'}</div>
                  <div>Load Time: {typeof performance !== 'undefined' && 'timing' in performance ? Math.round((performance.timing.loadEventEnd - performance.timing.navigationStart) || 0) + 'ms' : 'N/A'}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-dark-card transition-colors"
                >
                  Reload
                </button>
                <button
                  onClick={() => window.open(window.location.href, '_blank')}
                  className="flex-1 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-dark-card transition-colors"
                >
                  New Tab
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hook for mobile testing utilities
export const useMobileTesting = () => {
  const [isTestingMode, setIsTestingMode] = useState(false)

  const toggleTestingMode = () => setIsTestingMode(!isTestingMode)

  return {
    isTestingMode,
    toggleTestingMode
  }
}

// Component to show current breakpoint
export function BreakpointIndicator() {
  const [breakpoint, setBreakpoint] = useState('')

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) setBreakpoint('sm')
      else if (width < 768) setBreakpoint('md')
      else if (width < 1024) setBreakpoint('lg')
      else if (width < 1280) setBreakpoint('xl')
      else setBreakpoint('2xl')
    }

    // Set initial breakpoint
    updateBreakpoint()

    // Add event listener
    window.addEventListener('resize', updateBreakpoint)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed top-4 left-4 z-50 bg-black text-white px-2 py-1 rounded text-xs font-mono">
      {breakpoint}
    </div>
  )
}
