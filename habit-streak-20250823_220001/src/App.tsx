import { useState } from 'react'
import Header from './components/Header'
import HabitList from './components/HabitList'
import AddHabitModal from './components/AddHabitModal'
import CalendarView from './components/CalendarView'
import StatsCard from './components/StatsCard'
import { Plus, Calendar, BarChart3 } from 'lucide-react'

type ViewMode = 'list' | 'calendar' | 'stats'

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        <Header />
        
        <div className="p-4 safe-top">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              목록
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              캘린더
            </button>
            <button
              onClick={() => setViewMode('stats')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                viewMode === 'stats'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              통계
            </button>
          </div>

          {viewMode === 'list' && <HabitList />}
          {viewMode === 'calendar' && <CalendarView />}
          {viewMode === 'stats' && <StatsCard />}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 flex items-center justify-center tap-highlight-none safe-bottom"
        >
          <Plus className="w-6 h-6" />
        </button>

        <AddHabitModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  )
}

export default App