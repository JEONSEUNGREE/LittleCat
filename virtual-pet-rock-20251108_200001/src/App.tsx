import { useState } from 'react'
import RockDisplay from './components/RockDisplay'
import InteractionPanel from './components/InteractionPanel'
import StatsDisplay from './components/StatsDisplay'
import { RockState } from './types/rock'

function App() {
  const [rockState, setRockState] = useState<RockState>({
    mood: 'calm',
    energy: 50,
    meditation: 0,
    touches: 0,
    age: 0,
    evolution: 'pebble'
  })

  const handleTouch = () => {
    setRockState(prev => ({
      ...prev,
      touches: prev.touches + 1,
      energy: Math.min(100, prev.energy + 2),
      mood: prev.energy > 70 ? 'happy' : prev.mood
    }))
  }

  const handleMeditate = () => {
    setRockState(prev => ({
      ...prev,
      meditation: prev.meditation + 1,
      mood: 'zen',
      energy: Math.max(0, prev.energy - 5)
    }))
  }

  const handleRest = () => {
    setRockState(prev => ({
      ...prev,
      mood: 'sleeping',
      energy: Math.min(100, prev.energy + 10)
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zen-900 via-zen-800 to-zen-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-light text-zen-100 mb-2">
            Virtual Pet Rock
          </h1>
          <p className="text-zen-300 text-sm">
            당신만의 버추얼 펫 록과 함께하는 명상 시간
          </p>
        </header>

        <RockDisplay rockState={rockState} />

        <StatsDisplay rockState={rockState} />

        <InteractionPanel
          onTouch={handleTouch}
          onMeditate={handleMeditate}
          onRest={handleRest}
        />

        <footer className="text-center text-zen-400 text-xs mt-8">
          <p>때로는 단순함 속에서 평화를 찾습니다</p>
        </footer>
      </div>
    </div>
  )
}

export default App
