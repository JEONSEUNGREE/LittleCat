import { Clock } from 'lucide-react'
import { usePostureStore } from '../store'

const intervals = [15, 20, 25, 30, 45, 60]

export function Settings() {
  const { interval, updateInterval } = usePostureStore()

  return (
    <div className="glass rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-white" size={24} />
        <h2 className="text-xl font-semibold text-white">타이머 설정</h2>
      </div>
      
      <div className="space-y-2">
        <p className="text-white/80 text-sm mb-3">자세 확인 간격</p>
        <div className="grid grid-cols-3 gap-2">
          {intervals.map((mins) => (
            <button
              key={mins}
              onClick={() => updateInterval(mins)}
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                interval === mins
                  ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {mins}분
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-white/10 rounded-xl">
        <p className="text-white/90 text-sm">
          💡 20-30분마다 자세를 확인하는 것이 권장됩니다
        </p>
      </div>
    </div>
  )
}