import { useEffect } from 'react'
import GameCanvas from './components/GameCanvas'
import GameUI from './components/GameUI'
import MenuScreen from './components/MenuScreen'
import useGameStore from './store/gameStore'

function App() {
  const { isPlaying, isGameOver } = useGameStore()

  useEffect(() => {
    // Prevent scrolling on mobile
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault()
    }

    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [])

  return (
    <div className="game-container">
      <GameCanvas />
      {isPlaying && <GameUI />}
      {(!isPlaying || isGameOver) && <MenuScreen />}
    </div>
  )
}

export default App