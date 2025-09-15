import React from 'react'
import { Trophy, Target, Zap, RotateCcw, Home } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

interface GameOverScreenProps {
  onRestart: () => void
  onHome: () => void
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart, onHome }) => {
  const { score, maxCombo, perfectHits, goodHits, misses, level } = useGameStore()
  
  const totalHits = perfectHits + goodHits + misses
  const accuracy = totalHits > 0 ? ((perfectHits + goodHits) / totalHits * 100).toFixed(1) : '0'
  
  const getRank = () => {
    if (score >= 10000) return { rank: 'S', color: 'text-purple-400' }
    if (score >= 7000) return { rank: 'A', color: 'text-blue-400' }
    if (score >= 5000) return { rank: 'B', color: 'text-green-400' }
    if (score >= 3000) return { rank: 'C', color: 'text-yellow-400' }
    return { rank: 'D', color: 'text-red-400' }
  }
  
  const { rank, color } = getRank()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Game Over!</h1>
          <p className="text-xl text-white/70">Level {level} Completed</p>
        </div>

        {/* Rank Display */}
        <div className="word-card text-center py-8">
          <div className={`text-8xl font-bold ${color} mb-2`}>{rank}</div>
          <div className="text-sm text-white/70">RANK</div>
        </div>

        {/* Score */}
        <div className="word-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-semibold">Final Score</span>
            </div>
            <span className="text-3xl font-bold">{score.toLocaleString()}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="word-card space-y-3">
          <h3 className="text-lg font-semibold mb-3 text-center">Performance Stats</h3>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span>Accuracy</span>
            </div>
            <span className="font-semibold">{accuracy}%</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Max Combo</span>
            </div>
            <span className="font-semibold">{maxCombo}x</span>
          </div>

          <div className="border-t border-white/20 pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Perfect Hits</span>
              <span>{perfectHits}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-400">Good Hits</span>
              <span>{goodHits}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-400">Misses</span>
              <span>{misses}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onHome}
            className="flex-1 py-3 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
}