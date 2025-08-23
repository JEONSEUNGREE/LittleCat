import { TrendingUp, Award, Target, Calendar } from 'lucide-react'
import useHabitStore from '../store/habitStore'

const StatsCard = () => {
  const habits = useHabitStore((state) => state.habits)
  const completions = useHabitStore((state) => state.completions)

  const totalHabits = habits.length
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0)
  const averageStreak = totalHabits > 0 ? Math.round(totalStreak / totalHabits) : 0
  
  const today = new Date().toISOString().split('T')[0]
  const todayCompletions = completions.filter((c) => c.date === today && c.completed).length
  const todayCompletionRate = totalHabits > 0 ? Math.round((todayCompletions / totalHabits) * 100) : 0

  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0)
  
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  })
  
  const weeklyCompletions = last7Days.reduce((sum, date) => {
    return sum + completions.filter((c) => c.date === date && c.completed).length
  }, 0)
  const maxWeeklyCompletions = totalHabits * 7
  const weeklyRate = maxWeeklyCompletions > 0 ? Math.round((weeklyCompletions / maxWeeklyCompletions) * 100) : 0

  const stats = [
    {
      icon: Target,
      label: '오늘 완료율',
      value: `${todayCompletionRate}%`,
      color: 'bg-green-500',
    },
    {
      icon: TrendingUp,
      label: '평균 스트릭',
      value: `${averageStreak}일`,
      color: 'bg-blue-500',
    },
    {
      icon: Award,
      label: '최장 스트릭',
      value: `${longestStreak}일`,
      color: 'bg-purple-500',
    },
    {
      icon: Calendar,
      label: '주간 완료율',
      value: `${weeklyRate}%`,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {habits.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">습관별 스트릭</h3>
          <div className="space-y-2">
            {habits
              .sort((a, b) => b.streak - a.streak)
              .slice(0, 5)
              .map((habit) => (
                <div key={habit.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{habit.icon}</span>
                    <span className="text-sm text-gray-700">{habit.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {habit.streak}일
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {habits.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            습관을 추가하면 통계를 확인할 수 있어요
          </p>
        </div>
      )}
    </div>
  )
}

export default StatsCard