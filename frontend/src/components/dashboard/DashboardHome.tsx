'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  FolderIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

export default function DashboardHome() {
  const router = useRouter()
  const { formatAmount } = useCurrency()
  
  const handleNavigation = (path: string) => {
    router.push(path)
  }
  const stats = [
    {
      title: 'Ongoing Projects',
      value: '2',
      icon: FolderIcon,
      color: 'bg-blue-500',
      change: '+1 from last month'
    },
    {
      title: 'This Month',
      value: formatAmount(350000),
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
      change: '+12% from last month'
    },
    {
      title: 'Pending Tasks',
      value: '3',
      icon: ClockIcon,
      color: 'bg-orange-500',
      change: '-2 from last week'
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'deadline',
      message: 'Project &quot;E-commerce Website&quot; milestone due in 2 days',
      time: '2 hours ago',
      urgent: true
    },
    {
      id: 2,
      type: 'approval',
      message: 'Your submission for &quot;Mobile App Design&quot; has been approved',
      time: '1 day ago',
      urgent: false
    },
    {
      id: 3,
      type: 'payment',
      message: `Payment of ${formatAmount(150000)} has been released to your account`,
      time: '2 days ago',
      urgent: false
    }
  ]

  const recentEarnings = [
    { project: 'E-commerce Website', amount: formatAmount(200000), status: 'completed' },
    { project: 'Mobile App Design', amount: formatAmount(150000), status: 'pending' },
    { project: 'Brand Identity', amount: formatAmount(100000), status: 'in-progress' }
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={staggerItem} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={staggerItem}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <motion.div 
          variants={staggerItem}
          className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Notifications
            </h2>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                whileHover={{ x: 5 }}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                  notification.urgent 
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                    : 'bg-gray-50 dark:bg-dark-surface'
                }`}
              >
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  notification.urgent ? 'bg-red-500' : 'bg-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    notification.urgent 
                      ? 'text-red-900 dark:text-red-100' 
                      : 'text-gray-900 dark:text-white'
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Earnings Summary */}
        <motion.div 
          variants={staggerItem}
          className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Earnings Summary
            </h2>
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <ArrowTrendingUpIcon className="h-4 w-4" />
              <span className="text-sm font-medium">+15%</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentEarnings.map((earning, index) => (
              <motion.div
                key={earning.project}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-dark-surface"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {earning.project}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {earning.status}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {earning.amount}
                  </span>
                  {earning.status === 'completed' && (
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  )}
                  {earning.status === 'pending' && (
                    <ClockIcon className="h-4 w-4 text-orange-500" />
                  )}
                  {earning.status === 'in-progress' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total This Month
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatAmount(450000)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        variants={staggerItem}
        className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <motion.button
            onClick={() => handleNavigation('/dashboard/projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mobile-touch-target"
            aria-label="Navigate to Projects page"
            role="button"
          >
            <FolderIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
            <span className="text-xs sm:text-sm font-medium text-primary-700 dark:text-primary-300 text-center">
              View Projects
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => handleNavigation('/dashboard/earnings')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mobile-touch-target"
            aria-label="Navigate to Earnings page"
            role="button"
          >
            <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 text-center">
              Request Payment
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => handleNavigation('/dashboard/milestones')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mobile-touch-target"
            aria-label="Navigate to Milestones page"
            role="button"
          >
            <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 text-center">
              Submit Work
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => handleNavigation('/dashboard/profile')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mobile-touch-target"
            aria-label="Navigate to Profile page"
            role="button"
          >
            <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
            <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300 text-center">
              Update Profile
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
} 