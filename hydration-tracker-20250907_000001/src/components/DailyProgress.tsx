import React from 'react'
import { TrendingUp, Target, Flame, Award } from 'lucide-react'
import useHydrationStore from '../store/useHydrationStore'
import WaterGlass from './WaterGlass'

const DailyProgress: React.FC = () => {
  const { currentIntake, dailyGoal, streakDays } = useHydrationStore()
  const percentage = Math.min(100, Math.round((currentIntake / dailyGoal) * 100))
  
  const milestones = [
    { percent: 25, label: '시작', emoji: '💧' },
    { percent: 50, label: '절반', emoji: '💦' },
    { percent: 75, label: '거의', emoji: '🌊' },
    { percent: 100, label: '완료!', emoji: '🎉' }
  ]
  
  const currentMilestone = milestones.filter(m => percentage >= m.percent).pop()
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">오늘의 수분 섭취</h2>
          <p className="text-gray-600 mt-1">목표: {dailyGoal}ml</p>
        </div>
        {streakDays > 0 && (
          <div className="flex items-center bg-orange-100 rounded-full px-3 py-1">
            <Flame className="w-5 h-5 text-orange-500 mr-1" />
            <span className="text-orange-700 font-bold">{streakDays}일</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-center my-6">
        <WaterGlass percentage={percentage} size="large" />
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">진행 상황</span>
          <span className="text-2xl font-bold text-blue-600">
            {currentIntake}ml / {dailyGoal}ml
          </span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-between mt-2">
            {milestones.map((milestone) => (
              <div
                key={milestone.percent}
                className={`text-center transition-all duration-300 ${
                  percentage >= milestone.percent ? 'scale-110' : 'opacity-50'
                }`}
              >
                <span className="text-2xl">{milestone.emoji}</span>
                <p className="text-xs text-gray-600 mt-1">{milestone.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {currentMilestone && percentage < 100 && (
          <div className="bg-white/50 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700">다음 목표까지</span>
            </div>
            <span className="font-bold text-blue-600">
              {Math.max(0, dailyGoal * ((milestones.find(m => m.percent > percentage)?.percent || 100) / 100) - currentIntake)}ml
            </span>
          </div>
        )}
        
        {percentage >= 100 && (
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-4 flex items-center justify-center animate-pulse-slow">
            <Award className="w-6 h-6 mr-2" />
            <span className="font-bold text-lg">목표 달성! 훌륭해요! 🎊</span>
          </div>
        )}
        
        {percentage > 0 && percentage < 100 && (
          <div className="flex items-center justify-center mt-4">
            <TrendingUp className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">
              {percentage < 30 && '좋은 시작이에요! 계속해봐요'}
              {percentage >= 30 && percentage < 60 && '잘하고 있어요! 조금만 더'}
              {percentage >= 60 && percentage < 90 && '거의 다 왔어요! 화이팅'}
              {percentage >= 90 && percentage < 100 && '마지막 스퍼트! 곧 완료'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyProgress