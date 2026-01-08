'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline'
import api from '@/lib/axios'
import { toast } from 'react-hot-toast'

interface ExpertApplication {
    _id: string
    fullName: string
    email: string
    phone: string
    country: string
    skills: string[]
    bio: string
    portfolioLink?: string
    githubLink?: string
    linkedinLink?: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: string
}

export default function AdminDashboard() {
    const [applications, setApplications] = useState<ExpertApplication[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
    const [processingId, setProcessingId] = useState<string | null>(null)

    const fetchApplications = async () => {
        setIsLoading(true)
        try {
            const { data } = await api.get('/expert-applications')
            setApplications(data.data)
        } catch (error) {
            console.error('Failed to fetch applications', error)
            toast.error('Failed to load applications')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchApplications()
    }, [])

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        if (!confirm(`Are you sure you want to ${action} this application?`)) return

        setProcessingId(id)
        try {
            await api.put(`/expert-applications/${id}/${action}`)
            toast.success(`Application ${action}d successfully`)
            fetchApplications() // Refresh list
        } catch (error) {
            console.error(`Failed to ${action}`, error)
            toast.error(`Failed to ${action} application`)
        } finally {
            setProcessingId(null)
        }
    }

    const filteredApps = applications.filter(app =>
        filter === 'all' ? true : app.status === filter
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Expert Applications</h1>

                {/* Filter Tabs */}
                <div className="flex space-x-1 bg-white dark:bg-dark-surface p-1 rounded-lg border border-gray-200 dark:border-dark-border">
                    {['all', 'pending', 'approved', 'rejected'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab as any)}
                            className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${filter === tab
                                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Applications List */}
            <div className="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading applications...</div>
                ) : filteredApps.length === 0 ? (
                    <div className="p-12 text-center">
                        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No applications found</h3>
                        <p className="mt-1 text-sm text-gray-500">No applications match the current filter.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-dark-border">
                        {filteredApps.map((app) => (
                            <li key={app._id} className="p-6 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Main Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{app.fullName}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                                {app.status.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                                            <p>Email: <span className="text-gray-900 dark:text-white font-medium">{app.email}</span></p>
                                            <p>Phone: <span className="text-gray-900 dark:text-white font-medium">{app.phone}</span></p>
                                            <p>Country: <span className="text-gray-900 dark:text-white font-medium">{app.country}</span></p>
                                            <p>Applied: <time dateTime={app.createdAt}>{new Date(app.createdAt).toLocaleDateString()}</time></p>
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                            <span className="font-medium text-gray-900 dark:text-white">Bio:</span> {app.bio}
                                        </p>

                                        {/* Skills Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {app.skills.map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 text-xs rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-4 text-sm">
                                            {app.portfolioLink && <a href={app.portfolioLink} target="_blank" rel="noopener" className="text-primary-600 hover:underline">Portfolio</a>}
                                            {app.githubLink && <a href={app.githubLink} target="_blank" rel="noopener" className="text-primary-600 hover:underline">GitHub</a>}
                                            {app.linkedinLink && <a href={app.linkedinLink} target="_blank" rel="noopener" className="text-primary-600 hover:underline">LinkedIn</a>}
                                            {(app as any).resume && (
                                                <div className="flex gap-4">
                                                    <a
                                                        href={(app as any).resume.startsWith('http')
                                                            ? (app as any).resume
                                                            : (app as any).resume.startsWith('/')
                                                                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${app.resume}`
                                                                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${app.resume}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary-600 hover:underline flex items-center"
                                                    >
                                                        View Resume
                                                    </a>
                                                    <a
                                                        href={(app as any).resume.startsWith('http')
                                                            ? `${(app as any).resume}${(app as any).resume.includes('?') ? '&' : '?'}download=true`
                                                            : (app as any).resume.startsWith('/')
                                                                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${app.resume}?download=true`
                                                                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${app.resume}?download=true`
                                                        }
                                                        download
                                                        className="text-primary-600 hover:underline flex items-center"
                                                    >
                                                        Download Resume
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {app.status === 'pending' && (
                                        <div className="flex lg:flex-col gap-3 justify-end min-w-[140px]">
                                            <button
                                                onClick={() => handleAction(app._id, 'approve')}
                                                disabled={!!processingId}
                                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {processingId === app._id ? 'Processing...' : (
                                                    <>
                                                        <CheckCircleIcon className="h-4 w-4" />
                                                        <span>Approve</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleAction(app._id, 'reject')}
                                                disabled={!!processingId}
                                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                <XCircleIcon className="h-4 w-4" />
                                                <span>Reject</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
