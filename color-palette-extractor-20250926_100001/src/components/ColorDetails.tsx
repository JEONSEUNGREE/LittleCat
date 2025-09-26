import React from 'react'
import { Copy, CheckCircle } from 'lucide-react'
import { useColorStore } from '../stores/colorStore'
import { useState } from 'react'

const ColorDetails: React.FC = () => {
  const { selectedColor } = useColorStore()
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  if (!selectedColor) return null

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(selectedColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const copyValue = (value: string, format: string) => {
    navigator.clipboard.writeText(value)
    setCopiedFormat(format)
    setTimeout(() => setCopiedFormat(null), 2000)
  }

  const formats = [
    { label: 'HEX', value: selectedColor, format: 'hex' },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, format: 'rgb' },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, format: 'hsl' },
    { label: 'CSS Variable', value: `--color-primary: ${selectedColor};`, format: 'css' },
  ]

  return (
    <div className="space-y-4">
      <div
        className="w-full h-32 rounded-lg shadow-inner"
        style={{ backgroundColor: selectedColor }}
      />
      
      <div className="space-y-2">
        {formats.map(({ label, value, format }) => (
          <div
            key={format}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-sm font-mono text-gray-800 mt-1">{value}</p>
            </div>
            <button
              onClick={() => copyValue(value, format)}
              className="ml-2 p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              {copiedFormat === format ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Color Properties</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-red-50 rounded p-2">
            <p className="text-xs text-gray-500">Red</p>
            <p className="font-semibold text-red-600">{rgb.r}</p>
          </div>
          <div className="bg-green-50 rounded p-2">
            <p className="text-xs text-gray-500">Green</p>
            <p className="font-semibold text-green-600">{rgb.g}</p>
          </div>
          <div className="bg-blue-50 rounded p-2">
            <p className="text-xs text-gray-500">Blue</p>
            <p className="font-semibold text-blue-600">{rgb.b}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorDetails