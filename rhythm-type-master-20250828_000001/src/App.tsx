import React from 'react'
import { useGameStore } from './store/gameStore'
import GameMenu from './components/GameMenu'
import GamePlay from './components/GamePlay'
import GameOver from './components/GameOver'

function App() {
  const gameState = useGameStore((state) => state.gameState)

  return (
    <>
      {gameState === 'menu' && <GameMenu />}
      {(gameState === 'playing' || gameState === 'paused') && <GamePlay />}
      {gameState === 'gameOver' && <GameOver />}
    </>
  )
}

export default App