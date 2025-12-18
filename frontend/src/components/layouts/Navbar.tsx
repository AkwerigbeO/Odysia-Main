'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  BellIcon,
  PaperAirplaneIcon,
  UserIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

interface NotificationItem {
  id: number
  type: string
  message: string
  time: string
  urgent: boolean
  read: boolean
}

interface NavbarProps {
  dashboardType: 'client' | 'expert'
  notifications?: NotificationItem[]
  messageCount?: number
  userProfile?: {
    name: string
    email: string
    avatar?: string
  }
  onLogout?: () => void
  onNotificationClick?: (id: number) => void
  onMessagesClick?: () => void
}

export default function Navbar({
  dashboardType,
  notifications = [],
  messageCount = 0,
  userProfile = { name: 'User', email: 'user@example.com' },
  onLogout,
  onNotificationClick,
  onMessagesClick
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const router = useRouter()

  const unreadNotifications = notifications.filter(n => !n.read).length

  const handleNotificationClick = (notificationId: number) => {
    if (onNotificationClick) {
      onNotificationClick(notificationId)
    }
    setShowNotifications(false)
  }

  const handleMessagesClick = () => {
    if (onMessagesClick) {
      onMessagesClick()
    } else {
      const messagesPath = dashboardType === 'client' 
        ? '/client-dashboard/messages' 
        : '/dashboard/messages'
      router.push(messagesPath)
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      router.push('/')
    }
    setShowProfileMenu(false)
  }

  const handleProfileSettings = () => {
    const settingsPath = dashboardType === 'client'
      ? '/client-dashboard/settings'
      : '/dashboard/profile'
    router.push(settingsPath)
    setShowProfileMenu(false)
  }

  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      {/* Notifications */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 md:p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors" 
          aria-label="Notifications"
          aria-haspopup="menu"
          aria-expanded={showNotifications}
        >
          <BellIcon className="h-5 w-5 md:h-6 md:w-6" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
              {unreadNotifications > 99 ? '99+' : unreadNotifications}
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
                className="absolute right-0 mt-2 w-full max-w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-[70vh] overflow-y-auto"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <button
                      onClick={() => {/* Mark all as read */}}
                      className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
                <div className="max-h-[60vh] sm:max-h-64 overflow-y-auto overscroll-contain">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
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
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setShowNotifications(false)
                      const notificationsPath = dashboardType === 'client'
                        ? '/client-dashboard/notifications'
                        : '/dashboard/notifications'
                      router.push(notificationsPath)
                    }}
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
          className="p-2 md:p-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors" 
          aria-label="Go to Messages"
        >
          <PaperAirplaneIcon className="h-5 w-5 md:h-6 md:w-6" />
          {messageCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] leading-none rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
              {messageCount > 99 ? '99+' : messageCount}
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
          className="flex items-center space-x-2 p-1 md:p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors" 
          aria-label="User profile"
        >
          <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-7 h-7 md:w-8 md:h-8 rounded-full" />
            ) : (
              <UserIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
            )}
          </div>
          <span className="hidden md:block text-sm font-medium">{userProfile.name}</span>
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
                className="absolute right-0 mt-2 w-full max-w-[calc(100vw-2rem)] sm:w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleProfileSettings}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <UserIcon className="h-4 w-4 mr-3" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
    </div>
  )
}