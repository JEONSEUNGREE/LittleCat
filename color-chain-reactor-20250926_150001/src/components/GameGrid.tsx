import React from 'react'
import { useGameStore } from '../store/gameStore'
import styles from './GameGrid.module.css'

const GameGrid: React.FC = () => {
  const { grid, selectCell, selectedColor } = useGameStore()

  const getColorClass = (color: string | null) => {
    switch (color) {
      case 'red': return 'bg-game-red'
      case 'blue': return 'bg-game-blue'
      case 'yellow': return 'bg-game-yellow'
      case 'green': return 'bg-game-green'
      case 'purple': return 'bg-game-purple'
      case 'orange': return 'bg-game-orange'
      default: return 'bg-gray-800 bg-opacity-30'
    }
  }

  return (
    <div className="grid grid-cols-8 gap-1 p-4 bg-black bg-opacity-20 rounded-lg max-w-sm mx-auto">
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <button
            key={cell.id}
            onClick={() => selectCell(rowIndex, colIndex)}
            className={`
              ${styles.cell}
              ${getColorClass(cell.color)}
              ${cell.isActive ? 'animate-chain-reaction' : ''}
              ${cell.color === null ? 'hover:bg-opacity-50' : 'cursor-not-allowed'}
              aspect-square rounded-md transition-all duration-300 transform
              ${cell.color === null && selectedColor ? `hover:${getColorClass(selectedColor)} hover:bg-opacity-40` : ''}
              ${cell.chainLevel > 0 ? `scale-${100 + cell.chainLevel * 10}` : ''}
            `}
            disabled={cell.color !== null}
            style={{
              animationDelay: cell.chainLevel ? `${cell.chainLevel * 50}ms` : '0ms'
            }}
          >
            {cell.color && (
              <div className="w-full h-full rounded-md shadow-inner" />
            )}
          </button>
        ))
      ))}
    </div>
  )
}

export default GameGrid