import React from 'react'
import { TrendingUp, Clock, Award, AlertTriangle, BarChart3, Target } from 'lucide-react'
import { usePostureStore } from '../store'

const Statistics: React.FC = () => {
  const { sessions, dailyGoal, streakDays, getStatistics } = usePostureStore()
  const stats = getStatistics()
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`
    }
    return `${minutes}분`
  }
  
  const todaysSessions = sessions.filter((session) => {
    const today = new Date()
    const sessionDate = new Date(session.startTime)
    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()
    )
  })
  
  const todaysTotalMinutes = todaysSessions.reduce(
    (acc, session) => acc + (session.goodPostureTime + session.badPostureTime) / 60,
    0
  )
  
  const goalProgress = Math.min((todaysTotalMinutes / dailyGoal) * 100, 100)
  
  const getStreakEmoji = () => {
    if (streakDays >= 30) return '🔥'
    if (streakDays >= 7) return '⭐'
    if (streakDays >= 3) return '✨'
    return '🌱'
  }
  
  const statCards = [
    {
      icon: <Clock className="w-6 h-6" />,
      label: '총 사용 시간',
      value: formatTime(stats.totalTime),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: '좋은 자세 비율',
      value: `${stats.goodPosturePercentage.toFixed(1)}%`,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: '평균 세션 시간',
      value: formatTime(Math.round(stats.averageSessionTime)),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      label: '총 알림 횟수',
      value: `${stats.totalAlerts}회`,
      color: 'from-orange-500 to-orange-600',
    },
  ]
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">통계 & 진행상황</h2>
      
      {/* Daily Goal Progress */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-xl font-bold text-white">오늘의 목표</h3>
              <p className="text-white/80 text-sm">
                {todaysTotalMinutes.toFixed(0)} / {dailyGoal}분
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {goalProgress.toFixed(0)}%
            </div>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${goalProgress}%` }}
          />
        </div>
        {goalProgress >= 100 && (
          <p className="mt-3 text-center text-white font-semibold">
            🎉 목표 달성! 훌륭해요!
          </p>
        )}
      </div>
      
      {/* Streak Counter */}
      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-xl font-bold text-white">연속 기록</h3>
              <p className="text-white/80 text-sm">매일 목표를 달성하세요!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white flex items-center gap-2">
              <span>{getStreakEmoji()}</span>
              <span>{streakDays}일</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white`}
          >
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-sm opacity-90">{stat.label}</span>
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
      
      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">최근 세션</h3>
          <div className="space-y-2">
            {sessions.slice(-3).reverse().map((session) => {
              const sessionDate = new Date(session.startTime)
              const goodPercentage =
                (session.goodPostureTime /
                  (session.goodPostureTime + session.badPostureTime)) *
                100
              
              return (
                <div
                  key={session.id}
                  className="bg-white/5 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white/80 text-sm">
                      {sessionDate.toLocaleDateString('ko-KR', {
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-white/60 text-xs">
                      {formatTime(session.goodPostureTime + session.badPostureTime)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      goodPercentage >= 70 ? 'text-green-400' : 
                      goodPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {goodPercentage.toFixed(0)}% 좋은 자세
                    </div>
                    <p className="text-white/60 text-xs">
                      알림 {session.alerts}회
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      
      {sessions.length === 0 && (
        <div className="mt-6 p-4 bg-white/5 rounded-xl text-center">
          <p className="text-white/60">
            아직 기록된 세션이 없습니다.
            <br />
            모니터링을 시작해보세요!
          </p>
        </div>
      )}
    </div>
  )
}