import React from 'react'
import { Pause, Play, RefreshCw, Home, ChevronRight } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

interface GameUIProps {
  onGoHome: () => void
}

const GameUI: React.FC<GameUIProps> = ({ onGoHome }) => {
  const {
    level,
    score,
    moves,
    isPaused,
    goal,
    pauseGame,
    resumeGame,
    resetLevel,
    nextLevel,
    checkWinCondition
  } = useGameStore()
  
  const handleNextLevel = () => {
    if (checkWinCondition()) {
      nextLevel()
    }
  }
  
  return (
    <div className="absolute inset-x-0 top-0 z-30">
      {/* Top bar */}
      <div className="bg-shadow-dark/90 backdrop-blur-sm border-b border-light-beam/20 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Left side - Home and Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={onGoHome}
              className="p-2 bg-shadow-light rounded-lg hover:bg-shadow-gray transition-colors"
              aria-label="Go home"
            >
              <Home className="w-5 h-5 text-light-beam" />
            </button>
            <button
              onClick={resetLevel}
              className="p-2 bg-shadow-light rounded-lg hover:bg-shadow-gray transition-colors"
              aria-label="Reset level"
            >
              <RefreshCw className="w-5 h-5 text-light-beam" />
            </button>
          </div>
          
          {/* Center - Level and Score */}
          <div className="flex items-center gap-4 text-sm">
            <div className="text-light-glow">
              <span className="text-gray-400">Level</span>
              <span className="ml-2 font-bold">{level}</span>
            </div>
            <div className="text-light-glow">
              <span className="text-gray-400">Score</span>
              <span className="ml-2 font-bold">{score}</span>
            </div>
            <div className="text-light-glow">
              <span className="text-gray-400">Moves</span>
              <span className="ml-2 font-bold">{moves}</span>
            </div>
          </div>
          
          {/* Right side - Pause/Play */}
          <div className="flex items-center gap-2">
            {!isPaused ? (
              <button
                onClick={pauseGame}
                className="p-2 bg-shadow-light rounded-lg hover:bg-shadow-gray transition-colors"
                aria-label="Pause game"
              >
                <Pause className="w-5 h-5 text-light-beam" />
              </button>
            ) : (
              <button
                onClick={resumeGame}
                className="p-2 bg-shadow-light rounded-lg hover:bg-shadow-gray transition-colors"
                aria-label="Resume game"
              >
                <Play className="w-5 h-5 text-light-beam" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-shadow-dark/95 flex items-center justify-center z-40">
          <div className="bg-shadow-light rounded-lg p-8 max-w-sm w-full mx-4">
            <h2 className="text-2xl font-bold text-light-beam mb-6 text-center">
              Game Paused
            </h2>
            <div className="space-y-3">
              <button
                onClick={resumeGame}
                className="w-full bg-light-beam text-shadow-dark py-3 px-4 rounded-lg font-semibold hover:bg-light-glow transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Resume
              </button>
              <button
                onClick={resetLevel}
                className="w-full bg-shadow-gray text-light-beam py-3 px-4 rounded-lg font-semibold hover:bg-shadow-dark transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Restart Level
              </button>
              <button
                onClick={onGoHome}
                className="w-full bg-shadow-gray text-light-beam py-3 px-4 rounded-lg font-semibold hover:bg-shadow-dark transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Win overlay */}
      {goal?.completed && (
        <div className="absolute inset-0 bg-shadow-dark/95 flex items-center justify-center z-40">
          <div className="bg-shadow-light rounded-lg p-8 max-w-sm w-full mx-4">
            <h2 className="text-3xl font-bold text-light-beam mb-2 text-center animate-pulse">
              Level Complete!
            </h2>
            <p className="text-light-glow text-center mb-6">
              Moves: {moves} | Bonus: {Math.max(100 - moves * 2, 10)}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleNextLevel}
                className="w-full bg-gradient-to-r from-light-beam to-light-glow text-shadow-dark py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-5 h-5" />
                Next Level
              </button>
              <button
                onClick={resetLevel}
                className="w-full bg-shadow-gray text-light-beam py-3 px-4 rounded-lg font-semibold hover:bg-shadow-dark transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Retry Level
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameUI