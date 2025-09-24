import { Clock, TrendingDown } from 'lucide-react'
import { useBatteryStore } from '../store/batteryStore'

export default function AppUsageList() {
  const { appUsages } = useBatteryStore()
  
  const totalUsage = appUsages.reduce((sum, app) => sum + app.usage, 0)
  
  return (
    <div className="glass-effect p-6 mb-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">앱별 배터리 사용량</h3>
        <TrendingDown className="w-5 h-5 text-white/50" />
      </div>
      
      <div className="space-y-3">
        {appUsages.map((app, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">{app.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{app.name}</span>
                  <span className="text-white/70 text-sm">{app.usage}%</span>
                </div>
                <div className="h-2 rounded-full bg-black/20 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${(app.usage / totalUsage) * 100}%`,
                      backgroundColor: app.color
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/50 text-xs ml-3">
              <Clock className="w-3 h-3" />
              {app.time}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">총 사용 시간</span>
          <span className="text-white font-semibold">7h 35m</span>
        </div>
      </div>
    </div>
  )
}