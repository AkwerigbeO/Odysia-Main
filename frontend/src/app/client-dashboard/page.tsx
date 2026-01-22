'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  BellIcon,
  ArrowRightIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp, floatingSlow, floatingFast } from '@/lib/animations'

// Mock Data (Replace with API calls)
const MOCK_STATS = [
  { label: 'Active Projects', value: '3', icon: BriefcaseIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Pending Proposals', value: '5', icon: DocumentTextIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Total Spent', value: '$12,450', icon: CurrencyDollarIcon, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Completed', value: '8', icon: CheckCircleIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
]

const MOCK_ACTIVITIES = [
  { id: 1, type: 'proposal', message: 'New proposal received for "E-commerce Redesign"', time: '2 hours ago', icon: DocumentTextIcon, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  { id: 2, type: 'message', message: 'Message from Alex (Frontend Expert)', time: '5 hours ago', icon: ChatBubbleLeftRightIcon, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  { id: 3, type: 'payment', message: 'Payment released for Milestone 2', time: '1 day ago', icon: CurrencyDollarIcon, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
  { id: 4, type: 'system', message: 'Project "Mobile App" marked as completed', time: '2 days ago', icon: CheckCircleIcon, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/20' },
]

export default function ClientDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/client-login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 max-h-[500px] bg-gradient-to-b from-primary-500/5 to-transparent z-0 pointer-events-none" />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Banner */}
          <motion.div
            variants={staggerItem}
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 shadow-lg group"
          >
            {/* Gradient Mesh Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-700 opacity-90 transition-opacity z-0" />
            <div className="absolute inset-0 gradient-mesh opacity-30 mix-blend-overlay z-0" />

            {/* Animated Shapes */}
            <motion.div
              variants={floatingSlow}
              initial="initial"
              animate="animate"
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              variants={floatingFast}
              initial="initial"
              animate="animate"
              className="absolute -bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"
            />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {greeting}, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-primary-100 text-lg max-w-xl">
                  Ready to manage your projects? You have <span className="font-semibold text-white">3 active projects</span> requiring your attention.
                </p>
              </div>

              <Link href="/client-dashboard/post-job">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span>Post New Job</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_STATS.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {index === 2 && <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+12%</span>}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div variants={staggerItem} className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ClockIcon className="w-6 h-6 text-primary-500" />
                  Recent Activity
                </h2>
                <button className="text-sm text-primary-600 font-medium hover:text-primary-700 hover:underline">View All</button>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="glass-card rounded-2xl border border-white/20 dark:border-gray-700/30 p-2 shadow-sm"
              >
                {MOCK_ACTIVITIES.map((activity) => (
                  <motion.div
                    key={activity.id}
                    variants={fadeInUp}
                    className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div className={`p-3 rounded-full flex-shrink-0 ${activity.bg}`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • {activity.time}
                      </p>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Quick Actions & Support */}
            <div className="space-y-6">
              <motion.div variants={staggerItem}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-orange-500" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Browse Experts', icon: BriefcaseIcon, href: '/experts', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
                    { label: 'View Invoices', icon: DocumentTextIcon, href: '/invoices', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/10' },
                    { label: 'Project Settings', icon: ChartBarIcon, href: '/settings', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' }
                  ].map((action, i) => (
                    <Link key={i} href={action.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="glass-card p-4 rounded-xl border border-white/20 dark:border-gray-700/30 flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg ${action.bg}`}>
                            <action.icon className={`w-6 h-6 ${action.color}`} />
                          </div>
                          <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{action.label}</span>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Promo / Support Card */}
              <motion.div
                variants={staggerItem}
                className="relative overflow-hidden rounded-2xl p-6 text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 z-0" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />

                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Need help?</h3>
                  <p className="text-blue-100 text-sm mb-4">Our support team is available 24/7 to assist you with your projects.</p>
                  <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors">
                    Contact Support
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}