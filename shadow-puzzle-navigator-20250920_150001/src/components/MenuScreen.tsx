import React from 'react'
import { Play, Info, Trophy } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

interface MenuScreenProps {
  onStartGame: () => void
  onShowInstructions: () => void
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame, onShowInstructions }) => {
  const score = useGameStore((state) => state.score)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-shadow-dark to-shadow-gray flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-light-beam mb-2 animate-pulse-glow">
            Shadow Puzzle
          </h1>
          <h2 className="text-2xl md:text-3xl text-light-glow">
            Navigator
          </h2>
        </div>
        
        {/* Light animation */}
        <div className="relative h-32 flex justify-center items-center">
          <div className="absolute w-24 h-24 bg-light-beam rounded-full opacity-30 animate-pulse" />
          <div className="absolute w-16 h-16 bg-light-glow rounded-full opacity-50 animate-pulse" />
          <div className="absolute w-8 h-8 bg-yellow-200 rounded-full" />
          
          {/* Shadow elements */}
          <div className="absolute top-20 w-32 h-16 bg-black/40 blur-lg transform skew-x-12" />
        </div>
        
        {/* Menu buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-light-beam to-light-glow text-shadow-dark py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-xl"
          >
            <Play className="w-6 h-6" />
            Start Game
          </button>
          
          <button
            onClick={onShowInstructions}
            className="w-full bg-shadow-light text-light-beam py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:bg-shadow-gray transition-colors border border-light-beam/30"
          >
            <Info className="w-6 h-6" />
            How to Play
          </button>
          
          {score > 0 && (
            <div className="w-full bg-shadow-light/50 text-light-glow py-3 px-6 rounded-lg flex items-center justify-center gap-3 border border-light-glow/20">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Best Score: {score}</span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Control lights to create shadows</p>
          <p>Match the target shape to win!</p>
        </div>
      </div>
    </div>
  )
}

export default MenuScreen