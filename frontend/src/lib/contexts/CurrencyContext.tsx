'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  detectUserCurrency, 
  formatCurrency, 
  formatCurrencyCustom,
  convertCurrency,
  getCurrencySymbol,
  getCurrencyName,
  getAvailableCurrencies,
  CURRENCIES,
  DEFAULT_CURRENCY,
  type Currency
} from '@/lib/utils/currency'

interface CurrencyContextType {
  currency: string
  setCurrency: (currency: string) => void
  formatAmount: (amount: number, options?: Intl.NumberFormatOptions) => string
  formatAmountCustom: (amount: number, options?: Intl.NumberFormatOptions) => string
  convertAmount: (amount: number) => number
  getSymbol: () => string
  getName: () => string
  availableCurrencies: Currency[]
  isLoading: boolean
  error: string | null
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

interface CurrencyProviderProps {
  children: ReactNode
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<string>(DEFAULT_CURRENCY)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function initializeCurrency() {
      try {
        setIsLoading(true)
        setError(null)
        
        // Try to get currency from localStorage first
        const savedCurrency = localStorage.getItem('userCurrency')
        
        if (savedCurrency && CURRENCIES[savedCurrency]) {
          setCurrencyState(savedCurrency)
        } else {
          // Detect currency from user's location
          const detectedCurrency = await detectUserCurrency()
          setCurrencyState(detectedCurrency)
          localStorage.setItem('userCurrency', detectedCurrency)
        }
      } catch (err) {
        console.warn('Failed to initialize currency:', err)
        setError('Failed to detect currency')
        setCurrencyState(DEFAULT_CURRENCY)
      } finally {
        setIsLoading(false)
      }
    }

    initializeCurrency()
  }, [])

  const setCurrency = (newCurrency: string) => {
    if (CURRENCIES[newCurrency]) {
      setCurrencyState(newCurrency)
      localStorage.setItem('userCurrency', newCurrency)
    }
  }

  const formatAmount = (amount: number, options?: Intl.NumberFormatOptions): string => {
    return formatCurrency(amount, currency)
  }

  const formatAmountCustom = (amount: number, options?: Intl.NumberFormatOptions): string => {
    return formatCurrencyCustom(amount, currency, options)
  }

  const convertAmount = (amount: number): number => {
    return convertCurrency(amount, currency)
  }

  const getSymbol = (): string => {
    return getCurrencySymbol(currency)
  }

  const getName = (): string => {
    return getCurrencyName(currency)
  }

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    formatAmount,
    formatAmountCustom,
    convertAmount,
    getSymbol,
    getName,
    availableCurrencies: getAvailableCurrencies(),
    isLoading,
    error
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

// Hook for components that need currency but can handle loading state
export function useCurrencySafe() {
  const context = useContext(CurrencyContext)
  return context
}
