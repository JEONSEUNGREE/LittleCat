import { TrendingUp, TrendingDown } from 'lucide-react'
import { useBatteryStore } from '../store/batteryStore'

export default function BatteryChart() {
  const { history } = useBatteryStore()
  
  const maxLevel = Math.max(...history.map(h => h.level), 100)
  const minLevel = Math.min(...history.map(h => h.level), 0)
  const avgLevel = history.reduce((sum, h) => sum + h.level, 0) / history.length || 0
  
  const trend = history.length > 1 
    ? history[history.length - 1].level - history[0].level
    : 0
  
  return (
    <div className="glass-effect p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">24시간 사용 패턴</h3>
        <div className="flex items-center gap-2">
          {trend < 0 ? (
            <TrendingDown className="w-5 h-5 text-battery-red" />
          ) : (
            <TrendingUp className="w-5 h-5 text-battery-green" />
          )}
          <span className={`text-sm ${trend < 0 ? 'text-battery-red' : 'text-battery-green'}`}>
            {Math.abs(trend).toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="relative h-40 mb-4">
        <div className="absolute inset-0 flex items-end justify-between gap-1">
          {history.map((item, index) => {
            const height = ((item.level - minLevel) / (maxLevel - minLevel)) * 100
            const color = item.level > 60 ? 'battery-gradient' : 
                         item.level > 30 ? 'battery-gradient-warning' : 
                         'battery-gradient-danger'
            
            return (
              <div
                key={index}
                className="flex-1 relative group"
              >
                <div
                  className={`w-full ${color} rounded-t transition-all duration-300 hover:opacity-80`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {item.level}% @ {item.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
        <div className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
      </div>
      
      <div className="flex justify-around text-xs text-white/50">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-white/50 text-xs mb-1">최대</p>
          <p className="text-white font-semibold">{maxLevel.toFixed(0)}%</p>
        </div>
        <div className="text-center">
          <p className="text-white/50 text-xs mb-1">평균</p>
          <p className="text-white font-semibold">{avgLevel.toFixed(0)}%</p>
        </div>
        <div className="text-center">
          <p className="text-white/50 text-xs mb-1">최소</p>
          <p className="text-white font-semibold">{minLevel.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  )
}