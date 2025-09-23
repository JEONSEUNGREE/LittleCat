import { Palette, Pipette } from 'lucide-react'
import { useColorStore } from '../store/colorStore'

export function ColorPicker() {
  const { baseColor, setBaseColor } = useColorStore()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">기본 색상 선택</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-32 h-32 sm:w-24 sm:h-24 rounded-lg border-2 border-gray-300 cursor-pointer transition-transform hover:scale-105"
            aria-label="색상 선택기"
          />
          <Pipette className="absolute bottom-2 right-2 w-5 h-5 text-white mix-blend-difference pointer-events-none" />
        </div>
        
        <div className="flex-1">
          <label htmlFor="hex-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            HEX 코드
          </label>
          <input
            id="hex-input"
            type="text"
            value={baseColor}
            onChange={(e) => {
              const value = e.target.value
              if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                setBaseColor(value)
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="#6366f1"
          />
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'].map(color => (
          <button
            key={color}
            onClick={() => setBaseColor(color)}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
            aria-label={`색상 ${color} 선택`}
          />
        ))}
      </div>
    </div>
  )
}