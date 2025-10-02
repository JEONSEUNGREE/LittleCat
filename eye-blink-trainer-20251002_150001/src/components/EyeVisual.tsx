import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface EyeVisualProps {
  isBlinking: boolean
  averageRate: number
  healthScore: number
}

const EyeVisual: React.FC<EyeVisualProps> = ({ isBlinking, averageRate, healthScore }) => {
  const [showBlink, setShowBlink] = useState(false)
  
  useEffect(() => {
    if (isBlinking) {
      setShowBlink(true)
      const timer = setTimeout(() => setShowBlink(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isBlinking])
  
  const getHealthColor = () => {
    if (healthScore >= 80) return 'text-green-500'
    if (healthScore >= 60) return 'text-yellow-500'
    if (healthScore >= 40) return 'text-orange-500'
    return 'text-red-500'
  }
  
  const getHealthBg = () => {
    if (healthScore >= 80) return 'bg-green-100'
    if (healthScore >= 60) return 'bg-yellow-100'
    if (healthScore >= 40) return 'bg-orange-100'
    return 'bg-red-100'
  }
  
  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <div className={`absolute inset-0 ${getHealthBg()} rounded-full opacity-20 animate-pulse-slow`} />
      
      <div className={`relative transition-all duration-300 ${showBlink ? 'animate-blink' : ''}`}>
        {showBlink ? (
          <EyeOff className={`w-32 h-32 sm:w-40 sm:h-40 ${getHealthColor()} transition-colors`} />
        ) : (
          <Eye className={`w-32 h-32 sm:w-40 sm:h-40 ${getHealthColor()} transition-colors`} />
        )}
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-2xl font-bold text-gray-800">
          {averageRate} <span className="text-sm font-normal text-gray-600">blinks/min</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getHealthColor()} bg-current`} />
          <span className="text-sm text-gray-600">Health Score: {healthScore}%</span>
        </div>
      </div>
      
      <div className="mt-4 w-full max-w-xs">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getHealthColor().replace('text-', 'bg-')} transition-all duration-500`}
            style={{ width: `${healthScore}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default EyeVisual