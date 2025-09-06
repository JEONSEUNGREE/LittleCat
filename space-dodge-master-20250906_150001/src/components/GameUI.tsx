import React from 'react'
import { Trophy, Zap } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameUI: React.FC = () => {
  const { score, highScore, difficulty, isPlaying } = useGameStore()

  return (
    <div className="absolute top-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
      <div className="flex justify-between items-start">
        {/* Score */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Score</p>
          <p className="score-display">{score}</p>
        </div>

        {/* High Score */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
          <Trophy className="text-star-yellow" size={20} />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Best</p>
            <p className="text-lg font-bold text-white">{highScore}</p>
          </div>
        </div>
      </div>

      {/* Difficulty indicator */}
      {isPlaying && (
        <div className="flex justify-center mt-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
            <Zap className="text-yellow-400" size={16} />
            <span className="text-sm font-medium">
              Level {Math.floor(difficulty)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameUI