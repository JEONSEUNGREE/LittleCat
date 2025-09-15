import { useEffect } from 'react';
import { Activity, Brain, Moon, Sun } from 'lucide-react';
import EnergyTracker from './components/EnergyTracker';
import EnergyChart from './components/EnergyChart';
import TaskScheduler from './components/TaskScheduler';
import { useEnergyStore } from './store/useEnergyStore';

function App() {
  const { clearOldEntries } = useEnergyStore();
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    // Clean up old entries on mount
    clearOldEntries();
    
    // Check for dark mode preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, [clearOldEntries]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Activity className="w-8 h-8 text-primary animate-pulse-slow" />
                <Brain className="w-4 h-4 text-secondary absolute -bottom-1 -right-1" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Energy Optimizer
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Track your peak performance
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy Tracker - Mobile: Full width, Desktop: 1/3 */}
          <div className="lg:col-span-1">
            <EnergyTracker />
          </div>

          {/* Right Column - Mobile: Stack, Desktop: 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Energy Chart */}
            <EnergyChart />
            
            {/* Task Scheduler */}
            <TaskScheduler />
          </div>
        </div>

        {/* Quick Tips - Mobile: Visible, Desktop: Bottom */}
        <div className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">Energy Optimization Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start space-x-2">
              <span className="text-2xl">💧</span>
              <div>
                <p className="font-medium">Stay Hydrated</p>
                <p className="text-xs opacity-90">Drink water regularly</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-2xl">🚶</span>
              <div>
                <p className="font-medium">Take Breaks</p>
                <p className="text-xs opacity-90">Move every hour</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-2xl">🌞</span>
              <div>
                <p className="font-medium">Natural Light</p>
                <p className="text-xs opacity-90">Boost morning energy</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-2xl">😴</span>
              <div>
                <p className="font-medium">Quality Sleep</p>
                <p className="text-xs opacity-90">7-9 hours nightly</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Mobile Friendly */}
      <footer className="mt-12 pb-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Energy Optimizer © 2025 - Track your peak performance hours</p>
      </footer>
    </div>
  );
}

export default App;