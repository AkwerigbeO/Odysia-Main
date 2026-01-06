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

  // State for form fields
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    hourlyRate: '',
    skills: [] as string[],
    portfolioLink: '',
    githubLink: '',
    linkedinLink: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || '',
        location: user.country || '',
        hourlyRate: user.hourlyRate?.toString() || '',
        skills: user.skills || [],
        portfolioLink: user.portfolioLink || '',
        githubLink: user.githubLink || '',
        linkedinLink: user.linkedinLink || ''
      })
    }
  }, [user])

  const handleSave = async () => {
    try {
      await api.put('/auth/profile', {
        bio: formData.bio,
        country: formData.location,
        hourlyRate: Number(formData.hourlyRate),
        skills: formData.skills,
        portfolioLink: formData.portfolioLink,
        githubLink: formData.githubLink,
        linkedinLink: formData.linkedinLink
      })
      await refreshUser()
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error('Failed to update profile')
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
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
            onClick={() => {
              if (isEditing) {
                handleSave()
              } else {
                setIsEditing(true)
              }
            }}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            {isEditing ? <CheckIcon className="h-4 w-4" /> : <PencilIcon className="h-4 w-4" />}
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
                    {user?.name || 'Expert Name'}
                  </h2>
                  {user?.verified && (
                    <div className="bg-blue-500 p-1 rounded-full" title="Verified Expert">
                      <ShieldCheckIcon className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <UserIcon className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <GlobeAltIcon className="h-4 w-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="px-2 py-1 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded text-sm"
                        placeholder="Location (Country)"
                      />
                    ) : (
                      <span>{formData.location || 'Location not set'}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    {isEditing ? (
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        className="px-2 py-1 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded text-sm w-24"
                        placeholder="Rate"
                      />
                    ) : (
                      <span>{formatAmount(Number(formData.hourlyRate) || 0)}/hour</span>
                    )}
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
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full h-32 px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                {formData.bio || 'No bio provided.'}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                  <span>{skill}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
              {formData.skills.length === 0 && !isEditing && (
                <p className="text-gray-500 text-sm italic">No skills listed.</p>
              )}
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

          {/* Portfolio / Links */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Links</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Portfolio Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.portfolioLink}
                      onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm"
                      placeholder="https://..."
                    />
                  ) : (
                    <a href={formData.portfolioLink || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 ${formData.portfolioLink ? 'text-primary-600 hover:underline' : 'text-gray-400 pointer-events-none'}`}>
                      <GlobeAltIcon className="h-5 w-5" />
                      <span>{formData.portfolioLink || 'No link added'}</span>
                    </a>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Profile</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.githubLink}
                      onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm"
                      placeholder="https://github.com/..."
                    />
                  ) : (
                    <a href={formData.githubLink || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 ${formData.githubLink ? 'text-primary-600 hover:underline' : 'text-gray-400 pointer-events-none'}`}>
                      <LinkIcon className="h-5 w-5" />
                      <span>{formData.githubLink || 'No link added'}</span>
                    </a>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn Profile</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.linkedinLink}
                      onChange={(e) => setFormData({ ...formData, linkedinLink: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm"
                      placeholder="https://linkedin.com/in/..."
                    />
                  ) : (
                    <a href={formData.linkedinLink || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 ${formData.linkedinLink ? 'text-primary-600 hover:underline' : 'text-gray-400 pointer-events-none'}`}>
                      <LinkIcon className="h-5 w-5" />
                      <span>{formData.linkedinLink || 'No link added'}</span>
                    </a>
                  )}
                </div>
              </div>
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

          {/* Stats */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Client Rating', value: `${user?.rating || 0}/5.0` },
                { label: 'Active Chats', value: user?.activeChats || 0 },
                { label: 'Pending Actions', value: user?.pendingActions || 0 }
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