import { GameBoard } from './components/GameBoard'
import { GameUI } from './components/GameUI'
import { useGameStore } from './store/gameStore'

function App() {
  const { isPlaying, isPaused } = useGameStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-4 flex flex-col">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Bubble Pop Physics
        </h1>
        <p className="text-gray-400 text-sm mt-1">Pop the right colors!</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 max-w-6xl mx-auto w-full">
        {/* Game Board */}
        <div className="flex-1 min-h-[400px] md:min-h-[600px]">
          <GameBoard />
        </div>

        {/* Side Panel */}
        <div className="md:w-80 flex flex-col gap-4">
          <GameUI />
        </div>
      </main>

      {/* Pause Overlay */}
      {isPlaying && isPaused && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Paused</h2>
            <p className="text-gray-400 mb-6">Take a break!</p>
            <button
              onClick={() => useGameStore.getState().resumeGame()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {!isPlaying && useGameStore.getState().score > 0 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-800 to-indigo-900 rounded-2xl p-8 text-center max-w-sm mx-4">
            <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
            <div className="my-6 space-y-2">
              <p className="text-gray-400">Final Score</p>
              <p className="text-5xl font-bold text-indigo-400">
                {useGameStore.getState().score.toLocaleString()}
              </p>
              {useGameStore.getState().score >= useGameStore.getState().highScore && (
                <p className="text-yellow-400 font-semibold">New High Score!</p>
              )}
            </div>
            <p className="text-gray-400 mb-6">
              Level Reached: {useGameStore.getState().level}
            </p>
            <button
              onClick={() => useGameStore.getState().startGame()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-4 text-gray-500 text-xs">
        Made with React + TypeScript + Tailwind
      </footer>
    </div>
  )
}

export default App
