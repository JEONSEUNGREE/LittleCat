import React from 'react'
import { useMoodStore } from '../store/useMoodStore'

const moods = [
  { emoji: '😊', mood: '행복', color: 'text-yellow-500' },
  { emoji: '😔', mood: '슬픔', color: 'text-blue-500' },
  { emoji: '😡', mood: '화남', color: 'text-red-500' },
  { emoji: '😰', mood: '불안', color: 'text-purple-500' },
  { emoji: '😌', mood: '평온', color: 'text-green-500' },
  { emoji: '😴', mood: '피곤', color: 'text-gray-500' },
  { emoji: '🤗', mood: '감사', color: 'text-pink-500' },
  { emoji: '😎', mood: '자신감', color: 'text-indigo-500' },
]

interface MoodSelectorProps {
  onSelect?: () => void
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect }) => {
  const { currentEmoji, setCurrentMood } = useMoodStore()

  const handleMoodSelect = (mood: string, emoji: string) => {
    setCurrentMood(mood, emoji)
    if (onSelect) {
      onSelect()
    }
  }

  return (
    <div className="mood-card p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        지금 기분이 어때요?
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {moods.map(({ emoji, mood, color }) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood, emoji)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
              currentEmoji === emoji ? 'bg-primary-50 ring-2 ring-primary-400' : ''
            }`}
            aria-label={`${mood} 선택`}
          >
            <span className={`mood-emoji ${currentEmoji === emoji ? 'mood-selected' : ''} ${color}`}>
              {emoji}
            </span>
            <span className="text-xs mt-2 text-gray-600 font-medium">{mood}</span>
          </button>
        ))}
      </div>
    </div>
  )
}