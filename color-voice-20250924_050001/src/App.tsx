import React, { useEffect } from 'react'
import { RefreshCw, Zap } from 'lucide-react'
import ColorPicker from './components/ColorPicker'
import SoundController from './components/SoundController'
import Visualizer from './components/Visualizer'
import History from './components/History'
import useColorVoiceStore from './store/useColorVoiceStore'
import { AudioManager } from './utils/audioUtils'

function App() {
  const { mode, setMode, currentColor, isPlaying } = useColorVoiceStore()
  const audioManagerRef = React.useRef(new AudioManager())

  useEffect(() => {
    // Play sound automatically when color is selected in colorToSound mode
    if (mode === 'colorToSound' && currentColor && !isPlaying) {
      const { setIsPlaying } = useColorVoiceStore.getState()
      audioManagerRef.current.playFrequency(
        currentColor.frequency,
        useColorVoiceStore.getState().volume,
        'sine',
        2000
      )
      setIsPlaying(true)
      setTimeout(() => setIsPlaying(false), 2000)
    }
  }, [currentColor, mode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            Color Voice
          </h1>
          <p className="text-gray-600">색상을 소리로, 소리를 색상으로 변환하는 감각 변환기</p>
        </header>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-lg p-1 flex">
            <button
              onClick={() => setMode('colorToSound')}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                mode === 'colorToSound'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-current" />
              <RefreshCw className="w-4 h-4" />
              <span>색상 → 소리</span>
            </button>
            <button
              onClick={() => setMode('soundToColor')}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                mode === 'soundToColor'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>소리 → 색상</span>
              <div className="w-4 h-4 rounded-full bg-current" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {mode === 'colorToSound' ? <ColorPicker /> : <SoundController />}
          </div>

          {/* Right Column - Output & Visualization */}
          <div className="space-y-6">
            <Visualizer />
            {mode === 'soundToColor' && currentColor && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">변환된 색상</h3>
                <div
                  className="w-full h-24 rounded-xl shadow-inner"
                  style={{ backgroundColor: useColorVoiceStore.getState().currentSound?.color || '#000' }}
                />
                <div className="mt-3 text-center text-lg font-medium text-gray-700">
                  {useColorVoiceStore.getState().currentSound?.color || '#000000'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        <History />

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Color Voice v1.0.0 - 접근성과 창의성을 위한 감각 변환 도구</p>
        </footer>
      </div>
    </div>
  )
}

export default App