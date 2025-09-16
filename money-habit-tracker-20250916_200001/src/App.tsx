import { useState } from 'react'
import { TrendingUp, Calendar, PlusCircle, Target } from 'lucide-react'
import ExpenseInput from './components/ExpenseInput'
import HabitHeatmap from './components/HabitHeatmap'
import WeeklyStats from './components/WeeklyStats'
import ExpenseList from './components/ExpenseList'
import { useStore } from './store/useStore'

function App() {
  const [activeTab, setActiveTab] = useState<'input' | 'heatmap' | 'stats' | 'list'>('input')
  const savingsGoal = useStore(state => state.savingsGoal)
  const updateSavingsGoal = useStore(state => state.updateSavingsGoal)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [tempGoal, setTempGoal] = useState(savingsGoal.toString())

  const handleGoalUpdate = () => {
    const newGoal = parseInt(tempGoal)
    if (!isNaN(newGoal) && newGoal > 0) {
      updateSavingsGoal(newGoal)
      setShowGoalModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 pb-20">
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              돈 습관 추적기
            </h1>
            <button
              onClick={() => setShowGoalModal(true)}
              className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Target size={18} />
              <span className="text-sm font-medium">
                ₩{savingsGoal.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl min-h-[500px]">
          {activeTab === 'input' && <ExpenseInput />}
          {activeTab === 'heatmap' && <HabitHeatmap />}
          {activeTab === 'stats' && <WeeklyStats />}
          {activeTab === 'list' && <ExpenseList />}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-lg mx-auto px-4">
          <div className="grid grid-cols-4 gap-1 py-2">
            <button
              onClick={() => setActiveTab('input')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                activeTab === 'input' 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <PlusCircle size={20} />
              <span className="text-xs mt-1">입력</span>
            </button>
            
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                activeTab === 'heatmap' 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar size={20} />
              <span className="text-xs mt-1">히트맵</span>
            </button>
            
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                activeTab === 'stats' 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp size={20} />
              <span className="text-xs mt-1">통계</span>
            </button>
            
            <button
              onClick={() => setActiveTab('list')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                activeTab === 'list' 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4h12v2H4V4zm0 5h12v2H4V9zm0 5h12v2H4v-2z" />
              </svg>
              <span className="text-xs mt-1">내역</span>
            </button>
          </div>
        </div>
      </nav>

      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">일일 절약 목표 설정</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                목표 금액 (원)
              </label>
              <input
                type="number"
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="50000"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGoalUpdate}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                저장
              </button>
              <button
                onClick={() => setShowGoalModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App