import React from 'react'
import { Play, RotateCcw, Rocket, Shield, Star } from 'lucide-react'
import useGameStore from '../store/gameStore'

const MenuScreen: React.FC = () => {
  const { isGameOver, score, highScore, startGame, resetGame } = useGameStore()

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-space-dark to-space-blue rounded-2xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl">
        {!isGameOver ? (
          <>
            <div className="mb-8">
              <Rocket className="text-star-yellow mx-auto mb-4 animate-float" size={64} />
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-star-yellow to-purple-400 bg-clip-text text-transparent">
                Space Dodge Master
              </h1>
              <p className="text-gray-300 mt-2">
                Navigate through asteroid fields!
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Shield size={16} />
                <span>Dodge asteroids to survive</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Star size={16} />
                <span>Score points as you progress</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
            >
              <Play size={24} />
              Start Game
            </button>

            {highScore > 0 && (
              <p className="text-gray-400 mt-4">
                High Score: <span className="text-star-yellow font-bold">{highScore}</span>
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-400">
              Game Over!
            </h2>
            
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <p className="text-2xl font-bold text-star-yellow mb-2">
                Score: {score}
              </p>
              {score === highScore && score > 0 && (
                <p className="text-green-400 text-sm animate-pulse">
                  New High Score!
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={startGame}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Play Again
              </button>
              
              <button
                onClick={resetGame}
                className="w-full px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Main Menu
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MenuScreen