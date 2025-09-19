import React from 'react'
import { Trash2, Trophy, Flame, Target, Calendar } from 'lucide-react'
import useHabitStore, { Habit } from '../store/habitStore'

interface HabitCardProps {
  habit: Habit
  onViewDetails: (habit: Habit) => void
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onViewDetails }) => {
  const { deleteHabit, toggleHabitCompletion } = useHabitStore()
  
  const today = new Date().toISOString().split('T')[0]
  const isCompletedToday = habit.completedDates.includes(today)
  
  const completionPercentage = habit.targetDays > 0
    ? Math.min(100, (habit.completedDates.length / habit.targetDays) * 100)
    : 0
  
  const handleToggleToday = () => {
    toggleHabitCompletion(habit.id, today)
  }
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`'${habit.name}' 습관을 삭제하시겠습니까?`)) {
      deleteHabit(habit.id)
    }
  }
  
  return (
    <div 
      className="habit-card cursor-pointer"
      onClick={() => onViewDetails(habit)}
      style={{ borderTop: `4px solid ${habit.color}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
        >
          <Trash2 size={18} className="text-gray-400 group-hover:text-red-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame size={16} className="text-orange-500" />
            <span className="text-xl font-bold text-gray-800">{habit.streak}</span>
          </div>
          <p className="text-xs text-gray-600">연속 일수</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-xl font-bold text-gray-800">{habit.completedDates.length}</span>
          </div>
          <p className="text-xs text-gray-600">완료 일수</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target size={16} className="text-green-500" />
            <span className="text-xl font-bold text-gray-800">{habit.targetDays}</span>
          </div>
          <p className="text-xs text-gray-600">목표 일수</p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
          <span>진행률</span>
          <span>{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
              backgroundColor: habit.color
            }}
          />
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleToggleToday()
        }}
        className={`w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
          isCompletedToday
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Calendar size={18} />
        {isCompletedToday ? '오늘 완료됨' : '오늘 완료하기'}
      </button>
    </div>
  )
}

export default HabitCard