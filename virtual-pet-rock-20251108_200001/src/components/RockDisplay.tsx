import { Circle } from 'lucide-react'
import { RockState } from '../types/rock'

interface RockDisplayProps {
  rockState: RockState
}

const RockDisplay = ({ rockState }: RockDisplayProps) => {
  const getMoodColor = () => {
    switch (rockState.mood) {
      case 'happy':
        return 'text-yellow-300'
      case 'zen':
        return 'text-purple-300'
      case 'sleeping':
        return 'text-blue-300'
      case 'content':
        return 'text-green-300'
      default:
        return 'text-zen-300'
    }
  }

  const getSizeClass = () => {
    switch (rockState.evolution) {
      case 'mountain':
        return 'w-64 h-64'
      case 'boulder':
        return 'w-48 h-48'
      case 'stone':
        return 'w-32 h-32'
      default:
        return 'w-24 h-24'
    }
  }

  const getMoodEmoji = () => {
    switch (rockState.mood) {
      case 'happy':
        return '😊'
      case 'zen':
        return '🧘'
      case 'sleeping':
        return '😴'
      case 'content':
        return '😌'
      default:
        return '🗿'
    }
  }

  return (
    <div className="bg-zen-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-zen-700">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`relative ${getSizeClass()} transition-all duration-500`}>
          <div className="absolute inset-0 bg-gradient-to-br from-zen-400 to-zen-600 rounded-full animate-pulse-slow opacity-50 blur-xl"></div>
          <Circle
            className={`${getMoodColor()} ${getSizeClass()} animate-float relative z-10`}
            fill="currentColor"
            strokeWidth={0}
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-5xl">{getMoodEmoji()}</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-light text-zen-100 capitalize">
            {rockState.mood}
          </h2>
          <p className="text-sm text-zen-400 mt-1">
            {rockState.evolution}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RockDisplay
