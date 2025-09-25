import React from 'react'
import GameHeader from './components/GameHeader'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import { Brain } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Brain className="w-10 h-10 text-white" />
          <h1 className="text-4xl font-bold text-white">Memory Colors</h1>
        </div>
        <p className="text-center text-white/80 text-sm">
          Train your brain with color patterns!
        </p>
      </div>

      <GameHeader />
      <GameBoard />
      <GameControls />

      <footer className="mt-auto pt-8 pb-4 text-center text-white/60 text-xs">
        <p>© 2025 Memory Color Puzzle</p>
      </footer>
    </div>
  )
}

export default App