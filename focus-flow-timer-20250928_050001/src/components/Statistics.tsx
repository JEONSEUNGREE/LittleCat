import React from 'react'
import { TrendingUp, Zap, Target, Award } from 'lucide-react'
import { useTimerStore } from '../store/timerStore'

export const Statistics: React.FC = () => {
  const { totalSessions, currentStreak, flowIntensity, adaptiveDuration } = useTimerStore()

  const stats = [
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Total Sessions',
      value: totalSessions,
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Current Streak',
      value: currentStreak,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Flow Intensity',
      value: `${Math.round(flowIntensity * 100)}%`,
      color: 'from-green-400 to-emerald-600'
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Adaptive Duration',
      value: `${adaptiveDuration}m`,
      color: 'from-purple-400 to-pink-600'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm opacity-80">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}