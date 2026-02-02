'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import api from '@/lib/axios'
import Link from 'next/link'

export default function PaymentCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const reference = searchParams.get('reference')
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
    const [message, setMessage] = useState('')
    const [projectId, setProjectId] = useState<string | null>(null)

    useEffect(() => {
        const verifyPayment = async () => {
            if (!reference) {
                setStatus('failed')
                setMessage('No payment reference provided')
                return
            }

            try {
                const res = await api.get(`/payment/verify?reference=${reference}`)
                if (res.data.success) {
                    setStatus('success')
                    setProjectId(res.data.data.project) // Assuming backend returns transaction with project ID
                    setMessage('Payment verified successfully!')
                } else {
                    setStatus('failed')
                    setMessage(res.data.error || 'Payment verification failed')
                }
            } catch (error: any) {
                console.error('Verification Error:', error)
                setStatus('failed')
                setMessage(error.response?.data?.error || 'An error occurred during verification')
            }
        }

        verifyPayment()
    }, [reference])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Verifying Payment...</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Please wait while we confirm your transaction.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center animate-fadeIn">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">{message}</p>
                        <div className="space-y-3 w-full">
                            {projectId && (
                                <Link href={`/client-dashboard/projects/${projectId}`}>
                                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
                                        Return to Project
                                    </button>
                                </Link>
                            )}
                            <Link href="/client-dashboard">
                                <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors">
                                    Go to Dashboard
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center animate-fadeIn">
                        <XCircleIcon className="w-20 h-20 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Failed</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">{message}</p>
                        <Link href="/client-dashboard">
                            <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors">
                                Return to Dashboard
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
