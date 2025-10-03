import React from 'react'
import useGameStore from './store/gameStore'
import MainMenu from './components/MainMenu'
import GameCanvas from './components/GameCanvas'
import GameOver from './components/GameOver'
import GameController from './components/GameController'

function App() {
  const { gameState } = useGameStore()
  
  return (
    <div className="min-h-screen bg-game-dark overflow-hidden">
      {gameState === 'menu' && <MainMenu />}
      
      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="relative w-full h-screen">
          <GameCanvas />
          <GameController />
        </div>
      )}
      
      {gameState === 'gameOver' && <GameOver />}
    </div>
  )
}

export default App