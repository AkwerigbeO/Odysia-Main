'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  UserIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  StarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CameraIcon,
  LinkIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import FileUpload from '@/components/ui/FileUpload'
import api from '@/lib/axios'
import toast from 'react-hot-toast'

export default function Profile() {
  const { formatAmount } = useCurrency()
  const { user, refreshUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [availability, setAvailability] = useState('available')
  const [newSkill, setNewSkill] = useState('')
  const [newPortfolioItem, setNewPortfolioItem] = useState({ title: '', link: '', description: '' })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [showAvatarUpload, setShowAvatarUpload] = useState(false)

  // Fetch current avatar on mount
  useEffect(() => {
    if (user?.avatar) {
      setAvatarUrl(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${user.avatar}`)
    } else {
      setAvatarUrl(null)
    }
  }, [user])

  const profile = {
    name: 'John Expert',
    email: 'john.expert@example.com',
    bio: 'Experienced full-stack developer with 5+ years of expertise in React, Node.js, and modern web technologies.',
    location: 'Lagos, Nigeria',
    hourlyRate: formatAmount(25000),
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
    portfolio: [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        link: 'https://example.com/project1',
        image: '/api/placeholder/300/200'
      },
      {
        id: 2,
        title: 'Mobile App Design',
        description: 'UI/UX design for mobile application',
        link: 'https://example.com/project2',
        image: '/api/placeholder/300/200'
      }
    ],
    badges: [
      { name: 'Verified', icon: ShieldCheckIcon, color: 'bg-blue-500' },
      { name: 'Top Rated', icon: StarIcon, color: 'bg-yellow-500' },
      { name: 'Available', icon: CheckIcon, color: 'bg-green-500' }
    ]
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill)) {
      setNewSkill('')
    }
  }

  const handleAddPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.link) {
      setNewPortfolioItem({ title: '', link: '', description: '' })
    }
  }

  const getAvatarSrc = () => {
    return avatarUrl
  }

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
            Profile & Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile and showcase your work
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <PencilIcon className="h-4 w-4" />
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <motion.div variants={staggerItem} className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={getAvatarSrc() || ''}
                    alt={user?.name || 'Profile'}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {(user?.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                )}
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAvatarUpload(true)}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
                  >
                    <CameraIcon className="h-4 w-4" />
                  </motion.button>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.name || profile.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {profile.badges.map((badge) => (
                      <div key={badge.name} className={`${badge.color} p-1 rounded-full`}>
                        <badge.icon className="h-4 w-4 text-white" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <UserIcon className="h-4 w-4" />
                    <span>{user?.email || profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <GlobeAltIcon className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>{profile.hourlyRate}/hour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About Me
            </h3>
            {isEditing ? (
              <textarea
                defaultValue={profile.bio}
                className="w-full h-32 px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
              {isEditing && (
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  + Add Skill
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                  <span>{skill}</span>
                  {isEditing && (
                    <button className="text-primary-500 hover:text-primary-700">
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddSkill}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add
                </motion.button>
              </div>
            )}
          </div>

          {/* Portfolio */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio</h3>
              {isEditing && (
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  + Add Project
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.portfolio.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-32 bg-gray-100 dark:bg-dark-surface flex items-center justify-center">
                    <LinkIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {item.description}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View Project →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={staggerItem} className="space-y-6">
          {/* Availability Status */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Availability</h3>
            <div className="space-y-3">
              {['available', 'busy', 'unavailable'].map((status) => (
                <label key={status} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={status}
                    checked={availability === status}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="text-primary-600"
                  />
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${status === 'available' ? 'bg-green-500' :
                      status === 'busy' ? 'bg-orange-500' : 'bg-red-500'
                      }`}></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{status}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Badges & Achievements</h3>
            <div className="space-y-3">
              {profile.badges.map((badge) => (
                <div key={badge.name} className="flex items-center space-x-3">
                  <div className={`${badge.color} p-2 rounded-lg`}>
                    <badge.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Projects Completed', value: '24' },
                { label: 'Client Satisfaction', value: '98%' },
                { label: 'On-Time Delivery', value: '100%' },
                { label: 'Response Time', value: '2 hours' }
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Avatar Upload Modal */}
      {showAvatarUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Profile Picture</h3>
              <button onClick={() => setShowAvatarUpload(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <FileUpload
              accept="image/jpeg,image/png,image/webp"
              maxSize={5}
              label="Upload your photo"
              onUpload={async (file) => {
                try {
                  await api.put('/auth/profile', { avatar: file.fileId })
                  await refreshUser()
                  setShowAvatarUpload(false)
                  toast.success('Profile picture updated!')
                } catch (error) {
                  console.error('Failed to update avatar:', error)
                  toast.error('Failed to update profile picture')
                }
              }}
              onError={(error) => toast.error(error)}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}