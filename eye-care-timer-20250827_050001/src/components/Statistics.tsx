import React from 'react'
import { TrendingUp, Calendar, Award, Target } from 'lucide-react'
import { useEyeCareStore } from '../store/useEyeCareStore'

export const Statistics: React.FC = () => {
  const { totalSessions, todaySessions } = useEyeCareStore()
  
  const stats = [
    {
      icon: Calendar,
      label: '오늘 세션',
      value: todaySessions,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      label: '전체 세션',
      value: totalSessions,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Target,
      label: '일일 목표',
      value: `${Math.round((todaySessions / 24) * 100)}%`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Award,
      label: '연속 기록',
      value: Math.min(todaySessions, 10),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">눈 건강 통계</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className={`${stat.bgColor} rounded-lg p-3 w-fit mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* 진행률 바 */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-medium">일일 목표 진행률</span>
          <span className="text-gray-600">{todaySessions} / 24 세션</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min((todaySessions / 24) * 100, 100)}%` }}
          />
        </div>
        <div className="mt-2 text-center text-sm text-gray-500">
          하루 24번(8시간 근무 기준) 20-20-20 규칙을 실천해보세요!
        </div>
      </div>
    </div>
  )
}