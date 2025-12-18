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
  activeSection?: string
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

export default function ExpertDashboardWrapper({ children, activeSection = 'dashboard' }: ExpertDashboardWrapperProps) {
  const { formatAmount } = useCurrency()
  const { logout } = useAuth()
  const [notifications, setNotifications] = useState(3)
  const [messages, setMessages] = useState(2)
  const router = useRouter()

  // Sample notifications data for experts
  const recentNotifications = [
    {
      id: 1,
      type: 'deadline',
      message: 'Project "E-commerce Website" milestone due in 2 days',
      time: '2 hours ago',
      urgent: true,
      read: false
    },
    {
      id: 2,
      type: 'approval',
      message: 'Your submission for "Mobile App Design" has been approved',
      time: '1 day ago',
      urgent: false,
      read: false
    },
    {
      id: 3,
      type: 'payment',
      message: `Payment of ${formatAmount(150000)} has been released to your account`,
      time: '2 days ago',
      urgent: false,
      read: true
    },
    {
      id: 4,
      type: 'message',
      message: 'New message from TechCorp Ltd regarding project updates',
      time: '3 days ago',
      urgent: false,
      read: true
    }
  ]

  const userProfile = {
    name: 'John Expert',
    email: 'expert@odysia.com'
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