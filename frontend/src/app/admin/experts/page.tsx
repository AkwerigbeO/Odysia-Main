'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    MagnifyingGlassIcon,
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon,
    StarIcon,
    BriefcaseIcon,
    EyeIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem } from '@/lib/animations'
import api from '@/lib/axios'
import toast from 'react-hot-toast'

interface Expert {
    _id: string
    name: string
    email: string
    phone: string
    country: string
    skills: string[]
    bio: string
    rating: number
    verified: boolean
    avatar?: string
    title?: string
    portfolioLink?: string
    githubLink?: string
    linkedinLink?: string
}

export default function AdminExperts() {
    const [experts, setExperts] = useState<Expert[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchExperts()
    }, [])

    const fetchExperts = async () => {
        try {
            const { data } = await api.get('/expert/admin/all')
            if (data.success) {
                setExperts(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch experts:', error)
            toast.error('Failed to load experts')
        } finally {
            setLoading(false)
        }
    }

    const filteredExperts = experts.filter(expert =>
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <motion.div variants={staggerItem}>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Platform Experts
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Manage and view all verified experts on the platform
                            </p>
                        </motion.div>

                        <motion.div variants={staggerItem} className="relative max-w-sm w-full">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or skill..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                            />
                        </motion.div>
                    </div>

                    {/* Experts Grid */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading experts...</p>
                        </div>
                    ) : filteredExperts.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-dark-card rounded-xl border border-dashed border-gray-300 dark:border-dark-border">
                            <UserCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No experts found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredExperts.map((expert) => (
                                <motion.div
                                    key={expert._id}
                                    variants={staggerItem}
                                    className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => {
                                        setSelectedExpert(expert)
                                        setShowModal(true)
                                    }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden">
                                                    {expert.avatar ? (
                                                        <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${expert.avatar}`} alt={expert.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <UserCircleIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{expert.name}</h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{expert.title || 'Expert'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded text-yellow-700 dark:text-yellow-400 text-xs font-medium">
                                                <StarIcon className="h-3 w-3 mr-1 fill-current" />
                                                {expert.rating || '0.0'}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                                            {expert.bio || 'No bio provided'}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-4 max-h-16 overflow-hidden">
                                            {expert.skills.slice(0, 3).map((skill, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 text-[10px] font-medium rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                            {expert.skills.length > 3 && (
                                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 text-[10px] font-medium rounded">
                                                    +{expert.skills.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex justify-between items-center text-xs text-gray-500">
                                            <span className="flex items-center">
                                                <GlobeAltIcon className="h-3 w-3 mr-1" />
                                                {expert.country}
                                            </span>
                                            <button className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center">
                                                Details <EyeIcon className="h-3 w-3 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Expert Detail Modal */}
            {showModal && selectedExpert && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden">
                                        {selectedExpert.avatar ? (
                                            <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/files/${selectedExpert.avatar}`} alt={selectedExpert.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <UserCircleIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedExpert.name}</h2>
                                        <p className="text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wider text-xs">{selectedExpert.title || 'Expert'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <EyeIcon className="h-6 w-6 rotate-45" /> {/* Close icon substitution */}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <EnvelopeIcon className="h-5 w-5 mr-3 text-primary-500" />
                                        {selectedExpert.email}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <PhoneIcon className="h-5 w-5 mr-3 text-primary-500" />
                                        {selectedExpert.phone}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <GlobeAltIcon className="h-5 w-5 mr-3 text-primary-500" />
                                        {selectedExpert.country}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <StarIcon className="h-5 w-5 mr-3 text-yellow-500" />
                                        Rating: {selectedExpert.rating || 0} / 5.0
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <BriefcaseIcon className="h-5 w-5 mr-3 text-primary-500" />
                                        Status: {selectedExpert.verified ? 'Verified Expert' : 'Approval Pending'}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-3">Professional Bio</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {selectedExpert.bio || 'Expert has not provided a bio yet.'}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-3">Skills & Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedExpert.skills.map((skill, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full border border-primary-100 dark:border-primary-900/20">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
                                >
                                    Close
                                </button>
                                <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
