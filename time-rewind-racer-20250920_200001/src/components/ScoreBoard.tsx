import { useGameStore } from '../store/gameStore'
import { Trophy, Star } from 'lucide-react'

const ScoreBoard = () => {
  const { score, highScore, level } = useGameStore()

  return (
    <div className="flex items-center space-x-4 text-white">
      {/* Current Score */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center space-x-2">
        <Star className="w-5 h-5 text-yellow-400" />
        <div>
          <div className="text-xs text-gray-400">점수</div>
          <div className="font-bold">{score.toLocaleString()}</div>
        </div>
      </div>

      {/* High Score */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-amber-400" />
        <div>
          <div className="text-xs text-gray-400">최고점수</div>
          <div className="font-bold">{highScore.toLocaleString()}</div>
        </div>
      </div>

      {/* Level Indicator */}
      <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl px-4 py-2">
        <div className="text-xs text-gray-400">레벨</div>
        <div className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          {level}
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard