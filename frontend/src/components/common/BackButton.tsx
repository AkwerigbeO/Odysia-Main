'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface BackButtonProps {
    label?: string
    href?: string
    className?: string
}

export default function BackButton({ label = 'Back', href, className = '' }: BackButtonProps) {
    const router = useRouter()

    const handleBack = () => {
        if (href) {
            router.push(href)
        } else {
            router.back()
        }
    }

    return (
        <button
            onClick={handleBack}
            className={`flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
        >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </button>
    )
}
