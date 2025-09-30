import React from 'react'
import { useGameStore } from '../store/gameStore'
import { 
  Lock, 
  Star, 
  Play,
  Trophy,
  Clock,
  Sparkles
} from 'lucide-react'

const LevelSelector: React.FC = () => {
  const { levels, startLevel, score } = useGameStore()

  const getTotalStars = () => {
    return levels.reduce((acc, level) => acc + level.stars, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="text-center text-white mb-4">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center space-x-2">
            <Clock className="w-8 h-8 text-purple-400 animate-pulse" />
            <span>시간 역행 퍼즐</span>
          </h1>
          <p className="text-sm text-purple-300">시간을 거꾸로 돌려 원인을 찾아내세요</p>
        </div>
        
        {/* Stats */}
        <div className="flex justify-around bg-slate-800/50 backdrop-blur rounded-lg p-3 mb-4">
          <div className="text-center">
            <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">총 점수</p>
            <p className="text-lg font-bold text-white">{score.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">획득 별</p>
            <p className="text-lg font-bold text-white">{getTotalStars()}/15</p>
          </div>
          <div className="text-center">
            <Sparkles className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">클리어</p>
            <p className="text-lg font-bold text-white">
              {levels.filter(l => l.completed).length}/{levels.length}
            </p>
          </div>
        </div>
      </div>

      {/* Level Grid */}
      <div className="max-w-md mx-auto">
        <div className="space-y-3">
          {levels.map((level, index) => {
            const isLocked = index > 0 && !levels[index - 1].completed
            
            return (
              <div
                key={level.id}
                className={`
                  relative overflow-hidden rounded-lg transition-all duration-300
                  ${isLocked 
                    ? 'bg-slate-800/30 opacity-60' 
                    : 'bg-gradient-to-r from-purple-800/50 to-blue-800/50 hover:from-purple-700/60 hover:to-blue-700/60'
                  }
                `}
              >
                <button
                  onClick={() => !isLocked && startLevel(level.id)}
                  disabled={isLocked}
                  className="w-full p-4 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${isLocked 
                        ? 'bg-slate-700' 
                        : level.completed 
                          ? 'bg-gradient-to-br from-green-500 to-green-600' 
                          : 'bg-gradient-to-br from-purple-500 to-blue-500'
                      }
                    `}>
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-slate-400" />
                      ) : (
                        <span className="text-white font-bold text-lg">{level.id}</span>
                      )}
                    </div>
                    
                    <div className="text-left">
                      <h3 className="text-white font-medium">{level.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-slate-400">
                            {level.maxTimeSteps} 타임라인
                          </span>
                        </div>
                        {level.completed && (
                          <div className="flex items-center space-x-1">
                            <Trophy className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">클리어</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Stars */}
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= level.stars
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {!isLocked && (
                      <div className="ml-2 p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Completion effect */}
                {level.completed && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-pulse" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Coming Soon */}
        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg text-center">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-pulse" />
          <p className="text-white font-medium">더 많은 레벨이 곧 추가됩니다!</p>
          <p className="text-xs text-slate-400 mt-1">매주 새로운 도전과제가 업데이트됩니다</p>
        </div>
      </div>
    </div>
  )
}

export default LevelSelector