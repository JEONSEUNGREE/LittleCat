import React, { useState } from 'react'
import { BookOpen, Palette, Save } from 'lucide-react'
import EmojiPicker from './components/EmojiPicker'
import StoryCanvas from './components/StoryCanvas'
import SavedStories from './components/SavedStories'
import useStoryStore from './store/useStoryStore'

function App() {
  const { addEmoji } = useStoryStore()
  const [activeView, setActiveView] = useState<'picker' | 'saved'>('picker')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        <header className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-purple-500" size={32} />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              이모지 스토리 메이커
            </h1>
          </div>
          <p className="text-gray-600 text-sm mt-2">이모지로 나만의 창의적인 스토리를 만들어보세요!</p>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
          <div className="lg:col-span-2 h-full">
            <StoryCanvas />
          </div>
          
          <div className="h-full flex flex-col">
            <div className="bg-white rounded-lg shadow-lg mb-4 p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView('picker')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded transition-colors ${
                    activeView === 'picker'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Palette size={18} />
                  <span className="text-sm">이모지</span>
                </button>
                <button
                  onClick={() => setActiveView('saved')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded transition-colors ${
                    activeView === 'saved'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Save size={18} />
                  <span className="text-sm">저장됨</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              {activeView === 'picker' ? (
                <EmojiPicker onEmojiSelect={addEmoji} />
              ) : (
                <SavedStories />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App