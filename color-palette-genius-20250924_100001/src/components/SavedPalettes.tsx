import React from 'react'
import { Trash2, Upload } from 'lucide-react'
import usePaletteStore from '../store/paletteStore'

const SavedPalettes: React.FC = () => {
  const { savedPalettes, loadPalette, deletePalette } = usePaletteStore()

  if (savedPalettes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">No saved palettes yet. Create and save your first palette!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Saved Palettes</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {savedPalettes.map((palette) => (
          <div
            key={palette.id}
            className="border rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{palette.name}</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => loadPalette(palette.id)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  aria-label="Load palette"
                >
                  <Upload size={16} />
                </button>
                <button
                  onClick={() => deletePalette(palette.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                  aria-label="Delete palette"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex gap-1 mb-2">
              {palette.colors.map((color) => (
                <div
                  key={color.id}
                  className="flex-1 h-12 rounded"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            
            <p className="text-xs text-gray-500">
              {new Date(palette.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPalettes