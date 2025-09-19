import React, { useState } from 'react'
import { Plus, Target, Sparkles, BarChart3 } from 'lucide-react'
import useHabitStore, { Habit } from './store/habitStore'
import HabitCard from './components/HabitCard'
import HabitForm from './components/HabitForm'
import HabitDetails from './components/HabitDetails'

function App() {
  const habits = useHabitStore((state) => state.habits)
  const [showForm, setShowForm] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
  
  const totalCompletedToday = habits.filter(h => 
    h.completedDates.includes(new Date().toISOString().split('T')[0])
  ).length
  
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0)
  const totalCompleted = habits.reduce((sum, h) => sum + h.completedDates.length, 0)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Habit Chain Tracker
              </h1>
              <p className="text-gray-600">매일의 작은 습관이 큰 변화를 만듭니다</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              <span className="hidden md:inline">새 습관</span>
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Target size={18} className="text-blue-500" />
                <span className="text-sm text-gray-600">오늘 완료</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {totalCompletedToday}/{habits.length}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} className="text-yellow-500" />
                <span className="text-sm text-gray-600">총 연속</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalStreak}일</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={18} className="text-green-500" />
                <span className="text-sm text-gray-600">총 완료</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalCompleted}일</p>
            </div>
          </div>
        </header>
        
        {habits.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={40} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                첫 습관을 시작해보세요!
              </h2>
              <p className="text-gray-600 mb-6">
                작은 습관부터 시작하여 꾸준히 체인을 이어나가세요.
                매일의 성공이 모여 큰 변화를 만들어냅니다.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
              >
                <Plus size={20} />
                첫 습관 만들기
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onViewDetails={setSelectedHabit}
              />
            ))}
          </div>
        )}
      </div>
      
      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
      {selectedHabit && (
        <HabitDetails
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
        />
      )}
    </div>
  )
}

export default App