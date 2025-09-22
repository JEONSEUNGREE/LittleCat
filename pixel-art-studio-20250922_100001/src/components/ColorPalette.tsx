import { useState } from 'react'
import { usePixelStore } from '../store/pixelStore'
import { Palette } from 'lucide-react'

export const ColorPalette: React.FC = () => {
  const { currentColor, setCurrentColor } = usePixelStore()
  const [showCustomColor, setShowCustomColor] = useState(false)

  const presetColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ff8800', '#8800ff', '#00ff88', '#ff0088',
    '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#6366f1',
    '#ec4899', '#14b8a6', '#f97316', '#84cc16', '#a855f7', '#0ea5e9'
  ]

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value)
  }

  return (
    <div className="bg-slate-800 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Palette size={20} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-300">색상 팔레트</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded border-2 border-gray-600"
            style={{ backgroundColor: currentColor }}
          />
          <input
            type="color"
            value={currentColor}
            onChange={handleCustomColorChange}
            className="w-8 h-8 cursor-pointer rounded"
            title="사용자 정의 색상"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            className={`aspect-square rounded transition-all transform hover:scale-110 ${
              currentColor === color
                ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800'
                : ''
            }`}
            style={{ backgroundColor: color }}
            title={color}
            aria-label={`색상 ${color}`}
          />
        ))}
      </div>

      {showCustomColor && (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="flex-1 px-2 py-1 bg-slate-700 text-white rounded text-sm"
            placeholder="HEX 색상 코드"
          />
        </div>
      )}

      <button
        onClick={() => setShowCustomColor(!showCustomColor)}
        className="mt-2 text-xs text-gray-400 hover:text-gray-300 transition-colors"
      >
        {showCustomColor ? 'HEX 입력 숨기기' : 'HEX 색상 입력'}
      </button>
    </div>
  )
}