import { Check, Trash2, Calendar, Target } from 'lucide-react'
import { Habit } from '../types/habit'
import { useHabitStore } from '../store/habitStore'
import { useState } from 'react'

interface HabitCardProps {
  habit: Habit
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const { toggleHabit, deleteHabit } = useHabitStore()
  const [showDelete, setShowDelete] = useState(false)
  
  const today = new Date().toISOString().split('T')[0]
  const isCompletedToday = habit.completions.some((c) => c.date === today)
  
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  const handleToggle = () => {
    toggleHabit(habit.id)
  }

  const handleDelete = () => {
    if (showDelete) {
      deleteHabit(habit.id)
    } else {
      setShowDelete(true)
      setTimeout(() => setShowDelete(false), 3000)
    }
  }

  return (
    <div className="habit-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">{habit.icon}</span>
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-sm text-gray-500 mt-1">{habit.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {habit.frequency}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {habit.targetCount}x
            </span>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className={`p-2 rounded-lg transition-all ${
            showDelete 
              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {last7Days.map((date) => {
            const isCompleted = habit.completions.some((c) => c.date === date)
            const isToday = date === today
            
            return (
              <div
                key={date}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isToday
                    ? 'bg-gray-100 border-2 border-primary-500'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{new Date(date).getDate()}</span>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-95 ${
            isCompletedToday
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          {isCompletedToday ? (
            <>
              <Check className="w-5 h-5 inline mr-1" />
              Done
            </>
          ) : (
            'Mark Complete'
          )}
        </button>
      </div>
    </div>
  )
}

export default HabitCard