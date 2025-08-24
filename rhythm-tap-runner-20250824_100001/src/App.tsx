import GameCanvas from './components/GameCanvas'
import GameUI from './components/GameUI'
import useGameStore from './store/gameStore'

function App() {
  const gameState = useGameStore(state => state.gameState)
  
  return (
    <div className="game-container no-select">
      {gameState === 'playing' && <GameCanvas />}
      <GameUI />
    </div>
  )
}

export default App