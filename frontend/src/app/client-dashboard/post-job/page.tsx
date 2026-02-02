'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { ProjectIcon } from '@/components/icons'
import {
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    ClockIcon,
    DocumentTextIcon,
    TagIcon,
    CloudArrowUpIcon
} from '@heroicons/react/24/outline'

export default function PostJobPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false)
            alert("Job posted! (Simulated)")
        }, 1500)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                className="glass-card p-8 rounded-3xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Post a New Job</h1>
                    <p className="text-gray-600 dark:text-gray-400">Describe your project requirements to match with top experts.</p>
                </div>
            </motion.div>

            {/* Form */}
            <motion.form
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Basic Info */}
                <motion.div variants={staggerItem} className="glass-card p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-gray-700/30">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <DocumentTextIcon className="w-5 h-5 text-primary-500" />
                        Project Details
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
                            <input
                                type="text"
                                placeholder="e.g. E-commerce Website Redesign"
                                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                            <textarea
                                rows={5}
                                placeholder="Describe the deliverables, timeline, and any specific requirements..."
                                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                required
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Budget & Timeline */}
                <motion.div variants={staggerItem} className="glass-card p-6 sm:p-8 rounded-2xl border border-white/20 dark:border-gray-700/30">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <CurrencyDollarIcon className="w-6 h-6 text-green-500" />
                        Budget & Timeline
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Budget ($)</label>
                            <div className="relative">
                                <CurrencyDollarIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="5000"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration Estimate</label>
                            <div className="relative">
                                <ClockIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                <select className="w-full pl-11 pr-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer">
                                    <option>Less than 1 month</option>
                                    <option>1-3 months</option>
                                    <option>3-6 months</option>
                                    <option>More than 6 months</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={staggerItem} className="flex gap-4 justify-end pt-4">
                    <button type="button" className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                        Save Draft
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-gradient px-8 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Posting...
                            </>
                        ) : (
                            <>
                                <CloudArrowUpIcon className="w-5 h-5" />
                                Post Job
                            </>
                        )}
                    </button>
                </motion.div>

            </motion.form>
        </div>
    )
}
