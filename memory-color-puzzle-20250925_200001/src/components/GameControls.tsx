import React from 'react'
import { Play, RotateCcw, Info } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameControls: React.FC = () => {
  const { gameStatus, startGame, resetGame } = useGameStore()
  const [showInfo, setShowInfo] = React.useState(false)

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-8">
      <div className="flex gap-3 justify-center">
        {gameStatus === 'idle' ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-600 active:scale-95 transition-all tap-highlight-transparent"
          >
            <Play className="w-6 h-6" />
            Start Game
          </button>
        ) : (
          <button
            onClick={() => {
              resetGame()
              startGame()
            }}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold shadow-lg hover:bg-yellow-600 active:scale-95 transition-all tap-highlight-transparent"
          >
            <RotateCcw className="w-5 h-5" />
            Restart
          </button>
        )}
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="px-4 py-3 bg-white/20 text-white rounded-xl shadow-lg hover:bg-white/30 active:scale-95 transition-all tap-highlight-transparent"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {showInfo && (
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl text-white animate-fade-in">
          <h3 className="font-bold mb-2 text-lg">How to Play</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Watch the color sequence carefully</li>
            <li>• Repeat the pattern by tapping colors</li>
            <li>• Each level adds one more color</li>
            <li>• You have 3 lives - don't make mistakes!</li>
            <li>• Score increases with each level</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default GameControls