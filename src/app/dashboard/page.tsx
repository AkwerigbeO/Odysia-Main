'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardHome from '@/components/dashboard/DashboardHome'

export default function DashboardPage() {
  return (
    <DashboardLayout activeSection="dashboard">
      <DashboardHome />
    </DashboardLayout>
  )
} 