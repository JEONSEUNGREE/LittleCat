import React from 'react'
import { Trophy, Clock, Target, RotateCcw } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const GameHeader: React.FC = () => {
  const { 
    score, 
    level, 
    targetWord, 
    collectedLetters, 
    timeLeft,
    resetGame 
  } = useGameStore()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const targetLetters = targetWord.split('')
  
  return (
    <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-md p-4">
      <div className="max-w-4xl mx-auto">
        {/* Stats Row */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="font-bold">Level {level}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={resetGame}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Target Word Display */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/80 text-sm">Collect letters to form:</span>
          <div className="flex gap-2">
            {targetLetters.map((letter, index) => {
              const isCollected = collectedLetters.filter(l => l === letter).length > 
                                targetLetters.slice(0, index).filter(l => l === letter).length
              
              return (
                <div
                  key={index}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg font-bold text-lg transition-all ${
                    isCollected
                      ? 'bg-gradient-to-br from-green-400 to-green-600 text-white scale-110'
                      : 'bg-white/20 text-white/60 border-2 border-white/30'
                  }`}
                >
                  {isCollected ? letter : '?'}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameHeader