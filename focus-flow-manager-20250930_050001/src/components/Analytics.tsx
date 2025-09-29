import React from 'react'
import { TrendingUp, Award, Flame, Clock, BarChart3, Lightbulb } from 'lucide-react'
import { useFocusStore } from '../store/useFocusStore'

export const Analytics: React.FC = () => {
  const { focusPattern, dailyProgress, dailyGoal, sessions, getSuggestions } = useFocusStore()
  const suggestions = getSuggestions()
  
  const progressPercentage = Math.min((dailyProgress / dailyGoal) * 100, 100)
  const todaySessions = sessions.filter(s => {
    if (!s.startTime) return false
    const today = new Date().toDateString()
    return new Date(s.startTime).toDateString() === today
  })

  const stats = [
    {
      icon: Clock,
      label: '오늘 집중 시간',
      value: `${dailyProgress}분`,
      subtext: `목표: ${dailyGoal}분`,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: BarChart3,
      label: '평균 생산성',
      value: `${focusPattern.averageProductivity}%`,
      subtext: '최근 세션 기준',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Flame,
      label: '연속 달성',
      value: `${focusPattern.streakDays}일`,
      subtext: '매일 목표 달성',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Award,
      label: '총 세션',
      value: focusPattern.totalSessions.toString(),
      subtext: `${Math.floor(focusPattern.totalFocusTime / 60)}시간 누적`,
      color: 'from-green-400 to-emerald-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Daily Progress */}
      <div className="glass-effect rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">오늘의 진행상황</h3>
          <TrendingUp className="w-5 h-5 text-white/60" />
        </div>
        
        <div className="relative h-6 bg-white/10 rounded-full overflow-hidden mb-3">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-white/70">
            {todaySessions.length}개 세션 완료
          </span>
          <span className="text-white font-semibold">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass-effect rounded-2xl p-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">
                {stat.label}
              </div>
              <div className="text-white/50 text-xs mt-1">
                {stat.subtext}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="glass-effect rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">AI 추천</h3>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="glass-effect rounded-xl p-3 text-white/90 text-sm flex items-start gap-2"
              >
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Focus Hours */}
      {focusPattern.bestHours.length > 0 && (
        <div className="glass-effect rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">최적 집중 시간대</h3>
          <div className="flex flex-wrap gap-2">
            {focusPattern.bestHours.map((hour) => (
              <div 
                key={hour}
                className="glass-effect px-4 py-2 rounded-full text-white font-semibold"
              >
                {hour}:00 - {hour + 1}:00
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}