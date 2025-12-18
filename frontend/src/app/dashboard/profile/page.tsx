import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Profile from '@/components/dashboard/Profile'

export default function ProfilePage() {
  return (
    <DashboardLayout activeSection="profile">
      <Profile />
    </DashboardLayout>
  )
} 