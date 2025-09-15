import React from 'react'
import GameBoard from './components/GameBoard'
import GameHeader from './components/GameHeader'
import GameOverModal from './components/GameOverModal'
import { useGameStore } from './store/gameStore'

function App() {
  const { gameStatus } = useGameStore()

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Stars Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}
          />
        ))}
      </div>

      {/* Game Content */}
      <div className="relative z-10 w-full h-full">
        <GameHeader />
        <GameBoard />
        <GameOverModal />
      </div>

      {/* Instructions (show only at start) */}
      {gameStatus === 'playing' && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm px-4">
          <p>Tap falling letters to collect them and spell the target word!</p>
        </div>
      )}
    </div>
  )
}

export default App