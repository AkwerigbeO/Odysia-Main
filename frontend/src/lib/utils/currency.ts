// Currency utilities for dynamic currency conversion based on user location

export interface Currency {
  code: string
  symbol: string
  name: string
  locale: string
  exchangeRate: number // Rate relative to NGN (Nigerian Naira)
}

// Major currencies with their exchange rates relative to NGN (Nigerian Naira)
export const CURRENCIES: Record<string, Currency> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    locale: 'en-NG',
    exchangeRate: 1
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    exchangeRate: 0.0012 // 1 NGN = 0.0012 USD (approximate)
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'en-EU',
    exchangeRate: 0.0011 // 1 NGN = 0.0011 EUR (approximate)
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
    exchangeRate: 0.00095 // 1 NGN = 0.00095 GBP (approximate)
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    locale: 'en-CA',
    exchangeRate: 0.0016 // 1 NGN = 0.0016 CAD (approximate)
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    locale: 'en-AU',
    exchangeRate: 0.0018 // 1 NGN = 0.0018 AUD (approximate)
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    locale: 'ja-JP',
    exchangeRate: 0.18 // 1 NGN = 0.18 JPY (approximate)
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    locale: 'en-IN',
    exchangeRate: 0.1 // 1 NGN = 0.1 INR (approximate)
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    locale: 'zh-CN',
    exchangeRate: 0.0086 // 1 NGN = 0.0086 CNY (approximate)
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    locale: 'en-ZA',
    exchangeRate: 0.022 // 1 NGN = 0.022 ZAR (approximate)
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    locale: 'en-KE',
    exchangeRate: 0.18 // 1 NGN = 0.18 KES (approximate)
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    locale: 'en-GH',
    exchangeRate: 0.015 // 1 NGN = 0.015 GHS (approximate)
  }
}

// Country to currency mapping
export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  'US': 'USD',
  'CA': 'CAD',
  'GB': 'GBP',
  'DE': 'EUR',
  'FR': 'EUR',
  'IT': 'EUR',
  'ES': 'EUR',
  'NL': 'EUR',
  'BE': 'EUR',
  'AU': 'AUD',
  'JP': 'JPY',
  'IN': 'INR',
  'CN': 'CNY',
  'ZA': 'ZAR',
  'KE': 'KES',
  'GH': 'GHS',
  'NG': 'NGN'
}

// Default currency (fallback)
export const DEFAULT_CURRENCY = 'NGN'

/**
 * Detect user's currency based on their location
 */
export async function detectUserCurrency(): Promise<string> {
  try {
    // Try to get user's location from IP
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    const countryCode = data.country_code
    const currency = COUNTRY_CURRENCY_MAP[countryCode]
    
    return currency || DEFAULT_CURRENCY
  } catch (error) {
    console.warn('Failed to detect user currency:', error)
    return DEFAULT_CURRENCY
  }
}

/**
 * Convert amount from NGN to target currency
 */
export function convertCurrency(amount: number, targetCurrency: string): number {
  const currency = CURRENCIES[targetCurrency]
  if (!currency) {
    return amount // Return original amount if currency not found
  }
  
  return amount * currency.exchangeRate
}

/**
 * Format currency amount with proper symbol and locale
 */
export function formatCurrency(amount: number, currencyCode: string = 'NGN'): string {
  const currency = CURRENCIES[currencyCode]
  if (!currency) {
    return `${DEFAULT_CURRENCY} ${amount.toLocaleString()}`
  }
  
  const convertedAmount = convertCurrency(amount, currencyCode)
  
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(convertedAmount)
}

/**
 * Format currency amount with custom options
 */
export function formatCurrencyCustom(
  amount: number, 
  currencyCode: string = 'NGN',
  options: Intl.NumberFormatOptions = {}
): string {
  const currency = CURRENCIES[currencyCode]
  if (!currency) {
    return `${DEFAULT_CURRENCY} ${amount.toLocaleString()}`
  }
  
  const convertedAmount = convertCurrency(amount, currencyCode)
  
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options
  }).format(convertedAmount)
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currencyCode: string = 'NGN'): string {
  return CURRENCIES[currencyCode]?.symbol || CURRENCIES[DEFAULT_CURRENCY].symbol
}

/**
 * Get currency name for a given currency code
 */
export function getCurrencyName(currencyCode: string = 'NGN'): string {
  return CURRENCIES[currencyCode]?.name || CURRENCIES[DEFAULT_CURRENCY].name
}

/**
 * Parse currency string and return amount in NGN
 */
export function parseCurrencyAmount(amountString: string, currencyCode: string = 'NGN'): number {
  // Remove currency symbols and commas
  const cleanAmount = amountString.replace(/[₦$€£¥₹R,]/g, '').trim()
  const amount = parseFloat(cleanAmount)
  
  if (isNaN(amount)) {
    return 0
  }
  
  // Convert back to NGN if not already in NGN
  if (currencyCode !== 'NGN') {
    const currency = CURRENCIES[currencyCode]
    if (currency) {
      return amount / currency.exchangeRate
    }
  }
  
  return amount
}

/**
 * Get all available currencies
 */
export function getAvailableCurrencies(): Currency[] {
  return Object.values(CURRENCIES)
}

/**
 * Check if a currency code is valid
 */
export function isValidCurrency(currencyCode: string): boolean {
  return currencyCode in CURRENCIES
}
