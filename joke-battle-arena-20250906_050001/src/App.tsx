import { useState, useEffect } from 'react'
import { useGameStore } from './store/gameStore'
import HomePage from './components/HomePage'
import BattleArena from './components/BattleArena'
import Leaderboard from './components/Leaderboard'
import PlayerProfile from './components/PlayerProfile'
import { Home, Trophy, User, Swords } from 'lucide-react'

type Page = 'home' | 'battle' | 'leaderboard' | 'profile'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const { currentPlayer, setPlayer } = useGameStore()

  useEffect(() => {
    // Auto-generate player if not exists
    if (!currentPlayer) {
      const avatars = ['😎', '🤓', '🎯', '🎨', '🎭', '🎪', '🎤', '🎧']
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
      const randomName = `플레이어${Math.floor(Math.random() * 9999)}`
      
      setPlayer({
        id: Date.now().toString(),
        name: randomName,
        avatar: randomAvatar,
        score: 0,
        jokes: []
      })
    }
  }, [currentPlayer, setPlayer])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />
      case 'battle':
        return <BattleArena />
      case 'leaderboard':
        return <Leaderboard />
      case 'profile':
        return <PlayerProfile />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm p-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🎭 Joke Battle Arena
          </h1>
          {currentPlayer && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentPlayer.avatar}</span>
              <span className="font-medium">{currentPlayer.name}</span>
              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-sm">
                {currentPlayer.score} pts
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto p-4">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-around items-center p-2">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              currentPage === 'home' 
                ? 'bg-white/20 text-yellow-400' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">홈</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('battle')}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              currentPage === 'battle' 
                ? 'bg-white/20 text-yellow-400' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Swords size={24} />
            <span className="text-xs mt-1">배틀</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('leaderboard')}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              currentPage === 'leaderboard' 
                ? 'bg-white/20 text-yellow-400' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Trophy size={24} />
            <span className="text-xs mt-1">랭킹</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              currentPage === 'profile' 
                ? 'bg-white/20 text-yellow-400' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">프로필</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App