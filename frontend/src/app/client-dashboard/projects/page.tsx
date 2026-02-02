'use client'

import { useState, useEffect } from 'react'
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
  PlusIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import api from '@/lib/axios'
import { toast } from 'react-hot-toast'
import BackButton from '@/components/common/BackButton'

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

interface Project {
  _id: string
  title: string
  description: string
  expert?: {
    name: string
  }
  status: string
  budget: number
  startDate: string
  milestones: any[]
}

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards')
  const router = useRouter()
  const { formatAmount } = useCurrency()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects')
      // Assuming API returns { success: true, count: number, data: [...] } or just [...]
      // Adjust based on your actual API response structure. 
      // Common pattern in this codebase seems to be response.data.data or response.data
      setProjects(data.data || data || [])
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Helper to calculate progress roughly based on milestones if available
  const getProgress = (project: Project) => {
    if (!project.milestones || project.milestones.length === 0) return 0
    const completed = project.milestones.filter((m: any) => m.status === 'completed' || m.status === 'approved').length
    return Math.round((completed / project.milestones.length) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'in_progress':
      case 'active': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    return status ? status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ') : 'Unknown'
  }

  const handleViewDetails = (projectId: string) => {
    router.push(`/client-dashboard/projects/${projectId}`)
  }

  const handleCreateProject = () => {
    router.push('/client-dashboard/post-job') // Redirect to the new post-job page
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
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-2">
                {/* Optional: Add Back Button here if "universal" means even on top level pages, 
                        though usually not needed on root dashboard pages. 
                        Let's add it but maybe hide if no history? 
                        For now, let's stick to adding it on sub-pages, 
                        but user said "every section". 
                        I'll add it here too just in case they navigated deep.
                     */}
                <BackButton className="lg:hidden" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">
                Manage and track all your projects
              </p>
            </div>
            <motion.button
              onClick={handleCreateProject}
              className="hidden sm:flex bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create New Project</span>
            </motion.button>
          </div>

          {/* Mobile Create Button */}
          <motion.button
            onClick={handleCreateProject}
            className="sm:hidden w-full bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New Project</span>
          </motion.button>

        </div>
      </motion.div>

      {/* Filters and Search */}
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
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors text-base"
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'cards'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid/List */}
      {filteredProjects.length > 0 ? (
        viewMode === 'cards' ? (
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={staggerItem}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 truncate">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description?.substring(0, 100)}...
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex-shrink-0 ml-3 ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <UserIcon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{project.expert?.name || 'Unassigned'}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <CurrencyDollarIcon className="h-4 w-4 flex-shrink-0" />
                        <span>{formatAmount(project.budget)}</span>
                      </div>
                    </div>

                    {/* Progress Bar (calculated) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Progress</span>
                        <span>{getProgress(project)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgress(project)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {/* Could add creation date if available */}
                    </div>
                    <motion.button
                      onClick={() => handleViewDetails(project._id)}
                      className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
          <motion.div variants={fadeInUp} className="space-y-4">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={staggerItem}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow p-6"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate flex-1">
                      {project.title}
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
                      <span className="truncate">{project.expert?.name || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CurrencyDollarIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{formatAmount(project.budget)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Progress: {getProgress(project)}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex-1" />
                    <motion.button
                      onClick={() => handleViewDetails(project._id)}
                      className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View Details</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )
      ) : (
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
            >
              Create Your First Project
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}