import React from 'react'
import { TrendingUp, Award, Calendar, Activity } from 'lucide-react'
import { useWaterStore } from '../store/useWaterStore'

export const Statistics: React.FC = () => {
  const { profile, dailyGoal, currentIntake, getHydrationPercentage } = useWaterStore()
  const hydrationPercentage = getHydrationPercentage()
  
  const getActivityLabel = (level: string) => {
    switch(level) {
      case 'high': return '높음'
      case 'moderate': return '보통'
      case 'low': return '낮음'
      default: return level
    }
  }

  const getHydrationStatus = () => {
    if (hydrationPercentage >= 100) return { status: '완벽해요!', color: 'text-green-600', bg: 'bg-green-100' }
    if (hydrationPercentage >= 75) return { status: '잘하고 있어요!', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (hydrationPercentage >= 50) return { status: '조금 더 마셔요', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (hydrationPercentage >= 25) return { status: '수분 보충이 필요해요', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { status: '지금 물을 마셔요!', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const status = getHydrationStatus()
  const remaining = Math.max(0, dailyGoal - currentIntake)
  const glassesRemaining = Math.ceil(remaining / 250)

  return (
    <div className="min-h-screen p-4 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">통계 및 분석</h2>
      
      <div className="max-w-md mx-auto space-y-4">
        {/* Hydration Status Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-drop">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">현재 수분 상태</h3>
            <TrendingUp className="w-5 h-5 text-water-blue" />
          </div>
          
          <div className={`${status.bg} rounded-xl p-4 mb-4`}>
            <div className={`text-2xl font-bold ${status.color} text-center mb-2`}>
              {status.status}
            </div>
            <div className="text-center text-gray-600">
              현재 {hydrationPercentage}% 달성
            </div>
          </div>

          {remaining > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">
                목표 달성까지 <span className="font-bold text-water-blue">{remaining}ml</span> 남았어요
              </div>
              <div className="text-sm text-gray-500 mt-1">
                약 {glassesRemaining}잔의 물이 필요해요
              </div>
            </div>
          )}
        </div>

        {/* Profile Info Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-drop">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">내 프로필</h3>
            <Award className="w-5 h-5 text-water-blue" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">체중</span>
              <span className="font-semibold text-gray-800">{profile?.weight}kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">활동량</span>
              <span className="font-semibold text-gray-800">
                <Activity className="inline w-4 h-4 mr-1 text-water-blue" />
                {getActivityLabel(profile?.activityLevel || '')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">일일 권장량</span>
              <span className="font-semibold text-water-blue">{dailyGoal}ml</span>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-drop">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">수분 섭취 팁</h3>
            <Calendar className="w-5 h-5 text-water-blue" />
          </div>
          
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-water-blue">•</span>
              <span>아침에 일어나자마자 물 한 잔으로 시작하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-water-blue">•</span>
              <span>식사 30분 전에 물을 마시면 소화에 도움이 됩니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-water-blue">•</span>
              <span>운동 전후로 충분한 수분을 섭취하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-water-blue">•</span>
              <span>카페인 음료는 이뇨작용이 있으니 물도 함께 마셔요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-water-blue">•</span>
              <span>갈증을 느끼기 전에 규칙적으로 수분을 섭취하세요</span>
            </li>
          </ul>
        </div>

        {/* Achievement Badge */}
        {hydrationPercentage >= 100 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white text-center animate-bounce">
            <Award className="w-16 h-16 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">목표 달성! 🎉</h3>
            <p className="text-white/90">오늘의 수분 섭취 목표를 달성했어요!</p>
          </div>
        )}
      </div>
    </div>
  )
}