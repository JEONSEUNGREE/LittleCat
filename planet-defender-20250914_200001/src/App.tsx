import { useState, useEffect } from 'react'
import GameCanvas from './components/GameCanvas'
import StartScreen from './components/StartScreen'
import GameHUD from './components/GameHUD'
import GameOver from './components/GameOver'
import { useGameStore } from './store/gameStore'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const { gameState, score, lives, wave, resetGame } = useGameStore()

  const handleStart = () => {
    resetGame()
    setGameStarted(true)
  }

  const handleRestart = () => {
    resetGame()
  }

  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchstart', preventZoom, { passive: false })
    document.addEventListener('touchmove', preventZoom, { passive: false })

    return () => {
      document.removeEventListener('touchstart', preventZoom)
      document.removeEventListener('touchmove', preventZoom)
    }
  }, [])

  return (
    <div className="w-full h-screen flex items-center justify-center relative bg-space-dark">
      {!gameStarted && <StartScreen onStart={handleStart} />}
      
      {gameStarted && (
        <>
          <GameCanvas />
          <GameHUD score={score} lives={lives} wave={wave} />
          {gameState === 'gameOver' && (
            <GameOver score={score} wave={wave} onRestart={handleRestart} />
          )}
        </>
      )}
    </div>
  )
}

export default App