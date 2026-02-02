'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ReceiptRefundIcon,
  LockClosedIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

import { useCurrency } from '@/lib/contexts/CurrencyContext'
import api from '@/lib/axios'
import { toast } from 'react-hot-toast'

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

export default function ClientPaymentsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState('all')
  const { formatAmount } = useCurrency()

  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/payment')
      setTransactions(data.data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
      toast.error('Failed to load transaction history')
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats from real data
  const escrowBalance = transactions.reduce((acc, t) => {
    if (t.status === 'pending' && t.type === 'milestone_payment') {
      // Pending usually means "Initialized but not paid" OR "Paid into Escrow but not released"
      // In our Paystack flow, 'pending' means initialized. 'completed' means paid to platform/escrow.
      // We need a status for 'released' to expert.
      // For now, let's assume 'completed' = In Escrow (since we verified payment successfully)
      // We might need a 'released' status in backend later.
      // Let's treat 'completed' as "In Escrow" for now, as that's whatverifyPayment does.
      return acc + t.amount
    }
    return acc
  }, 0)

  // Assuming we add a 'released' status later. Currently verifyPayment sets to 'completed'.
  // Let's display 'completed' payments as "In Escrow / Paid"
  const totalPaid = transactions
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => acc + t.amount, 0)


  const filteredPayments = transactions.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter
    const matchesSearch = (payment.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.reference || '').toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'failed': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    // Capitalize
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments & Escrow</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">
              Manage your project payments
            </p>
          </div>

          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by description or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors text-base"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Funded</h3>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatAmount(totalPaid)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Successful payments
          </p>
        </div>

        {/* Can add more cards here */}
      </motion.div>

      {/* Transactions List */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Transaction History</h3>

        <div className="space-y-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment: any) => (
              <motion.div
                key={payment._id}
                variants={staggerItem}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                  <div className={`p-3 rounded-full ${payment.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'}`}>
                    {payment.status === 'completed' ? <CheckCircleIcon className="h-6 w-6" /> : <ClockIcon className="h-6 w-6" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{payment.description || 'Payment'}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Ref: {payment.reference}
                      </span>
                      <span className="hidden sm:inline text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(payment.createdAt).toLocaleDateString()} at {new Date(payment.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                    {getStatusText(payment.status)}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatAmount(payment.amount)}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <ReceiptRefundIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No transactions found</h3>
              <p className="text-gray-500 dark:text-gray-400">History will appear here once you make payments.</p>
            </div>
          )}
        </div>
      </motion.div>

    </motion.div>
  )
}