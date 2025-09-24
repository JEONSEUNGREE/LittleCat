import React from 'react'
import { useGameStore, type ColorType } from '../store/gameStore'

const colorClasses: Record<ColorType, string> = {
  red: 'bg-game-red',
  blue: 'bg-game-blue',
  yellow: 'bg-game-yellow',
  purple: 'bg-game-purple',
  green: 'bg-game-green',
  orange: 'bg-game-orange'
}

export const GameGrid: React.FC = () => {
  const { grid, placeColor, currentColor, gameStatus } = useGameStore()
  
  if (!grid.length) return null
  
  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== 'playing') return
    placeColor(row, col)
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div 
        className="grid gap-1 aspect-square bg-gray-900/50 p-2 rounded-xl"
        style={{
          gridTemplateColumns: `repeat(${grid.length}, 1fr)`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={cell.id}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`
                relative aspect-square rounded-lg border-2 transition-all duration-300 transform
                ${cell.color ? colorClasses[cell.color] : 'bg-gray-800'}
                ${cell.color ? 'border-white/30' : 'border-gray-700'}
                ${gameStatus === 'playing' ? 'hover:scale-105 active:scale-95' : ''}
                ${cell.isExploding ? 'animate-expand' : ''}
              `}
              disabled={gameStatus !== 'playing'}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {cell.dots > 0 && (
                  <div className="flex flex-wrap gap-0.5 p-1">
                    {Array.from({ length: cell.dots }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-white rounded-full shadow-lg animate-chain"
                        style={{ animationDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Corner/Edge indicator */}
              {cell.maxDots < 4 && (
                <div className="absolute top-0.5 right-0.5 text-xs text-white/50">
                  {cell.maxDots}
                </div>
              )}
            </button>
          ))
        )}
      </div>
      
      {/* Current color indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-white/70 text-sm">Current:</span>
        <div 
          className={`w-8 h-8 rounded-full ${colorClasses[currentColor]} animate-pulse-slow shadow-lg`}
        />
      </div>
    </div>
  )
}