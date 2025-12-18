'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserIcon,
  StarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

export default function ClientProposalsPage() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { formatAmount } = useCurrency()

  const proposals = [
    {
      id: 1,
      project: "E-commerce Website Redesign",
      expert: {
        name: "Sarah Johnson",
        avatar: "SJ",
        rating: 4.9,
        reviews: 127,
        completedProjects: 89,
        skills: ["React", "Node.js", "UI/UX"],
        bio: "Full-stack developer with 8+ years experience in e-commerce and web applications.",
        location: "San Francisco, CA"
      },
      budget: formatAmount(8500000),
      timeline: "4 weeks",
      submittedDate: "Dec 5, 2024",
      status: "pending",
      description: "I'll create a modern, responsive e-commerce website with advanced features including payment integration, inventory management, and admin dashboard.",
      portfolio: "https://sarahjohnson.dev"
    },
    {
      id: 2,
      project: "Mobile App Development",
      expert: {
        name: "Michael Brown",
        avatar: "MB",
        rating: 4.7,
        reviews: 94,
        completedProjects: 67,
        skills: ["React Native", "Firebase", "API Integration"],
        bio: "Mobile app specialist with expertise in cross-platform development.",
        location: "Austin, TX"
      },
      budget: formatAmount(12000000),
      timeline: "6 weeks",
      submittedDate: "Dec 4, 2024",
      status: "accepted",
      description: "Full-stack mobile app development with real-time features, push notifications, and cross-platform compatibility.",
      portfolio: "https://michaelbrown.dev"
    },
    {
      id: 3,
      project: "API Integration",
      expert: {
        name: "Alex Chen",
        avatar: "AC",
        rating: 4.8,
        reviews: 156,
        completedProjects: 112,
        skills: ["Python", "Django", "AWS"],
        bio: "Backend developer specializing in scalable APIs and cloud infrastructure.",
        location: "Seattle, WA"
      },
      budget: formatAmount(6200000),
      timeline: "3 weeks",
      submittedDate: "Dec 3, 2024",
      status: "rejected",
      description: "Comprehensive API development with documentation, testing, and deployment to cloud infrastructure.",
      portfolio: "https://alexchen.dev"
    }
  ]

  const filteredProposals = proposals.filter(proposal => {
    const matchesFilter = filter === 'all' || proposal.status === filter
    const matchesSearch = proposal.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.expert.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'accepted': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'rejected': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Review'
      case 'accepted': return 'Accepted'
      case 'rejected': return 'Rejected'
      default: return 'Unknown'
    }
  }

  const handleAccept = (proposalId: number) => {
    console.log('Accepting proposal:', proposalId)
  }

  const handleReject = (proposalId: number) => {
    console.log('Rejecting proposal:', proposalId)
  }

  const handleViewProfile = (portfolio: string) => {
    window.open(portfolio, '_blank')
  }

  const stats = {
    total: proposals.length,
    pending: proposals.filter(p => p.status === 'pending').length,
    accepted: proposals.filter(p => p.status === 'accepted').length,
    rejected: proposals.filter(p => p.status === 'rejected').length
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Proposals</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              Review and manage project proposals from experts
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-sm sm:text-base"
                style={{
                  minHeight: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              />
            </div>
            
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white transition-colors text-sm sm:text-base"
              style={{
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              <option value="all">All Proposals</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-center sm:justify-end space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{
                  minHeight: '32px',
                  minWidth: '60px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{
                  minHeight: '32px',
                  minWidth: '60px',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Proposals Grid/List */}
      {viewMode === 'grid' ? (
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProposals.map((proposal) => (
            <motion.div
              key={proposal.id}
              variants={staggerItem}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-6">
                {/* Proposal Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg mb-1 truncate">
                      {proposal.project}
                    </h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(proposal.status)}`}>
                      {getStatusText(proposal.status)}
                    </span>
                  </div>
                </div>

                {/* Expert Info */}
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">
                      {proposal.expert.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                      {proposal.expert.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                      <span>{proposal.expert.rating}</span>
                      <span>({proposal.expert.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Proposal Details */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {proposal.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <CurrencyDollarIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{proposal.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{proposal.timeline}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="h-3 w-3 flex-shrink-0" />
                    <span>Submitted {proposal.submittedDate}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {proposal.expert.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {proposal.expert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                        +{proposal.expert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                  <motion.button
                    onClick={() => handleViewProfile(proposal.portfolio)}
                    className="flex-1 bg-blue-600 dark:bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      minHeight: '32px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>View</span>
                  </motion.button>
                  
                  {proposal.status === 'pending' && (
                    <>
                      <motion.button
                        onClick={() => handleAccept(proposal.id)}
                        className="bg-green-600 dark:bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          minHeight: '32px',
                          minWidth: '32px',
                          WebkitTapHighlightColor: 'transparent',
                          touchAction: 'manipulation'
                        }}
                      >
                        <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleReject(proposal.id)}
                        className="bg-red-600 dark:bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          minHeight: '32px',
                          minWidth: '32px',
                          WebkitTapHighlightColor: 'transparent',
                          touchAction: 'manipulation'
                        }}
                      >
                        <XMarkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // List View
        <motion.div variants={fadeInUp} className="space-y-3 sm:space-y-4">
          {filteredProposals.map((proposal) => (
            <motion.div
              key={proposal.id}
              variants={staggerItem}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border hover:shadow-md transition-shadow p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                      {proposal.project}
                    </h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 ${getStatusColor(proposal.status)}`}>
                      {getStatusText(proposal.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                        {proposal.expert.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                        {proposal.expert.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        <StarIcon className="h-3 w-3 text-yellow-500" />
                        <span>{proposal.expert.rating}</span>
                        <span>({proposal.expert.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {proposal.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <CurrencyDollarIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{proposal.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>{proposal.timeline}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span>Submitted {proposal.submittedDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => handleViewProfile(proposal.portfolio)}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      minHeight: '36px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>View Details</span>
                  </motion.button>
                  
                  {proposal.status === 'pending' && (
                    <>
                      <motion.button
                        onClick={() => handleAccept(proposal.id)}
                        className="bg-green-600 dark:bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          minHeight: '36px',
                          WebkitTapHighlightColor: 'transparent',
                          touchAction: 'manipulation'
                        }}
                      >
                        <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Accept</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleReject(proposal.id)}
                        className="bg-red-600 dark:bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          minHeight: '36px',
                          WebkitTapHighlightColor: 'transparent',
                          touchAction: 'manipulation'
                        }}
                      >
                        <XMarkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Reject</span>
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {filteredProposals.length === 0 && (
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-8 text-center"
        >
          <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No proposals found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Proposals will appear here when experts submit them'
            }
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
