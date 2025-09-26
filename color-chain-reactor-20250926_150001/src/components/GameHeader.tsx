import React from 'react'
import { useGameStore } from '../store/gameStore'
import { Trophy, Target, Zap, RotateCcw } from 'lucide-react'

const GameHeader: React.FC = () => {
  const { score, moves, level, chainMultiplier, targetScore, resetGame, isGameActive } = useGameStore()
  
  const progressPercentage = Math.min((score / targetScore) * 100, 100)

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold text-white">Color Chain Reactor</h1>
        <button
          onClick={resetGame}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-colors duration-200"
          aria-label="Reset game"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-black bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center text-white text-opacity-70 text-sm mb-1">
            <Trophy className="w-4 h-4 mr-1" />
            Score
          </div>
          <div className="text-white text-xl font-bold">{score.toLocaleString()}</div>
        </div>
        
        <div className="bg-black bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center text-white text-opacity-70 text-sm mb-1">
            <Target className="w-4 h-4 mr-1" />
            Moves
          </div>
          <div className="text-white text-xl font-bold">{moves}</div>
        </div>
        
        <div className="bg-black bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center text-white text-opacity-70 text-sm mb-1">
            <Zap className="w-4 h-4 mr-1" />
            Chain
          </div>
          <div className="text-white text-xl font-bold">x{chainMultiplier}</div>
        </div>
        
        <div className="bg-black bg-opacity-20 rounded-lg p-3">
          <div className="text-white text-opacity-70 text-sm mb-1">Level</div>
          <div className="text-white text-xl font-bold">{level}</div>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-white text-sm mb-1">
          <span>Progress</span>
          <span>{score} / {targetScore}</span>
        </div>
        <div className="w-full bg-black bg-opacity-30 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-game-yellow to-game-green h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {!isGameActive && score >= targetScore && (
        <div className="mt-3 text-center">
          <div className="text-game-yellow text-xl font-bold animate-pulse">
            🎉 Level Complete! 🎉
          </div>
        </div>
      )}
    </div>
  )
}

export default GameHeader