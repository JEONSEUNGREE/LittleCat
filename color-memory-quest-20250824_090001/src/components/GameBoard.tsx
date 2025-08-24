import React from 'react'
import { useGameStore } from '../store/gameStore'

const COLORS = [
  { name: 'red', bg: 'bg-red-500', active: 'bg-red-400' },
  { name: 'blue', bg: 'bg-blue-500', active: 'bg-blue-400' },
  { name: 'green', bg: 'bg-green-500', active: 'bg-green-400' },
  { name: 'yellow', bg: 'bg-yellow-500', active: 'bg-yellow-400' },
  { name: 'purple', bg: 'bg-purple-500', active: 'bg-purple-400' },
  { name: 'orange', bg: 'bg-orange-500', active: 'bg-orange-400' },
]

export const GameBoard: React.FC = () => {
  const { addUserInput, currentColorIndex, isShowingSequence, gameStatus } = useGameStore()

  const handleColorClick = (color: string) => {
    if (!isShowingSequence && gameStatus === 'waiting') {
      addUserInput(color)
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 max-w-md mx-auto">
      {COLORS.map((color, index) => (
        <button
          key={color.name}
          onClick={() => handleColorClick(color.name)}
          disabled={isShowingSequence || gameStatus !== 'waiting'}
          className={`
            color-tile aspect-square rounded-2xl transition-all duration-200
            ${currentColorIndex === index ? `${color.active} scale-110` : color.bg}
            ${!isShowingSequence && gameStatus === 'waiting' ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
            ${gameStatus === 'failed' && 'animate-pulse-fast'}
          `}
          aria-label={`${color.name} color tile`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-xl bg-white/20 backdrop-blur-sm" />
          </div>
        </button>
      ))}
    </div>
  )
}