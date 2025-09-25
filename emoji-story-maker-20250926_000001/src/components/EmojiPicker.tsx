import React from 'react'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const emojiCategories = {
    emotions: ['😊', '😂', '😍', '😭', '😱', '😡', '😎', '🤔', '😴', '🤗', '😅', '😢'],
    people: ['👶', '👧', '👦', '👨', '👩', '👴', '👵', '👮', '👷', '👸', '🤴', '🦸'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
    food: ['🍎', '🍔', '🍕', '🍰', '🍦', '🍩', '🍪', '🍫', '☕', '🍺', '🥤', '🍿'],
    activities: ['⚽', '🏀', '🎮', '🎯', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎸', '🥁'],
    travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚒', '✈️', '🚀', '🛸', '🚁'],
    objects: ['💰', '💎', '🔧', '🔨', '💡', '📱', '💻', '📷', '🎁', '🏆', '🎈', '🧸'],
    nature: ['🌞', '🌙', '⭐', '☁️', '⛅', '⛈️', '🌊', '🔥', '🌈', '❄️', '🌸', '🌳'],
    symbols: ['❤️', '💔', '💕', '💖', '✨', '💫', '💥', '💢', '💬', '💭', '🗯️', '💤']
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full overflow-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-800">이모지 선택</h3>
      {Object.entries(emojiCategories).map(([category, emojis]) => (
        <div key={category} className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2 capitalize">
            {category === 'emotions' && '감정'}
            {category === 'people' && '사람'}
            {category === 'animals' && '동물'}
            {category === 'food' && '음식'}
            {category === 'activities' && '활동'}
            {category === 'travel' && '여행'}
            {category === 'objects' && '사물'}
            {category === 'nature' && '자연'}
            {category === 'symbols' && '기호'}
          </h4>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => onEmojiSelect(emoji)}
                className="text-2xl hover:bg-gray-100 rounded p-2 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EmojiPicker