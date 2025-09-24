import React from 'react'
import { useGameStore } from './store/gameStore'
import { GameHeader } from './components/GameHeader'
import { GameGrid } from './components/GameGrid'
import { MainMenu } from './components/MainMenu'
import { WinScreen } from './components/WinScreen'

function App() {
  const { gameStatus } = useGameStore()
  
  if (gameStatus === 'menu') {
    return <MainMenu />
  }
  
  if (gameStatus === 'won') {
    return <WinScreen />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <GameHeader />
      <main className="flex flex-col items-center justify-center py-4">
        <GameGrid />
      </main>
    </div>
  )
}

export default App