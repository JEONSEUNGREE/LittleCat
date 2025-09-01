import { Droplets } from 'lucide-react'
import { useWaterStore } from '../store/waterStore'

export default function WaterTracker() {
  const { currentIntake, dailyGoal, getProgress } = useWaterStore()
  const progress = getProgress()
  const remaining = Math.max(0, dailyGoal - currentIntake)

  return (
    <div className="mb-6">
      <div className="relative w-48 h-48 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(progress / 100) * 553} 553`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0099ff" />
              <stop offset="100%" stopColor="#00ccff" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Droplets className="w-12 h-12 text-water-500 mb-2 animate-float" />
          <div className="text-3xl font-bold text-gray-800">{currentIntake}ml</div>
          <div className="text-sm text-gray-500">/ {dailyGoal}ml</div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {progress.toFixed(0)}% 달성
        </div>
        <div className="text-sm text-gray-600">
          {remaining > 0 ? `${remaining}ml 더 마시면 목표 달성!` : '오늘의 목표를 달성했어요! 🎉'}
        </div>
      </div>

      <div className="mt-4 bg-gray-100 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-water-400 to-water-600 transition-all duration-500"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  )
}