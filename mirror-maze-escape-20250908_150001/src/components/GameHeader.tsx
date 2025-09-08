import { Trophy, RotateCw, Info } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { useState } from 'react'

export default function GameHeader() {
  const { currentLevel, levels, movesCount, bestScores, resetLevel } = useGameStore()
  const [showInfo, setShowInfo] = useState(false)
  const level = levels.find(l => l.id === currentLevel)

  return (
    <header className="bg-maze-light/50 backdrop-blur-sm border-b border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-laser-red to-laser-glow bg-clip-text text-transparent">
              Mirror Maze
            </h1>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-lg bg-maze-dark/50 hover:bg-maze-dark/70 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={resetLevel}
            className="p-2 rounded-lg bg-maze-dark/50 hover:bg-maze-dark/70 transition-colors"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Level</span>
              <span className="font-bold text-laser-glow">{currentLevel}/{levels.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Moves</span>
              <span className="font-bold">{movesCount}</span>
            </div>
          </div>
          
          {bestScores[currentLevel] && (
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-target-gold" />
              <span className="text-target-gold font-bold">{bestScores[currentLevel]}</span>
            </div>
          )}
        </div>

        {level && (
          <div className="mt-2 text-center">
            <h2 className="text-lg font-semibold text-mirror-glass">{level.name}</h2>
          </div>
        )}

        {showInfo && (
          <div className="mt-3 p-3 bg-maze-dark/50 rounded-lg text-sm">
            <p className="text-gray-300 mb-2">
              Guide the laser beam to the target by placing mirrors!
            </p>
            <div className="space-y-1 text-gray-400">
              <p>• Tap empty cells to place mirrors</p>
              <p>• Tap mirrors to remove them</p>
              <p>• / mirrors reflect at 45°</p>
              <p>• \ mirrors reflect at -45°</p>
              <p>• Complete with minimum moves!</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}