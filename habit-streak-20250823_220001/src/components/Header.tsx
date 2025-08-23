import { Flame, Trophy } from 'lucide-react'
import useHabitStore from '../store/habitStore'

const Header = () => {
  const habits = useHabitStore((state) => state.habits)
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0)

  return (
    <header className="bg-gradient-to-r from-primary to-purple-600 text-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Habit Streak</h1>
          <p className="text-purple-100 text-sm">오늘도 함께 성장해요!</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-xl font-bold">{totalStreak}</span>
            </div>
            <p className="text-xs text-purple-100">총 스트릭</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-xl font-bold">{habits.length}</span>
            </div>
            <p className="text-xs text-purple-100">습관 수</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header