import { motion, AnimatePresence } from 'framer-motion'
import { X, Edit2 } from 'lucide-react'
import { useStoryStore } from '../store/storyStore'
import { useState } from 'react'

export default function StoryCanvas() {
  const { currentStory, removeEmoji } = useStoryStore()
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState(currentStory.title)

  const handleTitleSave = () => {
    useStoryStore.setState((state) => ({
      currentStory: {
        ...state.currentStory,
        title: tempTitle
      }
    }))
    setIsEditingTitle(false)
  }

  return (
    <div className="story-card min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        {isEditingTitle ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
              className="text-2xl font-bold bg-transparent border-b-2 border-primary focus:outline-none flex-1"
              autoFocus
            />
          </div>
        ) : (
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {currentStory.title}
            <button
              onClick={() => {
                setTempTitle(currentStory.title)
                setIsEditingTitle(true)
              }}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Edit2 size={18} />
            </button>
          </h2>
        )}
        <span className="text-sm text-gray-500">
          {currentStory.emojis.length} emojis
        </span>
      </div>

      <div className="min-h-[200px] p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
        {currentStory.emojis.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-gray-400 text-center">
              Click emojis below to start your story! 📖✨
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <AnimatePresence>
              {currentStory.emojis.map((emoji, index) => (
                <motion.div
                  key={`${emoji}-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                  }}
                  className="relative group"
                >
                  <span className="emoji-item block">{emoji}</span>
                  <button
                    onClick={() => removeEmoji(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {currentStory.emojis.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Story Preview:</span> {currentStory.emojis.join(' ')}
          </p>
        </motion.div>
      )}
    </div>
  )
}