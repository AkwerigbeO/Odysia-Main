'use client'

import { useState } from 'react'
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
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import { fadeInDown, staggerContainer, staggerItem } from '@/lib/animations'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection?: string
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard Home', icon: HomeIcon, href: '/dashboard' },
  { id: 'projects', label: 'My Projects', icon: FolderIcon, href: '/dashboard/projects' },
  { id: 'milestones', label: 'Milestones & Submissions', icon: CheckCircleIcon, href: '/dashboard/milestones' },
  { id: 'messages', label: 'Messages', icon: ChatBubbleLeftRightIcon, href: '/dashboard/messages' },
  { id: 'earnings', label: 'Earnings', icon: CurrencyDollarIcon, href: '/dashboard/earnings' },
  { id: 'profile', label: 'Portfolio/Profile', icon: UserIcon, href: '/dashboard/profile' },
  { id: 'support', label: 'Support & Help', icon: QuestionMarkCircleIcon, href: '/dashboard/support' },
]

export default function DashboardLayout({ children, activeSection = 'dashboard' }: DashboardLayoutProps) {
  const { formatAmount } = useCurrency()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(2)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  // Determine active section based on current pathname
  const currentActiveSection = pathname === '/dashboard' ? 'dashboard' : 
                              pathname.includes('/projects') ? 'projects' :
                              pathname.includes('/milestones') ? 'milestones' :
                              pathname.includes('/messages') ? 'messages' :
                              pathname.includes('/earnings') ? 'earnings' :
                              pathname.includes('/profile') ? 'profile' :
                              pathname.includes('/support') ? 'support' : 'dashboard'

  // Sample notifications data
  const recentNotifications = [
    {
      id: 1,
      type: 'deadline',
      message: 'Project "E-commerce Website" milestone due in 2 days',
      time: '2 hours ago',
      urgent: true,
      read: false
    },
    {
      id: 2,
      type: 'approval',
      message: 'Your submission for "Mobile App Design" has been approved',
      time: '1 day ago',
      urgent: false,
      read: false
    },
    {
      id: 3,
      type: 'payment',
      message: `Payment of ${formatAmount(150000)} has been released to your account`,
      time: '2 days ago',
      urgent: false,
      read: true
    },
    {
      id: 4,
      type: 'message',
      message: 'New message from TechCorp Ltd regarding project updates',
      time: '3 days ago',
      urgent: false,
      read: true
    }
  ]

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
  }

  const handleNotificationClick = (notificationId: number) => {
    // Mark notification as read
    setNotifications(prev => Math.max(0, prev - 1))
    setShowNotifications(false)
    // Here you would typically navigate to the relevant page or mark as read
  }

  const handleMarkAllRead = () => {
    setNotifications(0)
  }

  const handleViewAll = () => {
    setShowNotifications(false)
    router.push('/dashboard/notifications')
  }

  const handleMessagesClick = () => {
    router.push('/dashboard/projects')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Top Navigation Bar */}
      <motion.nav 
        className="bg-white dark:bg-dark-surface shadow-lg sticky top-0 z-50 transition-colors duration-300"
        variants={fadeInDown}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-lg transition-colors mobile-touch-target"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
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
                  width={160}
                  height={55}
                  className="h-12 w-auto sm:h-14 md:h-16"
                  alt="Odysia Logo"
                />
              </motion.div>
            </div>

            {/* Right side icons - moved to left side */}
            <motion.div 
              className="flex items-center space-x-2 sm:space-x-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Notifications */}
              <motion.div
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" 
                  aria-label="Notifications"
                  aria-haspopup="menu"
                  aria-expanded={showNotifications}
                >
                  <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
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
                        className="sm:absolute sm:right-0 sm:mt-2 fixed top-16 left-4 right-4 sm:inset-x-auto w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[calc(100vw-2rem)] sm:max-w-none bg-white dark:bg-dark-card rounded-xl sm:rounded-lg shadow-lg border border-gray-200 dark:border-dark-border z-50"
                        style={{ 
                          WebkitOverflowScrolling: 'touch'
                        }}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-dark-border">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                            <button
                              onClick={handleMarkAllRead}
                              className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                            >
                              Mark all as read
                            </button>
                          </div>
                        </div>
                        <div className="max-h-[70vh] sm:max-h-96 overflow-y-auto overscroll-contain">
                          {recentNotifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.05)' }}
                              className={`p-4 border-b border-gray-100 dark:border-dark-border cursor-pointer transition-colors ${
                                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                              }`}
                              onClick={() => handleNotificationClick(notification.id)}
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
                        <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                          <button
                            onClick={handleViewAll}
                            className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
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
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <button 
                  onClick={handleMessagesClick}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" 
                  aria-label="Go to Projects"
                >
                  <PaperAirplaneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  {messages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] leading-none rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                      {messages > 99 ? '99+' : messages}
                    </span>
                  )}
                </button>
              </motion.div>

              {/* Expert Profile */}
              <motion.div
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" 
                  aria-label="Expert profile"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center">
                    <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">John Expert</span>
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
                        className="absolute right-0 sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-48 max-w-[calc(100vw-2rem)] sm:max-w-none bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-dark-border z-50"
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
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">John Expert</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">expert@odysia.com</p>
                          </div>
                          <div className="py-1">
                            <Link
                              href="/dashboard/profile"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <UserIcon className="h-4 w-4 mr-3" />
                              Profile Settings
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
              >
                <ThemeToggle />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <motion.aside 
          className="hidden lg:block w-64 bg-white dark:bg-dark-surface shadow-lg min-h-screen"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={staggerItem}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      currentActiveSection === item.id
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Logout */}
              <motion.div
                variants={staggerItem}
                whileHover={{ x: 5 }}
                className="pt-4 border-t border-gray-200 dark:border-dark-border"
              >
                <button 
                  onClick={logout}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full mobile-touch-target focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </motion.div>
            </nav>
          </div>
        </motion.aside>

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
                className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-dark-surface shadow-xl z-50 lg:hidden"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Logo
                      width={160}
                      height={55}
                      className="h-12 w-auto"
                      alt="Odysia Logo"
                    />
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-lg transition-colors"
                      aria-label="Close mobile menu"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <nav className="space-y-2">
                    {sidebarItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                            currentActiveSection === item.id
                              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card hover:text-primary-600 dark:hover:text-primary-400'
                          }`}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Logout */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sidebarItems.length * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="pt-4 border-t border-gray-200 dark:border-dark-border"
                    >
                      <button 
                        onClick={logout}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full mobile-touch-target focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label="Logout"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 