import React, { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { Heart, Trophy, Clock, Zap } from 'lucide-react'

export const GameHeader: React.FC = () => {
  const { level, score, lives, timeLeft, gameState, decrementTime } = useGameStore()
  
  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        decrementTime()
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [gameState, decrementTime])
  
  return (
    <div className="bg-gradient-to-r from-game-dark to-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4 text-game-accent">
          Memory Maze Escape
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2 justify-center">
            <Zap className="text-game-warning" size={20} />
            <span className="font-semibold">Level: {level}</span>
          </div>
          
          <div className="flex items-center gap-2 justify-center">
            <Trophy className="text-yellow-400" size={20} />
            <span className="font-semibold">Score: {score}</span>
          </div>
          
          <div className="flex items-center gap-2 justify-center">
            <Heart className="text-game-secondary" size={20} />
            <span className="font-semibold">Lives: {lives}</span>
          </div>
          
          <div className="flex items-center gap-2 justify-center">
            <Clock className={`${timeLeft < 10 ? 'text-game-secondary animate-pulse' : 'text-game-success'}`} size={20} />
            <span className="font-semibold">Time: {timeLeft}s</span>
          </div>
        </div>
      </div>
    </div>
  )
}