import { useEffect } from 'react'
import { useGameStore } from './store/gameStore'
import { MainMenu } from './components/MainMenu'
import { GameCanvas } from './components/GameCanvas'
import { GameOver } from './components/GameOver'
import { PauseMenu } from './components/PauseMenu'
import { Pause } from 'lucide-react'

function App() {
  const { gameState, pauseGame } = useGameStore()
  
  // Handle ESC key for pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameState === 'playing') {
        pauseGame()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, pauseGame])
  
  // Prevent default touch behaviors on mobile
  useEffect(() => {
    const preventDefaultTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }
    
    document.addEventListener('touchstart', preventDefaultTouch, { passive: false })
    document.addEventListener('touchmove', preventDefaultTouch, { passive: false })
    
    return () => {
      document.removeEventListener('touchstart', preventDefaultTouch)
      document.removeEventListener('touchmove', preventDefaultTouch)
    }
  }, [])
  
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-echo-darker to-echo-dark overflow-hidden">
      {/* Game States */}
      {gameState === 'menu' && <MainMenu />}
      {gameState === 'playing' && (
        <>
          <GameCanvas />
          <button
            onClick={pauseGame}
            className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors z-10"
            aria-label="Pause"
          >
            <Pause size={24} />
          </button>
        </>
      )}
      {gameState === 'paused' && (
        <>
          <GameCanvas />
          <PauseMenu />
        </>
      )}
      {gameState === 'gameover' && <GameOver />}
    </div>
  )
}

export default App