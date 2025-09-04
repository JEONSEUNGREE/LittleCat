import { Clock, TrendingUp } from 'lucide-react'
import { useEnergyStore } from '../store/useEnergyStore'

export default function OptimalTimeWidget() {
  const getOptimalWorkTime = useEnergyStore((state) => state.getOptimalWorkTime)
  const optimalTime = getOptimalWorkTime()
  
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM'
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return '12 PM'
    return `${hour - 12} PM`
  }

  if (!optimalTime) {
    return (
      <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
        <Clock className="w-4 h-4" />
        <span>Track more data for insights</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3 bg-gradient-to-r from-energy-high/10 to-energy-peak/10 px-4 py-2 rounded-lg">
      <TrendingUp className="w-5 h-5 text-energy-high" />
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Optimal Work Time</p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatHour(optimalTime.start)} - {formatHour(optimalTime.end)}
        </p>
      </div>
    </div>
  )
}