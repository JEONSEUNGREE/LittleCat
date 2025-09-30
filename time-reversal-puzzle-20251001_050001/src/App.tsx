import React, { useState } from 'react'
import { useGameStore } from './store/gameStore'
import LevelSelector from './components/LevelSelector'
import GameBoard from './components/GameBoard'
import Settings from './components/Settings'
import { Settings as SettingsIcon, Home } from 'lucide-react'

type Screen = 'menu' | 'game' | 'settings'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu')
  const { isPlaying, currentLevel } = useGameStore()

  // Auto switch to game screen when level starts
  React.useEffect(() => {
    if (isPlaying && currentLevel > 0) {
      setCurrentScreen('game')
    } else if (!isPlaying && currentScreen === 'game') {
      setCurrentScreen('menu')
    }
  }, [isPlaying, currentLevel, currentScreen])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <LevelSelector />
      case 'game':
        return <GameBoard />
      case 'settings':
        return <Settings onBack={() => setCurrentScreen('menu')} />
      default:
        return <LevelSelector />
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {renderScreen()}
      
      {/* Floating Action Buttons */}
      {currentScreen !== 'settings' && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
          {currentScreen === 'game' && (
            <button
              onClick={() => {
                useGameStore.getState().pauseGame()
                setCurrentScreen('menu')
              }}
              className="p-3 bg-slate-800/80 backdrop-blur text-white rounded-full shadow-lg hover:bg-slate-700/80 transition-all hover:scale-105 active:scale-95"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setCurrentScreen('settings')}
            className="p-3 bg-purple-600/80 backdrop-blur text-white rounded-full shadow-lg hover:bg-purple-700/80 transition-all hover:scale-105 active:scale-95"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default App