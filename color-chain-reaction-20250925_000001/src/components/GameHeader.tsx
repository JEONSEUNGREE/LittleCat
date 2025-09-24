import React from 'react'
import { useGameStore } from '../store/gameStore'
import { Trophy, Target, RotateCcw, Home } from 'lucide-react'

export const GameHeader: React.FC = () => {
  const { score, moves, level, targetScore, gameStatus, resetGame, setGameStatus } = useGameStore()
  
  return (
    <header className="w-full bg-gradient-to-b from-gray-900 to-gray-800 p-4 shadow-xl">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            Color Chain
          </h1>
          
          <div className="flex gap-2">
            {gameStatus === 'playing' && (
              <>
                <button
                  onClick={resetGame}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  aria-label="Reset game"
                >
                  <RotateCcw size={20} className="text-white" />
                </button>
                <button
                  onClick={() => setGameStatus('menu')}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  aria-label="Back to menu"
                >
                  <Home size={20} className="text-white" />
                </button>
              </>
            )}
          </div>
        </div>
        
        {gameStatus === 'playing' && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-800/50 rounded-lg p-2 flex items-center gap-2">
              <Trophy className="text-yellow-400" size={16} />
              <div>
                <p className="text-gray-400 text-xs">Score</p>
                <p className="text-white font-bold">{score}</p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-2 flex items-center gap-2">
              <Target className="text-green-400" size={16} />
              <div>
                <p className="text-gray-400 text-xs">Target</p>
                <p className="text-white font-bold">{targetScore}</p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Level</p>
              <p className="text-white font-bold">{level}</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Moves</p>
              <p className="text-white font-bold">{moves}</p>
            </div>
          </div>
        )}
        
        {/* Progress bar */}
        {gameStatus === 'playing' && (
          <div className="mt-3 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-game-blue to-game-green transition-all duration-500"
              style={{ width: `${Math.min((score / targetScore) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>
    </header>
  )
}