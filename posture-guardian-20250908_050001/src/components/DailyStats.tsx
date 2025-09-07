import React from 'react'
import { BarChart3, Target, Clock, Coffee } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

export const DailyStats: React.FC = () => {
  const { dailyGoal, getTodayStats } = usePostureStore()
  const stats = getTodayStats()
  
  const goalProgress = Math.min((stats.totalTime / dailyGoal) * 100, 100)
  const postureScore = stats.totalTime > 0 
    ? Math.round((stats.goodTime / (stats.goodTime + stats.badTime)) * 100)
    : 0

  return (
    <div className="glass-card p-6 mb-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-primary-600" />
        오늘의 통계
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
          <Clock className="w-8 h-8 text-blue-600 mb-2" />
          <div className="text-sm text-gray-600 mb-1">총 시간</div>
          <div className="text-2xl font-bold text-blue-900">
            {Math.floor(stats.totalTime / 60)}시간 {Math.floor(stats.totalTime % 60)}분
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
          <Target className="w-8 h-8 text-green-600 mb-2" />
          <div className="text-sm text-gray-600 mb-1">목표 달성률</div>
          <div className="text-2xl font-bold text-green-900">
            {goalProgress.toFixed(0)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
          <BarChart3 className="w-8 h-8 text-purple-600 mb-2" />
          <div className="text-sm text-gray-600 mb-1">자세 점수</div>
          <div className="text-2xl font-bold text-purple-900">
            {postureScore}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
          <Coffee className="w-8 h-8 text-orange-600 mb-2" />
          <div className="text-sm text-gray-600 mb-1">휴식 횟수</div>
          <div className="text-2xl font-bold text-orange-900">
            {stats.breaks}회
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">일일 목표 진행률</span>
          <span className="text-sm font-medium">{Math.floor(stats.totalTime)}분 / {dailyGoal}분</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-full transition-all duration-500"
            style={{ width: `${goalProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="text-sm text-gray-600">좋은 자세</span>
          <span className="text-lg font-bold text-green-600">
            {Math.floor(stats.goodTime)}분
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
          <span className="text-sm text-gray-600">나쁜 자세</span>
          <span className="text-lg font-bold text-red-600">
            {Math.floor(stats.badTime)}분
          </span>
        </div>
      </div>
    </div>
  )
}