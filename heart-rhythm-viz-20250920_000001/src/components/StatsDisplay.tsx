import React from 'react'
import { TrendingUp, TrendingDown, Minus, Zap, Heart, Brain } from 'lucide-react'
import useHeartStore from '../store/useHeartStore'

const StatsDisplay: React.FC = () => {
  const { readings, coherenceScore, currentBPM } = useHeartStore()
  
  const getAverageBPM = () => {
    if (readings.length === 0) return 0
    const sum = readings.reduce((acc, reading) => acc + reading.bpm, 0)
    return Math.round(sum / readings.length)
  }
  
  const getMinMaxBPM = () => {
    if (readings.length === 0) return { min: 0, max: 0 }
    const bpms = readings.map(r => r.bpm)
    return {
      min: Math.min(...bpms),
      max: Math.max(...bpms)
    }
  }
  
  const getTrend = () => {
    if (readings.length < 2) return 'stable'
    const recent = readings.slice(-10)
    const older = readings.slice(-20, -10)
    
    if (recent.length === 0 || older.length === 0) return 'stable'
    
    const recentAvg = recent.reduce((acc, r) => acc + r.bpm, 0) / recent.length
    const olderAvg = older.reduce((acc, r) => acc + r.bpm, 0) / older.length
    
    if (recentAvg > olderAvg + 2) return 'up'
    if (recentAvg < olderAvg - 2) return 'down'
    return 'stable'
  }
  
  const getHeartZone = () => {
    if (currentBPM < 60) return { zone: 'Rest', color: 'text-blue-400', icon: Brain }
    if (currentBPM < 80) return { zone: 'Calm', color: 'text-green-400', icon: Heart }
    if (currentBPM < 100) return { zone: 'Active', color: 'text-yellow-400', icon: Zap }
    return { zone: 'Intense', color: 'text-red-400', icon: Zap }
  }
  
  const trend = getTrend()
  const { min, max } = getMinMaxBPM()
  const avgBPM = getAverageBPM()
  const heartZone = getHeartZone()
  const ZoneIcon = heartZone.icon
  
  return (
    <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-500" />
        Session Statistics
      </h2>
      
      {/* Heart Zone */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Heart Zone</span>
          <ZoneIcon className={`w-5 h-5 ${heartZone.color}`} />
        </div>
        <div className={`text-2xl font-bold ${heartZone.color}`}>
          {heartZone.zone}
        </div>
      </div>
      
      {/* Trend Indicator */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-400 block mb-1">Trend</span>
            <span className="text-lg font-semibold text-white">
              {trend === 'up' && 'Rising'}
              {trend === 'down' && 'Falling'}
              {trend === 'stable' && 'Stable'}
            </span>
          </div>
          <div className="text-2xl">
            {trend === 'up' && <TrendingUp className="w-8 h-8 text-green-500" />}
            {trend === 'down' && <TrendingDown className="w-8 h-8 text-red-500" />}
            {trend === 'stable' && <Minus className="w-8 h-8 text-gray-500" />}
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-400 block mb-1">Average</span>
          <span className="text-lg font-semibold text-white">{avgBPM || '--'}</span>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-400 block mb-1">Min</span>
          <span className="text-lg font-semibold text-blue-400">{min || '--'}</span>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-400 block mb-1">Max</span>
          <span className="text-lg font-semibold text-red-400">{max || '--'}</span>
        </div>
      </div>
      
      {/* Coherence Progress Bar */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Coherence Score</span>
          <span className="text-sm font-semibold text-white">{coherenceScore}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{
              width: `${coherenceScore}%`,
              background: `linear-gradient(90deg, #667eea 0%, #f56565 100%)`
            }}
          />
        </div>
      </div>
      
      {/* Reading Count */}
      <div className="text-center text-xs text-gray-500">
        {readings.length} readings collected
      </div>
    </div>
  )
}

export default StatsDisplay