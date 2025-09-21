import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RotateCcw, Sun } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { useState } from 'react'

const GameControls = () => {
  const { movePlayer, moveLight, resetGame } = useGameStore()
  const [controlMode, setControlMode] = useState<'player' | 'light'>('player')

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (controlMode === 'player') {
      movePlayer(direction)
    } else {
      moveLight(direction)
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setControlMode('player')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            controlMode === 'player'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          Move Player
        </button>
        <button
          onClick={() => setControlMode('light')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            controlMode === 'light'
              ? 'bg-yellow-600 text-white'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          <Sun className="w-4 h-4" />
          Move Light
        </button>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={() => handleMove('up')}
          className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleMove('left')}
            className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => handleMove('down')}
            className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-all active:scale-95"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => handleMove('right')}
            className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-all active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={resetGame}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Game
        </button>
      </div>
    </div>
  )
}

export default GameControls