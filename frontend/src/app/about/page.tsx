import Image from 'next/image'
import About from '@/components/About'
import Logo from '@/components/Logo'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo
              width={180}
              height={72}
              className="h-18 w-auto"
              alt="Odysia Logo"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">
            About Odysia
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
            Learn more about our mission to connect businesses with exceptional tech talent.
          </p>
        </div>
        
        <About />
      </div>
    </div>
  )
} 