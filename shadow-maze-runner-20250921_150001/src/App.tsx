import { useState } from 'react'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import ScoreBoard from './components/ScoreBoard'
import { useGameStore } from './store/gameStore'
import { Trophy, RefreshCw, Info } from 'lucide-react'

function App() {
  const [showInstructions, setShowInstructions] = useState(true)
  const { level, score, isGameWon, resetGame } = useGameStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Shadow Maze Runner
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Use light and shadow to find your way through the maze
          </p>
        </header>

        {showInstructions && (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-4 mb-6 border border-purple-500/30">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Info className="text-purple-400 w-5 h-5" />
                <h3 className="text-white font-semibold">How to Play</h3>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Use arrow keys or swipe to move the light source</li>
              <li>• Shadows will reveal hidden paths in the maze</li>
              <li>• Reach the glowing exit to complete the level</li>
              <li>• Collect shadow orbs for bonus points</li>
            </ul>
          </div>
        )}

        <ScoreBoard />

        <div className="bg-slate-800/30 backdrop-blur-md rounded-lg p-2 md:p-6 shadow-2xl border border-purple-500/20">
          {isGameWon ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2">Level Complete!</h2>
              <p className="text-gray-300 mb-6">
                Score: {score} | Level: {level}
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                Next Level
              </button>
            </div>
          ) : (
            <>
              <GameBoard />
              <GameControls />
            </>
          )}
        </div>

        <footer className="text-center mt-6 text-gray-500 text-xs">
          <p>© 2025 Shadow Maze Runner | Touch & Keyboard Controls</p>
        </footer>
      </div>
    </div>
  )
}