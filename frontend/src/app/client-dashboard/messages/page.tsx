'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  UserIcon,
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  VideoCameraIcon,
  ArrowLeftIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function ClientMessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showChatView, setShowChatView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const chats = [
    { id: 1, expert: { name: "Alex Chen", status: "online", project: "E-commerce Website Redesign" }, lastMessage: "I've completed the frontend mockups. Would you like to review them?", timestamp: "2 min ago", unreadCount: 2 },
    { id: 2, expert: { name: "Maria Rodriguez", status: "offline", project: "Mobile App Development" }, lastMessage: "The iOS app is ready for testing. I'll send you the build link.", timestamp: "1 hour ago", unreadCount: 0 },
    { id: 3, expert: { name: "David Kim", status: "online", project: "Database Optimization" }, lastMessage: "I need some clarification on the performance requirements.", timestamp: "3 hours ago", unreadCount: 1 },
    { id: 4, expert: { name: "Sarah Johnson", status: "away", project: "API Integration" }, lastMessage: "Payment gateway integration is complete. Ready for testing.", timestamp: "1 day ago", unreadCount: 0 },
    { id: 5, expert: { name: "Michael Brown", status: "offline", project: "UI/UX Design System" }, lastMessage: "Thanks for the feedback! I'll make those adjustments.", timestamp: "2 days ago", unreadCount: 0 }
  ]

  const messages = [
    { id: 1, sender: "expert", content: "Hi! I've started working on the e-commerce redesign project.", timestamp: "10:30 AM", status: "read" },
    { id: 2, sender: "client", content: "Great! I'm excited to see the progress.", timestamp: "10:32 AM", status: "read" },
    { id: 3, sender: "expert", content: "I've completed the initial wireframes. Would you like to review them?", timestamp: "11:15 AM", status: "read" },
    { id: 4, sender: "client", content: "Yes, please share them. I'd like to see the homepage design first.", timestamp: "11:20 AM", status: "read" },
    { id: 5, sender: "expert", content: "Perfect! I've uploaded the homepage mockups to the project files.", timestamp: "2:45 PM", status: "read" },
    { id: 6, sender: "expert", content: "I've also included some alternative color schemes. Let me know which direction you prefer.", timestamp: "2:46 PM", status: "delivered" },
    { id: 7, sender: "expert", content: "I've completed the frontend mockups. Would you like to review them?", timestamp: "3:30 PM", status: "sent" }
  ]

  const filteredChats = chats.filter(chat => 
    chat.expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.expert.project.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckIcon className="h-3 w-3 text-gray-400" />
      case 'delivered': return <CheckIcon className="h-3 w-3 text-blue-500" />
      case 'read': return <CheckIcon className="h-3 w-3 text-green-500" />
      default: return <ClockIcon className="h-3 w-3 text-gray-400" />
    }
  }

  return (
    <div className="h-[calc(100vh-120px)] w-full max-w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex h-full w-full max-w-full">
        
        {/* Conversation List */}
        <motion.div 
          variants={fadeInUp} 
          className={`flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-96 border-r border-gray-200 dark:border-gray-700 ${
            showChatView ? 'hidden sm:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"><PlusIcon className="h-5 w-5" /></button>
                <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"><EllipsisVerticalIcon className="h-5 w-5" /></button>
              </div>
            </div>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto w-full max-w-full">
            {filteredChats.map(chat => (
              <motion.div
                key={chat.id}
                variants={staggerItem}
                onClick={() => handleChatSelect(chat.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(chat.expert.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{chat.expert.name}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.expert.project}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm truncate">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">{chat.unreadCount}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Window */}
        <motion.div 
          variants={fadeInUp} 
          className={`flex-1 flex flex-col w-full max-w-full min-w-0 ${
            !showChatView ? 'hidden sm:flex' : 'flex'
          }`}
        >
          {selectedChatData ? (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <button onClick={handleBackToChatList} className="sm:hidden p-2">
                    <ArrowLeftIcon className="h-6 w-6" />
                  </button>
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${getStatusColor(selectedChatData.expert.status)}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{selectedChatData.expert.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{selectedChatData.expert.project}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2"><PhoneIcon className="h-5 w-5" /></button>
                  <button className="p-2"><VideoCameraIcon className="h-5 w-5" /></button>
                  <button className="p-2"><EllipsisVerticalIcon className="h-5 w-5" /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 w-full max-w-full min-w-0 overflow-y-auto p-2 sm:p-4 space-y-2">
                {messages.map(msg => (
                  <motion.div key={msg.id} variants={staggerItem} className={`flex w-full max-w-full ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`w-fit max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] break-words rounded-lg p-3 shadow overflow-hidden ${
                      msg.sender === 'client' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <div className="flex justify-between items-center mt-1 text-xs opacity-75">
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'client' && <>{getMessageStatusIcon(msg.status)}</>}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t bg-gray-50 dark:bg-gray-900">
                <div className="flex items-end space-x-2">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-1 px-3 py-2 border rounded-xl resize-none text-sm"
                  />
                  <button className="p-2 text-gray-400"><PaperClipIcon className="h-6 w-6" /></button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="p-2 bg-blue-600 text-white rounded-xl disabled:bg-gray-400"
                  >
                    <PaperAirplaneIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
