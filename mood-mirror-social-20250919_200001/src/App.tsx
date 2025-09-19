import { useState } from 'react'
import MoodSelector from './components/MoodSelector'
import MoodFeed from './components/MoodFeed'
import MoodStats from './components/MoodStats'
import { useMoodStore } from './store/moodStore'
import { Heart, TrendingUp, Users } from 'lucide-react'

function App() {
  const [activeView, setActiveView] = useState<'share' | 'feed' | 'stats'>('share')
  const { currentUserMood } = useMoodStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mood Mirror Social
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">실시간 감정 공유 네트워크</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {activeView === 'share' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">지금 기분은 어떠신가요?</h2>
              <MoodSelector />
            </div>
            {currentUserMood && (
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 text-center">
                <p className="text-sm text-gray-700">현재 나의 기분</p>
                <p className="text-2xl mt-1">{currentUserMood.emoji}</p>
                <p className="text-lg font-medium text-gray-800">{currentUserMood.label}</p>
              </div>
            )}
          </div>
        )}

        {activeView === 'feed' && <MoodFeed />}
        {activeView === 'stats' && <MoodStats />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setActiveView('share')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                activeView === 'share'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Heart size={24} />
              <span className="text-xs mt-1">공유</span>
            </button>
            <button
              onClick={() => setActiveView('feed')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                activeView === 'feed'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Users size={24} />
              <span className="text-xs mt-1">피드</span>
            </button>
            <button
              onClick={() => setActiveView('stats')}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                activeView === 'stats'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <TrendingUp size={24} />
              <span className="text-xs mt-1">통계</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App