import React, { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw,
  Play,
  Eye,
  EyeOff
} from 'lucide-react'

export const GameControls: React.FC = () => {
  const { 
    movePlayer, 
    gameState, 
    startGame, 
    resetGame, 
    isVisible, 
    toggleVisibility,
    nextLevel 
  } = useGameStore()
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer('right')
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, movePlayer])
  
  if (gameState === 'menu') {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-8 py-4 bg-game-primary text-white rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          <Play size={24} />
          Start Game
        </button>
      </div>
    )
  }
  
  if (gameState === 'won') {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <h2 className="text-2xl font-bold text-game-success">Level Complete!</h2>
        <button
          onClick={nextLevel}
          className="flex items-center gap-2 px-6 py-3 bg-game-success text-white rounded-lg font-bold hover:bg-opacity-90 transition-all"
        >
          Next Level
        </button>
      </div>
    )
  }
  
  if (gameState === 'lost') {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <h2 className="text-2xl font-bold text-game-secondary">Time's Up!</h2>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 bg-game-secondary text-white rounded-lg font-bold hover:bg-opacity-90 transition-all"
        >
          <RotateCcw size={20} />
          Try Again
        </button>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {gameState === 'playing' && (
        <>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="col-start-2">
              <button
                onTouchStart={() => movePlayer('up')}
                onClick={() => movePlayer('up')}
                className="p-4 bg-game-primary text-white rounded-lg hover:bg-opacity-90 transition-all active:scale-95"
              >
                <ArrowUp size={24} />
              </button>
            </div>
            <div className="col-start-1 row-start-2">
              <button
                onTouchStart={() => movePlayer('left')}
                onClick={() => movePlayer('left')}
                className="p-4 bg-game-primary text-white rounded-lg hover:bg-opacity-90 transition-all active:scale-95"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            <div className="col-start-2 row-start-2">
              <button
                onTouchStart={() => toggleVisibility}
                onClick={toggleVisibility}
                className="p-4 bg-game-accent text-white rounded-lg hover:bg-opacity-90 transition-all active:scale-95"
              >
                {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <div className="col-start-3 row-start-2">
              <button
                onTouchStart={() => movePlayer('right')}
                onClick={() => movePlayer('right')}
                className="p-4 bg-game-primary text-white rounded-lg hover:bg-opacity-90 transition-all active:scale-95"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            <div className="col-start-2 row-start-3">
              <button
                onTouchStart={() => movePlayer('down')}
                onClick={() => movePlayer('down')}
                className="p-4 bg-game-primary text-white rounded-lg hover:bg-opacity-90 transition-all active:scale-95"
              >
                <ArrowDown size={24} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Use arrow keys or WASD to move
          </p>
        </>
      )}
    </div>
  )
}