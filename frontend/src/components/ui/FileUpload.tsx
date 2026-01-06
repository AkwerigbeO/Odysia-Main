'use client'

import { useState, useRef, useCallback } from 'react'
import { CloudArrowUpIcon, XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline'
import api from '@/lib/axios'

interface FileUploadProps {
    accept?: string
    maxSize?: number // in MB
    onUpload?: (file: { fileId: string; filename: string; url: string; mimetype: string }) => void
    onError?: (error: string) => void
    multiple?: boolean
    className?: string
    label?: string
    uploadUrl?: string
}

export default function FileUpload({
    accept = 'image/*,application/pdf,.doc,.docx',
    maxSize = 10,
    onUpload,
    onError,
    multiple = false,
    className = '',
    label = 'Upload a file',
    uploadUrl = '/upload'
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [preview, setPreview] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const validateFile = (file: File): string | null => {
        // Check size
        if (file.size > maxSize * 1024 * 1024) {
            return `File size must be less than ${maxSize}MB`
        }
        return null
    }

    const uploadFile = async (file: File) => {
        const validationError = validateFile(file)
        if (validationError) {
            onError?.(validationError)
            return
        }

        setIsUploading(true)
        setProgress(0)
        setFileName(file.name)

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }

        try {
            const formData = new FormData()
            formData.append('file', file)

            const { data } = await api.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percent = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0
                    setProgress(percent)
                }
            })

            if (data.success) {
                onUpload?.({
                    fileId: data.data.fileId,
                    filename: data.data.filename,
                    url: data.data.url,
                    mimetype: data.data.mimetype
                })
            }
        } catch (error: any) {
            console.error('Upload failed:', error)
            onError?.(error.response?.data?.error || 'Upload failed')
            setPreview(null)
            setFileName(null)
        } finally {
            setIsUploading(false)
        }
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            if (multiple) {
                files.forEach(uploadFile)
            } else {
                uploadFile(files[0])
            }
        }
    }, [multiple])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            if (multiple) {
                files.forEach(uploadFile)
            } else {
                uploadFile(files[0])
            }
        }
    }

    const clearPreview = () => {
        setPreview(null)
        setFileName(null)
        setProgress(0)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className={`relative ${className}`}>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                    }
          ${isUploading ? 'pointer-events-none opacity-70' : ''}
        `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-40 mx-auto rounded-lg object-contain"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                clearPreview()
                            }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                ) : fileName ? (
                    <div className="flex items-center justify-center space-x-2">
                        <DocumentIcon className="h-10 w-10 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{fileName}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                clearPreview()
                            }}
                            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium text-blue-600 dark:text-blue-400">{label}</span>
                            {' '}or drag and drop
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Max size: {maxSize}MB
                        </p>
                    </>
                )}

                {isUploading && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-xl overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
