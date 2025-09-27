import React from 'react'
import { Music, Heart, Trophy, Zap } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameHeader: React.FC = () => {
  const { score, level, lives, highScore, combo } = useGameStore()
  
  return (
    <div className="w-full bg-black/20 backdrop-blur-sm p-4 rounded-b-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-wave-accent animate-pulse-slow" />
          <h1 className="text-xl font-bold hidden sm:block">Memory Wave</h1>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          {/* Score */}
          <div className="flex items-center gap-1">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">{score}</span>
          </div>
          
          {/* Level */}
          <div className="flex items-center gap-1">
            <span className="font-medium text-wave-light">Lv.</span>
            <span className="font-bold text-lg">{level}</span>
          </div>
          
          {/* Combo */}
          {combo > 0 && (
            <div className="flex items-center gap-1 animate-bounce-slow">
              <Zap className="w-5 h-5 text-wave-accent" />
              <span className="font-bold text-wave-accent">x{combo}</span>
            </div>
          )}
          
          {/* Lives */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${
                  i < lives ? 'text-red-500 fill-red-500' : 'text-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* High Score */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-wave-light">Best:</span>
          <span className="font-bold text-wave-accent">{highScore}</span>
        </div>
      </div>
    </div>
  )
}

export default GameHeader