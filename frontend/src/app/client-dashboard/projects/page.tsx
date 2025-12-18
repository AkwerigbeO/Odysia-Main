'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  FolderIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon
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

export default function ClientProjectsPage() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards')
  const router = useRouter()
  const { formatAmount } = useCurrency()

  const projects = [
    {
      id: 1,
      name: "E-commerce Website Redesign",
      description: "Complete redesign of our online store with modern UI/UX and improved functionality",
      expert: "Alex Chen",
      status: "in_progress",
      budget: 8500,
      timeline: "6 weeks",
      lastUpdated: "Dec 10, 2024",
      progress: 65,
      milestones: [
        { title: "Design Mockups", completed: true },
        { title: "Frontend Development", completed: true },
        { title: "Backend Integration", completed: false },
        { title: "Testing & Launch", completed: false }
      ]
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "iOS and Android app for our service platform with real-time features",
      expert: "Maria Rodriguez",
      status: "completed",
      budget: 12000,
      timeline: "8 weeks",
      lastUpdated: "Nov 28, 2024",
      progress: 100,
      milestones: [
        { title: "UI/UX Design", completed: true },
        { title: "iOS Development", completed: true },
        { title: "Android Development", completed: true },
        { title: "Testing & Deployment", completed: true }
      ]
    },
    {
      id: 3,
      name: "Database Optimization",
      description: "Performance optimization and restructuring of our main database",
      expert: "David Kim",
      status: "pending",
      budget: 3200,
      timeline: "3 weeks",
      lastUpdated: "Dec 5, 2024",
      progress: 0,
      milestones: [
        { title: "Analysis & Planning", completed: false },
        { title: "Optimization", completed: false },
        { title: "Testing", completed: false }
      ]
    },
    {
      id: 4,
      name: "API Integration",
      description: "Integration with third-party payment and shipping APIs",
      expert: "Sarah Johnson",
      status: "in_progress",
      budget: 4500,
      timeline: "4 weeks",
      lastUpdated: "Dec 8, 2024",
      progress: 40,
      milestones: [
        { title: "API Research", completed: true },
        { title: "Payment Integration", completed: false },
        { title: "Shipping Integration", completed: false },
        { title: "Testing", completed: false }
      ]
    },
    {
      id: 5,
      name: "UI/UX Design System",
      description: "Comprehensive design system for our brand across all platforms",
      expert: "David Kim",
      status: "completed",
      budget: 7500,
      timeline: "5 weeks",
      lastUpdated: "Nov 20, 2024",
      progress: 100,
      milestones: [
        { title: "Brand Analysis", completed: true },
        { title: "Design Components", completed: true },
        { title: "Documentation", completed: true },
        { title: "Implementation Guide", completed: true }
      ]
    },
    {
      id: 6,
      name: "Cloud Migration",
      description: "Migration from on-premise servers to cloud infrastructure",
      expert: "Alex Chen",
      status: "pending",
      budget: 5200,
      timeline: "4 weeks",
      lastUpdated: "Dec 1, 2024",
      progress: 0,
      milestones: [
        { title: "Infrastructure Planning", completed: false },
        { title: "Data Migration", completed: false },
        { title: "Testing & Validation", completed: false }
      ]
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.expert && project.expert.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'in_progress': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'in_progress': return 'In Progress'
      case 'pending': return 'Pending'
      default: return 'Unknown'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="h-4 w-4" />
      case 'in_progress': return <ClockIcon className="h-4 w-4" />
      case 'pending': return <ExclamationTriangleIcon className="h-4 w-4" />
      default: return <ClockIcon className="h-4 w-4" />
    }
  }

  const handleViewDetails = (projectId: number) => {
    router.push(`/client-dashboard/projects/${projectId}`)
  }

  const handleCreateProject = () => {
    router.push('/client-dashboard/projects/create')
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
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">
              Manage and track all your projects
            </p>
          </div>
          
          <motion.button
            onClick={handleCreateProject}
            className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              minHeight: '48px',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New Project</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filters and Search - Mobile Optimized */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
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
              <option value="all">All Projects</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  style={{
                    minHeight: '40px',
                    minWidth: '70px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  style={{
                    minHeight: '40px',
                    minWidth: '70px',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid/List - Mobile Optimized */}
      {viewMode === 'cards' ? (
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 truncate">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border flex-shrink-0 ml-3 ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>

                {/* Project Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <UserIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{project.expert || 'Unassigned'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <CurrencyDollarIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{formatAmount(project.budget * 1000)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Milestones</p>
                    <div className="space-y-1">
                      {project.milestones.slice(0, 2).map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`} />
                          <span className={`text-sm truncate ${
                            milestone.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                      {project.milestones.length > 2 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          +{project.milestones.length - 2} more
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Updated {project.lastUpdated}</span>
                  </div>
                  <motion.button
                    onClick={() => handleViewDetails(project.id)}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      minHeight: '40px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>View</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // List View - Mobile Optimized
        <motion.div variants={fadeInUp} className="space-y-4">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow p-6"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate flex-1">
                    {project.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border flex-shrink-0 ml-3 ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{project.expert || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="h-4 w-4 flex-shrink-0" />
                    <span>{formatAmount(project.budget * 1000)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 flex-shrink-0" />
                    <span>{project.timeline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Progress: {project.progress}%</span>
                  </div>
                </div>

                {/* Progress Bar for List View */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Updated {project.lastUpdated}
                  </div>
                  <motion.button
                    onClick={() => handleViewDetails(project.id)}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      minHeight: '40px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>View Details</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center border border-gray-200 dark:border-gray-700"
        >
          <FolderIcon className="h-20 w-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-base">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first project'
            }
          </p>
          {!searchTerm && filter === 'all' && (
            <motion.button
              onClick={handleCreateProject}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              Create Your First Project
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}