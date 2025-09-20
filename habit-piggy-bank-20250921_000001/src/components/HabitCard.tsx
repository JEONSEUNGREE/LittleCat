import React, { useState } from 'react'
import { Trash2, TrendingUp, Coins, Flame, Check } from 'lucide-react'
import { Habit } from '../store/habitStore'

interface HabitCardProps {
  habit: Habit
  onResist: () => void
  onDelete: () => void
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onResist, onDelete }) => {
  const [showAnimation, setShowAnimation] = useState(false)
  
  const today = new Date().toDateString()
  const lastResisted = habit.lastResisted ? new Date(habit.lastResisted).toDateString() : null
  const resistedToday = lastResisted === today

  const handleResist = () => {
    if (!resistedToday) {
      setShowAnimation(true)
      onResist()
      setTimeout(() => setShowAnimation(false), 1000)
    }
  }

  return (
    <div className="habit-card relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl ${habit.color} flex items-center justify-center text-2xl`}>
            {habit.icon}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{habit.name}</h3>
            <p className="text-white/70 text-sm">매번 ₩{habit.dailySaving.toLocaleString()} 저축</p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="text-white/50 hover:text-red-400 transition-colors p-1"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white/10 rounded-lg p-2">
          <div className="flex items-center justify-center text-orange-300 mb-1">
            <Flame size={16} />
          </div>
          <p className="text-white text-center text-xs">연속</p>
          <p className="text-white font-bold text-center">{habit.streak}일</p>
        </div>
        <div className="bg-white/10 rounded-lg p-2">
          <div className="flex items-center justify-center text-yellow-300 mb-1">
            <Coins size={16} />
          </div>
          <p className="text-white text-center text-xs">총 저축</p>
          <p className="text-white font-bold text-center text-sm">₩{habit.totalSaved.toLocaleString()}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-2">
          <div className="flex items-center justify-center text-green-300 mb-1">
            <TrendingUp size={16} />
          </div>
          <p className="text-white text-center text-xs">평균/일</p>
          <p className="text-white font-bold text-center text-sm">₩{habit.dailySaving.toLocaleString()}</p>
        </div>
      </div>

      <button
        onClick={handleResist}
        disabled={resistedToday}
        className={`w-full py-3 rounded-lg font-bold transition-all transform ${
          resistedToday 
            ? 'bg-green-500/30 text-green-300 cursor-not-allowed' 
            : 'bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 active:scale-95'
        } ${showAnimation ? 'animate-pulse' : ''}`}
      >
        {resistedToday ? (
          <span className="flex items-center justify-center space-x-2">
            <Check size={20} />
            <span>오늘 완료!</span>
          </span>
        ) : (
          '참았어요! 💪'
        )}
      </button>

      {showAnimation && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-coin-drop text-6xl text-center mt-4">
            💰
          </div>
        </div>
      )}
    </div>
  )
}

export default HabitCard