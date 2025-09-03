import React from 'react'
import { useGameStore } from './store/gameStore'
import { MainMenu } from './components/MainMenu'
import { GameCanvas } from './components/GameCanvas'
import { GameHeader } from './components/GameHeader'
import { GameOver } from './components/GameOver'
import { PauseMenu } from './components/PauseMenu'

function App() {
  const { gameState } = useGameStore()
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {gameState === 'menu' && <MainMenu />}
        
        {(gameState === 'playing' || gameState === 'paused') && (
          <div className="space-y-4">
            <GameHeader />
            <GameCanvas />
            {gameState === 'paused' && <PauseMenu />}
          </div>
        )}
        
        {gameState === 'gameOver' && <GameOver />}
      </div>
    </div>
  )
}

export default App