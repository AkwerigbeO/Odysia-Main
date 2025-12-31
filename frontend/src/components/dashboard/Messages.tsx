'use client'

import { useState, useEffect, useRef } from 'react'
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
import api from '@/lib/axios'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showChatView, setShowChatView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [conversations, setConversations] = useState<any[]>([])
  const [activeMessages, setActiveMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await api.get('/messages/conversations')
        console.log('Fetched conversations:', data)
        setConversations(data.data)
      } catch (error) {
        console.error('Failed to fetch conversations:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchConversations()
    }
  }, [user])

  // Fetch messages when chat selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return
      try {
        // Find the conversation partner ID
        // const conversation = conversations.find(c => c.otherUser._id === selectedChat)
        // if (conversation) {
        const { data } = await api.get(`/messages/${selectedChat}`)
        setActiveMessages(data.data)
        scrollToBottom()
        // }
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      }
    }

    fetchMessages()
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [activeMessages])

  const filteredConversations = conversations.filter(conversation =>
    conversation.otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentChat = conversations.find(chat => chat.otherUser._id === selectedChat)

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (message.trim() && selectedChat) {
      try {
        const { data } = await api.post('/messages', {
          recipientId: selectedChat,
          content: message
        })
        setActiveMessages([...activeMessages, data.data])
        setMessage('')
      } catch (error) {
        console.error('Failed to send message:', error)
      }
    }
  }

  const handleChatSelect = (userId: string) => {
    setSelectedChat(userId)
    if (isMobile) setShowChatView(true)
  }

  const handleBackToChatList = () => setShowChatView(false)

  const getStatusColor = (status: string) => {
    return 'bg-green-500' // mock status for now
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
          {/* DEBUG: Remove after fixing */}
          <div className="p-2 bg-gray-100 text-xs font-mono break-all hidden">
            Length: {conversations.length} <br />
            Data: {JSON.stringify(conversations)}
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No conversations yet.</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.otherUser._id}
                whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.05)' }}
                className={`p-4 border-b border-gray-200 dark:border-dark-border cursor-pointer transition-colors ${selectedChat === conversation.otherUser._id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                onClick={() => handleChatSelect(conversation.otherUser._id)}
              >
                {/* Conversation Item UI */}
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {conversation.otherUser.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-dark-card ${getStatusColor('online')}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.otherUser.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(conversation.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
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
            )))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        variants={staggerItem}
        className={`flex-1 flex flex-col w-full max-w-full min-w-0 ${!showChatView ? 'hidden sm:flex' : 'flex'
          }`}
      >
        {selectedChat && currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBackToChatList}
                  className="sm:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>

                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {currentChat.otherUser.name.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-dark-card ${getStatusColor('online')}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {currentChat.otherUser.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {currentChat.otherUser.role} • {currentChat.otherUser.email}
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
              {activeMessages.map((msg) => (
                <motion.div
                  key={msg._id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className={`flex w-full max-w-full ${msg.sender === user?._id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-xs lg:max-w-md break-words overflow-hidden px-4 py-2 rounded-lg ${msg.sender === user?._id
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white'
                    }`}>
                    <p className="text-sm">{msg.content}</p>
                    <div className={`flex items-center justify-between mt-1 text-xs ${msg.sender === user?._id ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                      <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {msg.sender === user?._id && (
                        <div className="flex items-center space-x-1">
                          {msg.read ? (
                            <div className="flex space-x-0.5">
                              <CheckIcon className="h-3 w-3" />
                              <CheckIcon className="h-3 w-3 -ml-1" />
                            </div>
                          ) : (
                            <CheckIcon className="h-3 w-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <PaperClipIcon className="h-6 w-6" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-dark-surface border-0 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark-surface">
            <div className="text-center p-6">
              <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}