import { useState } from 'react'
import useGameStore from '../store'

const EmojiPalette = () => {
  const { selectedEmojis, selectEmoji, deselectEmoji } = useGameStore()
  const [activeCategory, setActiveCategory] = useState('people')

  const emojiCategories = {
    people: {
      name: 'People',
      emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', 
               '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', 
               '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
               '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔',
               '👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👩‍🦰', '👨‍🦰', '👱‍♀️',
               '👱‍♂️', '👩‍🦳', '👨‍🦳', '👩‍🦲', '👨‍🦲', '🧔', '👵', '🧓', '👴', '👲']
    },
    animals: {
      name: 'Animals',
      emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
               '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
               '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
               '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
               '🦟', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙']
    },
    nature: {
      name: 'Nature',
      emojis: ['🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍',
               '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀',
               '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕',
               '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍',
               '🌏', '💫', '⭐', '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪️']
    },
    food: {
      name: 'Food',
      emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈',
               '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
               '🥬', '🥒', '🌶️', '🌽', '🥕', '🥔', '🍠', '🥐', '🍞', '🥖',
               '🥨', '🧀', '🥚', '🍳', '🥞', '🥓', '🥩', '🍗', '🍖', '🌭',
               '🍔', '🍟', '🍕', '🥪', '🥙', '🌮', '🌯', '🥗', '🥘', '🍜']
    },
    activities: {
      name: 'Activities',
      emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
               '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🏹', '🎣',
               '🥊', '🥋', '🎽', '⛸️', '🥌', '🛷', '🛹', '🎿', '⛷️', '🏂',
               '🏋️‍♀️', '🏋️‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️',
               '🏌️‍♂️', '🏇', '🧘‍♀️', '🧘‍♂️', '🏄‍♀️', '🏄‍♂️', '🏊‍♀️', '🏊‍♂️', '🤽‍♀️', '🤽‍♂️']
    },
    objects: {
      name: 'Objects',
      emojis: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️',
               '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥',
               '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️',
               '🎛️', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌',
               '💡', '🔦', '🕯️', '🗑️', '🛢️', '💸', '💵', '💴', '💶', '💷']
    },
    symbols: {
      name: 'Symbols',
      emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
               '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '❗', '❓',
               '❕', '❔', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢',
               '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❓',
               '✅', '☑️', '✔️', '✖️', '⚠️', '⛔', '♻️', '✳️', '❇️', '✴️']
    },
    travel: {
      name: 'Travel',
      emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
               '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🚨', '🚔', '🚍',
               '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄',
               '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬',
               '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤', '🛥️']
    }
  }

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      deselectEmoji(emoji)
    } else if (selectedEmojis.length < 5) {
      selectEmoji(emoji)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-lg">Emoji Palette</h3>
        <div className="text-white/80 text-sm">
          Selected: {selectedEmojis.length}/5
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {Object.keys(emojiCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeCategory === category
                ? 'bg-white/30 text-white shadow-md'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {emojiCategories[category as keyof typeof emojiCategories].name}
          </button>
        ))}
      </div>
      
      <div className="bg-white/5 rounded-xl p-3 max-h-48 overflow-y-auto">
        <div className="grid grid-cols-8 sm:grid-cols-10 gap-1">
          {emojiCategories[activeCategory as keyof typeof emojiCategories].emojis.map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              onClick={() => handleEmojiClick(emoji)}
              className={`text-2xl p-1.5 rounded-lg transition-all transform hover:scale-110 ${
                selectedEmojis.includes(emoji)
                  ? 'bg-purple-500/50 shadow-lg scale-110'
                  : 'hover:bg-white/10'
              }`}
              disabled={!selectedEmojis.includes(emoji) && selectedEmojis.length >= 5}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      
      {selectedEmojis.length > 0 && (
        <div className="mt-3 p-3 bg-white/10 rounded-lg">
          <div className="text-white/80 text-sm mb-2">Selected Emojis:</div>
          <div className="flex gap-2">
            {selectedEmojis.map((emoji, index) => (
              <button
                key={`selected-${emoji}-${index}`}
                onClick={() => deselectEmoji(emoji)}
                className="text-3xl p-2 bg-white/20 rounded-lg hover:bg-red-500/30 transition-all"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EmojiPalette