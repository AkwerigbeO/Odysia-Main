'use client'

import Image from 'next/image'
import { LOGO, DARK_LOGO } from '@/assets'
import { useTheme } from '@/lib/contexts/ThemeContext'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export default function Logo({ width = 120, height = 40, className = '', alt = 'Odysia Logo' }: LogoProps) {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? DARK_LOGO : LOGO

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
} 