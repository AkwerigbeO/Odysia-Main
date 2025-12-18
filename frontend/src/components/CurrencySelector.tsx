'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import { CURRENCIES } from '@/lib/utils/currency'

interface CurrencySelectorProps {
  className?: string
  variant?: 'dropdown' | 'button' | 'minimal'
  showLabel?: boolean
}

export default function CurrencySelector({ 
  className = '', 
  variant = 'dropdown',
  showLabel = true 
}: CurrencySelectorProps) {
  const { currency, setCurrency, availableCurrencies, isLoading } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  const currentCurrency = CURRENCIES[currency]

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        {showLabel && (
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        )}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>{currentCurrency?.symbol}</span>
          <ChevronDownIcon className="w-3 h-3" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[120px]"
            >
              {availableCurrencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code)
                    setIsOpen(false)
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    currency === curr.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{curr.symbol}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{curr.code}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (variant === 'button') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <GlobeAltIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{currentCurrency?.symbol}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{currentCurrency?.code}</span>
          <ChevronDownIcon className="w-3 h-3" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]"
            >
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Select Currency</p>
              </div>
              {availableCurrencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code)
                    setIsOpen(false)
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    currency === curr.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{curr.symbol}</span>
                      <span className="text-sm">{curr.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{curr.code}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <GlobeAltIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Currency</span>
        )}
        <span className="text-sm font-medium">{currentCurrency?.symbol}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{currentCurrency?.code}</span>
        <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 min-w-[250px]"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Currency</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred currency</p>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {availableCurrencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code)
                    setIsOpen(false)
                  }}
                  className={`w-full px-3 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    currency === curr.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-medium">{curr.symbol}</span>
                      <div className="text-left">
                        <p className="text-sm font-medium">{curr.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{curr.code}</p>
                      </div>
                    </div>
                    {currency === curr.code && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
