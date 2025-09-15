import React, { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import GameOverScreen from './components/GameOverScreen'
import { useGameStore } from './store/gameStore'

type Screen = 'start' | 'game' | 'gameover'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start')
  const { startGame, isPlaying } = useGameStore()

  React.useEffect(() => {
    if (!isPlaying && currentScreen === 'game') {
      setCurrentScreen('gameover')
    }
  }, [isPlaying, currentScreen])

  const handleStart = () => {
    startGame()
    setCurrentScreen('game')
  }

  const handleRestart = () => {
    startGame()
    setCurrentScreen('game')
  }

  const handleHome = () => {
    setCurrentScreen('start')
  }

  return (
    <>
      {currentScreen === 'start' && <StartScreen onStart={handleStart} />}
      {currentScreen === 'game' && <GameScreen />}
      {currentScreen === 'gameover' && (
        <GameOverScreen onRestart={handleRestart} onHome={handleHome} />
      )}
    </>
  )
}

export default App