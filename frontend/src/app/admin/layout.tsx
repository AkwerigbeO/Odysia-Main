'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    HomeIcon,
    UsersIcon,
    DocumentTextIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/lib/contexts/AuthContext'
import Logo from '@/components/Logo'

const sidebarItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Experts', href: '/admin/experts', icon: UsersIcon }, // Future
    { name: 'Applications', href: '/admin/expert-applications', icon: DocumentTextIcon },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { logout, user } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-dark-border">
                        <Logo width={120} height={40} className="h-8 w-auto" alt="Odysia Admin" />
                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            ADMIN
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                        <div className="flex items-center mb-4 px-2">
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center overflow-hidden">
                                {user?.avatar ? (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${user.avatar}`}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white text-sm md:text-base font-bold">
                                        {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'A'}
                                    </span>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{user?.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                        >
                            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border flex items-center px-4 justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <span className="font-semibold text-gray-900 dark:text-white">Admin Dashboard</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
