'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/axios'

export default function ClientNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/notifications')
        setNotifications(data)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">All Notifications</h1>
      <div className="space-y-3 sm:space-y-4">
        {loading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">No new notifications</p>
        ) : notifications.map((notification) => (
          <div
            key={notification._id}
            className={`p-3 sm:p-4 rounded-lg border ${notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
              }`}
          >
            <p className="text-sm sm:text-base text-gray-900 dark:text-black">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}