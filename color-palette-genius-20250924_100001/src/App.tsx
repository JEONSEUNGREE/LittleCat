import React, { useEffect } from 'react'
import { Palette } from 'lucide-react'
import ColorCard from './components/ColorCard'
import PaletteControls from './components/PaletteControls'
import SavedPalettes from './components/SavedPalettes'
import usePaletteStore from './store/paletteStore'

function App() {
  const { currentPalette, generatePalette } = usePaletteStore()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        generatePalette()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [generatePalette])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Palette className="text-indigo-600" size={32} />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Color Palette Genius
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Press <kbd className="px-2 py-1 bg-gray-300 rounded text-xs">Space</kbd> to generate new colors
          </p>
        </header>

        {/* Controls */}
        <div className="mb-6 sm:mb-8">
          <PaletteControls />
        </div>

        {/* Color Palette Display */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div 
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${Math.min(currentPalette.length, 5)}, minmax(0, 1fr))`
              }}
            >
              {currentPalette.map((color, index) => (
                <ColorCard key={color.id} color={color} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Saved Palettes */}
        <SavedPalettes />

        {/* Tips */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            <strong>Tips:</strong> Hover over colors to see options • Click the lock to keep a color • 
            Upload an image to extract its color palette
          </p>
        </div>
      </div>
    </div>
  )
}

export default App