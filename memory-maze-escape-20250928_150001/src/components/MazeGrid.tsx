import React from 'react'
import { useGameStore } from '../store/gameStore'
import { User } from 'lucide-react'

export const MazeGrid: React.FC = () => {
  const { maze, playerPosition, isVisible, gameState, mazeSize } = useGameStore()
  
  if (!maze.length) return null
  
  const cellSize = Math.min(40, 320 / mazeSize)
  
  return (
    <div className="relative flex items-center justify-center p-4">
      <div 
        className={`grid bg-gray-900 p-2 rounded-lg shadow-2xl transition-all duration-500 ${
          !isVisible && gameState === 'playing' ? 'opacity-10' : ''
        }`}
        style={{
          gridTemplateColumns: `repeat(${mazeSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${mazeSize}, ${cellSize}px)`,
          gap: '1px'
        }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`relative transition-all duration-300 ${
                cell.isStart ? 'bg-game-success' : 
                cell.isEnd ? 'bg-game-secondary' : 
                'bg-gray-800'
              }`}
              style={{
                width: cellSize,
                height: cellSize,
                borderTop: cell.walls.top ? '2px solid #5e72e4' : 'none',
                borderRight: cell.walls.right ? '2px solid #5e72e4' : 'none',
                borderBottom: cell.walls.bottom ? '2px solid #5e72e4' : 'none',
                borderLeft: cell.walls.left ? '2px solid #5e72e4' : 'none',
              }}
            >
              {playerPosition.x === x && playerPosition.y === y && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse-slow">
                  <User 
                    className="text-game-accent" 
                    size={cellSize * 0.6}
                  />
                </div>
              )}
              {cell.isEnd && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                  EXIT
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {gameState === 'memorizing' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black bg-opacity-50 text-white p-4 rounded-lg animate-pulse">
            <p className="text-xl font-bold">Memorize the path!</p>
          </div>
        </div>
      )}
    </div>
  )
}