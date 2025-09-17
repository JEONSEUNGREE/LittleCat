import React from 'react'
import { Trophy, Target, Zap, RotateCcw } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const ScoreBoard: React.FC = () => {
  const { 
    level, 
    score, 
    moves, 
    maxMoves, 
    isPlaying, 
    startGame, 
    resetLevel 
  } = useGameStore()

  const movesPercentage = (moves / maxMoves) * 100
  const movesColor = movesPercentage > 80 ? 'bg-red-500' : movesPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-xl">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Target className="text-blue-400 mr-1" size={20} />
            <span className="text-gray-400 text-sm">Level</span>
          </div>
          <div className="text-2xl font-bold text-white">{level}</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Trophy className="text-yellow-400 mr-1" size={20} />
            <span className="text-gray-400 text-sm">Score</span>
          </div>
          <div className="text-2xl font-bold text-white">{score}</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="text-purple-400 mr-1" size={20} />
            <span className="text-gray-400 text-sm">Moves</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {moves}/{maxMoves}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetLevel}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-2 transition-all transform hover:scale-105 active:scale-95"
            disabled={!isPlaying}
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      {/* Moves Progress Bar */}
      <div className="mb-4">
        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`${movesColor} h-full transition-all duration-300`}
            style={{ width: `${movesPercentage}%` }}
          />
        </div>
      </div>

      {/* Game Controls */}
      {!isPlaying ? (
        <button
          onClick={startGame}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Start Game
        </button>
      ) : (
        <div className="text-center text-gray-400 text-sm">
          <p>Use arrow keys or WASD to move</p>
          <p className="mt-1">Reach the green target!</p>
        </div>
      )}
    </div>
  )
}

export default ScoreBoard