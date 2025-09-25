import React from 'react'
import ColorButton from './ColorButton'
import useGameStore from '../store/gameStore'

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const GameBoard: React.FC = () => {
  const { 
    currentHighlight, 
    isPlayerTurn, 
    handlePlayerInput,
    gameStatus 
  } = useGameStore()

  const isDisabled = !isPlayerTurn || gameStatus !== 'playing'

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {COLORS.map((color) => (
          <ColorButton
            key={color}
            color={color}
            isHighlighted={currentHighlight === color}
            onClick={() => handlePlayerInput(color)}
            disabled={isDisabled}
          />
        ))}
      </div>
    </div>
  )
}

export default GameBoard