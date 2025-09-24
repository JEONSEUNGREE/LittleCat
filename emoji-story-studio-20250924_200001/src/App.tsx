import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Save, Share2, Sparkles, Trash2, RefreshCw } from 'lucide-react'
import { useStoryStore } from './store/storyStore'
import EmojiPicker from './components/EmojiPicker'
import StoryCanvas from './components/StoryCanvas'
import StoryLibrary from './components/StoryLibrary'
import Header from './components/Header'

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'library'>('create')
  const { currentStory, addEmoji, clearStory, saveStory, generateTitle } = useStoryStore()

  const handleSaveStory = () => {
    if (currentStory.emojis.length > 0) {
      saveStory()
      setActiveTab('library')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-1 flex">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Plus size={18} />
                Create Story
              </span>
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === 'library'
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles size={18} />
                My Stories
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'create' ? (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Story Canvas */}
              <StoryCanvas />

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={generateTitle}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  Generate Title
                </button>
                <button
                  onClick={clearStory}
                  className="btn-secondary flex items-center gap-2"
                  disabled={currentStory.emojis.length === 0}
                >
                  <Trash2 size={18} />
                  Clear
                </button>
                <button
                  onClick={handleSaveStory}
                  className="btn-primary flex items-center gap-2"
                  disabled={currentStory.emojis.length === 0}
                >
                  <Save size={18} />
                  Save Story
                </button>
                <button
                  className="btn-primary flex items-center gap-2"
                  disabled={currentStory.emojis.length === 0}
                >
                  <Share2 size={18} />
                  Share
                </button>
              </div>

              {/* Emoji Picker */}
              <EmojiPicker onEmojiSelect={addEmoji} />
            </motion.div>
          ) : (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StoryLibrary />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}