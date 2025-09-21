import { Clock, TrendingUp, TrendingDown, Trash2 } from 'lucide-react'
import { useSpeedStore } from '../store/useSpeedStore'

export default function SpeedHistory() {
  const { readings, clearHistory } = useSpeedStore()

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
    return date.toLocaleDateString()
  }

  const formatSpeed = (speed: number) => {
    if (speed >= 1000) {
      return `${(speed / 1000).toFixed(1)} Gbps`
    }
    return `${speed.toFixed(1)} Mbps`
  }

  const getSpeedTrend = (current: number, previous: number | undefined) => {
    if (!previous) return null
    const diff = current - previous
    if (Math.abs(diff) < 5) return null
    return diff > 0 ? 'up' : 'down'
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-400" />
          Speed History
        </h2>
        {readings.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {readings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No speed tests recorded yet</p>
          <p className="text-gray-600 text-sm mt-2">Start monitoring to see history</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {readings.map((reading, index) => {
            const previousReading = readings[index + 1]
            const trend = getSpeedTrend(reading.downloadSpeed, previousReading?.downloadSpeed)
            
            return (
              <div
                key={reading.id}
                className="bg-slate-900/50 rounded-xl p-4 hover:bg-slate-900/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-1">
                      {formatTime(reading.timestamp)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-semibold">
                          ↓ {formatSpeed(reading.downloadSpeed)}
                        </span>
                        {trend === 'up' && (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        )}
                        {trend === 'down' && (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <span className="text-gray-500">
                        ↑ {formatSpeed(reading.uploadSpeed)}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {reading.ping}ms
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-600 bg-slate-800 px-2 py-1 rounded">
                      {reading.connectionType}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}