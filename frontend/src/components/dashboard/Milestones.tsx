'use client'

import { useState } from 'react'
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

export default function Milestones() {
  const [selectedProject, setSelectedProject] = useState('all')

  const projects = [
    {
      id: 1,
      name: 'E-commerce Website',
      client: 'TechCorp Ltd',
      milestones: [
        {
          id: 1,
          title: 'UI/UX Design',
          dueDate: '2024-02-10',
          status: 'completed',
          escrowStatus: 'released',
          files: ['design-mockups.pdf', 'wireframes.fig'],
          description: 'Complete user interface design with wireframes and mockups'
        },
        {
          id: 2,
          title: 'Frontend Development',
          dueDate: '2024-02-15',
          status: 'in-progress',
          escrowStatus: 'held',
          files: ['frontend-code.zip'],
          description: 'React-based frontend with responsive design'
        },
        {
          id: 3,
          title: 'Backend Integration',
          dueDate: '2024-02-25',
          status: 'pending',
          escrowStatus: 'held',
          files: [],
          description: 'API integration and database setup'
        }
      ]
    },
    {
      id: 2,
      name: 'Mobile App Design',
      client: 'StartupXYZ',
      milestones: [
        {
          id: 4,
          title: 'App Design',
          dueDate: '2024-02-08',
          status: 'completed',
          escrowStatus: 'released',
          files: ['app-design.fig', 'prototype.mp4'],
          description: 'Complete mobile app design with interactive prototype'
        }
      ]
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
      case 'revision':
        return 'bg-red-500'
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
      case 'revision':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
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

  const filteredProjects = selectedProject === 'all' 
    ? projects 
    : projects.filter(p => p.id.toString() === selectedProject)

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
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedProject === 'all'
              ? 'bg-primary-600 dark:bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card'
          }`}
        >
          All Projects
        </button>
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project.id.toString())}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedProject === project.id.toString()
                ? 'bg-primary-600 dark:bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card'
            }`}
          >
            {project.name}
          </button>
        ))}
      </motion.div>

      {/* Milestones List */}
      <motion.div variants={staggerItem} className="space-y-6">
        {filteredProjects.map((project, projectIndex) => (
          <div key={project.id} className="space-y-4">
            {/* Project Header */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Client: {project.client}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {project.milestones.length} Milestones
                  </p>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
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
                        <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">{milestone.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    
                    {/* Escrow Status */}
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEscrowColor(milestone.escrowStatus)}`}>
                        {milestone.escrowStatus.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Files Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Submitted Files
                      </h4>
                      <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-1 rounded">
                        + Add Files
                      </button>
                    </div>
                    
                    {milestone.files.length > 0 ? (
                      <div className="space-y-2">
                        {milestone.files.map((file, fileIndex) => (
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

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-4 border-t border-gray-200 dark:border-dark-border">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      >
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        <span>Message Client</span>
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {milestone.status === 'pending' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary-600 dark:bg-primary-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                          Start Work
                        </motion.button>
                      )}
                      {milestone.status === 'in-progress' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-green-600 dark:bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          Submit for Review
                        </motion.button>
                      )}
                      {milestone.status === 'revision' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-orange-600 dark:bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          Submit Revision
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          variants={staggerItem}
          className="text-center py-12"
        >
          <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No milestones found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedProject === 'all' 
              ? 'You don\'t have any projects with milestones yet.'
              : 'This project doesn\'t have any milestones yet.'
            }
          </p>
        </motion.div>
      )}
    </motion.div>
  )
} 