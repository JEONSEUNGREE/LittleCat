import usePostureStore from '../store/postureStore'
import { TrendingUp, Clock, Award, Calendar } from 'lucide-react'

export default function Statistics() {
  const { sessions } = usePostureStore()

  const getTotalTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0)
  }

  const getAverageSessionTime = () => {
    if (sessions.length === 0) return 0
    return Math.floor(getTotalTime() / sessions.length)
  }

  const getTotalStretches = () => {
    return sessions.reduce((total, session) => total + session.stretchesCompleted, 0)
  }

  const getWeeklyStats = () => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const weekSessions = sessions.filter(session => {
      const sessionDate = new Date(session.startTime)
      return sessionDate >= weekAgo
    })

    return {
      sessions: weekSessions.length,
      time: weekSessions.reduce((total, session) => total + session.duration, 0),
      stretches: weekSessions.reduce((total, session) => total + session.stretchesCompleted, 0)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`
    }
    return `${minutes}분`
  }

  const weeklyStats = getWeeklyStats()

  const achievements = [
    { id: 1, name: '첫 걸음', description: '첫 세션 완료', unlocked: sessions.length > 0, icon: '🎯' },
    { id: 2, name: '꾸준함', description: '5개 세션 완료', unlocked: sessions.length >= 5, icon: '🏃' },
    { id: 3, name: '스트레칭 마스터', description: '50개 스트레칭 완료', unlocked: getTotalStretches() >= 50, icon: '🧘' },
    { id: 4, name: '건강 전사', description: '총 5시간 달성', unlocked: getTotalTime() >= 18000, icon: '⚔️' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          활동 통계
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          당신의 건강한 자세 습관을 확인하세요
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <Clock className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-xs opacity-80">총 시간</p>
          <p className="text-xl font-bold">{formatTime(getTotalTime())}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <TrendingUp className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-xs opacity-80">평균 세션</p>
          <p className="text-xl font-bold">{formatTime(getAverageSessionTime())}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
          <Award className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-xs opacity-80">총 스트레칭</p>
          <p className="text-xl font-bold">{getTotalStretches()}회</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <Calendar className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-xs opacity-80">총 세션</p>
          <p className="text-xl font-bold">{sessions.length}개</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
          주간 활동
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">세션</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {weeklyStats.sessions}개
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">활동 시간</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {formatTime(weeklyStats.time)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">스트레칭</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {weeklyStats.stretches}회
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">업적</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-3 text-center transition-opacity ${
                achievement.unlocked ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <p className="text-xs font-medium text-gray-800 dark:text-white">
                {achievement.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}