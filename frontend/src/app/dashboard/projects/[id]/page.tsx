'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PauseIcon,
  FolderIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCurrency } from '@/lib/contexts/CurrencyContext'

export default function ProjectDetailPage() {
  const { formatAmount } = useCurrency()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Sample project data
  const project = {
    id: 1,
    title: 'E-commerce Website',
    client: 'TechCorp Ltd',
    status: 'in-progress',
    startDate: '2024-01-15',
    deadline: '2024-03-15',
    budget: '500,000',
    description: 'Full-stack e-commerce platform with payment integration and admin dashboard.',
    githubUrl: 'https://github.com/techcorp/ecommerce-platform',
    progress: 65
  }

  const submissions = [
    {
      id: 1,
      date: '2024-02-10',
      time: '14:30',
      fileName: 'ui-mockups-v1.zip',
      comment: 'Initial UI mockups for homepage and product pages',
      type: 'design'
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '16:45',
      fileName: 'frontend-code-v1.zip',
      comment: 'React frontend implementation with responsive design',
      type: 'code'
    },
    {
      id: 3,
      date: '2024-02-20',
      time: '11:20',
      fileName: 'backend-api-v1.zip',
      comment: 'Node.js backend with Express and MongoDB',
      type: 'code'
    }
  ]

  const milestones = [
    {
      id: 1,
      title: 'UI/UX Design',
      dueDate: '2024-02-10',
      status: 'completed',
      progress: 100
    },
    {
      id: 2,
      title: 'Frontend Development',
      dueDate: '2024-02-25',
      status: 'in-progress',
      progress: 75
    },
    {
      id: 3,
      title: 'Backend Integration',
      dueDate: '2024-03-05',
      status: 'pending',
      progress: 0
    },
    {
      id: 4,
      title: 'Testing & Deployment',
      dueDate: '2024-03-15',
      status: 'pending',
      progress: 0
    }
  ]

  const notes = [
    {
      id: 1,
      date: '2024-02-18',
      content: 'Client requested additional payment gateway integration. Need to research Stripe vs Paystack options.',
      type: 'reminder'
    },
    {
      id: 2,
      date: '2024-02-15',
      content: 'Frontend responsive design completed. Ready for client review.',
      type: 'note'
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'pending':
        return 'Pending'
      default:
        return 'Unknown'
    }
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const hasSubmissionOnDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return submissions.some(sub => sub.date === dateStr)
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Here you would typically add the note to the backend
      console.log('Adding note:', newNote)
      setNewNote('')
      setIsAddingNote(false)
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with Back Button */}
      <motion.div variants={staggerItem} className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-2 rounded-lg"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Back to Projects</span>
        </button>
      </motion.div>

      {/* Project Header */}
      <motion.div variants={staggerItem} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <FolderIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h1>
              {getStatusIcon(project.status)}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <UserIcon className="h-4 w-4" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress:</span>
                <div className="w-32 bg-gray-200 dark:bg-dark-surface rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-primary-600 dark:bg-primary-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{project.progress}%</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatAmount(parseInt(project.budget))}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 dark:bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Upload New Submission</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - GitHub Repository & Submission History */}
        <div className="lg:col-span-2 space-y-6">
          {/* GitHub Repository */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FolderIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Project Repository</span>
            </h2>
            
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View on GitHub</span>
            </a>
          </motion.div>

          {/* Submission History */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <DocumentIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Submission History</span>
            </h2>
            
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-surface rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <DocumentIcon className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {submission.fileName}
                      </span>
                    </div>
                    {submission.comment && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {submission.comment}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{submission.date}</span>
                      <span>{submission.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-1 rounded">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 p-1 rounded">
                                              <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Calendar & Milestones */}
        <div className="space-y-6">
          {/* Responsive Calendar */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Activity Calendar</span>
            </h2>
            
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-1 rounded"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 p-1 rounded"
              >
                <ArrowLeftIcon className="h-4 w-4 rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                <div key={`empty-${i}`} className="h-8" />
              ))}
              
              {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
                const hasSubmission = hasSubmissionOnDate(date)
                const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString()
                
                return (
                  <button
                    key={i + 1}
                    onClick={() => setSelectedDate(date)}
                    className={`h-8 text-xs rounded transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-surface'
                    }`}
                  >
                    <div className="relative">
                      {i + 1}
                      {hasSubmission && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-gray-50 dark:bg-dark-surface rounded-lg"
              >
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h4>
                {hasSubmissionOnDate(selectedDate) ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Submission uploaded on this date
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No activity on this date
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Milestone Tracker */}
          <motion.div variants={staggerItem} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <span>Milestone Tracker</span>
            </h2>
            
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-dark-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {milestone.title}
                    </h3>
                    {getStatusIcon(milestone.status)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-dark-surface rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getStatusColor(milestone.status)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${milestone.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Notes Section */}
      <motion.div variants={staggerItem} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <PencilIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span>Project Notes</span>
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingNote(true)}
            className="bg-primary-600 dark:bg-primary-500 text-white px-3 py-1 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Note</span>
          </motion.button>
        </div>

        {isAddingNote && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border"
          >
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note or reminder..."
              className="w-full h-24 px-3 py-2 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 resize-none"
            />
            <div className="flex items-center justify-end space-x-2 mt-3">
              <button
                onClick={() => {
                  setIsAddingNote(false)
                  setNewNote('')
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 p-1 rounded"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
              <button
                onClick={handleAddNote}
                className="bg-primary-600 dark:bg-primary-500 text-white px-3 py-1 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm font-medium mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Save Note
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-gray-50 dark:bg-dark-surface rounded-lg border-l-4 border-primary-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white mb-1">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {note.date}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  note.type === 'reminder' 
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {note.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
