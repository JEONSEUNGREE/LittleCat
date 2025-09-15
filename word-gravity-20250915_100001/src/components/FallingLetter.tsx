import React from 'react'
import { Letter } from '../store/gameStore'
import { useGameStore } from '../store/gameStore'

interface FallingLetterProps {
  letter: Letter
}

const FallingLetter: React.FC<FallingLetterProps> = ({ letter }) => {
  const { collectLetter, targetWord } = useGameStore()
  
  const isTargetLetter = targetWord.includes(letter.char)
  
  const handleClick = () => {
    if (!letter.isCollected) {
      collectLetter(letter.id)
    }
  }

  if (letter.isCollected) {
    return null
  }

  return (
    <div
      className={`absolute w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full cursor-pointer transition-all transform hover:scale-110 select-none ${
        isTargetLetter 
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg shadow-orange-500/50' 
          : 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-300 shadow-md'
      }`}
      style={{
        left: `${letter.x}px`,
        top: `${letter.y}px`,
        animation: letter.isCollected ? 'pulse-glow 0.5s ease-out' : undefined
      }}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <span className="text-lg md:text-xl font-bold">{letter.char}</span>
    </div>
  )
}

export default FallingLetter