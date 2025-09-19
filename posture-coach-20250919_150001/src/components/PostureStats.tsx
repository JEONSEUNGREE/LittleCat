import { TrendingUp, Clock, Coffee } from 'lucide-react'
import { usePostureStore } from '../store/usePostureStore'

export default function PostureStats() {
  const stats = usePostureStore((state) => state.getTodayStats())

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}시간 ${mins}분`
    }
    return `${mins}분`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        오늘의 통계
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">좋은 자세 비율</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {stats.goodPosturePercentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">총 모니터링 시간</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatTime(Math.floor(stats.totalTime / 12))}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">휴식 횟수</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.breaks}회
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">진행도</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {stats.goodPosturePercentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(stats.goodPosturePercentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          목표: 하루 70% 이상 좋은 자세 유지
        </p>
      </div>
    </div>
  )
}