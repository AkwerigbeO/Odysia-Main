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
  const [selectedChat, setSelectedChat] = useState(1)
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
    },
    {
      id: 2,
      client: 'StartupXYZ',
      project: 'Mobile App Design',
      lastMessage: 'Payment has been released to your account.',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      avatar: 'SX',
      status: 'offline'
    },
    {
      id: 3,
      client: 'Creative Agency',
      project: 'Brand Identity Package',
      lastMessage: 'When can we expect the logo design?',
      lastMessageTime: '3 days ago',
      unreadCount: 1,
      avatar: 'CA',
      status: 'online'
    }
  ]

  const filteredConversations = conversations.filter(conversation => 
    conversation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const messages = [
    {
      id: 1,
      sender: 'client',
      message: 'Hi John! I wanted to discuss the e-commerce website project.',
      timestamp: '10:30 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'expert',
      message: 'Hello! Sure, I\'m ready to discuss. What specific aspects would you like to go over?',
      timestamp: '10:32 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'client',
      message: 'I\'ve reviewed the initial design mockups and they look fantastic!',
      timestamp: '10:35 AM',
      status: 'read'
    },
    {
      id: 4,
      sender: 'client',
      message: 'Can we proceed with the frontend development phase?',
      timestamp: '10:36 AM',
      status: 'read'
    },
    {
      id: 5,
      sender: 'expert',
      message: 'Absolutely! I\'ll start working on the frontend development. I\'ll keep you updated on the progress.',
      timestamp: '10:38 AM',
      status: 'read'
    },
    {
      id: 6,
      sender: 'client',
      message: 'Perfect! Looking forward to seeing the results.',
      timestamp: '2 hours ago',
      status: 'delivered'
    }
  ]

  const currentChat = conversations.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      // TODO: Implement actual message sending logic
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
        className={`flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-80 border-r border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface ${
          showChatView ? 'hidden sm:flex' : 'flex'
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
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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
          {filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.05)' }}
              className={`p-4 border-b border-gray-200 dark:border-dark-border cursor-pointer transition-colors ${
                selectedChat === conversation.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
              }`}
              onClick={() => handleChatSelect(conversation.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {conversation.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-dark-card ${getStatusColor(conversation.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {conversation.client}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {conversation.project}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                {conversation.unreadCount > 0 && (
                  <div className="bg-primary-600 dark:bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div 
        variants={staggerItem}
        className={`flex-1 flex flex-col w-full max-w-full min-w-0 ${
          !showChatView ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button onClick={handleBackToChatList} className="sm:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {currentChat.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-dark-card ${getStatusColor(currentChat.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {currentChat.client}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {currentChat.project}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <UserIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 w-full max-w-full min-w-0 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className={`flex w-full max-w-full ${msg.sender === 'expert' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-xs lg:max-w-md break-words overflow-hidden px-4 py-2 rounded-lg ${
                    msg.sender === 'expert'
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <div className={`flex items-center justify-between mt-1 text-xs ${
                      msg.sender === 'expert' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'expert' && (
                        <div className="flex items-center space-x-1">
                          {msg.status === 'read' ? (
                            <CheckIcon className="h-3 w-3" />
                          ) : msg.status === 'delivered' ? (
                            <div className="flex space-x-0.5">
                              <CheckIcon className="h-3 w-3" />
                              <CheckIcon className="h-3 w-3 -ml-1" />
                            </div>
                          ) : (
                            <ClockIcon className="h-3 w-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                
                <div className="flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2 sm:p-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mobile-touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
} 