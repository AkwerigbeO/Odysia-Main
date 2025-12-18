'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // Routes that should not show navbar and footer
  const excludeNavbarFooter = [
    '/client-dashboard',
    '/client-login',
    '/expert-login',
    '/experts',
    '/dashboard'
  ]
  
  const shouldExcludeNavbarFooter = excludeNavbarFooter.some(route => 
    pathname.startsWith(route)
  )

  if (shouldExcludeNavbarFooter) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  )
}
