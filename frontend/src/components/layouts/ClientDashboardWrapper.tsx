'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  HomeIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  UserIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from './DashboardLayout'
import Navbar from './Navbar'
import { useCurrency } from '@/lib/contexts/CurrencyContext'
import { useAuth } from '@/lib/contexts/AuthContext'
import api from '@/lib/axios'
import { useEffect } from 'react'

interface ClientDashboardWrapperProps {
  children: React.ReactNode
  activeSection?: string
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, href: '/client-dashboard' },
  { id: 'projects', label: 'Projects', icon: FolderIcon, href: '/client-dashboard/projects' },
  { id: 'proposals', label: 'Proposals', icon: ChatBubbleLeftRightIcon, href: '/client-dashboard/proposals' },
  { id: 'messages', label: 'Messages', icon: ChatBubbleLeftRightIcon, href: '/client-dashboard/messages' },
  { id: 'payments', label: 'Payments', icon: CurrencyDollarIcon, href: '/client-dashboard/payments' },
  { id: 'profile', label: 'Settings', icon: UserIcon, href: '/client-dashboard/settings' },
  { id: 'support', label: 'Support', icon: QuestionMarkCircleIcon, href: '/client-dashboard/support' }
]

export default function ClientDashboardWrapper({ children }: ClientDashboardWrapperProps) {
  const { user, logout } = useAuth()
  const { formatAmount } = useCurrency()
  const [notifications, setNotifications] = useState<any[]>([])
  const [messages, setMessages] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

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
    // Exact match for dashboard root
    if (item.id === 'dashboard' && pathname === '/client-dashboard') return true
    // Starts with for other sections (e.g. /client-dashboard/projects/123)
    if (item.id !== 'dashboard' && pathname?.startsWith(item.href)) return true
    return false
  })?.id || 'dashboard'

  const userProfile = {
    name: user?.name || 'Client',
    email: user?.email || '',
    avatar: user?.avatar ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${user.avatar}` : undefined
  }

  const handleLogout = () => {
    logout()
    // router.push('/') // logout already handles redirect
  }

  const handleNotificationClick = async (notificationId: string | number) => {
    try {
      await api.put(`/notifications/${notificationId}/read`)
      // Optimistic update
      setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n))
    } catch (error) {
      console.error('Failed to mark notification read:', error)
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

  const handleMessagesClick = () => {
    router.push('/client-dashboard/messages')
  }

  const navbarContent = (
    <Navbar
      dashboardType="client"
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
      dashboardType="client"
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