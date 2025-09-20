import React from 'react'
import { TrendingUp, Wallet, Target, Calendar } from 'lucide-react'

interface DashboardProps {
  totalSavings: number
  todaysSavings: number
  weeklyStats: { day: string; amount: number }[]
  activeHabits: number
}

const Dashboard: React.FC<DashboardProps> = ({ 
  totalSavings, 
  todaysSavings, 
  weeklyStats,
  activeHabits 
}) => {
  const maxAmount = Math.max(...weeklyStats.map(s => s.amount), 1)
  
  return (
    <div className="glass-card p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <TrendingUp className="mr-2" />
        대시보드
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="text-green-300" size={20} />
            <span className="text-xs text-green-200">총 저축</span>
          </div>
          <p className="text-2xl font-bold text-white">
            ₩{totalSavings.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-blue-300" size={20} />
            <span className="text-xs text-blue-200">오늘</span>
          </div>
          <p className="text-2xl font-bold text-white">
            ₩{todaysSavings.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="text-purple-300" size={20} />
            <span className="text-xs text-purple-200">활성 습관</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {activeHabits}개
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-orange-300" size={20} />
            <span className="text-xs text-orange-200">주간 평균</span>
          </div>
          <p className="text-2xl font-bold text-white">
            ₩{Math.round(weeklyStats.reduce((sum, s) => sum + s.amount, 0) / 7).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-white font-medium mb-3">주간 저축 현황</h3>
        <div className="flex items-end justify-between h-32 space-x-2">
          {weeklyStats.map((stat, index) => {
            const height = maxAmount > 0 ? (stat.amount / maxAmount) * 100 : 0
            const isToday = index === weeklyStats.length - 1
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="relative w-full">
                  {stat.amount > 0 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 whitespace-nowrap">
                      ₩{(stat.amount / 1000).toFixed(0)}k
                    </div>
                  )}
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday 
                        ? 'bg-gradient-to-t from-accent to-yellow-300' 
                        : 'bg-gradient-to-t from-secondary to-primary'
                    }`}
                    style={{ height: `${height}%`, minHeight: stat.amount > 0 ? '4px' : '0' }}
                  />
                </div>
                <div className={`text-xs mt-2 ${isToday ? 'text-accent font-bold' : 'text-white/60'}`}>
                  {stat.day}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard