import React, { useState, useRef } from 'react'
import { Shuffle, Save, Download, Upload, Plus, Image } from 'lucide-react'
import usePaletteStore from '../store/paletteStore'

const PaletteControls: React.FC = () => {
  const {
    generatePalette,
    addColor,
    savePalette,
    currentPalette,
    extractColorsFromImage,
    exportPalette,
  } = usePaletteStore()

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [paletteName, setPaletteName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    if (paletteName.trim()) {
      savePalette(paletteName)
      setPaletteName('')
      setShowSaveModal(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        extractColorsFromImage(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExport = (format: 'css' | 'json' | 'scss') => {
    const content = exportPalette(format)
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `palette.${format === 'json' ? 'json' : format === 'scss' ? 'scss' : 'css'}`
    a.click()
    URL.revokeObjectURL(url)
    setShowExportModal(false)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        <button
          onClick={generatePalette}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Shuffle size={18} />
          <span className="hidden sm:inline">Generate</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Image size={18} />
          <span className="hidden sm:inline">From Image</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          onClick={addColor}
          disabled={currentPalette.length >= 10}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Color</span>
        </button>

        <button
          onClick={() => setShowSaveModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={18} />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Save Palette</h3>
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="Enter palette name"
              className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Export Palette</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleExport('css')}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Export as CSS
              </button>
              <button
                onClick={() => handleExport('scss')}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Export as SCSS
              </button>
              <button
                onClick={() => handleExport('json')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Export as JSON
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaletteControls