import { useEffect } from 'react'
import GameHeader from './components/GameHeader'
import ColorSelector from './components/ColorSelector'
import GameGrid from './components/GameGrid'
import { useGameStore } from './store/gameStore'

function App() {
  const { initializeGrid } = useGameStore()

  useEffect(() => {
    initializeGrid()
  }, [initializeGrid])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <GameHeader />
        <ColorSelector />
        <GameGrid />
        
        <div className="mt-4 text-center text-white text-opacity-70 text-sm">
          <p>Tap empty cells to place colors</p>
          <p>Create chain reactions with matching colors!</p>
        </div>
      </div>
    </div>
  )
}

export default App