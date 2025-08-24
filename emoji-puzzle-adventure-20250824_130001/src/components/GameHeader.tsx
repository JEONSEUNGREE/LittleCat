import React from 'react'
import { Heart, Trophy, Star } from 'lucide-react'

interface GameHeaderProps {
  level: number
  score: number
  lives: number
  totalLevels: number
}

const GameHeader: React.FC<GameHeaderProps> = ({ level, score, lives, totalLevels }) => {
  return (
    <div className="w-full bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">레벨 {level}/{totalLevels}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">{score}점</span>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameHeader