import React from 'react'
import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react'
import useHydrationStore from '../store/useHydrationStore'

const Statistics: React.FC = () => {
  const { totalWaterLogged, streakDays, plants, dailyGoal, currentIntake } = useHydrationStore()
  
  const weeklyData = React.useMemo(() => {
    const days = ['월', '화', '수', '목', '금', '토', '일']
    const today = new Date().getDay()
    const adjustedToday = today === 0 ? 6 : today - 1
    
    return days.map((day, index) => {
      const isToday = index === adjustedToday
      const percentage = isToday 
        ? (currentIntake / dailyGoal) * 100
        : Math.random() * 30 + 60
      
      return {
        day,
        percentage: Math.min(percentage, 100),
        isToday
      }
    })
  }, [currentIntake, dailyGoal])

  const achievements = [
    { icon: '💧', title: '첫 물 마시기', unlocked: totalWaterLogged > 0 },
    { icon: '🔥', title: '3일 연속', unlocked: streakDays >= 3 },
    { icon: '🌱', title: '첫 식물', unlocked: plants.length > 0 },
    { icon: '🌳', title: '나무 키우기', unlocked: plants.some(p => p.type === 'tree') },
    { icon: '💎', title: '10L 달성', unlocked: totalWaterLogged >= 10000 },
    { icon: '🏆', title: '30일 챌린지', unlocked: streakDays >= 30 },
  ]

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <BarChart3 className="text-water-blue" />
        통계 및 업적
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-water-blue/10 to-water-blue/20 rounded-lg p-4">
          <TrendingUp className="w-6 h-6 text-water-blue mb-2" />
          <div className="text-2xl font-bold text-gray-800">
            {(totalWaterLogged / 1000).toFixed(1)}L
          </div>
          <div className="text-sm text-gray-600">총 섭취량</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4">
          <Calendar className="w-6 h-6 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-gray-800">{streakDays}일</div>
          <div className="text-sm text-gray-600">연속 달성</div>
        </div>
        
        <div className="bg-gradient-to-br from-leaf-green/10 to-leaf-green/20 rounded-lg p-4">
          <Award className="w-6 h-6 text-leaf-green mb-2" />
          <div className="text-2xl font-bold text-gray-800">{plants.length}개</div>
          <div className="text-sm text-gray-600">키운 식물</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4">
          <div className="text-2xl mb-2">🏅</div>
          <div className="text-2xl font-bold text-gray-800">
            {achievements.filter(a => a.unlocked).length}/{achievements.length}
          </div>
          <div className="text-sm text-gray-600">획득 업적</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">주간 섭취량</h3>
        <div className="flex items-end justify-between gap-1 h-32">
          {weeklyData.map(({ day, percentage, isToday }) => (
            <div key={day} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t flex-1 relative">
                <div
                  className={`absolute bottom-0 w-full rounded-t transition-all duration-500 ${
                    isToday 
                      ? 'bg-gradient-to-t from-water-blue to-blue-400' 
                      : 'bg-gradient-to-t from-gray-400 to-gray-300'
                  }`}
                  style={{ height: `${percentage}%` }}
                />
              </div>
              <span className={`text-xs mt-1 ${isToday ? 'font-bold text-water-blue' : 'text-gray-600'}`}>
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">업적</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-md'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="text-xs text-center text-gray-700">{achievement.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}