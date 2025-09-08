import { useEffect } from 'react'
import GameBoard from './components/GameBoard'
import GameHeader from './components/GameHeader'
import GameControls from './components/GameControls'
import LevelComplete from './components/LevelComplete'
import { useGameStore } from './store/gameStore'

function App() {
  const { initLevel, isLevelComplete } = useGameStore()

  useEffect(() => {
    initLevel(1)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-maze-dark to-maze-light flex flex-col touch-manipulation">
      <GameHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <GameBoard />
        <GameControls />
        {isLevelComplete && <LevelComplete />}
      </main>
    </div>
  )
}

export default App