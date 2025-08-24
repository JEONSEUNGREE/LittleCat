import React from 'react'
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const GameControls: React.FC = () => {
  const { startGame, resetGame, isPlaying, gameStatus } = useGameStore()
  const [soundEnabled, setSoundEnabled] = React.useState(true)

  const handleStartGame = () => {
    if (!isPlaying) {
      startGame()
    }
  }

  const handleResetGame = () => {
    resetGame()
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  return (
    <div className="w-full p-4">
      <div className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!isPlaying ? (
            <button
              onClick={handleStartGame}
              className="button-primary flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Game</span>
            </button>
          ) : (
            <button
              onClick={handleResetGame}
              className="button-secondary flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset Game</span>
            </button>
          )}
          
          <button
            onClick={toggleSound}
            className="button-secondary flex items-center justify-center gap-2"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
            <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
          </button>
        </div>
        
        {gameStatus !== 'idle' && (
          <div className="mt-4 text-center">
            <div className="glass-effect rounded-xl p-3 inline-block">
              <p className="text-white font-semibold animate-pulse">
                {gameStatus === 'showing' && 'Watch the sequence...'}
                {gameStatus === 'waiting' && 'Your turn! Repeat the sequence'}
                {gameStatus === 'success' && 'Correct! Get ready for next level'}
                {gameStatus === 'failed' && 'Wrong! Try again'}
                {gameStatus === 'gameover' && 'Game Over! Your score: ' + useGameStore.getState().score}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}