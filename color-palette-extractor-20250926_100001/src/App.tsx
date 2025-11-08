import React from 'react';
import { useState } from 'react'
import { Upload, Palette, Download, Copy, RefreshCw } from 'lucide-react'
import ImageUploader from './components/ImageUploader'
import ColorPalette from './components/ColorPalette'
import ColorDetails from './components/ColorDetails'
import { useColorStore } from './stores/colorStore'

function App() {
  const { colors, selectedColor, extractColors, clearColors } = useColorStore()
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setImageUrl(e.target?.result as string)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (ctx) {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const pixels = imageData.data
          const colorMap: { [key: string]: number } = {}
          
          for (let i = 0; i < pixels.length; i += 40) {
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
            colorMap[hex] = (colorMap[hex] || 0) + 1
          }
          
          const sortedColors = Object.entries(colorMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([color]) => color)
          
          extractColors(sortedColors)
        }
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    clearColors()
    setImageUrl('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Color Palette Extractor
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Upload an image to extract beautiful color palettes
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Image
                </h2>
                {imageUrl && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                )}
              </div>
              <ImageUploader onImageUpload={handleImageUpload} imageUrl={imageUrl} />
            </div>

            {colors.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-up">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Extracted Palette
                </h2>
                <ColorPalette />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {selectedColor && (
              <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-up">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Copy className="w-5 h-5" />
                  Color Details
                </h2>
                <ColorDetails />
              </div>
            )}

            {colors.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-up">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Options
                </h2>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Export as CSS
                  </button>
                  <button className="w-full py-3 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    Export as JSON
                  </button>
                  <button className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Export as Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Made with ❤️ | Color extraction for designers & developers
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App