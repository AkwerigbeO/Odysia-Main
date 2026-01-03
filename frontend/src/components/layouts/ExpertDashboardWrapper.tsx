'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  HomeIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from './DashboardLayout'
import Navbar from './Navbar'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import api from '@/lib/axios'

interface ExpertDashboardWrapperProps {
  children: React.ReactNode
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard Home', icon: HomeIcon, href: '/dashboard' },
  { id: 'projects', label: 'My Projects', icon: FolderIcon, href: '/dashboard/projects' },
  { id: 'milestones', label: 'Milestones & Submissions', icon: CheckCircleIcon, href: '/dashboard/milestones' },
  { id: 'messages', label: 'Messages', icon: ChatBubbleLeftRightIcon, href: '/dashboard/messages' },
  { id: 'earnings', label: 'Earnings', icon: CurrencyDollarIcon, href: '/dashboard/earnings' },
  { id: 'profile', label: 'Portfolio/Profile', icon: UserIcon, href: '/dashboard/profile' },
  { id: 'support', label: 'Support & Help', icon: QuestionMarkCircleIcon, href: '/dashboard/support' }
]

export default function ExpertDashboardWrapper({ children }: { children: React.ReactNode }) {
  const { formatAmount } = useCurrency()
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [messages, setMessages] = useState(0)
  const router = useRouter()
  // Add usePathname
  const pathname = require('next/navigation').usePathname()

  const fetchUnreadCount = async () => {
    try {
      const { data } = await api.get('/messages/conversations')
      const totalUnread = data.data.reduce((acc: number, conv: any) => acc + (conv.unreadCount || 0), 0)
      setMessages(totalUnread)
    } catch (error) {
      console.error('Failed to fetch unread messages:', error)
    }
  }

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications')
      // Adapt backend format to frontend expectation
      const adaptedNotifications = data.data.map((n: any) => ({
        id: n._id,
        type: n.type,
        message: n.message,
        time: new Date(n.createdAt).toLocaleDateString(), // Simple format for now
        urgent: n.type === 'payment' || n.type === 'system',
        read: n.read
      }))
      setNotifications(adaptedNotifications)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  // Fetch unread messages count
  useEffect(() => {
    if (user) {
      fetchUnreadCount()
      fetchNotifications()

      // Optional: Poll every 30 seconds
      const interval = setInterval(() => {
        fetchUnreadCount()
        fetchNotifications()
      }, 30000)

      // Listen for local read events to update immediately
      const handleMessageRead = () => fetchUnreadCount()
      window.addEventListener('messages-read', handleMessageRead)

      return () => {
        clearInterval(interval)
        window.removeEventListener('messages-read', handleMessageRead)
      }
    }
  }, [user])

  // Determine active section from pathname
  const activeSection = sidebarItems.find(item => {
    if (item.id === 'dashboard' && pathname === '/dashboard') return true
    if (item.id !== 'dashboard' && pathname?.startsWith(item.href)) return true
    return false
  })?.id || 'dashboard'

  const userProfile = {
    name: user?.name || 'Expert',
    email: user?.email || '',
    avatar: user?.avatar ? `/api/files/${user.avatar}` : undefined
  }

  const handleLogout = () => {
    logout()
  }

  const handleNotificationClick = async (notificationId: number | string) => {
    try {
      console.log('Marking single notification read:', notificationId)
      await api.put(`/notifications/${notificationId}/read`)
      // Optimistic update
      setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n))
    } catch (error) {
      console.error('Failed to mark notification read:', error)
    }
  }

  const handleMarkAllRead = async () => {
    try {
      console.log('Sending request to mark all as read...')
      await api.put('/notifications/read-all')
      console.log('Request success, updating state...')
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (error) {
      console.error('Failed to mark all read:', error)
    }
  }

  const handleMessagesClick = () => {
    router.push('/dashboard/messages')
  }

  const navbarContent = (
    <Navbar
      dashboardType="expert"
      notifications={notifications}
      messageCount={messages}
      userProfile={userProfile}
      onLogout={handleLogout}
      onNotificationClick={handleNotificationClick}
      onMarkAllRead={handleMarkAllRead}
      onMessagesClick={handleMessagesClick}
    />
  )

  return (
    <DashboardLayout
      dashboardType="expert"
      sidebarItems={sidebarItems}
      activeSection={activeSection}
      userProfile={userProfile}
      onLogout={handleLogout}
      customNavbarContent={navbarContent}
    >
      {children}
    </DashboardLayout>
  )
}