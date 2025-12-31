'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/axios'
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications')
      setNotifications(data.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`)
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n))
    } catch (error) {
      console.error('Failed to mark read:', error)
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all')
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (error) {
      console.error('Failed to mark all read:', error)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
      case 'message': return <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
      case 'project': return <InformationCircleIcon className="h-6 w-6 text-purple-600" />
      case 'system': return <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
      default: return <BellIcon className="h-6 w-6 text-gray-600" />
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading notifications...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <button
          onClick={handleMarkAllRead}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                onClick={() => handleMarkAsRead(notification._id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                      {notification.title || notification.message}
                    </p>
                    {notification.title && (
                      <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-blue-600 block"></span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}