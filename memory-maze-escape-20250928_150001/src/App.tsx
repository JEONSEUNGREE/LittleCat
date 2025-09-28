import React from 'react'
import { GameHeader } from './components/GameHeader'
import { MazeGrid } from './components/MazeGrid'
import { GameControls } from './components/GameControls'
import { useGameStore } from './store/gameStore'

function App() {
  const { gameState } = useGameStore()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-game-dark to-gray-900 flex flex-col">
      <GameHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {gameState === 'menu' ? (
          <div className="text-center text-white mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-game-accent">
              Welcome to Memory Maze Escape!
            </h2>
            <p className="text-lg mb-2">Memorize the maze, then navigate in the dark!</p>
            <p className="text-sm text-gray-400">
              Reach the exit before time runs out.
            </p>
          </div>
        ) : (
          <MazeGrid />
        )}
        
        <GameControls />
      </main>
      
      <footer className="bg-gray-900 text-gray-400 text-center p-2 text-xs">
        <p>Memory Maze Escape © 2025 | Use arrow keys or touch controls</p>
      </footer>
    </div>
  )
}

export default App