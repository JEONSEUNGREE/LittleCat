import React from 'react'
import { Trophy, Zap, Target } from 'lucide-react'
import useHabitStore from '../store/habitStore'

const Header: React.FC = () => {
  const { level, totalXP, habits } = useHabitStore()
  const completedToday = habits.filter(h => h.completed).length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <header className="bg-pixel-dark text-white px-4 py-6 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-bounce-slow">🎮</div>
            <h1 className="text-2xl md:text-3xl font-pixel font-bold tracking-wider">
              HABIT PIXEL
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-4">
            <div className="pixel-card bg-pixel-yellow text-pixel-dark flex items-center space-x-2 px-3 py-2">
              <Trophy className="w-5 h-5" />
              <span className="font-pixel text-sm">LVL {level}</span>
            </div>
            
            <div className="pixel-card bg-pixel-green text-white flex items-center space-x-2 px-3 py-2">
              <Zap className="w-5 h-5" />
              <span className="font-pixel text-sm">{totalXP} XP</span>
            </div>
            
            <div className="pixel-card bg-pixel-blue text-white flex items-center space-x-2 px-3 py-2">
              <Target className="w-5 h-5" />
              <span className="font-pixel text-sm">{completionRate}%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="pixel-progress">
            <div 
              className="pixel-progress-fill bg-gradient-to-r from-pixel-green to-pixel-blue"
              style={{ width: `${(totalXP % 100)}%` }}
            />
          </div>
          <p className="text-xs font-pixel text-gray-400 mt-1">
            {totalXP % 100} / 100 XP to next level
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header