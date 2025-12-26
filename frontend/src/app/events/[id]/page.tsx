'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CalendarIcon, MapPinIcon, UserGroupIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/lib/axios'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

interface Event {
    _id: string
    title: string
    description: string
    date: string
    location: string
    capacity: number
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
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

        fetchEvent()
    }, [params.id])

    if (loading) {
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

    if (error || !event) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">{error || 'The event you are looking for does not exist.'}</p>
                    <Link href="/events" className="text-primary-600 hover:text-primary-700 font-medium">
                        Back to Events
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden"
                    >
                        {/* Header/Banner Area (Could handle images later) */}
                        <div className="bg-primary-600 h-32 md:h-48 relative">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                <Link href="/events" className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors">
                                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                    Back to Events
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                                <div>
                                    <motion.h1
                                        variants={fadeInUp}
                                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                                    >
                                        {event.title}
                                    </motion.h1>

                                    <motion.div variants={staggerItem} className="space-y-3">
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <CalendarIcon className="h-5 w-5 mr-3 text-primary-500" />
                                            <span className="text-lg">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <MapPinIcon className="h-5 w-5 mr-3 text-primary-500" />
                                            <span className="text-lg">{event.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <UserGroupIcon className="h-5 w-5 mr-3 text-primary-500" />
                                            <span className="text-lg">Capacity: {event.capacity}</span>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div variants={fadeInUp} className="flex-shrink-0">
                                    <Link
                                        href={`/events/${event._id}/register`}
                                        className="block w-full md:w-auto text-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                                    >
                                        Register Now
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-dark-border pt-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About the Event</h2>
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                                    <p className="whitespace-pre-line leading-relaxed">{event.description}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
