import { useGameStore } from '../store/gameStore'
import GameCell from './GameCell'

export default function GameBoard() {
  const { grid, currentLevel, levels } = useGameStore()
  const level = levels.find(l => l.id === currentLevel)
  
  if (!level) return null

  const cellSize = Math.min(
    (window.innerWidth - 32) / level.gridSize,
    (window.innerHeight - 300) / level.gridSize,
    60
  )

  return (
    <div className="relative">
      <div 
        className="grid gap-0 bg-maze-dark/50 p-2 rounded-xl border-2 border-gray-700 shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${level.gridSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${level.gridSize}, ${cellSize}px)`
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <GameCell
              key={`${x}-${y}`}
              cell={cell}
              x={x}
              y={y}
              size={cellSize}
            />
          ))
        )}
      </div>
      
      {/* Laser beam visual effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {grid.map((row, y) =>
          row.map((cell, x) => {
            if (!cell.isBeamActive || cell.type === 'laser' || cell.type === 'target') return null
            
            return (
              <div
                key={`beam-${x}-${y}`}
                className="absolute animate-laser-beam"
                style={{
                  left: `${8 + x * cellSize}px`,
                  top: `${8 + y * cellSize}px`,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`
                }}
              >
                {cell.beamDirection?.map((dir, idx) => (
                  <div
                    key={idx}
                    className={`absolute bg-laser-red laser-beam shadow-laser-glow ${
                      dir === 'up' || dir === 'down' ? 'w-1 h-full left-1/2 -translate-x-1/2' :
                      'h-1 w-full top-1/2 -translate-y-1/2'
                    }`}
                  />
                ))}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}