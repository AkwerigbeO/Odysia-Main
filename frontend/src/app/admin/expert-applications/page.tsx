'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import api from '@/lib/axios'
import toast from 'react-hot-toast'

export default function AdminExpertApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const { data } = await api.get('/expert-applications')
      if (data.success) {
        setApplications(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const action = status === 'approved' ? 'approve' : 'reject'
      const { data } = await api.put(`/expert-applications/${id}/${action}`)
      if (data.success) {
        toast.success(`Application ${status} successfully`)
        fetchApplications() // Refresh list
        if (selectedApplication?._id === id) {
          setSelectedApplication((prev: any) => ({ ...prev, status }))
        }
      }
    } catch (error) {
      console.error(`Failed to ${status} application:`, error)
      toast.error(`Failed to ${status} application`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon className="h-4 w-4" />
      case 'rejected': return <XCircleIcon className="h-4 w-4" />
      default: return <ClockIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Expert Applications Review
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Review and manage expert applications for platform approval
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {applications.filter(app => app.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {applications.filter(app => app.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <XCircleIcon className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {applications.filter(app => app.status === 'rejected').length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Applications List */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-dark-card rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Applications ({applications.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-dark-border">
              {applications.map((application) => (
                <div key={application._id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Avatar/Initials */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>

                      {/* Name & Contact */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {application.fullName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <EnvelopeIcon className="h-4 w-4 mr-1" />
                            {application.email}
                          </span>
                          <span className="flex items-center">
                            <GlobeAltIcon className="h-4 w-4 mr-1" />
                            {application.country}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {application.skills?.slice(0, 3).map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                            >
                              {skill}
                            </span>
                          ))}
                          {application.skills?.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                              +{application.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status}</span>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedApplication(application)
                          setShowModal(true)
                        }}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-dark-border shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View
                      </button>
                      {application.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(application._id, 'approved')}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(application._id, 'rejected')}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <XCircleIcon className="h-4 w-4 mr-2" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Application Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedApplication.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedApplication.country}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Portfolio Links</h3>
                  <div className="space-y-2">
                    {selectedApplication.githubLink && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</label>
                        <a href={selectedApplication.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                          {selectedApplication.githubLink}
                        </a>
                      </div>
                    )}
                    {selectedApplication.portfolioLink && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio</label>
                        <a href={selectedApplication.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                          {selectedApplication.portfolioLink}
                        </a>
                      </div>
                    )}
                    {selectedApplication.linkedinLink && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                        <a href={selectedApplication.linkedinLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                          {selectedApplication.linkedinLink}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bio</h3>
                  <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                    {selectedApplication.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Resume/CV</h3>
                  {selectedApplication.resume ? (
                    <div className="flex items-center space-x-4">
                      {/* View Button */}
                      <a
                        href={selectedApplication.resume.startsWith('http')
                          ? selectedApplication.resume
                          : selectedApplication.resume.startsWith('/')
                            ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${selectedApplication.resume}`
                            : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${selectedApplication.resume}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <EyeIcon className="h-5 w-5 mr-2 text-gray-500" />
                        View Resume
                      </a>

                      {/* Download Button */}
                      <a
                        href={selectedApplication.resume.startsWith('http')
                          ? `${selectedApplication.resume}${selectedApplication.resume.includes('?') ? '&' : '?'}download=true`
                          : selectedApplication.resume.startsWith('/')
                            ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${selectedApplication.resume}?download=true`
                            : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${selectedApplication.resume}?download=true`
                        }
                        download
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                        Download Resume
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No resume attached.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Application Status</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    <span className="ml-1 capitalize">{selectedApplication.status}</span>
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-dark-surface"
                >
                  Close
                </button>
                {selectedApplication.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedApplication._id, 'approved')
                        setShowModal(false)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedApplication._id, 'rejected')
                        setShowModal(false)
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Reject Application
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
