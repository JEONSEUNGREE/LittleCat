import React from 'react'
import { useGameStore } from '../store/gameStore'
import { Trophy, Star, ArrowRight, RotateCcw } from 'lucide-react'

export const WinScreen: React.FC = () => {
  const { score, moves, level, initGame, setGameStatus, gridSize } = useGameStore()
  
  const stars = score > 200 ? 3 : score > 150 ? 2 : 1
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur rounded-2xl p-8 text-center">
        {/* Trophy animation */}
        <div className="mb-6">
          <Trophy size={80} className="text-yellow-400 mx-auto animate-bounce-slow" />
        </div>
        
        {/* Victory message */}
        <h1 className="text-3xl font-bold text-white mb-2">Level Complete!</h1>
        <p className="text-gray-400 mb-6">Amazing chain reactions!</p>
        
        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <Star
              key={i}
              size={40}
              className={`${
                i <= stars
                  ? 'text-yellow-400 fill-yellow-400 animate-pulse'
                  : 'text-gray-600'
              }`}
            />
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <p className="text-gray-400 text-sm">Final Score</p>
            <p className="text-2xl font-bold text-white">{score}</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <p className="text-gray-400 text-sm">Moves Used</p>
            <p className="text-2xl font-bold text-white">{moves}</p>
          </div>
        </div>
        
        {/* Next level info */}
        <div className="bg-game-blue/20 rounded-lg p-3 mb-6">
          <p className="text-game-blue text-sm">Next Level: {level}</p>
          <p className="text-gray-400 text-xs mt-1">Target Score: {level * 100}</p>
        </div>
        
        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={() => initGame(gridSize)}
            className="w-full bg-gradient-to-r from-game-blue to-game-green text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowRight size={20} />
            Next Level
          </button>
          
          <button
            onClick={() => {
              initGame(gridSize)
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Replay Level
          </button>
          
          <button
            onClick={() => setGameStatus('menu')}
            className="w-full text-gray-400 hover:text-white transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  )
}