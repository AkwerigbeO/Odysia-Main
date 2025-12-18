'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BellIcon,
  IdentificationIcon,
  ExclamationTriangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { 
  ProfileSection, 
  SecuritySection, 
  PaymentsSection, 
  NotificationsSection, 
  VerificationSection, 
  DangerZoneSection 
} from '@/components/client-dashboard/SettingsSections'
import { DeleteAccountModal, DeactivateAccountModal } from '@/components/client-dashboard/SettingsModals'

interface SettingsSection {
  id: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: UserIcon,
    description: 'Manage your personal information'
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldCheckIcon,
    description: 'Password and authentication settings'
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: CreditCardIcon,
    description: 'Payment methods and transaction history'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: BellIcon,
    description: 'Email and push notification preferences'
  },
  {
    id: 'verification',
    label: 'Verification',
    icon: IdentificationIcon,
    description: 'Identity and company verification'
  },
  {
    id: 'danger-zone',
    label: 'Danger Zone',
    icon: ExclamationTriangleIcon,
    description: 'Account deactivation and deletion'
  }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function ClientSettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const profileCompletion = 70

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    setShowMobileMenu(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header - Mobile Optimized */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Manage your account settings and preferences
                </p>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg"
                style={{
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                {showMobileMenu ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Completion
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {profileCompletion}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Mobile Overlay */}
          <AnimatePresence>
            {(showMobileMenu || !isMobile) && (
              <>
                {isMobile && (
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowMobileMenu(false)}
                  />
                )}
                <motion.aside 
                  variants={fadeInUp}
                  className={`${
                    isMobile 
                      ? 'fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 lg:hidden' 
                      : 'lg:w-80 lg:min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700'
                  }`}
                  initial={isMobile ? { x: '-100%' } : { opacity: 0, y: 20 }}
                  animate={isMobile ? { x: 0 } : { opacity: 1, y: 0 }}
                  exit={isMobile ? { x: '-100%' } : { opacity: 0, y: 20 }}
                  transition={isMobile ? { type: "spring", damping: 25, stiffness: 200 } : { duration: 0.3 }}
                >
                  <div className="p-4">
                    <nav className="space-y-2">
                      {settingsSections.map((section, index) => {
                        const Icon = section.icon
                        const isActive = activeSection === section.id
                        
                        return (
                          <motion.div
                            key={section.id}
                            variants={staggerItem}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <button
                              onClick={() => handleSectionChange(section.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                                isActive
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
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
                                <div className="font-medium text-base">{section.label}</div>
                                <div className={`text-sm mt-0.5 ${
                                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {section.description}
                                </div>
                              </div>
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

          {/* Main Content - Mobile Optimized */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeSection === 'profile' && <ProfileSection />}
                {activeSection === 'security' && <SecuritySection />}
                {activeSection === 'payments' && <PaymentsSection />}
                {activeSection === 'notifications' && <NotificationsSection />}
                {activeSection === 'verification' && <VerificationSection />}
                {activeSection === 'danger-zone' && (
                  <DangerZoneSection 
                    onDelete={() => setShowDeleteModal(true)}
                    onDeactivate={() => setShowDeactivateModal(true)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
        )}
      </AnimatePresence>

      {/* Deactivate Account Modal */}
      <AnimatePresence>
        {showDeactivateModal && (
          <DeactivateAccountModal onClose={() => setShowDeactivateModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}