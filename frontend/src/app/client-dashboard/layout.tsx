import ClientDashboardWrapper from '@/components/layouts/ClientDashboardWrapper'

export default function ClientDashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientDashboardWrapper>
      {children}
    </ClientDashboardWrapper>
  )
}
