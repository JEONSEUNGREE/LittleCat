import React from 'react'
import { Check, X, Link2 } from 'lucide-react'
import { Habit } from '../store/habitStore'

interface HabitChainProps {
  habit: Habit
  onToggleDate: (date: string) => void
}

const HabitChain: React.FC<HabitChainProps> = ({ habit, onToggleDate }) => {
  const getDaysArray = (days: number) => {
    const today = new Date()
    const daysArray = []
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      daysArray.push(date)
    }
    
    return daysArray
  }
  
  const last30Days = getDaysArray(30)
  
  const isDateCompleted = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return habit.completedDates.includes(dateString)
  }
  
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
  
  const handleToggle = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    onToggleDate(dateString)
  }
  
  const getChainStatus = (date: Date, index: number, array: Date[]) => {
    const current = isDateCompleted(date)
    const prev = index > 0 ? isDateCompleted(array[index - 1]) : false
    const next = index < array.length - 1 ? isDateCompleted(array[index + 1]) : false
    
    return {
      isCompleted: current,
      hasLeftConnection: current && prev,
      hasRightConnection: current && next
    }
  }
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Link2 size={20} style={{ color: habit.color }} />
        30일 체인
      </h3>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-fit">
          {last30Days.map((date, index) => {
            const status = getChainStatus(date, index, last30Days)
            const dateString = date.toISOString().split('T')[0]
            
            return (
              <div key={dateString} className="relative">
                {status.hasRightConnection && (
                  <div 
                    className="absolute top-1/2 left-full w-2 h-1 -translate-y-1/2 z-10"
                    style={{ backgroundColor: habit.color }}
                  />
                )}
                
                <button
                  onClick={() => handleToggle(date)}
                  className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all text-xs font-medium ${
                    status.isCompleted
                      ? 'text-white shadow-md transform scale-105'
                      : isToday(date)
                      ? 'bg-yellow-100 text-gray-700 border-2 border-yellow-400'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: status.isCompleted ? habit.color : undefined
                  }}
                >
                  {status.isCompleted ? (
                    <Check size={16} />
                  ) : (
                    <span>{date.getDate()}</span>
                  )}
                </button>
                
                <div className="text-center mt-1">
                  <p className="text-xs text-gray-500">
                    {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: habit.color }} />
          <span className="text-gray-600">완료</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-400" />
          <span className="text-gray-600">오늘</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100" />
          <span className="text-gray-600">미완료</span>
        </div>
      </div>
    </div>
  )
}

export default HabitChain