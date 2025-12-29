'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  UserIcon,
  CheckIcon,
  ClockIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showChatView, setShowChatView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // For now, we will show an empty state or a "demo" conversation if needed.
  // Since backend chat is not implemented, we shouldn't show confusing fake data for other companies.
  const conversations: any[] = []

  /* 
  // Placeholder for future real data integration
  const conversations = [
    {
      id: 1,
      client: 'TechCorp Ltd',
      project: 'E-commerce Website',
      lastMessage: 'The design looks great! Can we proceed with the frontend development?',
      lastMessageTime: '2 hours ago',
      unreadCount: 2,
      avatar: 'TC',
      status: 'online'
    }
  ] 
  */

  const filteredConversations = conversations.filter(conversation =>
    conversation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const messages: any[] = []

  const currentChat = conversations.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      setMessage('')
    }
  }

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId)
    if (isMobile) setShowChatView(true)
  }

  const handleBackToChatList = () => setShowChatView(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="h-[calc(100vh-200px)] w-full max-w-full flex flex-col lg:flex-row bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden"
    >
      {/* Conversations List */}
      <motion.div
        variants={staggerItem}
        className={`flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-80 border-r border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface ${showChatView ? 'hidden sm:flex' : 'flex'
          }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Messages
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                <PlusIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full max-w-full">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No conversations yet.</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.05)' }}
                className={`p-4 border-b border-gray-200 dark:border-dark-border cursor-pointer transition-colors ${selectedChat === conversation.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                onClick={() => handleChatSelect(conversation.id)}
              >
                {/* Conversation Item UI */}
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {conversation.avatar}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.client}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            )))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        variants={staggerItem}
        className={`flex-1 flex flex-col w-full max-w-full min-w-0 ${!showChatView ? 'hidden sm:flex' : 'flex'
          }`}
      >
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark-surface">
          <div className="text-center p-6">
            <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No active details
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Messaging functionality will be available once you have active projects and clients.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 