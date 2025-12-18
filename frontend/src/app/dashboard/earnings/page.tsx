import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Earnings from '@/components/dashboard/Earnings'

export default function EarningsPage() {
  return (
    <DashboardLayout activeSection="earnings">
      <Earnings />
    </DashboardLayout>
  )
} 