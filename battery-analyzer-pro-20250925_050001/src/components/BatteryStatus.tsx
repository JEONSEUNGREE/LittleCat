import { Battery, BatteryCharging, Zap, ThermometerSun, Activity, Cpu } from 'lucide-react'
import { useBatteryStore } from '../store/batteryStore'

export default function BatteryStatus() {
  const { batteryLevel, isCharging, remainingTime, temperature, health, voltage } = useBatteryStore()
  
  const getBatteryColor = () => {
    if (batteryLevel > 60) return 'battery-gradient'
    if (batteryLevel > 30) return 'battery-gradient-warning'
    return 'battery-gradient-danger'
  }
  
  const getBatteryTextColor = () => {
    if (batteryLevel > 60) return 'text-battery-green'
    if (batteryLevel > 30) return 'text-battery-yellow'
    return 'text-battery-red'
  }
  
  return (
    <div className="glass-effect p-6 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {isCharging ? (
            <BatteryCharging className="w-8 h-8 text-battery-green animate-pulse-slow" />
          ) : (
            <Battery className={`w-8 h-8 ${getBatteryTextColor()}`} />
          )}
          <div>
            <h2 className="text-2xl font-bold text-white">배터리 상태</h2>
            <p className="text-white/70 text-sm">{remainingTime} 남음</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-4xl font-bold ${getBatteryTextColor()}`}>
            {batteryLevel}%
          </span>
          {isCharging && (
            <p className="text-battery-green text-sm flex items-center justify-end gap-1 mt-1">
              <Zap className="w-3 h-3" />
              충전중
            </p>
          )}
        </div>
      </div>
      
      <div className="relative h-12 rounded-full overflow-hidden bg-black/20 mb-6">
        <div 
          className={`h-full ${getBatteryColor()} transition-all duration-700 ease-out flex items-center justify-center`}
          style={{ width: `${batteryLevel}%` }}
        >
          {batteryLevel > 20 && (
            <span className="text-white font-semibold text-sm absolute left-1/2 transform -translate-x-1/2">
              {batteryLevel}%
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ThermometerSun className="w-4 h-4 text-white/70 mr-1" />
            <span className="text-white/70 text-xs">온도</span>
          </div>
          <p className="text-white font-semibold">{temperature.toFixed(1)}°C</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Activity className="w-4 h-4 text-white/70 mr-1" />
            <span className="text-white/70 text-xs">상태</span>
          </div>
          <p className="text-white font-semibold">{health}%</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Cpu className="w-4 h-4 text-white/70 mr-1" />
            <span className="text-white/70 text-xs">전압</span>
          </div>
          <p className="text-white font-semibold">{voltage.toFixed(1)}V</p>
        </div>
      </div>
    </div>
  )
}