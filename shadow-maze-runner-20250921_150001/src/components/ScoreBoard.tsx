import { Trophy, Target, Footprints, Sparkles } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const ScoreBoard = () => {
  const { level, score, moves, shadowOrbs, collectedOrbs } = useGameStore()

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-4 mb-6 border border-purple-500/30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400 text-sm">Level</span>
          </div>
          <p className="text-2xl font-bold text-white">{level}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 text-sm">Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{score}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Footprints className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400 text-sm">Moves</span>
          </div>
          <p className="text-2xl font-bold text-white">{moves}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400 text-sm">Orbs</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {collectedOrbs.length}/{shadowOrbs.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard