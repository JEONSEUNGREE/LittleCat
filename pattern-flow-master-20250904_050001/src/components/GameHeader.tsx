import React, { useEffect } from 'react'
import { Heart, Trophy, Zap, Timer, Pause } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const GameHeader: React.FC = () => {
  const {
    score,
    highScore,
    lives,
    level,
    combo,
    timeRemaining,
    currentPattern,
    gameState,
    pauseGame,
    loseLife,
    setTimeRemaining
  } = useGameStore()
  
  useEffect(() => {
    if (gameState !== 'playing' || !currentPattern) return
    
    const interval = setInterval(() => {
      setTimeRemaining(Math.max(0, timeRemaining - 100))
      
      if (timeRemaining <= 100) {
        loseLife()
        setTimeRemaining(0)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [gameState, timeRemaining, currentPattern, loseLife, setTimeRemaining])
  
  const timePercentage = currentPattern 
    ? (timeRemaining / currentPattern.timeLimit) * 100
    : 100
  
  const getTimeBarColor = () => {
    if (timePercentage > 50) return 'bg-green-500'
    if (timePercentage > 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }
  
  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{score}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-white/70 text-sm">최고:</span>
            <span className="text-white font-bold">{highScore}</span>
          </div>
        </div>
        
        <button
          onClick={pauseGame}
          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          disabled={gameState !== 'playing'}
        >
          <Pause className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-white">
          <span className="text-sm font-medium">레벨 {level}</span>
        </div>
        
        {combo > 0 && (
          <div className="flex items-center gap-1">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{combo}x</span>
          </div>
        )}
      </div>
      
      {gameState === 'playing' && currentPattern && (
        <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-100 ${getTimeBarColor()}`}
            style={{ width: `${timePercentage}%` }}
          />
          <Timer className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/70" />
        </div>
      )}
    </div>
  )
}