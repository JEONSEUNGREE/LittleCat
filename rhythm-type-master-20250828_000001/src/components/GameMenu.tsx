import React from 'react'
import { Music, Zap, Trophy, Info } from 'lucide-react'
import { useGameStore, GameMode } from '../store/gameStore'

const GameMenu: React.FC = () => {
  const { setGameMode, startGame } = useGameStore()
  const [selectedMode, setSelectedMode] = React.useState<GameMode>('easy')
  const [showInstructions, setShowInstructions] = React.useState(false)

  const handleStartGame = () => {
    setGameMode(selectedMode)
    startGame()
  }

  const modes: { mode: GameMode; label: string; color: string; desc: string }[] = [
    { mode: 'easy', label: 'Easy', color: 'bg-green-500', desc: 'Slow beats, simple words' },
    { mode: 'medium', label: 'Medium', color: 'bg-yellow-500', desc: 'Moderate speed, longer words' },
    { mode: 'hard', label: 'Hard', color: 'bg-orange-500', desc: 'Fast beats, complex words' },
    { mode: 'extreme', label: 'Extreme', color: 'bg-red-500', desc: 'Lightning speed, expert level' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-slide-up">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Music className="w-16 h-16 text-white animate-bounce-slow" />
              <Zap className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-2">
            Rhythm Type Master
          </h1>
          <p className="text-blue-200 text-center mb-8">
            Type to the beat, master the rhythm!
          </p>

          {!showInstructions ? (
            <>
              <div className="space-y-3 mb-6">
                {modes.map(({ mode, label, color, desc }) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    className={`w-full p-4 rounded-xl transition-all transform hover:scale-105 ${
                      selectedMode === mode
                        ? `${color} text-white shadow-lg`
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-semibold text-lg">{label}</div>
                        <div className="text-sm opacity-90">{desc}</div>
                      </div>
                      {selectedMode === mode && (
                        <Trophy className="w-6 h-6" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleStartGame}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:scale-105 active:scale-95"
              >
                Start Game
              </button>

              <button
                onClick={() => setShowInstructions(true)}
                className="w-full mt-3 py-3 bg-white/20 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
              >
                <Info className="w-5 h-5" />
                How to Play
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
              <div className="bg-white/10 rounded-xl p-4 text-white space-y-2">
                <p>🎵 Words fall to the rhythm</p>
                <p>⌨️ Type the words before they reach the bottom</p>
                <p>🔥 Build combos for bonus points</p>
                <p>❤️ Don't let words hit the bottom - you'll lose lives!</p>
                <p>🏆 Get the highest score possible!</p>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameMenu