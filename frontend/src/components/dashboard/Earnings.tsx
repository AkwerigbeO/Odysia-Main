'use client'

import { useState } from 'react'
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

export default function Earnings() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const { formatAmount } = useCurrency()

  const earningsData = [
    {
      id: 1,
      project: 'E-commerce Website',
      client: 'TechCorp Ltd',
      amount: 200000,
      status: 'completed',
      date: '2024-02-01',
      escrowStatus: 'released'
    },
    {
      id: 2,
      project: 'Mobile App Design',
      client: 'StartupXYZ',
      amount: 150000,
      status: 'pending',
      date: '2024-02-05',
      escrowStatus: 'held'
    },
    {
      id: 3,
      project: 'Brand Identity Package',
      client: 'Creative Agency',
      amount: 100000,
      status: 'in-progress',
      date: '2024-02-10',
      escrowStatus: 'held'
    },
    {
      id: 4,
      project: 'Web Application',
      client: 'Enterprise Solutions',
      amount: 300000,
      status: 'completed',
      date: '2024-01-15',
      escrowStatus: 'released'
    }
  ]

  const stats = [
    {
      title: 'Total Earnings',
      value: formatAmount(750000),
      change: '+15%',
      changeType: 'positive',
      icon: CurrencyDollarIcon
    },
    {
      title: 'This Month',
      value: formatAmount(350000),
      change: '+12%',
      changeType: 'positive',
      icon: BanknotesIcon
    },
    {
      title: 'Escrow Balance',
      value: formatAmount(250000),
      change: '+8%',
      changeType: 'positive',
      icon: ClockIcon
    },
    {
      title: 'Pending Payments',
      value: formatAmount(150000),
      change: '-5%',
      changeType: 'negative',
      icon: ExclamationTriangleIcon
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getEscrowColor = (status: string) => {
    switch (status) {
      case 'released':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'held':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'under-review':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const totalEarnings = earningsData.reduce((sum, item) => sum + item.amount, 0)
  const escrowBalance = earningsData
    .filter(item => item.escrowStatus === 'held')
    .reduce((sum, item) => sum + item.amount, 0)
  const availableBalance = totalEarnings - escrowBalance

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
                <div className={`flex items-center space-x-1 mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
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
            className={`flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              selectedPeriod === period.key
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
                  key={earning.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {earning.project}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {earning.client}
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
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEscrowColor(earning.escrowStatus)}`}>
                      {earning.escrowStatus.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {new Date(earning.date).toLocaleDateString()}
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