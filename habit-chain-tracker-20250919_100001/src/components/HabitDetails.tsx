import React from 'react'
import { X, Award, TrendingUp, Calendar, Target } from 'lucide-react'
import { Habit } from '../store/habitStore'
import HabitChain from './HabitChain'
import useHabitStore from '../store/habitStore'

interface HabitDetailsProps {
  habit: Habit
  onClose: () => void
}

const HabitDetails: React.FC<HabitDetailsProps> = ({ habit, onClose }) => {
  const { toggleHabitCompletion } = useHabitStore()
  
  const handleToggleDate = (date: string) => {
    toggleHabitCompletion(habit.id, date)
  }
  
  const getBestStreak = () => {
    if (habit.completedDates.length === 0) return 0
    
    let maxStreak = 1
    let currentStreak = 1
    const sortedDates = [...habit.completedDates].sort()
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1])
      const currDate = new Date(sortedDates[i])
      const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 1
      }
    }
    
    return maxStreak
  }
  
  const getCompletionRate = () => {
    if (habit.completedDates.length === 0) return 0
    
    const startDate = new Date(habit.createdAt)
    const today = new Date()
    const totalDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    
    return Math.round((habit.completedDates.length / totalDays) * 100)
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800" style={{ color: habit.color }}>
                {habit.name}
              </h2>
              {habit.description && (
                <p className="text-gray-600 mt-1">{habit.description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-orange-600" />
                <span className="text-sm font-medium text-orange-800">현재 연속</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{habit.streak}일</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award size={20} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-800">최고 기록</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{getBestStreak()}일</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-800">총 완료</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{habit.completedDates.length}일</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target size={20} className="text-green-600" />
                <span className="text-sm font-medium text-green-800">달성률</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{getCompletionRate()}%</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl">
            <HabitChain habit={habit} onToggleDate={handleToggleDate} />
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">습관 형성 팁</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 매일 같은 시간에 실행하여 루틴 만들기</li>
              <li>• 작은 목표부터 시작하여 점진적으로 늘리기</li>
              <li>• 체인이 끊어져도 포기하지 말고 다시 시작하기</li>
              <li>• 습관 완료 후 자신에게 작은 보상 주기</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HabitDetails