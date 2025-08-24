import React, { useState } from 'react'
import { Send, X } from 'lucide-react'
import useMoodStore from '../store/useMoodStore'

const MoodBroadcast: React.FC = () => {
  const { currentMood, addEcho } = useMoodStore()
  const [message, setMessage] = useState('')
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = () => {
    if (!currentMood) return
    
    const newEcho = {
      id: Date.now().toString(),
      userId: 'currentUser',
      mood: currentMood,
      message: message.trim() || undefined,
      echoes: 0,
      timestamp: new Date()
    }
    
    addEcho(newEcho)
    setMessage('')
    setIsSharing(false)
  }

  if (!currentMood) {
    return (
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl shadow-lg p-6 mb-6 text-white">
        <h3 className="text-lg font-bold mb-2">Share Your Mood</h3>
        <p className="text-sm opacity-90">
          Select a mood above to start sharing with others who feel the same way
        </p>
      </div>
    )
  }

  return (
    <div 
      className="rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${currentMood.color}20 0%, ${currentMood.color}10 100%)`
      }}
    >
      {!isSharing ? (
        <div className="text-center">
          <div className="mb-4">
            <span className="text-5xl animate-pulse">{currentMood.emoji}</span>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
            You're feeling {currentMood.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Share this mood with others and find connections
          </p>
          <button
            onClick={() => setIsSharing(true)}
            className="px-6 py-3 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: currentMood.color }}
          >
            Broadcast Mood
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Share your {currentMood.name} mood
            </h3>
            <button
              onClick={() => setIsSharing(false)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message (optional)..."
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 resize-none"
              style={{ focusRingColor: currentMood.color }}
              rows={3}
              maxLength={100}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {message.length}/100 characters
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-white transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: currentMood.color }}
            >
              <Send size={18} />
              Share Echo
            </button>
            <button
              onClick={() => setIsSharing(false)}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoodBroadcast