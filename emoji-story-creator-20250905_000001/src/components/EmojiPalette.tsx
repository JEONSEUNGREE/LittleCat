import { useState } from 'react'
import { useStoryStore } from '../store/storyStore'
import { Search } from 'lucide-react'

const emojiCategories = {
  'Popular': ['😀', '❤️', '😂', '🥰', '😍', '🤩', '😎', '🥳', '🌟', '✨', '🎉', '🎈', '💫', '⭐', '🌈'],
  'People': ['👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👵', '🧓', '👴', '👩‍⚕️', '👨‍⚕️', '👩‍🎓', '👨‍🎓', '👩‍🏫'],
  'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
  'Food': ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥'],
  'Nature': ['🌸', '💐', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🪴', '🌲', '🌳', '🌴', '🌵'],
  'Activities': ['⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍'],
  'Travel': ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🦯'],
  'Objects': ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀'],
  'Symbols': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗'],
  'Fantasy': ['🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️', '🧛‍♂️', '🧛‍♀️', '🧜‍♂️', '🧜‍♀️', '🧝‍♂️', '🧝‍♀️', '🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '🦹‍♀️', '🐉']
}

export default function EmojiPalette() {
  const [selectedCategory, setSelectedCategory] = useState('Popular')
  const [searchQuery, setSearchQuery] = useState('')
  const { addEmoji, selectedEmojis } = useStoryStore()

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmojis.length < 10) {
      addEmoji(emoji)
    }
  }

  const filteredCategories = searchQuery
    ? Object.entries(emojiCategories).reduce((acc, [category, emojis]) => {
        const filtered = emojis.filter(emoji => 
          emoji.includes(searchQuery) || category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        if (filtered.length > 0) {
          acc[category] = filtered
        }
        return acc
      }, {} as typeof emojiCategories)
    : emojiCategories

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto pb-2 no-select">
        <div className="flex gap-2 min-w-max">
          {Object.keys(filteredCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji Grid */}
      <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
          {(filteredCategories[selectedCategory] || []).map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiClick(emoji)}
              disabled={selectedEmojis.length >= 10}
              className={`text-2xl sm:text-3xl p-2 rounded-lg hover:bg-white hover:shadow-md transition-all transform hover:scale-110 ${
                selectedEmojis.includes(emoji) ? 'bg-primary/10 ring-2 ring-primary' : ''
              } ${selectedEmojis.length >= 10 && !selectedEmojis.includes(emoji) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}