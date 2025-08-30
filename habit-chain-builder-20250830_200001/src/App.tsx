import { useState } from 'react';
import HabitList from './components/HabitList';
import AddHabitModal from './components/AddHabitModal';
import StatsOverview from './components/StatsOverview';
import ChainVisualization from './components/ChainVisualization';
import { Plus, TrendingUp, Calendar, Trophy } from 'lucide-react';
import useHabitStore from './store/habitStore';

type ViewMode = 'today' | 'chains' | 'stats';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const { habits, userStats } = useHabitStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-gray-200/50">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Habit Chain
              </h1>
              <p className="text-xs text-gray-600 mt-0.5">Level {userStats.level} • {userStats.experience}/{userStats.nextLevelXP} XP</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg shadow-orange-500/25">
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">{userStats.activeChains}</span>
              </div>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 mt-4 -mb-3">
            <button
              onClick={() => setViewMode('today')}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-all ${
                viewMode === 'today'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1.5" />
              Today
            </button>
            <button
              onClick={() => setViewMode('chains')}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-all ${
                viewMode === 'chains'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1.5" />
              Chains
            </button>
            <button
              onClick={() => setViewMode('stats')}
              className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-all ${
                viewMode === 'stats'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Trophy className="w-4 h-4 inline mr-1.5" />
              Stats
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {viewMode === 'today' && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="glass-card p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Today's Progress</span>
                <span className="text-sm font-bold text-primary-600">
                  {Math.round(useHabitStore.getState().getTodayProgress())}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${useHabitStore.getState().getTodayProgress()}%` }}
                />
              </div>
            </div>

            {/* Habit List */}
            <HabitList habits={habits} />
          </div>
        )}

        {viewMode === 'chains' && <ChainVisualization habits={habits} />}
        
        {viewMode === 'stats' && <StatsOverview stats={userStats} habits={habits} />}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="floating-button"
        aria-label="Add new habit"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

export default App;