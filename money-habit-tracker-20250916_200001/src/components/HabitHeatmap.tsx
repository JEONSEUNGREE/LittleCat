import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function HabitHeatmap() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const getMonthlyHeatmap = useStore(state => state.getMonthlyHeatmap)
  const savingsGoal = useStore(state => state.savingsGoal)
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const monthName = currentDate.toLocaleDateString('ko-KR', { month: 'long', year: 'numeric' })
  
  const habits = getMonthlyHeatmap(year, month)
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  
  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1))
  }

  const getHeatmapColor = (habit: typeof habits[0]) => {
    if (habit.expenseCount === 0) return 'bg-gray-100'
    
    const spendingRatio = habit.totalSpent / savingsGoal
    
    if (spendingRatio <= 0.5) return 'bg-green-300'
    if (spendingRatio <= 0.8) return 'bg-green-500'
    if (spendingRatio <= 1) return 'bg-yellow-400'
    if (spendingRatio <= 1.2) return 'bg-orange-400'
    return 'bg-red-500'
  }

  const getIntensity = (habit: typeof habits[0]) => {
    if (habit.expenseCount === 0) return 'opacity-30'
    if (habit.expenseCount <= 2) return 'opacity-60'
    if (habit.expenseCount <= 4) return 'opacity-80'
    return 'opacity-100'
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">{monthName}</h2>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={month === new Date().getMonth() && year === new Date().getFullYear()}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {habits.map((habit, index) => {
          const day = index + 1
          const isToday = 
            year === new Date().getFullYear() && 
            month === new Date().getMonth() && 
            day === new Date().getDate()
          
          return (
            <div
              key={habit.date}
              className="relative group"
            >
              <div
                className={`aspect-square rounded-md ${getHeatmapColor(habit)} ${getIntensity(habit)} 
                  ${isToday ? 'ring-2 ring-purple-600 ring-offset-1' : ''} 
                  transition-all hover:scale-110 cursor-pointer`}
              />
              <div className="text-xs text-center mt-1 text-gray-700 font-medium">
                {day}
              </div>
              
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs rounded-lg p-2 whitespace-nowrap">
                  <div>₩{habit.totalSpent.toLocaleString()}</div>
                  <div>{habit.expenseCount}건</div>
                  {habit.impulseCount > 0 && (
                    <div className="text-yellow-300">충동 {habit.impulseCount}건</div>
                  )}
                </div>
                <div className="w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1 mx-auto"></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">범례</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 rounded"></div>
            <span className="text-xs text-gray-600">목표 50% 이하</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-xs text-gray-600">목표 80% 이하</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span className="text-xs text-gray-600">목표 100% 이하</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span className="text-xs text-gray-600">목표 120% 이하</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-600">목표 초과</span>
          </div>
        </div>
      </div>
    </div>
  )
}