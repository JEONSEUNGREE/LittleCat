import { useState, useEffect } from 'react';
import { Plus, BarChart3, Settings, Home } from 'lucide-react';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import ProgressHeader from './components/ProgressHeader';
import useHabitStore from './store/habitStore';

function App() {
  const { habits, updateStreaks } = useHabitStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'settings'>('home');

  useEffect(() => {
    updateStreaks();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <ProgressHeader />
            
            <div className="p-4 pb-24">
              {habits.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No habits yet</h3>
                  <p className="text-gray-500 mb-6">Start building better habits today!</p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary"
                  >
                    Add Your First Habit
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Your Habits</h2>
                    <span className="text-sm text-gray-500">{habits.length} active</span>
                  </div>
                  
                  {habits.map((habit) => (
                    <HabitCard key={habit.id} habit={habit} />
                  ))}
                </div>
              )}
            </div>
          </>
        );
      
      case 'stats':
        return (
          <div className="p-4 pb-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="card">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {habits.reduce((sum, h) => sum + h.completedDates.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Completions</div>
              </div>
              
              <div className="card">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {habits.length > 0 ? Math.round(habits.reduce((sum, h) => sum + h.currentStreak, 0) / habits.length) : 0}
                </div>
                <div className="text-sm text-gray-600">Avg. Streak</div>
              </div>
            </div>

            <div className="card mb-4">
              <h3 className="font-semibold text-gray-900 mb-4">Habit Performance</h3>
              {habits.map((habit) => (
                <div key={habit.id} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{habit.icon}</span>
                      <span className="font-medium text-gray-700">{habit.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {habit.completedDates.length} times
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-full rounded-full transition-all"
                      style={{ 
                        width: `${Math.min(100, (habit.completedDates.length / 30) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-4 pb-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Daily Reminders</span>
                  <input type="checkbox" className="w-5 h-5" defaultChecked />
                </label>
              </div>
              
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-2">App Info</h3>
                <p className="text-sm text-gray-600">Version 1.0.0</p>
                <p className="text-sm text-gray-600">Built with React + TypeScript</p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-2">Data</h3>
                <button className="text-sm text-red-600 font-medium">
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto relative">
        {renderContent()}

        {/* Floating Action Button */}
        {activeTab === 'home' && habits.length > 0 && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="fixed bottom-24 right-4 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-all active:scale-95 z-40"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-around py-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                  activeTab === 'home' 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Home className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Home</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                  activeTab === 'stats' 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <BarChart3 className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Stats</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Settings className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>

        <AddHabitModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      </div>
    </div>
  );
}

export default App;