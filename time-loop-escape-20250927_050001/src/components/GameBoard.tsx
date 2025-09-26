import React, { useEffect } from 'react'
import { Clock, RotateCcw, Trophy, Info } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import ActionButton from './ActionButton'
import TimeDisplay from './TimeDisplay'

const GameBoard: React.FC = () => {
  const {
    currentLoop,
    timeRemaining,
    isPlaying,
    isVictory,
    progress,
    actions,
    history,
    hints,
    startGame,
    resetGame,
    performAction,
    tick,
  } = useGameStore()

  useEffect(() => {
    if (!isPlaying || isVictory) return

    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, isVictory, tick])

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full max-w-lg mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in">
          Time Loop Escape
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          Break the cycle in 5 seconds!
        </p>
      </div>

      {/* Game Status */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 animate-slide-up">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-white animate-spin-slow" />
            <span className="text-white font-semibold">Loop #{currentLoop}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white text-sm">{progress}%</span>
          </div>
        </div>

        <TimeDisplay time={timeRemaining} maxTime={5} />
      </div>

      {/* Victory Screen */}
      {isVictory && (
        <div className="w-full max-w-lg bg-green-500/20 backdrop-blur-md rounded-2xl p-6 mb-4 animate-fade-in">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">You Escaped!</h2>
          <p className="text-white/80 mb-4">
            Congratulations! You broke the time loop in {currentLoop} loops!
          </p>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game Area */}
      {!isVictory && (
        <>
          {!isPlaying ? (
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl p-6 animate-fade-in">
              <Clock className="w-16 h-16 text-white mx-auto mb-4 animate-time-warp" />
              <h2 className="text-xl font-bold text-white mb-3">
                Ready to Escape?
              </h2>
              <p className="text-white/70 mb-6 text-sm">
                You have 5 seconds each loop. Find the right sequence of actions to escape!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Start Game
              </button>
            </div>
          ) : (
            <div className="w-full max-w-lg">
              {/* Actions Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {actions.map((action) => (
                  <ActionButton
                    key={action.id}
                    action={action}
                    onPerform={performAction}
                    disabled={!action.available || timeRemaining === 0}
                  />
                ))}
              </div>

              {/* Hints Section */}
              {hints.length > 0 && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 mb-4 max-h-32 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-yellow-400" />
                    <span className="text-white/80 text-sm font-semibold">Hints</span>
                  </div>
                  <div className="space-y-1">
                    {hints.slice(-3).map((hint, index) => (
                      <p key={index} className="text-white/70 text-xs animate-slide-up">
                        {hint}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* History */}
              {history.length > 0 && (
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 max-h-24 overflow-y-auto">
                  <p className="text-white/60 text-xs font-semibold mb-1">History</p>
                  <div className="space-y-0.5">
                    {history.slice(-5).map((item, index) => (
                      <p key={index} className="text-white/50 text-xs">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors"
              >
                Reset Game
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}