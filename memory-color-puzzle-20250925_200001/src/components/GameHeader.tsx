import React from 'react'
import { Trophy, Heart, Target } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameHeader: React.FC = () => {
  const { level, score, highScore, lives, maxLives, gameStatus, isShowingSequence, isPlayerTurn } = useGameStore()

  const getStatusText = () => {
    if (gameStatus === 'idle') return 'Press Start to Play'
    if (gameStatus === 'failed') return 'Game Over!'
    if (gameStatus === 'success') return 'Level Complete!'
    if (isShowingSequence) return 'Watch the Pattern'
    if (isPlayerTurn) return 'Your Turn!'
    return 'Get Ready...'
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg">
        {/* Status Text */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white animate-fade-in">
            {getStatusText()}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-white">
          {/* Level */}
          <div className="flex flex-col items-center p-2 bg-white/10 rounded-xl">
            <Target className="w-5 h-5 mb-1" />
            <span className="text-xs opacity-75">Level</span>
            <span className="text-lg font-bold">{level}</span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center p-2 bg-white/10 rounded-xl">
            <span className="text-xs opacity-75 mb-1">Score</span>
            <span className="text-2xl font-bold">{score}</span>
            <span className="text-xs opacity-75">Best: {highScore}</span>
          </div>

          {/* Lives */}
          <div className="flex flex-col items-center p-2 bg-white/10 rounded-xl">
            <div className="flex gap-1 mb-1">
              {Array.from({ length: maxLives }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${i < lives ? 'fill-red-500 text-red-500' : 'text-white/30'}`}
                />
              ))}
            </div>
            <span className="text-xs opacity-75">Lives</span>
            <span className="text-lg font-bold">{lives}/{maxLives}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameHeader