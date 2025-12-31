'use client'

import { useState } from 'react'
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface ImagePreviewProps {
    src: string
    alt?: string
    onDelete?: () => void
    showDelete?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
    downloadable?: boolean
}

const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-40 w-40'
}

export default function ImagePreview({
    src,
    alt = 'Image preview',
    onDelete,
    showDelete = true,
    size = 'md',
    className = '',
    downloadable = false
}: ImagePreviewProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(src)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = alt || 'download'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Download failed:', error)
        }
    }

    // Convert relative API URL to absolute
    const imageSrc = src.startsWith('/api')
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${src}`
        : src

    return (
        <div className={`relative inline-block group ${className}`}>
            <div
                className={`
          ${sizeClasses[size]}
          rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700
          ${isLoading ? 'animate-pulse' : ''}
        `}
            >
                {hasError ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs">Failed to load</span>
                    </div>
                ) : (
                    <img
                        src={imageSrc}
                        alt={alt}
                        onLoad={handleLoad}
                        onError={handleError}
                        className={`
              w-full h-full object-cover
              transition-opacity duration-200
              ${isLoading ? 'opacity-0' : 'opacity-100'}
            `}
                    />
                )}
            </div>

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center space-x-2">
                {downloadable && (
                    <button
                        onClick={handleDownload}
                        className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                        title="Download"
                    >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                )}
                {showDelete && onDelete && (
                    <button
                        onClick={onDelete}
                        className="p-1.5 bg-red-500/80 hover:bg-red-600 rounded-full text-white transition-colors"
                        title="Delete"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    )
}
