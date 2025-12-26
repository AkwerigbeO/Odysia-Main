'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CalendarIcon, MapPinIcon, CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/lib/axios'
import { useAuth } from '@/lib/contexts/AuthContext'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { toast } from 'react-hot-toast'

interface Event {
    _id: string
    title: string
    date: string
    location: string
}

export default function RegisterEventPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { user, loading: authLoading } = useAuth()
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [registering, setRegistering] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // Redirect if not logged in
        if (!authLoading && !user) {
            router.push(`/client-login?redirect=/events/${params.id}/register`);
            return;
        }

        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${params.id}`)
                setEvent(data)
            } catch (err) {
                console.error('Failed to fetch event', err)
                setError('Failed to load event details')
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchEvent()
        }
    }, [params.id, user, authLoading, router])

    const handleRegister = async () => {
        setRegistering(true)
        setError('')

        try {
            await api.post(`/events/${params.id}/register`)
            setIsSuccess(true)
        } catch (err: any) {
            console.error('Registration failed', err)
            const errorMsg = err.response?.data?.error || 'Failed to register for event.'
            setError(errorMsg)
            toast.error(errorMsg)
        } finally {
            setRegistering(false)
        }
    }

    if (loading || authLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        )
    }

    if (!event) return null

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden"
                    >
                        {isSuccess ? (
                            <div className="p-8 text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto"
                                >
                                    <CheckCircleIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                                </motion.div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Registration Successful!</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    You have successfully registered for <strong>{event.title}</strong>.
                                </p>
                                <div className="pt-6">
                                    <Link
                                        href="/dashboard"
                                        className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 md:p-10">
                                <Link href={`/events/${params.id}`} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6">
                                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                    Cancel and go back
                                </Link>

                                <motion.div variants={staggerItem} className="text-center mb-8">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Registration</h1>
                                    <p className="text-gray-600 dark:text-gray-400">You are about to register for:</p>
                                </motion.div>

                                <motion.div variants={fadeInUp} className="bg-gray-50 dark:bg-dark-card rounded-xl p-6 mb-8 border border-gray-100 dark:border-dark-border">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{event.title}</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <CalendarIcon className="h-5 w-5 mr-3 text-primary-500" />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <MapPinIcon className="h-5 w-5 mr-3 text-primary-500" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {error && (
                                    <motion.div variants={fadeInUp} className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                                        {error}
                                    </motion.div>
                                )}

                                <motion.div variants={fadeInUp} className="space-y-4">
                                    <button
                                        onClick={handleRegister}
                                        disabled={registering}
                                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {registering ? 'Processing...' : 'Confirm Registration'}
                                    </button>
                                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                        By registering, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
