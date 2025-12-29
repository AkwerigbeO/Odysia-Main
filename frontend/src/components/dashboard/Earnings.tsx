'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import api from '@/lib/axios'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function Earnings() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [earningsData, setEarningsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { formatAmount } = useCurrency()
  const { user } = useAuth()

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { data } = await api.get('/expert/earnings')
        setEarningsData(data.data)
      } catch (error) {
        console.error('Failed to fetch earnings:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchEarnings()
    }
  }, [user])

  // Calculate stats from real data
  const totalEarnings = earningsData
    .filter(item => item.status === 'completed' || item.status === 'paid')
    .reduce((sum, item) => sum + item.amount, 0)

  const thisMonthEarnings = earningsData
    .filter(item => {
      const itemDate = new Date(item.createdAt)
      const now = new Date()
      return itemDate.getMonth() === now.getMonth() &&
        itemDate.getFullYear() === now.getFullYear() &&
        (item.status === 'completed' || item.status === 'paid')
    })
    .reduce((sum, item) => sum + item.amount, 0)

  const escrowBalance = earningsData
    .filter(item => item.status === 'pending') // Assuming pending means held in escrow
    .reduce((sum, item) => sum + item.amount, 0)

  const availableBalance = totalEarnings // Simplified for now, real logic might track withdrawals

  const stats = [
    {
      title: 'Total Earnings',
      value: formatAmount(totalEarnings),
      change: '+0%', // Placeholder calculation
      changeType: 'positive',
      icon: CurrencyDollarIcon
    },
    {
      title: 'This Month',
      value: formatAmount(thisMonthEarnings),
      change: '+0%',
      changeType: 'positive',
      icon: BanknotesIcon
    },
    {
      title: 'Escrow Balance',
      value: formatAmount(escrowBalance),
      change: 'Held',
      changeType: 'neutral',
      icon: ClockIcon
    },
    {
      title: 'Pending Payments',
      value: formatAmount(escrowBalance), // simplified matching escrow
      change: 'To Clear',
      changeType: 'neutral',
      icon: ExclamationTriangleIcon
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getEscrowColor = (status: string) => {
    // Map transaction status to visual escrow status
    if (status === 'completed' || status === 'paid') return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    if (status === 'pending') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Earnings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your earnings and manage payments
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 dark:bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium"
          >
            Request Withdrawal
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div className={`flex items-center space-x-1 mt-1 ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowTrendingUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Period Filter */}
      <motion.div variants={staggerItem} className="flex flex-wrap sm:flex-nowrap space-x-1 bg-gray-100 dark:bg-dark-surface rounded-lg p-1">
        {[
          { key: 'week', label: 'This Week' },
          { key: 'month', label: 'This Month' },
          { key: 'quarter', label: 'This Quarter' },
          { key: 'year', label: 'This Year' }
        ].map((period) => (
          <button
            key={period.key}
            onClick={() => setSelectedPeriod(period.key)}
            className={`flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${selectedPeriod === period.key
              ? 'bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            {period.label}
          </button>
        ))}
      </motion.div>

      {/* Earnings Table */}
      <motion.div
        variants={staggerItem}
        className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Earnings by Project
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-surface">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Escrow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
              {earningsData.map((earning, index) => (
                <motion.tr
                  key={earning._id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {earning.project?.title || earning.description || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {earning.payer?.name || 'Sistema'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatAmount(earning.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(earning.status)}`}>
                      {earning.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEscrowColor(earning.status)}`}>
                      {earning.status === 'pending' ? 'Held' : 'Released'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {new Date(earning.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Balance Summary */}
      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Balance Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatAmount(totalEarnings)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Escrow Balance</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {formatAmount(escrowBalance)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-dark-border">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Available Balance</span>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                {formatAmount(availableBalance)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary-600 dark:bg-primary-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Request Withdrawal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View Transaction History
            </motion.button>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Payment received
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatAmount(200000)} from E-commerce Website
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ClockIcon className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Payment pending
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatAmount(150000)} from Mobile App Design
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 