'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { 
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import { fadeInDown } from '@/lib/animations'

interface DashboardLayoutProps {
  children: React.ReactNode
  dashboardType: 'client' | 'expert'
  sidebarItems: Array<{
    id: string
    label: string
    icon: React.ComponentType<any>
    href: string
  }>
  activeSection?: string
  userProfile?: {
    name: string
    email: string
    avatar?: string
  }
  onLogout?: () => void
  customNavbarContent?: React.ReactNode
}

export default function DashboardLayout({
  children,
  dashboardType,
  sidebarItems,
  activeSection = 'dashboard',
  userProfile,
  onLogout,
  customNavbarContent
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check screen sizes on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768) // md breakpoint
      
      if (width >= 1024) { // lg breakpoint
        setIsSidebarOpen(false)
        // Keep existing state on large screens, don't force expand
        // setIsSidebarCollapsed(false) 
      } else if (width >= 768 && width < 1024) { // md to lg
        // Tablet: collapse sidebar by default
        setIsSidebarCollapsed(true)
        setIsSidebarOpen(false)
      } else { // less than md
        setIsSidebarCollapsed(false)
        setIsSidebarOpen(false)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Determine active section based on current pathname
  const currentActiveSection = sidebarItems.find(item => 
    pathname === item.href || pathname.startsWith(item.href + '/')
  )?.id || activeSection

  const handleSidebarItemClick = (href: string) => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
    router.push(href)
  }

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-50 md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Logo
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    alt="Odysia Logo"
                  />
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {sidebarItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = currentActiveSection === item.id
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => handleSidebarItemClick(item.href)}
                          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <Icon className={`h-6 w-6 flex-shrink-0 ${
                            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                          }`} />
                          <span className="font-medium text-base">{item.label}</span>
                        </button>
                      </motion.div>
                    )
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop/Tablet Sidebar */}
      <motion.aside 
        className="hidden md:flex flex-col bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 transition-width duration-300"
        animate={{ width: isSidebarCollapsed ? '5rem' : '16rem' }}
        initial={false}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isSidebarCollapsed && (
              <Logo
                width={120}
                height={40}
                className="h-8 w-auto"
                alt="Odysia Logo"
              />
            )}
            <button
              onClick={toggleSidebarCollapse}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isSidebarCollapsed ? <ChevronRightIcon className="h-6 w-6" /> : <ChevronLeftIcon className="h-6 w-6" />}
            </button>
        </div>
        
        <nav className="flex-1 space-y-1 p-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = currentActiveSection === item.id
            
            return (
              <motion.div
                key={item.id}
                whileHover={{ x: isSidebarCollapsed ? 0 : 2 }}
              >
                <button
                  onClick={() => handleSidebarItemClick(item.href)}
                  className={`w-full flex items-center rounded-lg text-left transition-all duration-200 ${
                    isSidebarCollapsed ? 'p-3 justify-center' : 'px-3 py-2 space-x-3'
                  } ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`flex-shrink-0 h-6 w-6 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                  }`} />
                  {!isSidebarCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </button>
              </motion.div>
            )
          })}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Navbar */}
        <motion.nav 
          className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left: Mobile Menu Button */}
              <div className="flex items-center">
                <motion.button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle mobile menu"
                >
                  <Bars3Icon className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Right: Custom Navbar Content & Theme Toggle */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {customNavbarContent}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <ThemeToggle />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  )
}