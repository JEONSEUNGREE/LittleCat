import React from 'react'
import useMoodStore from '../store/useMoodStore'

const moods = [
  { id: '1', emoji: '😊', color: '#FFD700', name: 'Happy' },
  { id: '2', emoji: '😔', color: '#4A90E2', name: 'Sad' },
  { id: '3', emoji: '😡', color: '#FF6B6B', name: 'Angry' },
  { id: '4', emoji: '😌', color: '#4ECDC4', name: 'Calm' },
  { id: '5', emoji: '🤩', color: '#FF6F91', name: 'Excited' },
  { id: '6', emoji: '😰', color: '#9B59B6', name: 'Anxious' },
  { id: '7', emoji: '😍', color: '#FF1744', name: 'Love' },
]

const MoodSelector: React.FC = () => {
  const { currentMood, setMood } = useMoodStore()

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setMood({
      ...mood,
      timestamp: new Date()
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        How are you feeling?
      </h2>
      
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            className={`
              relative p-4 rounded-xl transition-all duration-300 transform hover:scale-110
              ${currentMood?.id === mood.id 
                ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' 
                : 'hover:shadow-lg'
              }
            `}
            style={{
              backgroundColor: mood.color + '20',
              borderColor: mood.color,
              borderWidth: currentMood?.id === mood.id ? '2px' : '1px',
              borderStyle: 'solid',
              ...(currentMood?.id === mood.id && { ringColor: mood.color })
            }}
          >
            <span className="text-3xl sm:text-4xl animate-float">{mood.emoji}</span>
            <p className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">
              {mood.name}
            </p>
          </button>
        ))}
      </div>
      
      {currentMood && (
        <div className="mt-6 p-4 rounded-lg animate-pulse-slow" 
             style={{ backgroundColor: currentMood.color + '10' }}>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current mood: <span className="font-bold">{currentMood.name}</span> {currentMood.emoji}
          </p>
        </div>
      )}
    </div>
  )
}

export default MoodSelector