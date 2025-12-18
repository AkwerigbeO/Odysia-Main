import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import AnimatedCursor from '@/components/AnimatedCursor'
import ScrollProgress from '@/components/ScrollProgress'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Join as an Expert - Odysia',
  description: 'Apply to join our expert network and access quality projects, secure payments, and professional support.',
}

export default function ExpertsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} transition-colors duration-300 bg-white dark:bg-black text-gray-900 dark:text-white antialiased`}>
        <ThemeProvider>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col">
              <ScrollProgress />
              <AnimatedCursor />
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
