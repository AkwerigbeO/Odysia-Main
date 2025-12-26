'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/lib/axios'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'

interface Event {
    _id: string
    title: string
    description: string
    date: string
    location: string
    capacity: number
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await api.get('/events')
                // Check if data is paginated response
                if (data.success && data.data) {
                    setEvents(data.data)
                } else {
                    // Fallback if structure is different (e.g. array)
                    setEvents(Array.isArray(data) ? data : [])
                }
            } catch (err) {
                console.error('Failed to fetch events', err)
                setError('Failed to load events')
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.div variants={staggerItem} className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Upcoming Events
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Discover and join exciting events in your area
                            </p>
                        </motion.div>

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500 py-10">{error}</div>
                        ) : (
                            <motion.div
                                variants={staggerItem}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {events.map((event) => (
                                    <motion.div
                                        key={event._id}
                                        variants={fadeInUp}
                                        whileHover={{ y: -5 }}
                                        className="bg-white dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-dark-border"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                                {event.description}
                                            </p>

                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                                    <CalendarIcon className="h-5 w-5 mr-2" />
                                                    {new Date(event.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                                    <MapPinIcon className="h-5 w-5 mr-2" />
                                                    {event.location}
                                                </div>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                                    <UserGroupIcon className="h-5 w-5 mr-2" />
                                                    Capacity: {event.capacity}
                                                </div>
                                            </div>

                                            <Link
                                                href={`/events/${event._id}`}
                                                className="block w-full text-center py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {!loading && events.length === 0 && !error && (
                            <div className="text-center text-gray-500 py-20">
                                No upcoming events found. Check back later!
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
