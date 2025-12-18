import type { Metadata } from 'next'
import { AuthProvider } from '@/lib/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Expert Login - Odysia',
  description: 'Login to access your expert dashboard',
}

export default function ExpertLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
} 