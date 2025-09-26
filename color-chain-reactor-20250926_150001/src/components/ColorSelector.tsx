import React from 'react'
import { useGameStore, CellColor } from '../store/gameStore'
import { Palette } from 'lucide-react'

const ColorSelector: React.FC = () => {
  const { selectedColor, setSelectedColor } = useGameStore()
  
  const colors: CellColor[] = ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
  
  const getColorClass = (color: CellColor) => {
    switch (color) {
      case 'red': return 'bg-game-red'
      case 'blue': return 'bg-game-blue'
      case 'yellow': return 'bg-game-yellow'
      case 'green': return 'bg-game-green'
      case 'purple': return 'bg-game-purple'
      case 'orange': return 'bg-game-orange'
      default: return ''
    }
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 mb-4">
      <div className="flex items-center justify-center mb-3">
        <Palette className="w-5 h-5 text-white mr-2" />
        <h3 className="text-white font-semibold">Select Color</h3>
      </div>
      <div className="flex justify-center gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`
              ${getColorClass(color)}
              w-10 h-10 rounded-full transition-all duration-200 transform
              ${selectedColor === color ? 'scale-125 ring-4 ring-white ring-opacity-60' : 'hover:scale-110'}
              shadow-lg
            `}
            aria-label={`Select ${color} color`}
          >
            {selectedColor === color && (
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSelector