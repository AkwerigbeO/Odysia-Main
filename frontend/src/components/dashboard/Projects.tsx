'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderIcon, 
  ClockIcon, 
  UserIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PauseIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import { useRouter } from 'next/navigation'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const router = useRouter()
  const { formatAmount } = useCurrency()

  const projects = [
    {
      id: 1,
      name: 'E-commerce Website',
      client: 'TechCorp Ltd',
      currentMilestone: 'Frontend Development',
      deadline: '2024-02-15',
      status: 'in-progress',
      progress: 65,
      budget: formatAmount(500000),
      description: 'Full-stack e-commerce platform with payment integration and admin dashboard.'
    },
    {
      id: 2,
      name: 'Mobile App Design',
      client: 'StartupXYZ',
      currentMilestone: 'UI/UX Design',
      deadline: '2024-02-10',
      status: 'completed',
      progress: 100,
      budget: formatAmount(300000),
      description: 'Modern mobile app design with intuitive user interface and smooth animations.'
    },
    {
      id: 3,
      name: 'Brand Identity Package',
      client: 'Creative Agency',
      currentMilestone: 'Logo Design',
      deadline: '2024-02-20',
      status: 'pending',
      progress: 25,
      budget: formatAmount(200000),
      description: 'Complete brand identity including logo, color palette, and brand guidelines.'
    },
    {
      id: 4,
      name: 'Web Application',
      client: 'Enterprise Solutions',
      currentMilestone: 'Backend Development',
      deadline: '2024-03-01',
      status: 'in-progress',
      progress: 40,
      budget: formatAmount(800000),
      description: 'Scalable web application with advanced features and real-time updates.'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'pending':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />
      case 'pending':
        return <PauseIcon className="h-5 w-5 text-orange-500" />
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    return project.status === filter
  })

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
            My Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all your ongoing projects
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <button className="bg-primary-600 dark:bg-primary-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            + New Project
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={staggerItem} className="flex flex-wrap sm:flex-nowrap space-x-1 bg-gray-100 dark:bg-dark-surface rounded-lg p-1">
        {[
          { key: 'all', label: 'All Projects', count: projects.length },
          { key: 'in-progress', label: 'In Progress', count: projects.filter(p => p.status === 'in-progress').length },
          { key: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
          { key: 'pending', label: 'Pending', count: projects.filter(p => p.status === 'pending').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              filter === tab.key
                ? 'bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.key === 'all' ? 'All' : tab.key === 'in-progress' ? 'Active' : tab.key === 'completed' ? 'Done' : 'Pending'}</span>
            <span className="ml-1">({tab.count})</span>
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        variants={staggerItem}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 hover:shadow-md transition-shadow"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <FolderIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  {getStatusIcon(project.status)}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <UserIcon className="h-4 w-4" />
                  <span>{project.client}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {project.budget}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Budget
                </p>
              </div>
            </div>

            {/* Project Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            {/* Current Milestone */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Current Milestone
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {project.currentMilestone}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-surface rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${getStatusColor(project.status)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>

            {/* Deadline and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <ClockIcon className="h-4 w-4" />
                <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                className="flex items-center justify-center sm:justify-start space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
              >
                <EyeIcon className="h-4 w-4" />
                <span>View Details</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          variants={staggerItem}
          className="text-center py-12"
        >
          <FolderIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {filter === 'all' 
              ? 'You don\'t have any projects yet. Start by creating your first project.'
              : `No ${filter} projects found.`
            }
          </p>
          {filter === 'all' && (
            <button className="bg-primary-600 dark:bg-primary-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              Create Your First Project
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
} 