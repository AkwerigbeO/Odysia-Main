import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import AnimatedCursor from '@/components/AnimatedCursor'
import ScrollProgress from '@/components/ScrollProgress'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import { CurrencyProvider } from '@/lib/contexts/CurrencyContext'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import LayoutWrapper from '@/components/LayoutWrapper'
import MobileTestingUtils from '@/components/MobileTestingUtils'
import NavigationWrapper from '@/components/NavigationWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Odysia - Managed Tech Talent Platform',
  description: 'Connect with vetted tech experts for Web Development, UI/UX, and Cloud/DevOps projects. Managed end-to-end with escrow-based execution.',
  keywords: 'tech consultancy, managed tech talent, web development, UI/UX design, cloud devops, escrow platform',
  authors: [{ name: 'Odysia Team' }],
  openGraph: {
    title: 'Odysia - Managed Tech Talent Platform',
    description: 'Connect with vetted tech experts for your next project',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Odysia - Managed Tech Talent Platform',
    description: 'Connect with vetted tech experts for your next project',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical CSS to prevent layout shifts */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS to prevent layout shifts */
            body { 
              opacity: 0; 
              transition: opacity 0.3s ease-in-out; 
            }
            body.loaded { 
              opacity: 1; 
            }
            /* Ensure basic styling is available immediately */
            * {
              box-sizing: border-box;
            }
            html {
              scroll-behavior: smooth;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Show body when CSS is loaded
            document.addEventListener('DOMContentLoaded', function() {
              document.body.classList.add('loaded');
            });
          `
        }} />
      </head>
      <body className={`${inter.className} transition-colors duration-300 bg-white dark:bg-black text-gray-900 dark:text-white antialiased`}>
        <ThemeProvider>
          <CurrencyProvider>
            <ErrorBoundary>
              <div className="min-h-screen flex flex-col">
                <ScrollProgress />
                <AnimatedCursor />
                <LayoutWrapper>
                  <NavigationWrapper>
                    {children}
                  </NavigationWrapper>
                </LayoutWrapper>
                <MobileTestingUtils />
              </div>
            </ErrorBoundary>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 