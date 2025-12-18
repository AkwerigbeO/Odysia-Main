'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  PlusIcon,
  EyeIcon,
  UserIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

// Mobile-optimized animations
const simpleFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
}

const slideUp = {
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

export default function ClientDashboardPage() {
  const [clientName] = useState("Sarah Johnson")
  const [lastLogin] = useState("2 hours ago")
  const { formatAmount } = useCurrency()

  const summaryStats = [
    {
      title: "Total Projects",
      value: 12,
      change: "+2",
      changeType: "positive",
      icon: FolderIcon,
      color: "bg-blue-500",
      description: "All time projects"
    },
    {
      title: "In Progress",
      value: 4,
      change: "+1",
      changeType: "positive",
      icon: ClockIcon,
      color: "bg-yellow-500",
      description: "Active projects"
    },
    {
      title: "Completed",
      value: 8,
      change: "+3",
      changeType: "positive",
      icon: CheckCircleIcon,
      color: "bg-green-500",
      description: "Finished projects"
    },
    {
      title: "Total Spent",
      value: formatAmount(24500000),
      change: `+${formatAmount(3200000)}`,
      changeType: "positive",
      icon: CurrencyDollarIcon,
      color: "bg-purple-500",
      description: "This month"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: "project_created",
      title: "New project created",
      description: "E-commerce Website Redesign",
      timestamp: "2 hours ago",
      icon: FolderIcon,
      color: "bg-blue-500"
    },
    {
      id: 2,
      type: "proposal_received",
      title: "Proposal received",
      description: "Alex Chen submitted a proposal for Mobile App Development",
      timestamp: "4 hours ago",
      icon: DocumentTextIcon,
      color: "bg-green-500"
    },
    {
      id: 3,
      type: "payment_released",
      title: "Payment released",
      description: `${formatAmount(2500000)} released to Maria Rodriguez for UI/UX Design System`,
      timestamp: "1 day ago",
      icon: CreditCardIcon,
      color: "bg-purple-500"
    },
    {
      id: 4,
      type: "project_completed",
      title: "Project completed",
      description: "Database Optimization marked as completed",
      timestamp: "2 days ago",
      icon: CheckCircleIcon,
      color: "bg-green-500"
    },
    {
      id: 5,
      type: "message_received",
      title: "New message",
      description: "David Kim sent a message about API Integration",
      timestamp: "3 days ago",
      icon: ChatBubbleLeftRightIcon,
      color: "bg-blue-500"
    }
  ]

  const quickActions = [
    {
      title: "Create New Project",
      description: "Start a new project and find experts",
      icon: PlusIcon,
      color: "bg-blue-600",
      href: "/client-dashboard/projects/create"
    },
    {
      title: "View Proposals",
      description: "Review expert proposals for your projects",
      icon: EyeIcon,
      color: "bg-green-600",
      href: "/client-dashboard/proposals"
    },
    {
      title: "Active Projects",
      description: "Track your ongoing projects",
      icon: ClockIcon,
      color: "bg-yellow-600",
      href: "/client-dashboard/projects"
    },
    {
      title: "Messages",
      description: "Chat with your project experts",
      icon: ChatBubbleLeftRightIcon,
      color: "bg-purple-600",
      href: "/client-dashboard/messages"
    }
  ]

  const handleQuickAction = useCallback((href: string) => {
    window.open(href, '_self')
  }, [])

  const getActivityIcon = useCallback((type: string) => {
    switch (type) {
      case 'project_created': return <FolderIcon className="h-4 w-4" />
      case 'proposal_received': return <DocumentTextIcon className="h-4 w-4" />
      case 'payment_released': return <CreditCardIcon className="h-4 w-4" />
      case 'project_completed': return <CheckCircleIcon className="h-4 w-4" />
      case 'message_received': return <ChatBubbleLeftRightIcon className="h-4 w-4" />
      default: return <CalendarIcon className="h-4 w-4" />
    }
  }, [])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Banner - Mobile Optimized */}
      <motion.div 
        variants={simpleFadeIn}
        className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl shadow-sm p-6 text-white"
      >
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl font-bold">
            Welcome back, {clientName}! 👋
          </h1>
          <p className="text-blue-100 dark:text-blue-200 text-base">
            Last login: {lastLogin} • Ready to build something amazing?
          </p>
        </div>
      </motion.div>

      {/* Summary Cards - Mobile Grid */}
      <motion.div 
        variants={simpleFadeIn}
        className="grid grid-cols-2 gap-4"
      >
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              variants={staggerItem}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {stat.description}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quick Actions - Mobile Optimized */}
      <motion.div 
        variants={simpleFadeIn}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <CalendarIcon className="h-4 w-4" />
            <span>Today</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.title}
                variants={staggerItem}
                onClick={() => handleQuickAction(action.href)}
                className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{
                  minHeight: '64px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <div className={`p-3 rounded-xl ${action.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Activity - Mobile Optimized */}
      <motion.div 
        variants={simpleFadeIn}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <button 
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            style={{
              minHeight: '44px',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivity.slice(0, 4).map((activity, index) => (
            <motion.div
              key={activity.id}
              variants={staggerItem}
              className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              style={{
                minHeight: '72px',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              <div className={`p-2 rounded-lg ${activity.color} text-white flex-shrink-0`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Additional Stats - Mobile Grid */}
      <motion.div 
        variants={simpleFadeIn}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <StarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Average Rating</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">From completed projects</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">4.8</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Active Chats</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">With project experts</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">5</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">conversations</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <ExclamationTriangleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Pending Actions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Require your attention</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">3</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">items</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}