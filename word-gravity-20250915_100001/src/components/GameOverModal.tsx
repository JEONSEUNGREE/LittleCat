import React from 'react'
import { Trophy, RefreshCw, Star } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const GameOverModal: React.FC = () => {
  const { gameStatus, score, level, resetGame, startNewLevel } = useGameStore()

  if (gameStatus === 'playing' || gameStatus === 'paused') {
    return null
  }

  const isWin = gameStatus === 'won'

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        <div className="text-center text-white">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            {isWin ? (
              <Trophy className="w-16 h-16 text-yellow-400 animate-bounce-light" />
            ) : (
              <RefreshCw className="w-16 h-16 text-red-400" />
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-2">
            {isWin ? 'Level Complete!' : 'Time\'s Up!'}
          </h2>

          {/* Score Display */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-center items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-xl">Score: {score}</span>
            </div>
            <div className="text-lg opacity-90">
              Level {level}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {isWin && (
              <button
                onClick={startNewLevel}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Next Level
              </button>
            )}
            <button
              onClick={resetGame}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              {isWin ? 'New Game' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOverModal