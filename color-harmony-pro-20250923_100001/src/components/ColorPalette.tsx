import { Copy, Lock, Unlock, RefreshCw } from 'lucide-react'
import { useColorStore } from '../store/colorStore'
import { useState } from 'react'

export function ColorPalette() {
  const { palette, lockedColors, toggleLock, copyColor, generatePalette } = useColorStore()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (color: string, index: number) => {
    copyColor(color)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getTextColor = (bgColor: string): string => {
    const hex = bgColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">생성된 팔레트</h2>
        <button
          onClick={generatePalette}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">새로 생성</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {palette.map((color, index) => (
          <div
            key={index}
            className="relative group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="h-32 sm:h-40 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer relative overflow-hidden"
              style={{ backgroundColor: color }}
              onClick={() => handleCopy(color, index)}
            >
              {copiedIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 animate-fade-in">
                  <span className="text-white font-medium">복사됨!</span>
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLock(index)
                }}
                className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                aria-label={lockedColors.has(index) ? '색상 잠금 해제' : '색상 잠금'}
              >
                {lockedColors.has(index) ? (
                  <Lock className="w-4 h-4" style={{ color: getTextColor(color) }} />
                ) : (
                  <Unlock className="w-4 h-4" style={{ color: getTextColor(color) }} />
                )}
              </button>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {color.toUpperCase()}
              </span>
              <button
                onClick={() => handleCopy(color, index)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="색상 코드 복사"
              >
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CSS 변수로 사용</h3>
        <pre className="text-xs font-mono text-gray-600 dark:text-gray-400 overflow-x-auto">
{`:root {
  --primary: ${palette[0]};
  --secondary: ${palette[1]};
  --accent: ${palette[2]};
  --neutral: ${palette[3]};
}`}
        </pre>
      </div>
    </div>
  )
}