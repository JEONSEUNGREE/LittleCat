import React from 'react'
import useMoodStore from '../store/useMoodStore'

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-400' },
  { emoji: '😔', label: 'Sad', color: 'bg-blue-400' },
  { emoji: '😡', label: 'Angry', color: 'bg-red-400' },
  { emoji: '😴', label: 'Tired', color: 'bg-purple-400' },
  { emoji: '😰', label: 'Anxious', color: 'bg-orange-400' },
  { emoji: '🥰', label: 'Loved', color: 'bg-pink-400' },
  { emoji: '😎', label: 'Cool', color: 'bg-cyan-400' },
  { emoji: '🤔', label: 'Thinking', color: 'bg-indigo-400' },
  { emoji: '😌', label: 'Peaceful', color: 'bg-green-400' },
  { emoji: '🤗', label: 'Grateful', color: 'bg-teal-400' },
  { emoji: '😤', label: 'Frustrated', color: 'bg-amber-400' },
  { emoji: '🥳', label: 'Excited', color: 'bg-fuchsia-400' }
]

const MoodSelector: React.FC = () => {
  const { setCurrentMood, addToHistory, currentMood } = useMoodStore()
  const [message, setMessage] = React.useState('')
  const [isAnonymous, setIsAnonymous] = React.useState(true)

  const handleMoodSelect = (mood: typeof moods[0]) => {
    const newMood = {
      id: Date.now().toString(),
      emoji: mood.emoji,
      label: mood.label,
      color: mood.color,
      timestamp: Date.now(),
      userId: isAnonymous ? 'anonymous' : 'user123',
      isAnonymous,
      message: message.trim() || undefined
    }
    
    setCurrentMood(newMood)
    addToHistory(newMood)
    setMessage('')
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        How are you feeling?
      </h2>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            className={`
              relative p-4 rounded-xl transition-all duration-300 
              hover:scale-110 hover:shadow-lg active:scale-95
              ${currentMood?.emoji === mood.emoji ? 
                `${mood.color} ring-4 ring-offset-2 ring-gray-400` : 
                'bg-gray-100 hover:bg-gray-200'}
            `}
          >
            <span className="text-3xl block">{mood.emoji}</span>
            <span className="text-xs mt-1 block text-gray-700">{mood.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share what's on your mind... (optional)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
          rows={3}
        />
        
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Share anonymously</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default MoodSelector