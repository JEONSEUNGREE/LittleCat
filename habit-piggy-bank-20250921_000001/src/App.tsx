import { useState, useEffect } from 'react'
import { Plus, Info, Trophy } from 'lucide-react'
import useHabitStore from './store/habitStore'
import PiggyBank from './components/PiggyBank'
import Dashboard from './components/Dashboard'
import HabitCard from './components/HabitCard'
import AddHabitModal from './components/AddHabitModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [todaysSavings, setTodaysSavings] = useState(0)
  const { 
    habits, 
    totalSavings, 
    addHabit, 
    removeHabit, 
    recordSaving,
    getTodaysSavings,
    getWeeklyStats
  } = useHabitStore()

  useEffect(() => {
    const savings = getTodaysSavings()
    setTodaysSavings(savings)
  }, [habits, getTodaysSavings])

  const handleAddHabit = (habitData: Parameters<typeof addHabit>[0]) => {
    addHabit(habitData)
  }

  const handleResist = (habitId: string) => {
    recordSaving(habitId)
    setTodaysSavings(getTodaysSavings())
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <PiggyBank 
          totalSavings={totalSavings} 
          todaysSavings={todaysSavings}
        />

        <Dashboard
          totalSavings={totalSavings}
          todaysSavings={todaysSavings}
          weeklyStats={getWeeklyStats()}
          activeHabits={habits.length}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Trophy className="mr-2 text-accent" />
            나의 습관들
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Plus size={20} />
            <span>습관 추가</span>
          </button>
        </div>

        {habits.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">첫 습관을 추가해보세요!</h3>
            <p className="text-white/70 mb-6">
              참고 싶은 나쁜 습관을 추가하고<br />
              매일 돈을 모아보세요
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
            >
              지금 시작하기
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onResist={() => handleResist(habit.id)}
                onDelete={() => removeHabit(habit.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-12 glass-card p-6">
          <div className="flex items-start space-x-3">
            <Info className="text-accent mt-1" size={20} />
            <div>
              <h3 className="font-bold text-white mb-2">💡 습관 저금통 사용법</h3>
              <ul className="text-white/70 space-y-1 text-sm">
                <li>• 매일 나쁜 습관을 참을 때마다 "참았어요!" 버튼을 누르세요</li>
                <li>• 연속으로 참으면 스트릭이 쌓여 동기부여가 됩니다</li>
                <li>• 실제로 저축한 돈을 별도 계좌에 모아보세요</li>
                <li>• 주간 통계로 얼마나 절약했는지 확인할 수 있습니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </div>
  )
}

export default App