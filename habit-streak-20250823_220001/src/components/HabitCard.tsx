import { Check, Flame, Trash2 } from 'lucide-react'
import { Habit } from '../store/habitStore'
import useHabitStore from '../store/habitStore'
import { useState } from 'react'

interface HabitCardProps {
  habit: Habit
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toggleHabitCompletion, getHabitCompletionForDate, deleteHabit } = useHabitStore()
  
  const today = new Date().toISOString().split('T')[0]
  const isCompletedToday = getHabitCompletionForDate(habit.id, today)

  const handleToggle = () => {
    toggleHabitCompletion(habit.id, today)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      deleteHabit(habit.id)
    }, 300)
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 transition-all duration-300 ${
        isDeleting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      } ${isCompletedToday ? 'ring-2 ring-success ring-opacity-30' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={handleToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all tap-highlight-none ${
              isCompletedToday
                ? 'bg-success text-white scale-110'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: isCompletedToday ? undefined : habit.color + '20',
              color: isCompletedToday ? undefined : habit.color,
            }}
          >
            {isCompletedToday ? (
              <Check className="w-6 h-6" />
            ) : (
              <span className="text-xl">{habit.icon}</span>
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-800 ${
              isCompletedToday ? 'line-through opacity-60' : ''
            }`}>
              {habit.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="capitalize">{habit.frequency}</span>
              {habit.streak > 0 && (
                <div className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="font-medium text-orange-600">
                    {habit.streak}일
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-danger transition-colors tap-highlight-none"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default HabitCard