import { useEffect, useState } from 'react'
import { TrendingUp, AlertCircle, Sparkles } from 'lucide-react'
import { useEnergyStore } from '../store/useEnergyStore'

export default function EnergyChart() {
  const { patterns, getPredictedEnergy, entries } = useEnergyStore()
  const [currentHour, setCurrentHour] = useState(new Date().getHours())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours())
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const getBarHeight = (energy: number) => `${(energy / 10) * 100}%`
  
  const getBarColor = (energy: number) => {
    if (energy <= 3) return 'bg-energy-low'
    if (energy <= 6) return 'bg-energy-medium'
    if (energy <= 8) return 'bg-energy-high'
    return 'bg-energy-peak'
  }

  const formatHour = (hour: number) => {
    if (hour === 0) return '12AM'
    if (hour < 12) return `${hour}AM`
    if (hour === 12) return '12PM'
    return `${hour - 12}PM`
  }

  const averageEnergy = patterns.reduce((sum, p) => sum + p.averageEnergy, 0) / patterns.length
  const peakHours = patterns
    .filter(p => p.averageEnergy >= 7 && p.sampleCount > 0)
    .map(p => p.hour)
  const lowHours = patterns
    .filter(p => p.averageEnergy <= 3 && p.sampleCount > 0)
    .map(p => p.hour)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Average Energy</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {averageEnergy.toFixed(1)}/10
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Peak Hours</p>
              <p className="text-2xl font-bold text-energy-high">
                {peakHours.length || 'N/A'}
              </p>
            </div>
            <Sparkles className="w-8 h-8 text-energy-high" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Data Points</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {entries.length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Energy Pattern Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          24-Hour Energy Pattern
        </h3>
        
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              No data yet. Start tracking your energy to see patterns!
            </p>
          </div>
        ) : (
          <>
            <div className="relative h-64 mb-4">
              <div className="absolute inset-0 flex items-end justify-between">
                {Array.from({ length: 24 }, (_, hour) => {
                  const energy = getPredictedEnergy(hour)
                  const isCurrentHour = hour === currentHour
                  const hasSamples = patterns[hour].sampleCount > 0
                  
                  return (
                    <div
                      key={hour}
                      className="flex-1 flex flex-col items-center justify-end px-0.5"
                    >
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          getBarColor(energy)
                        } ${isCurrentHour ? 'ring-2 ring-primary-500 ring-offset-2' : ''} ${
                          hasSamples ? 'opacity-100' : 'opacity-40'
                        }`}
                        style={{ height: getBarHeight(energy) }}
                      />
                    </div>
                  )
                })}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 inset-y-0 flex flex-col justify-between pointer-events-none">
                <span className="text-xs text-slate-500 -ml-6">10</span>
                <span className="text-xs text-slate-500 -ml-6">5</span>
                <span className="text-xs text-slate-500 -ml-6">0</span>
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between">
              {[0, 6, 12, 18].map(hour => (
                <span key={hour} className="text-xs text-slate-500">
                  {formatHour(hour)}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Insights */}
        {entries.length > 5 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-slate-900 dark:text-white">Insights</h4>
            
            {peakHours.length > 0 && (
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-energy-high mt-0.5" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your peak energy hours: {peakHours.slice(0, 3).map(h => formatHour(h)).join(', ')}
                </p>
              </div>
            )}
            
            {lowHours.length > 0 && (
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-energy-low mt-0.5" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Low energy periods: {lowHours.slice(0, 3).map(h => formatHour(h)).join(', ')}
                </p>
              </div>
            )}
            
            <div className="flex items-start space-x-2">
              <TrendingUp className="w-4 h-4 text-primary-600 mt-0.5" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Track more data points for better predictions and insights
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}