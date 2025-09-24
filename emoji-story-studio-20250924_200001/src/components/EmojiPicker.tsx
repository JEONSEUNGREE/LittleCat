import { motion } from 'framer-motion'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

const emojiCategories = {
  'Emotions': ['😀', '😂', '🥰', '😎', '😭', '😡', '😱', '🤔', '😴', '🤗'],
  'People': ['👶', '👧', '🧑', '👴', '👵', '🦸', '🧙', '🧛', '🧚', '👻'],
  'Animals': ['🐶', '🐱', '🦁', '🐯', '🦊', '🐻', '🐼', '🐨', '🐸', '🦄'],
  'Nature': ['🌳', '🌸', '🌺', '🌈', '☀️', '🌙', '⭐', '☁️', '⛈️', '❄️'],
  'Food': ['🍎', '🍕', '🍔', '🍣', '🍰', '🍦', '🍩', '🍪', '☕', '🥤'],
  'Activities': ['⚽', '🏀', '🎮', '🎨', '🎭', '🎪', '🎢', '🏕️', '✈️', '🚀'],
  'Objects': ['💎', '🎁', '🎈', '💌', '📱', '💻', '📚', '🔑', '💡', '🏆'],
  'Symbols': ['❤️', '💔', '✨', '🔥', '💫', '⚡', '💥', '❄️', '🌟', '💖']
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <div className="story-card">
      <h3 className="text-xl font-bold mb-4 text-center">Choose Your Emojis</h3>
      <div className="space-y-6">
        {Object.entries(emojiCategories).map(([category, emojis]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
              {category}
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {emojis.map((emoji, index) => (
                <motion.button
                  key={`${category}-${index}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEmojiSelect(emoji)}
                  className="emoji-item p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}