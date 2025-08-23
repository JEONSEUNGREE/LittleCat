import React from 'react'
import { Flame, Trash2, CheckCircle, Circle } from 'lucide-react'
import { Habit } from '../store/habitStore'

interface HabitCardProps {
  habit: Habit
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(habit.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(habit.id)
  }

  return (
    <div 
      className={`pixel-card cursor-pointer transform transition-all duration-200 hover:scale-105 ${
        habit.completed ? 'opacity-90' : ''
      }`}
      onClick={handleToggle}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-3xl animate-pulse-slow">{habit.icon}</div>
          <div>
            <h3 className="font-pixel font-bold text-lg">{habit.title}</h3>
            <p className="text-sm text-gray-600">{habit.description}</p>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="text-pixel-red hover:scale-110 transition-transform"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-pixel text-sm">{habit.streak}</span>
          </div>
          
          <div className={`px-2 py-1 ${habit.color} text-white font-pixel text-xs rounded`}>
            +{habit.xp} XP
          </div>
        </div>

        <div className="flex items-center">
          {habit.completed ? (
            <CheckCircle className="w-6 h-6 text-pixel-green animate-bounce" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      {habit.streak >= 7 && (
        <div className="mt-3 text-center">
          <span className="text-xl animate-pulse">🔥</span>
          <span className="font-pixel text-xs text-orange-500 ml-1">
            WEEK STREAK!
          </span>
        </div>
      )}
    </div>
  )
}

export default HabitCard