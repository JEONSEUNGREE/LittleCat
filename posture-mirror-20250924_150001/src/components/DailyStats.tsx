import React from 'react'
import { TrendingUp, Target, Clock, Award } from 'lucide-react'
import usePostureStore from '../store/usePostureStore'

const DailyStats: React.FC = () => {
  const { currentScore, dailyGoal, todaysSessions, weeklyProgress } = usePostureStore()
  
  const averageScore = todaysSessions.length > 0
    ? Math.round(todaysSessions.reduce((acc, session) => acc + session.score, 0) / todaysSessions.length)
    : 0
  
  const sessionMinutes = todaysSessions.length * 5
  const goalProgress = Math.min((averageScore / dailyGoal) * 100, 100)
  
  const weeklyAverage = Math.round(
    weeklyProgress.reduce((acc, score) => acc + score, 0) / weeklyProgress.length
  )

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">오늘의 통계</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <p className="text-xs text-gray-600 dark:text-gray-400">일일 목표</p>
            </div>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {goalProgress.toFixed(0)}%
            </p>
            <div className="w-full bg-white/50 dark:bg-gray-700/50 rounded-full h-2 mt-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-success/10 to-success/20 dark:from-success/20 dark:to-success/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-success" />
              <p className="text-xs text-gray-600 dark:text-gray-400">평균 점수</p>
            </div>
            <p className="text-2xl font-bold text-success">
              {averageScore || '--'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              주간 평균: {weeklyAverage}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-warning/10 to-warning/20 dark:from-warning/20 dark:to-warning/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-warning" />
              <p className="text-xs text-gray-600 dark:text-gray-400">운동 시간</p>
            </div>
            <p className="text-2xl font-bold text-warning">
              {sessionMinutes}분
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {todaysSessions.length}개 세션
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <p className="text-xs text-gray-600 dark:text-gray-400">연속 일수</p>
            </div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              7일
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              최고 기록: 14일
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">주간 진행 상황</h3>
        <div className="flex items-end gap-2 h-24">
          {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => {
            const score = weeklyProgress[index] || 0
            const height = (score / 100) * 100
            const isToday = index === 6
            
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div className="relative flex-1 w-full flex items-end">
                  <div 
                    className={`w-full rounded-t transition-all duration-300 ${
                      isToday 
                        ? 'bg-primary-500 dark:bg-primary-400' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  {isToday && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-primary-600 dark:text-primary-400">
                      {score}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{day}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DailyStats