import type { Metadata } from 'next'
import DashboardAuthGuard from '@/components/dashboard/DashboardAuthGuard'
import ExpertDashboardWrapper from '@/components/layouts/ExpertDashboardWrapper'

export const metadata: Metadata = {
  title: 'Expert Dashboard - Odysia',
  description: 'Expert dashboard for managing projects, milestones, and earnings',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardAuthGuard>
      <ExpertDashboardWrapper>
        {children}
      </ExpertDashboardWrapper>
    </DashboardAuthGuard>
  )
}
