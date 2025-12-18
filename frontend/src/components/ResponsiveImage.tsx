'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'
import MobileLoadingSpinner from './MobileLoadingSpinner'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const isMobile = useIsMobile()

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
    } else {
      setHasError(true)
      setIsLoading(false)
    }
    onError?.()
  }

  const imageClasses = `transition-opacity duration-300 ${className} ${
    isLoading ? 'opacity-0' : 'opacity-100'
  }`

  const containerClasses = `relative overflow-hidden ${className}`

  return (
    <div className={containerClasses}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <MobileLoadingSpinner size="sm" />
        </div>
      )}
      
      {hasError ? (
        <div className="flex items-center justify-center h-full min-h-[200px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image failed to load</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={currentSrc}
            alt={alt}
            className={imageClasses}
            sizes={sizes}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            onLoad={handleLoad}
            onError={handleError}
            fill={false}
            width={isMobile ? 400 : 800}
            height={isMobile ? 300 : 600}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover'
            }}
          />
        </motion.div>
      )}
    </div>
  )
}

// Optimized avatar component for mobile
export function ResponsiveAvatar({
  src,
  alt,
  size = 'md',
  className = ''
}: {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-full object-cover"
        sizes="(max-width: 768px) 48px, 96px"
      />
    </div>
  )
}

// Optimized hero image component
export function ResponsiveHeroImage({
  src,
  alt,
  className = ''
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      className={`w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover ${className}`}
      sizes="100vw"
      priority={true}
      quality={85}
    />
  )
}

// Optimized card image component
export function ResponsiveCardImage({
  src,
  alt,
  className = ''
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      className={`w-full h-48 object-cover rounded-lg ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={80}
    />
  )
}
