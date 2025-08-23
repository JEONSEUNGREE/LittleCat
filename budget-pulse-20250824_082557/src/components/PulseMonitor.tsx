import React from 'react'
import { Heart, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useBudgetStore } from '../store/useBudgetStore'

const PulseMonitor: React.FC = () => {
  const { health, currentSpent, monthlyBudget } = useBudgetStore()
  const spentPercentage = Math.round((currentSpent / monthlyBudget) * 100)
  
  const getPulseAnimation = () => {
    if (health.pulse < 80) return 'animate-pulse-slow'
    if (health.pulse < 120) return 'animate-pulse'
    return 'animate-pulse-fast'
  }
  
  const getStatusColor = () => {
    switch (health.status) {
      case 'excellent': return 'text-pulse-green'
      case 'good': return 'text-pulse-blue'
      case 'warning': return 'text-pulse-yellow'
      case 'critical': return 'text-pulse-red'
    }
  }
  
  const getTrendIcon = () => {
    switch (health.trend) {
      case 'improving': return <TrendingDown className="w-4 h-4" />
      case 'declining': return <TrendingUp className="w-4 h-4" />
      default: return <Minus className="w-4 h-4" />
    }
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Heart 
            className={`w-24 h-24 ${getStatusColor()} ${getPulseAnimation()}`}
            fill="currentColor"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{Math.round(health.pulse)}</span>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Budget Health</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className={`text-lg font-semibold capitalize ${getStatusColor()}`}>
              {health.status}
            </span>
            <div className="flex items-center text-white/80">
              {getTrendIcon()}
              <span className="text-sm ml-1">{health.trend}</span>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              spentPercentage < 50 ? 'bg-pulse-green' :
              spentPercentage < 75 ? 'bg-pulse-blue' :
              spentPercentage < 100 ? 'bg-pulse-yellow' :
              'bg-pulse-red'
            }`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between w-full text-white/90">
          <span className="text-sm">Spent: ${currentSpent.toFixed(2)}</span>
          <span className="text-sm">Budget: ${monthlyBudget.toFixed(2)}</span>
        </div>
        
        <div className="text-center text-white/70 text-xs">
          {spentPercentage}% of monthly budget used
        </div>
      </div>
    </div>
  )
}

export default PulseMonitor