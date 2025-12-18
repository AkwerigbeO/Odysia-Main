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
  StopIcon
} from '@heroicons/react/24/outline'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

interface Project {
  id: number
  name: string
  description: string
  expert: string
  status: 'pending' | 'in_progress' | 'completed' | 'paused'
  budget: number
  timeline: string
  lastUpdated: string
  progress: number
  startDate: string
  endDate: string
  category: string
  priority: 'low' | 'medium' | 'high'
  milestones: Array<{
    id: number
    title: string
    description: string
    completed: boolean
    dueDate: string
    progress: number
  }>
  files: Array<{
    id: number
    name: string
    type: string
    size: string
    uploadedAt: string
  }>
  messages: Array<{
    id: number
    sender: string
    message: string
    timestamp: string
    isClient: boolean
  }>
}

export default function ProjectDetailsPage() {
  const { formatAmount } = useCurrency()
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'files' | 'messages'>('overview')
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Mock project data
  const mockProject = useMemo(() => ({
    id: Number(params.id),
    name: "E-commerce Website Redesign",
    description: "Complete redesign of our online store with modern UI/UX and improved functionality. This project includes responsive design, payment integration, and enhanced user experience features.",
    expert: "Alex Chen",
    status: "in_progress" as const,
    budget: 8500,
    timeline: "6 weeks",
    lastUpdated: "Dec 10, 2024",
    progress: 65,
    startDate: "Nov 15, 2024",
    endDate: "Dec 27, 2024",
    category: "Web Development",
    priority: "high" as const,
    milestones: [
      {
        id: 1,
        title: "Design Mockups",
        description: "Create wireframes and design mockups for all pages",
        completed: true,
        dueDate: "Nov 22, 2024",
        progress: 100
      },
      {
        id: 2,
        title: "Frontend Development",
        description: "Develop responsive frontend components",
        completed: true,
        dueDate: "Dec 6, 2024",
        progress: 100
      },
      {
        id: 3,
        title: "Backend Integration",
        description: "Integrate backend APIs and database",
        completed: false,
        dueDate: "Dec 15, 2024",
        progress: 30
      },
      {
        id: 4,
        title: "Testing & Launch",
        description: "Comprehensive testing and deployment",
        completed: false,
        dueDate: "Dec 27, 2024",
        progress: 0
      }
    ],
    files: [
      {
        id: 1,
        name: "Design_Mockups.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploadedAt: "Nov 20, 2024"
      },
      {
        id: 2,
        name: "Frontend_Code.zip",
        type: "zip",
        size: "15.7 MB",
        uploadedAt: "Dec 5, 2024"
      },
      {
        id: 3,
        name: "API_Documentation.pdf",
        type: "pdf",
        size: "1.8 MB",
        uploadedAt: "Dec 8, 2024"
      }
    ],
    messages: [
      {
        id: 1,
        sender: "Alex Chen",
        message: "Hi! I've completed the design mockups and uploaded them. Please review and let me know if you'd like any changes.",
        timestamp: "Nov 20, 2024 2:30 PM",
        isClient: false
      },
      {
        id: 2,
        sender: "You",
        message: "The designs look great! I especially like the checkout flow. Can we proceed with the frontend development?",
        timestamp: "Nov 21, 2024 10:15 AM",
        isClient: true
      },
      {
        id: 3,
        sender: "Alex Chen",
        message: "Absolutely! I'll start working on the frontend components right away. I'll keep you updated on the progress.",
        timestamp: "Nov 21, 2024 11:45 AM",
        isClient: false
      }
    ]
  }), [params.id])

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProject(mockProject)
      setIsLoading(false)
    }, 500)
  }, [mockProject])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'in_progress': return 'In Progress'
      case 'paused': return 'Paused'
      default: return 'Pending'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && project) {
      const message = {
        id: project.messages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date().toLocaleString(),
        isClient: true
      }
      setProject({
        ...project,
        messages: [...project.messages, message]
      })
      setNewMessage('')
    }
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
        <button
          onClick={() => router.push('/client-dashboard/projects')}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Go back to projects
        </button>
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
                         <button
               onClick={() => router.push('/client-dashboard/projects')}
               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
             >
               <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
             </button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.category}</p>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-wrap items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <EyeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
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
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
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
                  <p className="text-gray-900 dark:text-white font-medium">{project.expert}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{formatAmount(project.budget * 1000)}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Timeline</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{project.timeline}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Start Date</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{project.startDate}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">End Date</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{project.endDate}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{project.lastUpdated}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress</h3>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'milestones' && (
            <motion.div variants={fadeInUp} className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <div key={milestone.id} className="border border-gray-200 dark:border-dark-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.completed 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{milestone.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{milestone.dueDate}</span>
                  </div>
                  
                  {!milestone.completed && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{milestone.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'files' && (
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Files</h3>
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  <PlusIcon className="h-4 w-4" />
                  <span>Upload File</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {project.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{file.size} • {file.uploadedAt}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <EyeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  <PhoneIcon className="h-4 w-4" />
                  <span>Call Expert</span>
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {project.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isClient ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                      message.isClient
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className={`text-xs ${
                          message.isClient ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
