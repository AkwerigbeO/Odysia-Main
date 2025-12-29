'use client'

import { useState } from 'react'
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
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(2)
  const router = useRouter()
  // Add usePathname
  const pathname = require('next/navigation').usePathname()

  // Determine active section from pathname
  const activeSection = sidebarItems.find(item => {
    if (item.id === 'dashboard' && pathname === '/dashboard') return true
    if (item.id !== 'dashboard' && pathname?.startsWith(item.href)) return true
    return false
  })?.id || 'dashboard'

  // Sample notifications data for experts (Keep placeholder for now but dynamic structure)
  const recentNotifications = [
    {
      id: 1,
      type: 'approval',
      message: 'Your profile has been verified',
      time: '1 day ago',
      urgent: false,
      read: true
    }
  ]

  const userProfile = {
    name: user?.name || 'Expert',
    email: user?.email || '',
    avatar: user?.name?.charAt(0) || 'E'
  }

  const handleLogout = () => {
    logout()
  }

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev => Math.max(0, prev - 1))
  }

  const handleMessagesClick = () => {
    router.push('/dashboard/messages')
  }

  const navbarContent = (
    <Navbar
      dashboardType="expert"
      notifications={recentNotifications}
      messageCount={messages}
      userProfile={userProfile}
      onLogout={handleLogout}
      onNotificationClick={handleNotificationClick}
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