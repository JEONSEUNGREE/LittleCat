import { useGameStore } from '../store/gameStore'
import { RotateCcw, Play, Pause, RefreshCw } from 'lucide-react'

const ControlPanel = () => {
  const {
    gameState,
    rewinds,
    maxRewinds,
    level,
    timeElapsed,
    pauseGame,
    resumeGame,
    rewindTime,
    resetGame
  } = useGameStore()

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
      <div className="max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 space-y-3">
          {/* Time Display */}
          <div className="text-center text-white">
            <div className="text-3xl font-bold font-mono">
              {formatTime(timeElapsed)}
            </div>
            <div className="text-xs text-gray-400">Level {level}</div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {/* Pause/Resume */}
            <button
              onClick={gameState === 'playing' ? pauseGame : resumeGame}
              disabled={gameState === 'idle' || gameState === 'gameover'}
              className="bg-white/10 backdrop-blur p-3 rounded-xl text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center space-y-1"
            >
              {gameState === 'playing' ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
              <span className="text-xs">{gameState === 'playing' ? '일시정지' : '재개'}</span>
            </button>

            {/* Rewind */}
            <button
              onClick={rewindTime}
              disabled={gameState !== 'playing' || rewinds === 0}
              className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl text-white hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center space-y-1 relative"
            >
              <RotateCcw className="w-6 h-6" />
              <span className="text-xs">되돌리기</span>
              <div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {rewinds}
              </div>
            </button>

            {/* Reset */}
            <button
              onClick={resetGame}
              className="bg-white/10 backdrop-blur p-3 rounded-xl text-white hover:bg-white/20 transition-all flex flex-col items-center space-y-1"
            >
              <RefreshCw className="w-6 h-6" />
              <span className="text-xs">다시시작</span>
            </button>
          </div>

          {/* Rewind Indicators */}
          <div className="flex justify-center space-x-2">
            {[...Array(maxRewinds)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i < rewinds
                    ? 'bg-gradient-to-br from-cyan-400 to-purple-400 shadow-lg shadow-cyan-400/50'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel