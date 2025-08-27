import { useEffect, useState } from 'react'
import { Trophy, RefreshCw, Home, Star, Zap } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const GameOver: React.FC = () => {
  const { score, maxCombo, accuracy, resetGame, startGame, gameMode } = useGameStore()
  const [highScore, setHighScore] = useState(0)
  const [isNewHighScore, setIsNewHighScore] = useState(false)

  useEffect(() => {
    const savedHighScore = parseInt(localStorage.getItem(`highScore_${gameMode}`) || '0')
    setHighScore(savedHighScore)
    
    if (score > savedHighScore) {
      setIsNewHighScore(true)
      localStorage.setItem(`highScore_${gameMode}`, score.toString())
    }
  }, [score, gameMode])

  const getRank = () => {
    if (score >= 10000) return { rank: 'S', color: 'text-yellow-400' }
    if (score >= 7500) return { rank: 'A', color: 'text-purple-400' }
    if (score >= 5000) return { rank: 'B', color: 'text-blue-400' }
    if (score >= 2500) return { rank: 'C', color: 'text-green-400' }
    return { rank: 'D', color: 'text-gray-400' }
  }

  const { rank, color } = getRank()

  const handlePlayAgain = () => {
    resetGame()
    startGame()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-slide-up">
          {isNewHighScore && (
            <div className="mb-6 text-center animate-bounce">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/30 rounded-full">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 font-bold">NEW HIGH SCORE!</span>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 mx-auto text-yellow-400 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Game Over</h2>
            <div className={`text-6xl font-bold ${color} mb-2`}>{rank}</div>
            <div className="text-gray-300">Rank</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Final Score</span>
                <span className="text-2xl font-bold text-white">{score}</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Max Combo</span>
                <div className="flex items-center gap-1">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-xl font-bold text-yellow-300">{maxCombo}x</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Accuracy</span>
                <span className="text-xl font-bold text-white">{accuracy}%</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">High Score ({gameMode})</span>
                <span className="text-xl font-bold text-purple-300">
                  {Math.max(score, highScore)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePlayAgain}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Play Again
            </button>

            <button
              onClick={resetGame}
              className="w-full py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOver