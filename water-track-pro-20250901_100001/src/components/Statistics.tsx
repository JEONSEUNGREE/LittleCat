import { TrendingUp, Award, Calendar } from 'lucide-react'
import { useWaterStore } from '../store/waterStore'

export default function Statistics() {
  const { getWeeklyStats, history, dailyGoal } = useWaterStore()
  const weeklyStats = getWeeklyStats()
  
  // Calculate statistics
  const totalThisWeek = weeklyStats.reduce((sum, day) => sum + day.total, 0)
  const avgDaily = Math.round(totalThisWeek / 7)
  const daysGoalMet = weeklyStats.filter(day => day.total >= day.goal).length
  const bestDay = Math.max(...weeklyStats.map(day => day.total))
  
  const getBarHeight = (total: number) => {
    const maxHeight = 120
    const percentage = (total / (dailyGoal * 1.5)) * 100
    return Math.min(percentage, 100)
  }

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr)
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return days[date.getDay()]
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">주간 통계</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl">
          <TrendingUp className="w-5 h-5 text-blue-600 mb-1" />
          <div className="text-xs text-gray-600">평균 섭취량</div>
          <div className="text-lg font-bold text-gray-800">{avgDaily}ml</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl">
          <Award className="w-5 h-5 text-green-600 mb-1" />
          <div className="text-xs text-gray-600">목표 달성</div>
          <div className="text-lg font-bold text-gray-800">{daysGoalMet}/7일</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl">
          <Calendar className="w-5 h-5 text-purple-600 mb-1" />
          <div className="text-xs text-gray-600">최고 기록</div>
          <div className="text-lg font-bold text-gray-800">{bestDay}ml</div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex items-end justify-between h-32 mb-2">
          {weeklyStats.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full flex justify-center">
                <div
                  className={`w-8 rounded-t-lg transition-all duration-500 ${
                    day.total >= day.goal ? 'bg-water-500' : 'bg-gray-300'
                  }`}
                  style={{ height: `${getBarHeight(day.total)}px` }}
                >
                  {day.total >= day.goal && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          {weeklyStats.map((day, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="text-xs text-gray-600">{getDayName(day.date)}</div>
              <div className="text-xs font-medium text-gray-800">{day.total}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-water-50 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">이번 주 총 섭취량</span>
          <span className="text-lg font-bold text-water-600">{totalThisWeek}ml</span>
        </div>
      </div>
    </div>
  )
}