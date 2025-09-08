import { Zap, Target } from 'lucide-react'
import { Cell } from '../store/gameStore'
import { useGameStore } from '../store/gameStore'

interface GameCellProps {
  cell: Cell
  x: number
  y: number
  size: number
}

export default function GameCell({ cell, x, y, size }: GameCellProps) {
  const { placeMirror, removeMirror, currentLevel, levels } = useGameStore()
  const level = levels.find(l => l.id === currentLevel)

  const handleClick = () => {
    if (cell.type === 'empty') {
      placeMirror(x, y)
    } else if (cell.type === 'mirror') {
      // Check if it's not an initial mirror
      const isInitialMirror = level?.initialMirrors.some(m => m.x === x && m.y === y)
      if (!isInitialMirror) {
        removeMirror(x, y)
      }
    }
  }

  const getCellContent = () => {
    switch (cell.type) {
      case 'laser':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-laser-red to-laser-glow rounded">
            <Zap className="w-2/3 h-2/3 text-white animate-pulse-glow" />
          </div>
        )
      
      case 'target':
        return (
          <div className={`w-full h-full flex items-center justify-center rounded ${
            cell.isBeamActive ? 'bg-gradient-to-br from-target-gold to-yellow-300 animate-success-burst' : 
            'bg-gradient-to-br from-gray-600 to-gray-700'
          }`}>
            <Target className={`w-2/3 h-2/3 ${
              cell.isBeamActive ? 'text-white' : 'text-gray-400'
            }`} />
          </div>
        )
      
      case 'wall':
        return (
          <div className="w-full h-full bg-wall-gray rounded wall-texture" />
        )
      
      case 'mirror':
        const isInitialMirror = level?.initialMirrors.some(m => m.x === x && m.y === y)
        return (
          <div className={`w-full h-full flex items-center justify-center mirror-gradient rounded ${
            isInitialMirror ? 'border-2 border-mirror-silver' : 'border-2 border-mirror-glass animate-mirror-shine'
          }`}>
            <span className="text-2xl font-bold text-gray-700 select-none">
              {cell.mirrorType}
            </span>
          </div>
        )
      
      default:
        return null
    }
  }

  const isClickable = cell.type === 'empty' || 
    (cell.type === 'mirror' && !level?.initialMirrors.some(m => m.x === x && m.y === y))

  return (
    <div
      className={`grid-cell ${
        isClickable ? 'cursor-pointer hover:bg-gray-700/50' : ''
      } ${cell.isBeamActive && cell.type === 'empty' ? 'bg-laser-red/10' : ''}`}
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      {getCellContent()}
    </div>
  )
}