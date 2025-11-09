import { TrendingUp, Zap } from 'lucide-react'
import { useTimerStore } from '../store/timerStore'

export const Stats = () => {
  const { sessionsCompleted, flowIntensity } = useTimerStore()

  return (
    <div className="flex gap-4 md:gap-6 mt-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-flow-400" />
        <div>
          <div className="text-xs md:text-sm text-white/60">완료한 세션</div>
          <div className="text-xl md:text-2xl font-bold text-white">{sessionsCompleted}</div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
        <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
        <div>
          <div className="text-xs md:text-sm text-white/60">플로우 강도</div>
          <div className="text-xl md:text-2xl font-bold text-white">
            {Math.round(flowIntensity)}%
          </div>
        </div>
      </div>
    </div>
  )
}
