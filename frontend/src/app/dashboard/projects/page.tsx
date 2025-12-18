import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Projects from '@/components/dashboard/Projects'

export default function ProjectsPage() {
  return (
    <DashboardLayout activeSection="projects">
      <Projects />
    </DashboardLayout>
  )
} 