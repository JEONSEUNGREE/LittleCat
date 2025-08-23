import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useHabitStore from '../store/habitStore'

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const habits = useHabitStore((state) => state.habits)
  const getHabitCompletionForDate = useHabitStore((state) => state.getHabitCompletionForDate)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  const getCompletionRateForDay = (day: number | null) => {
    if (!day || habits.length === 0) return 0
    
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const completedCount = habits.filter((habit) => 
      getHabitCompletionForDate(habit.id, dateStr)
    ).length
    
    return completedCount / habits.length
  }

  const today = new Date()
  const isToday = (day: number | null) => {
    if (!day) return false
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors tap-highlight-none"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">
          {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors tap-highlight-none"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const completionRate = getCompletionRateForDay(day)
          const bgOpacity = completionRate * 100
          
          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center relative rounded-lg transition-all ${
                day ? 'hover:bg-gray-50' : ''
              } ${isToday(day) ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
            >
              {day && (
                <>
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundColor: `rgb(99, 102, 241, ${bgOpacity / 100})`,
                    }}
                  />
                  <span className={`relative text-sm font-medium ${
                    completionRate > 0.5 ? 'text-white' : 'text-gray-700'
                  } ${isToday(day) ? 'font-bold' : ''}`}>
                    {day}
                  </span>
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <span>미완료</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary bg-opacity-50 rounded"></div>
          <span>일부 완료</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span>모두 완료</span>
        </div>
      </div>
    </div>
  )
}

export default CalendarView