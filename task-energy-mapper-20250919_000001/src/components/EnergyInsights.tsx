import React from 'react'
import { BarChart3, TrendingUp, Clock, Sparkles } from 'lucide-react'
import { useEnergyStore } from '../store/useEnergyStore'

const EnergyInsights: React.FC = () => {
  const { energyEntries, getEnergyPattern, tasks } = useEnergyStore()
  const pattern = getEnergyPattern()
  
  const completedToday = tasks.filter(t => {
    if (!t.completed) return false
    // For demo purposes, consider all completed as today
    return true
  }).length
  
  const totalTaskTime = tasks
    .filter(t => t.completed)
    .reduce((sum, t) => sum + t.estimatedTime, 0)
  
  const avgEnergyLevel = energyEntries.length > 0
    ? energyEntries.reduce((sum, e) => sum + e.level, 0) / energyEntries.length
    : 0
  
  const peakHours = pattern
    .filter(p => p.avgEnergy >= 4)
    .map(p => p.hour)
  
  const formatHour = (hour: number) => {
    if (hour === 0) return '12AM'
    if (hour === 12) return '12PM'
    if (hour < 12) return `${hour}AM`
    return `${hour - 12}PM`
  }

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Insights</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Tasks Today</span>
          </div>
          <p className="text-2xl font-bold text-white">{completedToday}</p>
          <p className="text-xs text-gray-500 mt-1">{totalTaskTime} min total</p>
        </div>
        
        <div className="bg-dark-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Avg Energy</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgEnergyLevel.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
        </div>
      </div>

      {/* Energy Pattern Chart */}
      {pattern.length > 0 && (
        <div className="bg-dark-card rounded-xl p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Energy Pattern</h3>
          <div className="space-y-2">
            {pattern.map(({ hour, avgEnergy }) => (
              <div key={hour} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-12">{formatHour(hour)}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full transition-all ${
                      avgEnergy >= 4 ? 'bg-green-500' :
                      avgEnergy >= 3 ? 'bg-yellow-500' :
                      avgEnergy >= 2 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(avgEnergy / 5) * 100}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                    {avgEnergy.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Peak Hours */}
      {peakHours.length > 0 && (
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-medium text-green-400">Your Peak Hours</h3>
          </div>
          <p className="text-white">
            {peakHours.map(h => formatHour(h)).join(', ')}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Schedule important tasks during these times for best results
          </p>
        </div>
      )}

      {/* Empty State */}
      {energyEntries.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No insights yet</p>
          <p className="text-sm mt-1">Track your energy to see patterns</p>
        </div>
      )}
    </div>
  )
}