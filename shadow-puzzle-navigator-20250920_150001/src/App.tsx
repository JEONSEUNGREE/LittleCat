import { useState } from 'react'
import MenuScreen from './components/MenuScreen'
import GameCanvas from './components/GameCanvas'
import GameUI from './components/GameUI'
import Instructions from './components/Instructions'
import { useGameStore } from './store/gameStore'

type Screen = 'menu' | 'game' | 'instructions'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu')
  const { startGame, isPlaying } = useGameStore()
  
  const handleStartGame = () => {
    startGame()
    setCurrentScreen('game')
  }
  
  const handleGoHome = () => {
    setCurrentScreen('menu')
  }
  
  const handleShowInstructions = () => {
    setCurrentScreen('instructions')
  }
  
  const handleCloseInstructions = () => {
    setCurrentScreen('menu')
  }
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-shadow-dark">
      {currentScreen === 'menu' && (
        <MenuScreen 
          onStartGame={handleStartGame}
          onShowInstructions={handleShowInstructions}
        />
      )}
      
      {currentScreen === 'instructions' && (
        <Instructions onClose={handleCloseInstructions} />
      )}
      
      {currentScreen === 'game' && isPlaying && (
        <>
          <GameCanvas />
          <GameUI onGoHome={handleGoHome} />
        </>
      )}
    </div>
  )
}

export default App