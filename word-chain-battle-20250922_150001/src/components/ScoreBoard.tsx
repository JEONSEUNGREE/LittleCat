import React from 'react'
import { Trophy, Star, Zap } from 'lucide-react'
import useGameStore from '../store/gameStore'

const ScoreBoard: React.FC = () => {
  const { score, difficulty, setDifficulty, gameStatus } = useGameStore()

  const difficultyConfig = {
    easy: { label: '쉬움', color: 'bg-green-500', icon: '🌱' },
    medium: { label: '보통', color: 'bg-yellow-500', icon: '🔥' },
    hard: { label: '어려움', color: 'bg-red-500', icon: '⚡' }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          점수판
        </h2>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="text-xs text-blue-600 mb-1">플레이어</div>
          <div className="text-2xl font-bold text-blue-700">{score.player}</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-3">
          <div className="text-xs text-purple-600 mb-1">AI</div>
          <div className="text-2xl font-bold text-purple-700">{score.ai}</div>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          난이도
        </div>
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              disabled={gameStatus === 'playing'}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                difficulty === level
                  ? `${difficultyConfig[level].color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${gameStatus === 'playing' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="mr-1">{difficultyConfig[level].icon}</span>
              {difficultyConfig[level].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard