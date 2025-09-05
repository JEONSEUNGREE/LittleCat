import { useState } from 'react'
import PatternCanvas from './components/PatternCanvas'
import ControlPanel from './components/ControlPanel'
import InfoDisplay from './components/InfoDisplay'
import { usePatternStore } from './store/patternStore'
import { Sparkles, Info } from 'lucide-react'

function App() {
  const [showInfo, setShowInfo] = useState(false)
  const { currentPattern } = usePatternStore()

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse-slow" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Math Pattern Explorer
          </h1>
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse-slow" />
        </div>
        <p className="text-gray-300 text-sm md:text-base">
          수학적 패턴을 인터랙티브하게 탐험해보세요
        </p>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto w-full">
        {/* Pattern Canvas - Takes up 2 columns on desktop */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <PatternCanvas />
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <ControlPanel />
        </div>

        {/* Info Display - Full width below */}
        <div className="lg:col-span-3 order-3">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="mb-4 flex items-center gap-2 pattern-button mx-auto"
          >
            <Info className="w-4 h-4" />
            {showInfo ? '정보 숨기기' : '패턴 정보 보기'}
          </button>
          
          {showInfo && <InfoDisplay />}
        </div>
      </div>

      {/* Current Pattern Indicator */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          현재 패턴: <span className="text-purple-400 font-semibold">{currentPattern}</span>
        </p>
      </div>
    </div>
  )
}

export default App