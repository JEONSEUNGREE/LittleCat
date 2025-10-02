import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MoodSelector from './components/MoodSelector'
import ColorPalette from './components/ColorPalette'
import StoryCanvas from './components/StoryCanvas'
import { useMoodStore } from './store/moodStore'
import { Film, Sparkles } from 'lucide-react'

function App() {
  const [currentView, setCurrentView] = useState<'mood' | 'palette' | 'story'>('mood')
  const { selectedMood, selectedColors } = useMoodStore()

  const handleNext = () => {
    if (currentView === 'mood' && selectedMood) {
      setCurrentView('palette')
    } else if (currentView === 'palette' && selectedColors.length > 0) {
      setCurrentView('story')
    }
  }

  const handleBack = () => {
    if (currentView === 'story') {
      setCurrentView('palette')
    } else if (currentView === 'palette') {
      setCurrentView('mood')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Film className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
              Mood Color Cinema
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-gray-300 text-sm md:text-base">감정과 색상으로 만드는 나만의 시각적 스토리</p>
        </motion.header>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {['mood', 'palette', 'story'].map((step, index) => (
              <div key={step} className="flex items-center">
                <motion.div
                  animate={{
                    scale: currentView === step ? 1.2 : 1,
                    backgroundColor: currentView === step ? '#fbbf24' : 
                                   index < ['mood', 'palette', 'story'].indexOf(currentView) ? '#10b981' : '#4b5563'
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                >
                  {index + 1}
                </motion.div>
                {index < 2 && (
                  <div className={`w-12 md:w-20 h-1 ${
                    index < ['mood', 'palette', 'story'].indexOf(currentView) ? 'bg-green-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentView === 'mood' && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <MoodSelector />
            </motion.div>
          )}

          {currentView === 'palette' && (
            <motion.div
              key="palette"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <ColorPalette />
            </motion.div>
          )}

          {currentView === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <StoryCanvas />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentView === 'mood' 
                ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            disabled={currentView === 'mood'}
          >
            이전
          </motion.button>

          {currentView !== 'story' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                (currentView === 'mood' && !selectedMood) || 
                (currentView === 'palette' && selectedColors.length === 0)
                  ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              }`}
              disabled={
                (currentView === 'mood' && !selectedMood) || 
                (currentView === 'palette' && selectedColors.length === 0)
              }
            >
              다음
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App