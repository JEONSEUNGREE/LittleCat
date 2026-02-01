import React from 'react'
import { Heart, Pause, Play, RotateCcw, Trophy, Zap } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const GameUI: React.FC = () => {
  const {
    score,
    level,
    lives,
    highScore,
    combo,
    isPlaying,
    isPaused,
    pauseGame,
    resumeGame,
    startGame,
    endGame,
  } = useGameStore()

  return (
    <div className="flex flex-col gap-4">
      {/* Score and Level */}
      <div className="flex justify-between items-center bg-gradient-to-r from-slate-800/80 to-indigo-900/80 backdrop-blur-sm rounded-xl p-4">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Score</p>
          <p className="text-2xl font-bold text-white">{score.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Level</p>
          <p className="text-2xl font-bold text-indigo-400">{level}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-1 justify-center">
            <Trophy className="w-3 h-3" />
            Best
          </p>
          <p className="text-2xl font-bold text-yellow-400">{highScore.toLocaleString()}</p>
        </div>
      </div>

      {/* Lives and Combo */}
      <div className="flex justify-between items-center bg-slate-800/60 backdrop-blur-sm rounded-xl p-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 transition-all ${
                i < lives
                  ? 'text-red-500 fill-red-500'
                  : 'text-gray-600'
              }`}
            />
          ))}
        </div>
        {combo > 1 && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{combo}x Combo!</span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-3">
        {isPlaying ? (
          <>
            <button
              onClick={isPaused ? resumeGame : pauseGame}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              {isPaused ? (
                <>
                  <Play className="w-5 h-5" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              )}
            </button>
            <button
              onClick={endGame}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              End
            </button>
          </>
        ) : (
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105"
          >
            <Play className="w-6 h-6" />
            Start Game
          </button>
        )}
      </div>

      {/* Instructions */}
      {!isPlaying && (
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">How to Play</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>Pop bubbles matching the target color</li>
            <li>Build combos for bonus points</li>
            <li>Wrong color = lose a life</li>
            <li>Survive as long as possible!</li>
          </ul>
        </div>
      )}
    </div>
  )
}
