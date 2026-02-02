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
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import api from '@/lib/axios'

// Stat icons mapping
const ICONS = {
  BriefcaseIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon
}

export default function ClientDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { formatAmount } = useCurrency()
  const [greeting, setGreeting] = useState('')
  const [stats, setStats] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [statsLoading, setStatsLoading] = useState(true)

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

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return
      try {
        const [statsRes, notificationsRes] = await Promise.all([
          api.get('/projects/stats'),
          api.get('/notifications')
        ])
        setStats(statsRes.data)
        setActivities(notificationsRes.data.data || [])
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    if (user) {
      fetchDashboardData()
    }
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    { label: 'Active Projects', value: stats?.inProgress || 0, icon: BriefcaseIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Pending Actions', value: stats?.pendingActions || 0, icon: DocumentTextIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Total Spent', value: formatAmount(stats?.totalSpent || 0), icon: CurrencyDollarIcon, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Completed', value: stats?.completed || 0, icon: CheckCircleIcon, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'proposal': return { Icon: DocumentTextIcon, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20' }
      case 'message': return { Icon: ChatBubbleLeftRightIcon, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' }
      case 'payment': return { Icon: CurrencyDollarIcon, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' }
      default: return { Icon: BellIcon, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/20' }
    }
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
                  {statsLoading ? 'Loading your stats...' : (
                    <>
                      Ready to manage your projects? You have <span className="font-semibold text-white">{stats?.inProgress || 0} active projects</span> requiring your attention.
                    </>
                  )}
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
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {statsLoading ? '...' : stat.value}
                  </h3>
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
                <Link href="/client-dashboard/notifications" className="text-sm text-primary-600 font-medium hover:text-primary-700 hover:underline">View All</Link>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="glass-card rounded-2xl border border-white/20 dark:border-gray-700/30 p-2 shadow-sm min-h-[200px]"
              >
                {activities.length > 0 ? activities.slice(0, 5).map((activity) => {
                  const { Icon, color, bg } = getActivityIcon(activity.type)
                  return (
                    <motion.div
                      key={activity._id}
                      variants={fadeInUp}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <div className={`p-3 rounded-full flex-shrink-0 ${bg}`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {activity.title}: {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {new Date(activity.createdAt).toLocaleDateString()} at {new Date(activity.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  )
                }) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <BellIcon className="w-12 h-12 mb-4 opacity-20" />
                    <p>No recent activity</p>
                  </div>
                )}
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
                    { label: 'View Invoices', icon: DocumentTextIcon, href: '/client-dashboard/payments', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/10' },
                    { label: 'Project Settings', icon: ChartBarIcon, href: '/client-dashboard/projects', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' }
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