import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedCursor from '@/components/AnimatedCursor'
import ScrollProgress from '@/components/ScrollProgress'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <AnimatedCursor />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
