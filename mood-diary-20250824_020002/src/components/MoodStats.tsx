import React from 'react'
import { TrendingUp, Award, Calendar } from 'lucide-react'
import { useMoodStore } from '../store/useMoodStore'

export const MoodStats: React.FC = () => {
  const { entries, getMoodStats } = useMoodStore()
  const stats = getMoodStats()

  const getTotalDays = () => {
    const uniqueDays = new Set(
      entries.map(entry => new Date(entry.timestamp).toDateString())
    )
    return uniqueDays.size
  }

  const getMostFrequentMood = () => {
    if (stats.length === 0) return null
    return stats[0]
  }

  const getStreak = () => {
    if (entries.length === 0) return 0
    
    const today = new Date().toDateString()
    const sortedDates = [...new Set(
      entries.map(entry => new Date(entry.timestamp).toDateString())
    )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    
    if (sortedDates[0] !== today) return 0
    
    let streak = 1
    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i - 1])
      const previous = new Date(sortedDates[i])
      const diffTime = current.getTime() - previous.getTime()
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      
      if (diffDays === 1) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const mostFrequent = getMostFrequentMood()

  return (
    <div className="mood-card p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">통계</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-primary-50 rounded-xl p-3 mb-2">
            <Calendar className="w-6 h-6 text-primary-500 mx-auto" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{getTotalDays()}</div>
          <div className="text-xs text-gray-500">기록한 날</div>
        </div>

        <div className="text-center">
          <div className="bg-secondary-50 rounded-xl p-3 mb-2">
            <TrendingUp className="w-6 h-6 text-secondary-500 mx-auto" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{getStreak()}</div>
          <div className="text-xs text-gray-500">연속 기록</div>
        </div>

        <div className="text-center">
          <div className="bg-yellow-50 rounded-xl p-3 mb-2">
            <Award className="w-6 h-6 text-yellow-500 mx-auto" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{entries.length}</div>
          <div className="text-xs text-gray-500">전체 기록</div>
        </div>
      </div>

      {mostFrequent && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-2">가장 많이 느낀 감정</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {entries.find(e => e.mood === mostFrequent.mood)?.emoji}
              </span>
              <span className="font-semibold text-gray-800">{mostFrequent.mood}</span>
            </div>
            <span className="text-sm text-gray-500">{mostFrequent.count}회</span>
          </div>
        </div>
      )}

      {stats.length > 1 && (
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600">감정 분포</div>
          {stats.slice(0, 5).map((stat) => {
            const emoji = entries.find(e => e.mood === stat.mood)?.emoji || '😊'
            const percentage = (stat.count / entries.length) * 100
            return (
              <div key={stat.mood} className="flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">{stat.mood}</span>
                    <span className="text-xs text-gray-500">{stat.count}회</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
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