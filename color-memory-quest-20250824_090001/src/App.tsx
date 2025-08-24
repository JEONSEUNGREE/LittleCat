import { GameHeader } from './components/GameHeader'
import { GameBoard } from './components/GameBoard'
import { GameControls } from './components/GameControls'

function App() {
  return (
    <div className="game-container min-h-screen flex flex-col">
      <GameHeader />
      
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <GameBoard />
      </main>
      
      <GameControls />
    </div>
  )
}

export default App