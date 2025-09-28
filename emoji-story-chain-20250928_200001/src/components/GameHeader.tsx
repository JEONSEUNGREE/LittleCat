import { Trophy, Clock, Star, Home } from 'lucide-react'
import useGameStore from '../store'

const GameHeader = () => {
  const { score, level, timeRemaining, playerName, gameMode } = useGameStore()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getModeEmoji = () => {
    switch(gameMode) {
      case 'create': return '✨'
      case 'challenge': return '🏆'
      case 'collaborative': return '🤝'
      default: return '🎮'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Home className="w-5 h-5 text-white" />
          </button>
          
          <div className="text-white">
            <div className="text-sm opacity-80">Player</div>
            <div className="font-bold text-lg">{playerName}</div>
          </div>
          
          <div className="text-white">
            <div className="text-sm opacity-80">Mode</div>
            <div className="font-bold text-lg flex items-center gap-1">
              <span className="text-2xl">{getModeEmoji()}</span>
              <span className="capitalize">{gameMode}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-xs opacity-80">Score</div>
              <div className="font-bold text-xl">{score.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-white">
            <Star className="w-5 h-5 text-orange-400" />
            <div>
              <div className="text-xs opacity-80">Level</div>
              <div className="font-bold text-xl">{level}</div>
            </div>
          </div>
          
          {gameMode === 'challenge' && (
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-xs opacity-80">Time</div>
                <div className="font-bold text-xl">{formatTime(timeRemaining)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameHeader