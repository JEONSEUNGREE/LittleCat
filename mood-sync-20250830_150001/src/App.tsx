import { useState } from 'react'
import MoodSelector from './components/MoodSelector'
import FriendsList from './components/FriendsList'
import MoodHistory from './components/MoodHistory'
import { Users, History, Heart } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'mood' | 'friends' | 'history'>('mood')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Heart className="animate-pulse" />
            Mood Sync
          </h1>
          <p className="text-sm opacity-90">실시간 감정 공유 플랫폼</p>
        </header>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex justify-around mb-6 bg-white/10 rounded-full p-1">
            <button
              onClick={() => setActiveTab('mood')}
              className={`flex-1 py-2 px-4 rounded-full transition-all ${
                activeTab === 'mood' 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              내 감정
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 py-2 px-4 rounded-full transition-all flex items-center justify-center gap-1 ${
                activeTab === 'friends' 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Users size={16} />
              친구들
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-4 rounded-full transition-all flex items-center justify-center gap-1 ${
                activeTab === 'history' 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <History size={16} />
              기록
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'mood' && <MoodSelector />}
            {activeTab === 'friends' && <FriendsList />}
            {activeTab === 'history' && <MoodHistory />}
          </div>
        </div>

        <footer className="text-center mt-8 text-white/70 text-xs">
          <p>© 2025 Mood Sync. 감정을 공유하고 연결하세요.</p>
        </footer>
      </div>
    </div>
  )
}

export default App