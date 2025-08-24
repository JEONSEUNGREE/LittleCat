import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BarChart3, Calendar, List } from 'lucide-react';
import { useHabitStore } from './store/habitStore';
import HabitList from './components/HabitList';
import AddHabitModal from './components/AddHabitModal';
import ProgressChart from './components/ProgressChart';

function App() {
  const { 
    viewMode, 
    setViewMode, 
    isModalOpen, 
    openModal, 
    closeModal,
    getOverallStats,
    getHabitsWithStats 
  } = useHabitStore();

  const stats = getOverallStats();
  const habits = getHabitsWithStats();

  // Set document title based on progress
  useEffect(() => {
    document.title = `Habit Chain ${stats.completedToday > 0 ? `(${stats.completedToday}/${stats.totalHabits})` : ''}`;
  }, [stats.completedToday, stats.totalHabits]);

  const renderContent = () => {
    switch (viewMode.type) {
      case 'calendar':
        return (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4"
          >
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Calendar View
              </h3>
              <p className="text-gray-500">
                Coming soon! Track your habits across time.
              </p>
            </div>
          </motion.div>
        );
      
      case 'stats':
        return (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ProgressChart />
          </motion.div>
        );
      
      default:
        return (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <HabitList />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 safe-area-top">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Habit Chain</h1>
              {stats.totalHabits > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {stats.completedToday} of {stats.totalHabits} completed today
                </p>
              )}
            </div>
            
            {/* Progress Ring */}
            {stats.totalHabits > 0 && (
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - stats.completedToday / stats.totalHabits)}`}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-600">
                    {Math.round((stats.completedToday / stats.totalHabits) * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center space-x-1">
            {[
              { type: 'list', label: 'List', icon: List },
              { type: 'stats', label: 'Stats', icon: BarChart3 },
              { type: 'calendar', label: 'Calendar', icon: Calendar },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = viewMode.type === item.type;
              
              return (
                <button
                  key={item.type}
                  onClick={() => setViewMode({ type: item.type as any })}
                  className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-[calc(100vh-140px)]">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>

        {/* Empty State */}
        {habits.length === 0 && viewMode.type === 'list' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-6"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <Plus className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Building Your Chain
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Create your first habit and begin your journey to consistency. 
              Every chain starts with a single link.
            </p>
            <button
              onClick={() => openModal()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Add Your First Habit
            </button>
          </motion.div>
        )}
      </main>

      {/* Floating Action Button */}
      {habits.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => openModal()}
            className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </button>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddHabitModal onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;