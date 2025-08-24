import { useState } from 'react'
import { Sparkles, Users, Clock, Menu, X } from 'lucide-react'
import MoodSelector from './components/MoodSelector'
import MoodFeed from './components/MoodFeed'
import MoodHistory from './components/MoodHistory'
import useMoodStore from './store/useMoodStore'

type TabType = 'share' | 'feed' | 'history'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('share')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentMood } = useMoodStore()

  const tabs = [
    { id: 'share' as TabType, label: 'Share Mood', icon: Sparkles },
    { id: 'feed' as TabType, label: 'Mood Feed', icon: Users },
    { id: 'history' as TabType, label: 'My Journey', icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🪞</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Mood Mirror</h1>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {currentMood && (
            <div className="mt-3 p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center gap-2">
              <span className="text-lg">{currentMood.emoji}</span>
              <span className="text-sm text-gray-700">
                You're feeling <strong>{currentMood.label.toLowerCase()}</strong> right now
              </span>
            </div>
          )}
        </div>
      </header>

      <nav className={`bg-white border-b sticky top-[72px] z-40 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsMenuOpen(false)
                  }}
                  className={`
                    flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
                    ${activeTab === tab.id 
                      ? 'border-purple-500 text-purple-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      <main className="py-8 px-4 pb-20">
        <div className="animate-float">
          {activeTab === 'share' && <MoodSelector />}
          {activeTab === 'feed' && <MoodFeed />}
          {activeTab === 'history' && <MoodHistory />}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-4">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-gray-500">
            Share your emotions, connect with others 💜
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App