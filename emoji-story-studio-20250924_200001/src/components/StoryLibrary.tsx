import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Trash2, Eye, Copy } from 'lucide-react'
import { useStoryStore } from '../store/storyStore'

export default function StoryLibrary() {
  const { savedStories, deleteStory, loadStory } = useStoryStore()

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const copyToClipboard = (emojis: string[]) => {
    navigator.clipboard.writeText(emojis.join(' '))
  }

  if (savedStories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="story-card text-center py-12"
      >
        <span className="text-6xl mb-4 block">📚</span>
        <h3 className="text-xl font-semibold mb-2">No Stories Yet</h3>
        <p className="text-gray-500">Start creating your first emoji story!</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {savedStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.1 }}
            className="story-card hover:scale-105 transition-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">{story.title}</h3>
              <span className="text-2xl">📖</span>
            </div>

            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[100px]">
              <p className="text-2xl">{story.emojis.join(' ')}</p>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock size={14} className="mr-1" />
              {formatDate(story.createdAt)}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => loadStory(story)}
                className="btn-secondary text-sm flex items-center gap-1"
              >
                <Eye size={14} />
                View
              </button>
              <button
                onClick={() => copyToClipboard(story.emojis)}
                className="btn-secondary text-sm flex items-center gap-1"
              >
                <Copy size={14} />
                Copy
              </button>
              <button
                onClick={() => deleteStory(story.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}