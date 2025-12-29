'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
    FolderIcon,
    ClockIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    StarIcon,
    ChatBubbleLeftRightIcon,
    ExclamationTriangleIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    DocumentTextIcon,
    CreditCardIcon,
    CalendarIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import api from '@/lib/axios'

// Animations
const simpleFadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
}
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export default function ExpertDashboardHome() {
    const { user } = useAuth()
    const { formatAmount } = useCurrency()
    const router = useRouter()

    const [stats, setStats] = useState({
        totalProjects: 0,
        inProgress: 0,
        completed: 0,
        totalEarnings: 0,
        rating: 0,
        activeChats: 0,
        pendingActions: 0
    })
    const [activities, setActivities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch Dashboard Data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, activityRes] = await Promise.all([
                    api.get('/expert/stats'),
                    api.get('/expert/activity')
                ])
                setStats(statsRes.data.data) // Assuming wrapper { success: true, data: { ... } }
                setActivities(activityRes.data.data)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchDashboardData()
        }
    }, [user])

    const summaryStats = [
        {
            title: "Active Projects",
            value: stats.inProgress, // Mapped from inProgress
            change: "Current",
            changeType: "neutral",
            icon: ClockIcon,
            color: "bg-blue-500",
            description: "Projects in progress"
        },
        {
            title: "Completed",
            value: stats.completed,
            change: "Lifetime",
            changeType: "positive",
            icon: CheckCircleIcon,
            color: "bg-green-500",
            description: "Successfully delivered"
        },
        {
            title: "Total Earnings",
            value: formatAmount(stats.totalEarnings),
            change: "Lifetime",
            changeType: "positive",
            icon: CurrencyDollarIcon,
            color: "bg-green-600",
            description: "Total earned"
        },
        {
            title: "Rating",
            value: stats.rating || "N/A",
            change: "Average",
            changeType: "positive",
            icon: StarIcon,
            color: "bg-yellow-500",
            description: "Client satisfaction"
        }
    ]

    const quickActions = [
        {
            title: "My Projects",
            description: "View details of your active projects",
            icon: FolderIcon,
            color: "bg-blue-600",
            href: "/dashboard/projects"
        },
        {
            title: "Earnings",
            description: "View transaction history",
            icon: CurrencyDollarIcon,
            color: "bg-green-600",
            href: "/dashboard/earnings"
        },
        {
            title: "Messages",
            description: "Chat with clients",
            icon: ChatBubbleLeftRightIcon,
            color: "bg-purple-600",
            href: "/dashboard/messages"
        },
        {
            title: "Profile",
            description: "Update your portfolio",
            icon: StarIcon,
            color: "bg-yellow-600",
            href: "/dashboard/profile"
        }
    ]

    const handleQuickAction = useCallback((href: string) => {
        router.push(href)
    }, [router])

    const getActivityIcon = useCallback((type: string) => {
        switch (type) {
            case 'project_assigned': return <FolderIcon className="h-4 w-4" />
            case 'payment_received': return <CreditCardIcon className="h-4 w-4" />
            case 'milestone_completed': return <CheckCircleIcon className="h-4 w-4" />
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
            {/* Welcome Banner */}
            <motion.div
                variants={simpleFadeIn}
                className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl shadow-sm p-6 text-white"
            >
                <div className="flex flex-col space-y-3">
                    <h1 className="text-2xl font-bold">
                        Welcome back, {user?.name || 'Expert'}! 👋
                    </h1>
                    <p className="text-primary-100 dark:text-primary-200 text-base">
                        Track your projects and earnings here.
                    </p>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
                variants={simpleFadeIn}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
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
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                {stat.title}
                            </p>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                variants={simpleFadeIn}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon
                        return (
                            <motion.button
                                key={action.title}
                                variants={staggerItem}
                                onClick={() => handleQuickAction(action.href)}
                                className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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

            {/* Recent Activity (Optional / Placeholder) */}
            <motion.div
                variants={simpleFadeIn}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                </div>

                <div className="space-y-4">
                    {activities.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No recent activity</p>
                    ) : activities.slice(0, 5).map((activity, index) => (
                        <motion.div
                            key={activity._id || index}
                            variants={staggerItem}
                            className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-lg">
                                <ClockIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    {activity.title || activity.type}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(activity.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </motion.div>
    )
}
