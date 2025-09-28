import { useState, useEffect } from 'react'
import useGameStore from './store'
import EmojiPalette from './components/EmojiPalette'
import StoryCanvas from './components/StoryCanvas'
import GameHeader from './components/GameHeader'
import ModeSelector from './components/ModeSelector'
import StoryInput from './components/StoryInput'

function App() {
  const { gameMode, isPlaying, startGame } = useGameStore()
  const [showModeSelector, setShowModeSelector] = useState(true)

  useEffect(() => {
    if (isPlaying) {
      setShowModeSelector(false)
    }
  }, [isPlaying])

  const handleModeSelect = () => {
    startGame()
    setShowModeSelector(false)
  }

  if (showModeSelector) {
    return <ModeSelector onStart={handleModeSelect} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <GameHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="lg:col-span-2">
            <StoryCanvas />
          </div>
          
          <div className="space-y-4">
            <EmojiPalette />
            <StoryInput />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App