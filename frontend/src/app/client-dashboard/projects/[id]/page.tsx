'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeftIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PhotoIcon,
  CogIcon,
  ShieldCheckIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  FolderIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import api from '@/lib/axios'
import BackButton from '@/components/common/BackButton'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/lib/contexts/AuthContext'

interface Project {
  _id: string
  title: string
  description: string
  expert?: {
    name: string
    email: string
    _id: string
  }
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  budget: number
  spent: number
  startDate: string
  completionDate: string
  milestones: Array<{
    _id: string
    title: string
    description: string
    amount: number
    status: 'pending' | 'in_progress' | 'pending_review' | 'approved' | 'rejected' | 'completed' | 'paid'
    dueDate: string
    files: any[]
  }>
  files: any[]
}

export default function ProjectDetailsPage() {
  const { formatAmount } = useCurrency()
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'files' | 'messages'>('overview')
  const [activeMessageTab, setActiveMessageTab] = useState('project') // project | direct
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isFunding, setIsFunding] = useState<string | null>(null) // milestoneId being funded

  // Fetch Project Data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${params.id}`);
        setProject(res.data.data); // Assuming response structure { success: true, data: ... }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project details');
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) fetchProject();
  }, [params.id]);


  const handleFundMilestone = async (milestone: any) => {
    setIsFunding(milestone._id)
    try {
      if (!user || !user.email) {
        toast.error('User email required for payment');
        return;
      }

      const res = await api.post('/payment/initialize', {
        projectId: project?._id,
        milestoneId: milestone._id,
        amount: milestone.amount,
        email: user.email
      });

      if (res.data.success) {
        window.location.href = res.data.data.authorization_url;
      }
    } catch (error: any) {
      console.error('Payment Init Error:', error);
      toast.error(error.response?.data?.error || 'Failed to initialize payment');
    } finally {
      setIsFunding(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800'
      case 'active':
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
      case 'approved': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    return status ? status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ') : 'Unknown';
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Project not found</h3>
        <div className="flex justify-center">
          <BackButton href="/client-dashboard/projects" label="Go back to projects" />
        </div>
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
      <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col space-y-4">
          {/* Back Button and Title */}
          <div className="flex items-center space-x-4">
            <BackButton href="/client-dashboard/projects" />
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
              {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.category}</p> */}
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-wrap items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeInUp} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm">
        <div className="border-b border-gray-200 dark:border-dark-border">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: EyeIcon },
              { id: 'milestones', label: 'Milestones', icon: CheckCircleIcon },
              { id: 'files', label: 'Files', icon: DocumentIcon },
              { id: 'messages', label: 'Messages', icon: ChatBubbleLeftRightIcon }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Expert</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{project.expert?.name || 'Unassigned'}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{formatAmount(project.budget)}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Spent</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium text-green-600">{formatAmount(project.spent)}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Start Date</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Date</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{project.completionDate ? new Date(project.completionDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'milestones' && (
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Milestones</h3>
                <button
                  onClick={() => toast('Feature: Client can add new milestones dynamically', { icon: '🚧' })}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Milestone</span>
                </button>
              </div>

              {project.milestones.length === 0 ? (
                <p className="text-gray-500 italic">No milestones yet.</p>
              ) : (
                project.milestones.map((milestone, index) => (
                  <div key={milestone._id} className="border border-gray-200 dark:border-dark-border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${milestone.status === 'completed' || milestone.status === 'approved'
                          ? 'bg-green-100 dark:bg-green-900/20'
                          : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                          {milestone.status === 'completed' || milestone.status === 'approved' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-lg">{milestone.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{milestone.description}</p>
                          <div className="mt-2 flex items-center space-x-3">
                            <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(milestone.status)}`}>
                              {getStatusText(milestone.status)}
                            </span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                              {formatAmount(milestone.amount)}
                            </span>
                            {milestone.dueDate && <span className="text-xs text-gray-500">Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center">
                        {milestone.status === 'pending' && (
                          <button
                            onClick={() => handleFundMilestone(milestone)}
                            disabled={isFunding === milestone._id}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                          >
                            {isFunding === milestone._id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <CreditCardIcon className="w-4 h-4" />
                            )}
                            <span>Fund Milestone</span>
                          </button>
                        )}

                        {milestone.status === 'pending_review' && (
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">Approve</button>
                            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Reject</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'files' && (
            <div className="text-center py-8 text-gray-500">
              File management coming in next update.
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="text-center py-8 text-gray-500">
              Real-time messaging integrating soon.
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
