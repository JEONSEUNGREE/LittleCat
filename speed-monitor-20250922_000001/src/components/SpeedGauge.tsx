import { Wifi, WifiOff, Activity } from 'lucide-react'
import { useSpeedStore } from '../store/useSpeedStore'

export default function SpeedGauge() {
  const { currentSpeed, isMonitoring } = useSpeedStore()

  const getSpeedColor = (speed: number) => {
    if (speed >= 100) return 'text-speed-green'
    if (speed >= 50) return 'text-speed-yellow'
    return 'text-speed-red'
  }

  const getSpeedLevel = (speed: number) => {
    if (speed >= 100) return 'Excellent'
    if (speed >= 50) return 'Good'
    if (speed >= 25) return 'Fair'
    if (speed > 0) return 'Poor'
    return 'No Connection'
  }

  const formatSpeed = (speed: number) => {
    if (speed >= 1000) {
      return `${(speed / 1000).toFixed(1)} Gbps`
    }
    return `${speed.toFixed(1)} Mbps`
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-400" />
          Network Speed
        </h2>
        {isMonitoring ? (
          <Wifi className="w-6 h-6 text-green-400 animate-pulse" />
        ) : (
          <WifiOff className="w-6 h-6 text-red-400" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Download Speed */}
        <div className="bg-slate-900/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Download</p>
          <p className={`text-3xl font-bold ${getSpeedColor(currentSpeed.download)}`}>
            {formatSpeed(currentSpeed.download)}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {getSpeedLevel(currentSpeed.download)}
          </p>
        </div>

        {/* Upload Speed */}
        <div className="bg-slate-900/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Upload</p>
          <p className={`text-3xl font-bold ${getSpeedColor(currentSpeed.upload)}`}>
            {formatSpeed(currentSpeed.upload)}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {getSpeedLevel(currentSpeed.upload)}
          </p>
        </div>

        {/* Ping */}
        <div className="bg-slate-900/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Ping</p>
          <p className={`text-3xl font-bold ${
            currentSpeed.ping < 50 ? 'text-speed-green' : 
            currentSpeed.ping < 100 ? 'text-speed-yellow' : 'text-speed-red'
          }`}>
            {currentSpeed.ping.toFixed(0)} ms
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {currentSpeed.ping < 50 ? 'Low Latency' : 
             currentSpeed.ping < 100 ? 'Moderate' : 'High Latency'}
          </p>
        </div>
      </div>

      {/* Visual Speed Indicator */}
      <div className="mt-6">
        <div className="h-2 bg-slate-900/50 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              currentSpeed.download >= 100 ? 'bg-gradient-to-r from-green-500 to-green-400' :
              currentSpeed.download >= 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
              'bg-gradient-to-r from-red-500 to-red-400'
            }`}
            style={{ width: `${Math.min(100, (currentSpeed.download / 200) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}