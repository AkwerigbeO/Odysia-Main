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
  const [notifications, setNotifications] = useState(0)
  const [messages, setMessages] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  // Determine active section from pathname
  const activeSection = sidebarItems.find(item => {
    // Exact match for dashboard root
    if (item.id === 'dashboard' && pathname === '/client-dashboard') return true
    // Starts with for other sections (e.g. /client-dashboard/projects/123)
    if (item.id !== 'dashboard' && pathname?.startsWith(item.href)) return true
    return false
  })?.id || 'dashboard'

  // Empty for now until we move notification logic to context or layout fetch
  const recentNotifications: any[] = []

  const userProfile = {
    name: user?.name || 'Client',
    email: user?.email || '',
    avatar: '' // Add avatar if available in user object later
  }

  const handleLogout = () => {
    logout()
    // router.push('/') // logout already handles redirect
  }

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev => Math.max(0, prev - 1))
  }

  const handleMessagesClick = () => {
    router.push('/client-dashboard/messages')
  }

  const navbarContent = (
    <Navbar
      dashboardType="client"
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