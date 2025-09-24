import React from 'react'
import { useGameStore } from '../store/gameStore'
import { Play, Grid3x3, Info } from 'lucide-react'

export const MainMenu: React.FC = () => {
  const { initGame, level } = useGameStore()
  const [showRules, setShowRules] = React.useState(false)
  
  const gridSizes = [
    { size: 6, label: '6x6', difficulty: 'Easy' },
    { size: 8, label: '8x8', difficulty: 'Medium' },
    { size: 10, label: '10x10', difficulty: 'Hard' }
  ]
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-md w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <span className="text-5xl animate-bounce-slow">🎨</span>
            Color Chain
          </h1>
          <p className="text-gray-400">Reaction Strategy Game</p>
          <p className="text-sm text-gray-500 mt-2">Level {level}</p>
        </div>
        
        {/* Grid size selection */}
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 mb-4">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Grid3x3 size={20} />
            Select Grid Size
          </h2>
          
          <div className="space-y-3">
            {gridSizes.map(({ size, label, difficulty }) => (
              <button
                key={size}
                onClick={() => initGame(size)}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-game-blue hover:to-game-green text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Play size={20} className="group-hover:animate-pulse" />
                  <span className="font-semibold">{label}</span>
                </div>
                <span className="text-sm text-gray-300">{difficulty}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* How to play */}
        <button
          onClick={() => setShowRules(!showRules)}
          className="w-full bg-gray-800/50 backdrop-blur rounded-xl p-4 text-white hover:bg-gray-700/50 transition-colors flex items-center justify-center gap-2"
        >
          <Info size={20} />
          How to Play
        </button>
        
        {showRules && (
          <div className="mt-4 bg-gray-800/50 backdrop-blur rounded-xl p-4 text-sm text-gray-300 space-y-2">
            <p>🎯 <strong>Goal:</strong> Reach the target score by creating color chain reactions!</p>
            <p>🎨 <strong>Place Colors:</strong> Tap cells to place your current color.</p>
            <p>💥 <strong>Explode:</strong> Cells explode when they exceed their capacity (corners: 2, edges: 3, center: 4).</p>
            <p>⚡ <strong>Chain Reaction:</strong> Explosions spread color to neighbors, creating chains for bonus points!</p>
            <p>🏆 <strong>Strategy:</strong> Plan your moves to create massive chain reactions!</p>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Made with React + TypeScript</p>
        </div>
      </div>
    </div>
  )
}