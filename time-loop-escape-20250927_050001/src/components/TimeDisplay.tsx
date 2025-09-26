import React from 'react'
import { Clock } from 'lucide-react'

interface TimeDisplayProps {
  time: number
  maxTime: number
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, maxTime }) => {
  const percentage = (time / maxTime) * 100
  const isLowTime = time <= 2
  
  const getColor = () => {
    if (time <= 1) return 'from-red-500 to-red-600'
    if (time <= 2) return 'from-yellow-500 to-orange-500'
    return 'from-blue-500 to-cyan-500'
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 text-white ${isLowTime ? 'animate-pulse' : ''}`} />
          <span className="text-white font-bold text-lg">
            {time}s
          </span>
        </div>
        <span className="text-white/60 text-sm">
          Time Remaining
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full bg-white/30 animate-pulse" />
        </div>
      </div>
      
      {isLowTime && (
        <p className="text-yellow-400 text-xs mt-1 animate-pulse text-center">
          Hurry! Time is running out!
        </p>
      )}
    </div>
  )
}

export default TimeDisplay