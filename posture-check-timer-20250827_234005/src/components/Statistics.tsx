import { TrendingUp, CheckCircle, Zap, Calendar } from 'lucide-react'
import { usePostureStore } from '../store'

export function Statistics() {
  const { todayChecks, totalChecks, currentStreak, bestStreak } = usePostureStore()

  const stats = [
    {
      icon: <CheckCircle size={24} />,
      label: '오늘 체크',
      value: todayChecks,
      color: 'bg-green-500/20'
    },
    {
      icon: <TrendingUp size={24} />,
      label: '총 체크',
      value: totalChecks,
      color: 'bg-blue-500/20'
    },
    {
      icon: <Zap size={24} />,
      label: '현재 스트릭',
      value: currentStreak,
      suffix: '일',
      color: 'bg-yellow-500/20'
    },
    {
      icon: <Calendar size={24} />,
      label: '최고 기록',
      value: bestStreak,
      suffix: '일',
      color: 'bg-purple-500/20'
    }
  ]

  return (
    <div className="glass rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-4">통계</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} backdrop-blur-sm rounded-xl p-4 border border-white/20`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-white/80">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold text-white">
              {stat.value}{stat.suffix || ''}
            </div>
            <div className="text-white/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white/10 rounded-xl">
        <p className="text-white/90 text-sm font-medium mb-2">건강 팁</p>
        <p className="text-white/70 text-xs">
          올바른 자세는 척추 건강과 집중력 향상에 도움이 됩니다. 
          규칙적인 스트레칭과 함께 자세를 체크하세요!
        </p>
      </div>
    </div>
  )
}