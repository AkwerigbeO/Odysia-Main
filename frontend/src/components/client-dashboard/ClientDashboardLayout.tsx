'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  FolderIcon, 
  ChatBubbleLeftRightIcon, 
  CurrencyDollarIcon, 
  UserIcon, 
  QuestionMarkCircleIcon, 
  ArrowRightOnRectangleIcon,
  BellIcon,
  PaperAirplaneIcon,
  Bars3Icon,
  XMarkIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import { fadeInDown, staggerContainer, staggerItem } from '@/lib/animations'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

interface ClientDashboardLayoutProps {
  children: React.ReactNode
  activeSection?: string
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, href: '/client-dashboard' },
  { id: 'projects', label: 'Projects', icon: FolderIcon, href: '/client-dashboard/projects' },
  { id: 'proposals', label: 'Proposals', icon: ChatBubbleLeftRightIcon, href: '/client-dashboard/proposals' },
  { id: 'messages', label: 'Messages', icon: ChatBubbleLeftRightIcon, href: '/client-dashboard/messages' },
  { id: 'payments', label: 'Payments', icon: CurrencyDollarIcon, href: '/client-dashboard/payments' },
  { id: 'profile', label: 'Settings', icon: UserIcon, href: '/client-dashboard/settings' },
  { id: 'support', label: 'Support', icon: QuestionMarkCircleIcon, href: '/client-dashboard/support' },
]

export default function ClientDashboardLayout({ children, activeSection = 'dashboard' }: ClientDashboardLayoutProps) {
  const { formatAmount } = useCurrency()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(2)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  // Determine active section based on current pathname
  const currentActiveSection = pathname === '/client-dashboard' ? 'dashboard' : 
                              pathname.includes('/projects') ? 'projects' :
                              pathname.includes('/proposals') ? 'proposals' :
                              pathname.includes('/messages') ? 'messages' :
                              pathname.includes('/payments') ? 'payments' :
                              pathname.includes('/settings') ? 'profile' :
                              pathname.includes('/support') ? 'support' : 'dashboard'

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sample notifications data for clients
  const recentNotifications = [
    {
      id: 1,
      type: 'proposal',
      message: 'New proposal received for "E-commerce Website" project',
      time: '2 hours ago',
      urgent: true,
      read: false
    },
    {
      id: 2,
      type: 'payment',
      message: `Payment of ${formatAmount(250000)} has been processed for Mobile App project`,
      time: '1 day ago',
      urgent: false,
      read: false
    },
    {
      id: 3,
      type: 'milestone',
      message: 'Project milestone "UI Design" has been completed',
      time: '2 days ago',
      urgent: false,
      read: true
    },
    {
      id: 4,
      type: 'message',
      message: 'New message from Alex Chen regarding project updates',
      time: '3 days ago',
      urgent: false,
      read: true
    }
  ]

  const handleLogout = () => {
    router.push('/')
    setShowProfileMenu(false)
  }

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev => Math.max(0, prev - 1))
    setShowNotifications(false)
  }

  const handleMessagesClick = () => {
    router.push('/client-dashboard/messages')
  }

  const handleSidebarItemClick = (href: string) => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile-First Top Navigation Bar */}
      <motion.nav 
        className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
        variants={fadeInDown}
        initial="hidden"
        animate="visible"
      >
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
                style={{
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                {isSidebarOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
              
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <Logo
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  alt="Odysia Logo"
                />
              </motion.div>
            </div>

            {/* Right: Notifications, Messages, Profile */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors" 
                  aria-label="Notifications"
                  aria-haspopup="menu"
                  aria-expanded={showNotifications}
                  style={{
                    minHeight: '44px',
                    minWidth: '44px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  <BellIcon className="h-6 w-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                      {notifications > 99 ? '99+' : notifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <motion.div
                        className="fixed inset-0 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowNotifications(false)}
                      />
                      <motion.div
                        className="absolute right-0 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-[calc(100vw-2rem)] sm:max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-[70vh] overflow-hidden"
                        style={{ 
                          WebkitOverflowScrolling: 'touch',
                          left: 'auto',
                          right: '1rem',
                          transform: 'translateX(0)'
                        }}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                            <button
                              onClick={() => setNotifications(0)}
                              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                            >
                              Mark all as read
                            </button>
                          </div>
                        </div>
                        <div className="max-h-[60vh] sm:max-h-64 overflow-y-auto overscroll-contain">
                          {recentNotifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                              }`}
                              onClick={() => handleNotificationClick(notification.id)}
                              style={{
                                minHeight: '60px',
                                WebkitTapHighlightColor: 'transparent',
                                touchAction: 'manipulation'
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                                  notification.urgent ? 'bg-red-500' : 'bg-green-500'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm sm:text-sm font-medium ${
                                    !notification.read 
                                      ? 'text-gray-900 dark:text-white' 
                                      : 'text-gray-600 dark:text-gray-400'
                                  }`}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                                {notification.urgent && (
                                  <ExclamationTriangleIcon className="h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => { setShowNotifications(false); router.push('/client-dashboard/notifications') }}
                            className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                            aria-label="View all notifications"
                          >
                            View all notifications
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Messages */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <button 
                  onClick={handleMessagesClick}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors" 
                  aria-label="Go to Messages"
                  style={{
                    minHeight: '44px',
                    minWidth: '44px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  <PaperAirplaneIcon className="h-6 w-6" />
                  {messages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] leading-none rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                      {messages > 99 ? '99+' : messages}
                    </span>
                  )}
                </button>
              </motion.div>

              {/* Profile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors" 
                  aria-label="Client profile"
                  style={{
                    minHeight: '44px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">Sarah Johnson</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {/* Profile Menu Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <>
                      <motion.div
                        className="fixed inset-0 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowProfileMenu(false)}
                      />
                      <motion.div
                        className="absolute right-0 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-56 max-w-[calc(100vw-2rem)] sm:max-w-none bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                        style={{ 
                          left: 'auto',
                          right: '1rem',
                          transform: 'translateX(0)'
                        }}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">sarah@example.com</p>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={() => handleSidebarItemClick('/client-dashboard/settings')}
                              className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              style={{
                                minHeight: '44px',
                                WebkitTapHighlightColor: 'transparent',
                                touchAction: 'manipulation'
                              }}
                            >
                              <UserIcon className="h-4 w-4 mr-3" />
                              Profile Settings
                            </button>
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              style={{
                                minHeight: '44px',
                                WebkitTapHighlightColor: 'transparent',
                                touchAction: 'manipulation'
                              }}
                            >
                              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.aside
                className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 lg:hidden"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
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
                      style={{
                        minHeight: '44px',
                        minWidth: '44px',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
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
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={() => handleSidebarItemClick(item.href)}
                            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            style={{
                              minHeight: '56px',
                              WebkitTapHighlightColor: 'transparent',
                              touchAction: 'manipulation'
                            }}
                          >
                            <Icon className={`h-6 w-6 flex-shrink-0 ${
                              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-base">{item.label}</div>
                            </div>
                          </button>
                        </motion.div>
                      )
                    })}
                    
                    {/* Logout */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sidebarItems.length * 0.1 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        style={{
                          minHeight: '56px',
                          WebkitTapHighlightColor: 'transparent',
                          touchAction: 'manipulation'
                        }}
                      >
                        <ArrowRightOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
                        <div className="font-medium text-base">Logout</div>
                      </button>
                    </motion.div>
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar - Hidden on mobile */}
        <motion.aside 
          className="hidden lg:block w-80 bg-white dark:bg-gray-800 shadow-sm min-h-screen border-r border-gray-200 dark:border-gray-700"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon
                const isActive = currentActiveSection === item.id
                
                return (
                  <motion.div
                    key={item.id}
                    variants={staggerItem}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => handleSidebarItemClick(item.href)}
                      className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      style={{
                        minHeight: '56px',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <Icon className={`h-6 w-6 flex-shrink-0 ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-base">{item.label}</div>
                      </div>
                    </button>
                  </motion.div>
                )
              })}
              
              {/* Logout */}
              <motion.div
                variants={staggerItem}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  style={{
                    minHeight: '56px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6 flex-shrink-0" />
                  <div className="font-medium text-base">Logout</div>
                </button>
              </motion.div>
            </nav>
          </div>
        </motion.aside>

        {/* Main Content - Mobile Optimized */}
        <main className={`flex-1 min-h-screen ${pathname.includes('/messages') ? 'flex justify-center' : ''}`}>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}