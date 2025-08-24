import React from 'react'
import { Settings, Bell, Share2, Sparkles } from 'lucide-react'
import { useMoodStore } from './store/useMoodStore'
import { MoodSelector } from './components/MoodSelector'
import { FriendMoodList } from './components/FriendMoodList'
import { MoodStats } from './components/MoodStats'

function App() {
  const {
    currentUser,
    friends,
    moodHistory,
    friendMoods,
    setUserMood,
    addReaction,
    updateUserName,
    simulateFriendActivity
  } = useMoodStore()

  const [showSettings, setShowSettings] = React.useState(false)
  const [userName, setUserName] = React.useState(currentUser.name)
  const [activeView, setActiveView] = React.useState<'mood' | 'friends' | 'stats'>('mood')

  // Simulate friend activity every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      simulateFriendActivity()
    }, 5000)
    return () => clearInterval(interval)
  }, [simulateFriendActivity])

  const handleSaveSettings = () => {
    updateUserName(userName)
    setShowSettings(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">Mood Signal</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-white/80 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm animate-slide-up">
            <h2 className="text-xl font-bold text-white mb-4">설정</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">사용자 이름</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 py-2 bg-white/30 rounded-lg text-white font-medium hover:bg-white/40 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Mobile Navigation */}
        <div className="md:hidden mb-4">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setActiveView('mood')}
              className={`flex-1 py-2 rounded-md transition-colors ${
                activeView === 'mood' ? 'bg-white/20 text-white' : 'text-white/70'
              }`}
            >
              내 기분
            </button>
            <button
              onClick={() => setActiveView('friends')}
              className={`flex-1 py-2 rounded-md transition-colors ${
                activeView === 'friends' ? 'bg-white/20 text-white' : 'text-white/70'
              }`}
            >
              친구들
            </button>
            <button
              onClick={() => setActiveView('stats')}
              className={`flex-1 py-2 rounded-md transition-colors ${
                activeView === 'stats' ? 'bg-white/20 text-white' : 'text-white/70'
              }`}
            >
              통계
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <MoodSelector 
              currentMood={currentUser.currentMood}
              onMoodSelect={setUserMood}
            />
          </div>
          <div>
            <FriendMoodList 
              friends={friends}
              friendMoods={friendMoods}
              onReaction={addReaction}
            />
          </div>
          <div>
            <MoodStats 
              moodHistory={moodHistory}
              friendMoods={friendMoods}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {activeView === 'mood' && (
            <MoodSelector 
              currentMood={currentUser.currentMood}
              onMoodSelect={setUserMood}
            />
          )}
          {activeView === 'friends' && (
            <FriendMoodList 
              friends={friends}
              friendMoods={friendMoods}
              onReaction={addReaction}
            />
          )}
          {activeView === 'stats' && (
            <MoodStats 
              moodHistory={moodHistory}
              friendMoods={friendMoods}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/60 text-sm">
            실시간으로 친구들과 감정을 공유하세요 💜
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App