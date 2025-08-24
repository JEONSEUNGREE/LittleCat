import React from 'react'
import { Trophy, Heart, Zap } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const GameHeader: React.FC = () => {
  const { level, score, highScore, lives } = useGameStore()

  return (
    <header className="w-full p-4">
      <div className="max-w-md mx-auto glass-effect rounded-2xl p-4">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Color Memory Quest
        </h1>
        
        <div className="grid grid-cols-3 gap-2 text-white">
          <div className="flex flex-col items-center glass-effect rounded-xl p-2">
            <div className="flex items-center gap-1 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold">Level</span>
            </div>
            <span className="text-xl font-bold">{level}</span>
          </div>
          
          <div className="flex flex-col items-center glass-effect rounded-xl p-2">
            <div className="flex items-center gap-1 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-semibold">Score</span>
            </div>
            <span className="text-xl font-bold">{score}</span>
          </div>
          
          <div className="flex flex-col items-center glass-effect rounded-xl p-2">
            <div className="flex items-center gap-1 mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-semibold">Lives</span>
            </div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${
                    i < lives
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {highScore > 0 && (
          <div className="mt-2 text-center text-white/80 text-sm">
            <span>High Score: {highScore}</span>
          </div>
        )}
      </div>
    </header>
  )
}