import { useState, useEffect } from 'react'
import GameScreen from './components/GameScreen'
import StartScreen from './components/StartScreen'
import ScoreDisplay from './components/ScoreDisplay'
import useGameStore from './store/gameStore'

function App() {
  const { gameState, startGame, endGame } = useGameStore()
  const [showScore, setShowScore] = useState(false)

  useEffect(() => {
    if (gameState === 'ended') {
      setShowScore(true)
      const timer = setTimeout(() => {
        setShowScore(false)
        endGame()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [gameState, endGame])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {gameState === 'idle' && !showScore && (
          <StartScreen onStart={startGame} />
        )}
        {gameState === 'playing' && (
          <GameScreen />
        )}
        {showScore && (
          <ScoreDisplay />
        )}
      </div>
    </div>
  )
}

export default App