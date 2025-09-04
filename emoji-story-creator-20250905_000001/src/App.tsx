import { useState } from 'react'
import Header from './components/Header'
import StoryCanvas from './components/StoryCanvas'
import EmojiPalette from './components/EmojiPalette'
import StoryActions from './components/StoryActions'
import TemplateSelector from './components/TemplateSelector'
import { useStoryStore } from './store/storyStore'
import { Share2, Heart, Sparkles } from 'lucide-react'

function App() {
  const [activeView, setActiveView] = useState<'create' | 'templates'>('create')
  const { stories, currentStory } = useStoryStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full shadow-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveView('create')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeView === 'create'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Sparkles className="inline-block w-4 h-4 mr-1" />
              Create Story
            </button>
            <button
              onClick={() => setActiveView('templates')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeView === 'templates'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Heart className="inline-block w-4 h-4 mr-1" />
              Templates
            </button>
          </div>
        </div>

        {activeView === 'create' ? (
          <>
            {/* Story Canvas */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 animate-fade-in">
              <StoryCanvas />
            </div>

            {/* Emoji Palette */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 animate-slide-up">
              <EmojiPalette />
            </div>

            {/* Story Actions */}
            <div className="bg-white rounded-3xl shadow-xl p-6 animate-slide-up">
              <StoryActions />
            </div>
          </>
        ) : (
          <TemplateSelector />
        )}

        {/* Recent Stories */}
        {stories.length > 0 && activeView === 'create' && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-500" />
              Recent Stories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stories.slice(0, 6).map((story) => (
                <div
                  key={story.id}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
                >
                  <div className="text-2xl mb-2 truncate">{story.emojis.join(' ')}</div>
                  <p className="text-sm text-gray-600 line-clamp-2">{story.text}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(story.createdAt).toLocaleDateString()}
                    </span>
                    <button className="text-primary hover:text-secondary">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button - Mobile */}
      <button className="md:hidden fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-2xl z-10 animate-bounce-slow">
        <Share2 className="w-6 h-6" />
      </button>
    </div>
  )
}

export default App