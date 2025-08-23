import { Target, Zap, Trophy, TrendingUp } from 'lucide-react'
import { useHabitStore } from '../store/habitStore'

const StatsPanel = () => {
  const { stats } = useHabitStore()

  const statCards = [
    {
      icon: Target,
      label: 'Total Habits',
      value: stats.totalHabits,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Zap,
      label: 'Completed Today',
      value: stats.completedToday,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Trophy,
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-500 text-xs">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsPanel