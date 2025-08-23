import React from 'react'
import { Clock, Target, TrendingUp, Calendar } from 'lucide-react'
import { usePomodoroStore } from '../store/usePomodoroStore'

export const StatsCard: React.FC = () => {
  const { totalFocusTime, todayFocusTime, currentStreak, bestStreak } = usePomodoroStore()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`
    }
    return `${minutes}분`
  }

  const stats = [
    {
      icon: Clock,
      label: '오늘 집중',
      value: formatTime(todayFocusTime),
      color: 'text-blue-500'
    },
    {
      icon: TrendingUp,
      label: '총 집중 시간',
      value: formatTime(totalFocusTime),
      color: 'text-green-500'
    },
    {
      icon: Target,
      label: '현재 연속',
      value: `${currentStreak}회`,
      color: 'text-orange-500'
    },
    {
      icon: Calendar,
      label: '최고 기록',
      value: `${bestStreak}회`,
      color: 'text-purple-500'
    }
  ]

  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        나의 집중 통계
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-2">
                <Icon className={`w-5 h-5 mr-2 ${stat.color}`} />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </span>
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-white">
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}