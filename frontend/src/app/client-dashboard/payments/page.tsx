'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  UserIcon,
  PlusIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentTextIcon,
  ReceiptRefundIcon
} from '@heroicons/react/24/outline'

import { useCurrency } from '@/lib/contexts/CurrencyContext'

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

  const escrowBalance = {
    total: 15400,
    available: 8900,
    pending: 6500,
    released: 24700
  }

  const pendingMilestones = [
    {
      id: 1,
      project: "E-commerce Website Redesign",
      expert: "Alex Chen",
      amount: 4250,
      description: "Frontend development completion",
      dueDate: "Dec 12, 2024",
      status: "ready"
    },
    {
      id: 2,
      project: "Mobile App Development",
      expert: "Maria Rodriguez",
      amount: 6000,
      description: "Backend API integration",
      dueDate: "Dec 15, 2024",
      status: "in_progress"
    },
    {
      id: 3,
      project: "Database Optimization",
      expert: "David Kim",
      amount: 2400,
      description: "Performance testing and optimization",
      dueDate: "Dec 18, 2024",
      status: "pending"
    }
  ]

  const paymentHistory = [
    {
      id: 1,
      project: "E-commerce Website Redesign",
      expert: "Alex Chen",
      amount: 4250,
      type: "released",
      date: "Dec 5, 2024",
      description: "Design phase completion",
      invoice: "INV-2024-001",
      receipt: "RCP-2024-001"
    },
    {
      id: 2,
      project: "Mobile App Development",
      expert: "Maria Rodriguez",
      amount: 6000,
      type: "released",
      date: "Nov 28, 2024",
      description: "Initial development milestone",
      invoice: "INV-2024-002",
      receipt: "RCP-2024-002"
    },
    {
      id: 3,
      project: "Database Optimization",
      expert: "David Kim",
      amount: 3200,
      type: "released",
      date: "Nov 20, 2024",
      description: "Project completion",
      invoice: "INV-2024-003",
      receipt: "RCP-2024-003"
    },
    {
      id: 4,
      project: "API Integration",
      expert: "Sarah Johnson",
      amount: 3100,
      type: "deposited",
      date: "Nov 15, 2024",
      description: "Project deposit",
      invoice: "INV-2024-004",
      receipt: "RCP-2024-004"
    },
    {
      id: 5,
      project: "UI/UX Design System",
      expert: "David Kim",
      amount: 7500,
      type: "held",
      date: "Dec 10, 2024",
      description: "Design system implementation",
      invoice: "INV-2024-005",
      receipt: "RCP-2024-005"
    },
    {
      id: 6,
      project: "Cloud Migration",
      expert: "Alex Chen",
      amount: 5200,
      type: "pending",
      date: "Dec 8, 2024",
      description: "Infrastructure setup",
      invoice: "INV-2024-006",
      receipt: "RCP-2024-006"
    }
  ]

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesFilter = filter === 'all' || payment.type === filter
    const matchesSearch = payment.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.expert.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'in_progress': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'pending': return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'Ready to Release'
      case 'in_progress': return 'In Progress'
      case 'pending': return 'Pending'
      default: return 'Unknown'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'released': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'deposited': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'held': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'pending': return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'released': return 'Released'
      case 'deposited': return 'Deposited'
      case 'held': return 'Held in Escrow'
      case 'pending': return 'Pending'
      default: return 'Unknown'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'released': return <ArrowDownIcon className="h-4 w-4" />
      case 'deposited': return <ArrowUpIcon className="h-4 w-4" />
      case 'held': return <LockClosedIcon className="h-4 w-4" />
      case 'pending': return <ClockIcon className="h-4 w-4" />
      default: return <CurrencyDollarIcon className="h-4 w-4" />
    }
  }

  const handleDownloadInvoice = (invoice: string) => {
    console.log('Downloading invoice:', invoice)
  }

  const handleViewReceipt = (receipt: string) => {
    console.log('Viewing receipt:', receipt)
  }

  const handleReleasePayment = (milestoneId: number) => {
    console.log('Releasing payment for milestone:', milestoneId)
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header - Mobile Optimized */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments & Escrow</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">
              Manage your escrow balance and payment history
            </p>
          </div>
          
          {/* Search and Filters - Mobile Stack */}
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-base"
                style={{
                  minHeight: '48px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors text-base"
                style={{
                  minHeight: '48px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <option value="all">All Payments</option>
                <option value="released">Released</option>
                <option value="deposited">Deposited</option>
                <option value="held">Held in Escrow</option>
                <option value="pending">Pending</option>
              </select>
              
              {/* Date Range */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors text-base"
                style={{
                  minHeight: '48px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Summary Boxes - Mobile Grid */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total in Escrow</h3>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <LockClosedIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatAmount(escrowBalance.total)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Securely held funds
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Released</h3>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatAmount(escrowBalance.released)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Paid to experts
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Balance</h3>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <BanknotesIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatAmount(escrowBalance.available)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Ready for new projects
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Milestones</h3>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl">
              <ClockIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatAmount(escrowBalance.pending)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Awaiting completion
          </p>
        </div>
      </motion.div>

      {/* Tabs - Mobile Optimized */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-1 px-4 sm:px-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: EyeIcon },
              { id: 'pending', label: 'Pending Milestones', icon: ClockIcon },
              { id: 'history', label: 'Payment History', icon: CalendarIcon }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  style={{
                    minHeight: '48px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {paymentHistory.slice(0, 3).map((payment) => (
                      <motion.div
                        key={payment.id}
                        variants={staggerItem}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(payment.type)}`}>
                            {getTypeIcon(payment.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">{payment.project}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{payment.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold text-sm ${getTypeColor(payment.type)}`}>
                            {formatAmount(payment.amount)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{payment.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      style={{
                        minHeight: '56px',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCardIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">Add Funds to Escrow</span>
                      </div>
                      <ArrowUpIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                      style={{
                        minHeight: '56px',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <ArrowDownTrayIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-gray-900 dark:text-white">Download Statement</span>
                      </div>
                      <ArrowDownIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                      style={{
                        minHeight: '56px',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <ReceiptRefundIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">Payment Disputes</span>
                      </div>
                      <ArrowUpIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'pending' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {pendingMilestones.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  variants={staggerItem}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white text-lg">{milestone.project}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(milestone.status)}`}>
                          {getStatusText(milestone.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Expert: {milestone.expert}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {milestone.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Amount: {formatAmount(milestone.amount)}</span>
                        <span>Due: {milestone.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {milestone.status === 'ready' && (
                        <button 
                          onClick={() => handleReleasePayment(milestone.id)}
                          className="bg-green-600 dark:bg-green-500 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center space-x-2"
                          style={{
                            minHeight: '48px',
                            WebkitTapHighlightColor: 'transparent',
                            touchAction: 'manipulation'
                          }}
                        >
                          <ArrowUpIcon className="h-4 w-4" />
                          <span>Release Payment</span>
                        </button>
                      )}
                      {milestone.status !== 'ready' && (
                        <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          style={{
                            minHeight: '48px',
                            WebkitTapHighlightColor: 'transparent',
                            touchAction: 'manipulation'
                          }}
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {/* Payment History - Mobile Optimized Cards */}
              <div className="space-y-4">
                {filteredPayments.map((payment) => (
                  <motion.div
                    key={payment.id}
                    variants={staggerItem}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white text-base">{payment.project}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{payment.description}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Expert: {payment.expert}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(payment.type)}`}>
                          {getTypeText(payment.type)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-lg">
                            {formatAmount(payment.amount)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{payment.date}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewReceipt(payment.receipt)}
                            className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                            style={{
                              minHeight: '40px',
                              WebkitTapHighlightColor: 'transparent',
                              touchAction: 'manipulation'
                            }}
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span>Receipt</span>
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(payment.invoice)}
                            className="flex items-center space-x-1 px-3 py-2 text-sm bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                            style={{
                              minHeight: '40px',
                              WebkitTapHighlightColor: 'transparent',
                              touchAction: 'manipulation'
                            }}
                          >
                            <DocumentTextIcon className="h-4 w-4" />
                            <span>Invoice</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredPayments.length === 0 && (
                <motion.div variants={fadeInUp} className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ReceiptRefundIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payments found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm || filter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No payment history available.'
                    }
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}