import { Activity, Zap, Sparkles } from 'lucide-react'
import { RockState } from '../types/rock'

interface StatsDisplayProps {
  rockState: RockState
}

const StatsDisplay = ({ rockState }: StatsDisplayProps) => {
  return (
    <div className="bg-zen-800/30 backdrop-blur-sm rounded-2xl p-4 border border-zen-700">
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center">
          <Activity className="w-5 h-5 text-zen-300 mb-1" />
          <span className="text-xs text-zen-400">Touches</span>
          <span className="text-lg font-medium text-zen-100">{rockState.touches}</span>
        </div>

        <div className="flex flex-col items-center">
          <Zap className="w-5 h-5 text-yellow-300 mb-1" />
          <span className="text-xs text-zen-400">Energy</span>
          <div className="w-full bg-zen-700 rounded-full h-2 mt-1">
            <div
              className="bg-gradient-to-r from-yellow-500 to-yellow-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${rockState.energy}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Sparkles className="w-5 h-5 text-purple-300 mb-1" />
          <span className="text-xs text-zen-400">Meditation</span>
          <span className="text-lg font-medium text-zen-100">{rockState.meditation}</span>
        </div>
      </div>
    </div>
  )
}

export default StatsDisplay
