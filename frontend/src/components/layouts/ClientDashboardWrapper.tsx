'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function ClientDashboardWrapper({ children, activeSection = 'dashboard' }: ClientDashboardWrapperProps) {
  const { formatAmount } = useCurrency()
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(2)
  const router = useRouter()

  // Sample notifications data for clients
  const recentNotifications = [
    {
      id: 1,
      type: 'proposal',
      message: 'New proposal received for "E-commerce Website" project',
      time: '2 hours ago',
      urgent: true,
      read: false
    },
    {
      id: 2,
      type: 'payment',
      message: `Payment of ${formatAmount(250000)} has been processed for Mobile App project`,
      time: '1 day ago',
      urgent: false,
      read: false
    },
    {
      id: 3,
      type: 'milestone',
      message: 'Project milestone "UI Design" has been completed',
      time: '2 days ago',
      urgent: false,
      read: true
    },
    {
      id: 4,
      type: 'message',
      message: 'New message from Alex Chen regarding project updates',
      time: '3 days ago',
      urgent: false,
      read: true
    }
  ]

  const userProfile = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com'
  }

  const handleLogout = () => {
    router.push('/')
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