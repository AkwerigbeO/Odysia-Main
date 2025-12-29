'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ClockIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PauseIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import api from '@/lib/axios'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function Milestones() {
  const [selectedProject, setSelectedProject] = useState('all')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects')
        setProjects(data.data)
      } catch (error) {
        console.error('Failed to fetch projects for milestones:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchProjects()
    }
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in_progress': return 'bg-blue-500' // matches typical backend enum
      case 'active': return 'bg-blue-500'
      case 'pending': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'in_progress': return <ClockIcon className="h-5 w-5 text-blue-500" />
      case 'active': return <ClockIcon className="h-5 w-5 text-blue-500" />
      case 'pending': return <PauseIcon className="h-5 w-5 text-orange-500" />
      default: return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getEscrowColor = (status: string) => {
    // Simplified logic based on status for now
    if (status === 'completed' || status === 'paid') return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  }

  const filteredProjects = selectedProject === 'all'
    ? projects
    : projects.filter(p => p._id === selectedProject)

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
            Milestones & Submissions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track project milestones and manage submissions
          </p>
        </div>
      </motion.div>

      {/* Project Filter */}
      <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedProject('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedProject === 'all'
              ? 'bg-primary-600 dark:bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card'
            }`}
        >
          All Projects
        </button>
        {projects.map((project) => (
          <button
            key={project._id}
            onClick={() => setSelectedProject(project._id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedProject === project._id
                ? 'bg-primary-600 dark:bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card'
              }`}
          >
            {project.title}
          </button>
        ))}
      </motion.div>

      {/* Milestones List */}
      <motion.div variants={staggerItem} className="space-y-6">
        {filteredProjects.map((project, projectIndex) => (
          <div key={project._id} className="space-y-4">
            {/* Project Header */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Client: {project.client?.name || 'Unknown'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {project.milestones ? project.milestones.length : 0} Milestones
                  </p>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-4">
              {project.milestones && project.milestones.length > 0 ? (
                project.milestones.map((milestone: any, index: number) => (
                  <motion.div
                    key={milestone._id || index}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: (projectIndex * 0.2) + (index * 0.1) }}
                    className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {milestone.title}
                          </h3>
                          {getStatusIcon(milestone.status)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {milestone.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Due: {milestone.dueDate ? new Date(milestone.dueDate).toLocaleDateString() : 'N/A'}</span>
                          <span>•</span>
                          <span className="capitalize">{milestone.status.replace('_', ' ')}</span>
                        </div>
                      </div>

                      {/* Escrow Status (Derived from Milestone Status for now) */}
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEscrowColor(milestone.status)}`}>
                          {milestone.status === 'completed' || milestone.status === 'paid' ? 'Released' : 'Held'}
                        </span>
                      </div>
                    </div>

                    {/* Files Section - (Assuming 'files' will be array of strings) */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Submitted Files
                        </h4>
                        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-1 rounded">
                          + Add Files
                        </button>
                      </div>

                      {milestone.files && milestone.files.length > 0 ? (
                        <div className="space-y-2">
                          {milestone.files.map((file: string, fileIndex: number) => (
                            <div key={fileIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                              <div className="flex items-center space-x-2 min-w-0 flex-1">
                                <DocumentIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file}</span>
                              </div>
                              <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm mobile-touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-1 rounded">
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm mobile-touch-target focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 p-1 rounded">
                                  <ArrowUpTrayIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg">
                          <DocumentIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No files uploaded yet
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))) : (
                <p className="text-center text-gray-500">No milestones for this project.</p>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}