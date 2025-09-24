import React, { useState } from 'react'
import { Lock, Unlock, Copy, X, RefreshCw } from 'lucide-react'
import usePaletteStore from '../store/paletteStore'

interface ColorCardProps {
  color: {
    id: string
    hex: string
    locked: boolean
  }
  index: number
}

const ColorCard: React.FC<ColorCardProps> = ({ color, index }) => {
  const { updateColor, toggleLock, removeColor, generateRandomColor } = usePaletteStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(color.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColor(color.id, e.target.value)
  }

  const handleRefresh = () => {
    updateColor(color.id, generateRandomColor())
  }

  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255
  }

  const textColor = getLuminance(color.hex) > 0.5 ? 'text-gray-800' : 'text-white'

  return (
    <div
      className="relative group h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 transition-all duration-300 transform hover:scale-105"
      style={{ backgroundColor: color.hex }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className={`flex gap-2 mb-4 ${textColor}`}>
          <button
            onClick={() => toggleLock(color.id)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label={color.locked ? 'Unlock color' : 'Lock color'}
          >
            {color.locked ? <Lock size={18} /> : <Unlock size={18} />}
          </button>
          
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Refresh color"
          >
            <RefreshCw size={18} />
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Copy color code"
          >
            <Copy size={18} />
          </button>

          <button
            onClick={() => removeColor(color.id)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Remove color"
          >
            <X size={18} />
          </button>
        </div>

        <input
          type="color"
          value={color.hex}
          onChange={handleColorChange}
          className="w-12 h-12 rounded cursor-pointer border-2 border-white/50"
        />
      </div>

      <div className={`absolute bottom-0 left-0 right-0 p-3 ${textColor}`}>
        <p className="text-sm font-semibold opacity-90 group-hover:opacity-100">
          {copied ? 'Copied!' : color.hex.toUpperCase()}
        </p>
        {color.locked && (
          <Lock size={14} className="absolute top-3 right-3 opacity-70" />
        )}
      </div>

      <div className="absolute top-2 left-2 text-xs font-medium opacity-0 group-hover:opacity-70 transition-opacity">
        <span className={textColor}>#{index + 1}</span>
      </div>
    </div>
  )
}

export default ColorCard