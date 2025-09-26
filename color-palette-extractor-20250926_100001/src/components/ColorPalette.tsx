import React from 'react'
import { Check } from 'lucide-react'
import { useColorStore } from '../stores/colorStore'

const ColorPalette: React.FC = () => {
  const { colors, selectedColor, selectColor } = useColorStore()

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {colors.map((color, index) => (
        <div
          key={index}
          className="group relative"
        >
          <button
            onClick={() => selectColor(color)}
            className={`w-full aspect-square rounded-lg shadow-md transition-all transform hover:scale-105 ${
              selectedColor === color ? 'ring-4 ring-purple-400 ring-offset-2' : ''
            }`}
            style={{ backgroundColor: color }}
            title={color}
          >
            {selectedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-1">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            )}
          </button>
          <button
            onClick={() => copyToClipboard(color)}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          >
            {color}
          </button>
        </div>
      ))}
    </div>
  )
}

export default ColorPalette