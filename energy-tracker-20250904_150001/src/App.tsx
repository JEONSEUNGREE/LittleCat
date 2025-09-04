import { useState } from 'react'
import { Battery, TrendingUp, Clock, Activity, ChevronRight, Moon, Sun } from 'lucide-react'
import EnergyTracker from './components/EnergyTracker'
import EnergyChart from './components/EnergyChart'
import EnergyHistory from './components/EnergyHistory'
import OptimalTimeWidget from './components/OptimalTimeWidget'
import { useEnergyStore } from './store/useEnergyStore'

function App() {
  const [activeView, setActiveView] = useState<'track' | 'analyze' | 'history'>('track')
  const currentEnergy = useEnergyStore((state) => state.currentEnergy)
  
  const getEnergyColor = (level: number) => {
    if (level <= 3) return 'text-energy-low'
    if (level <= 6) return 'text-energy-medium'
    if (level <= 8) return 'text-energy-high'
    return 'text-energy-peak'
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return { icon: Sun, greeting: 'Good Morning' }
    if (hour >= 12 && hour < 17) return { icon: Sun, greeting: 'Good Afternoon' }
    if (hour >= 17 && hour < 21) return { icon: Moon, greeting: 'Good Evening' }
    return { icon: Moon, greeting: 'Good Night' }
  }

  const { icon: TimeIcon, greeting } = getTimeOfDay()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Battery className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Energy Tracker
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Optimize Your Day</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TimeIcon className="w-5 h-5 text-slate-500" />
              <span className="text-sm text-slate-600 dark:text-slate-300">{greeting}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Current Energy Status Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Activity className={`w-6 h-6 ${getEnergyColor(currentEnergy)}`} />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Current Energy</p>
                <p className={`text-2xl font-bold ${getEnergyColor(currentEnergy)}`}>
                  {currentEnergy}/10
                </p>
              </div>
            </div>
            <OptimalTimeWidget />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveView('track')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'track'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4" />
                <span>Track</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('analyze')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'analyze'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Analyze</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'history'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>History</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {activeView === 'track' && <EnergyTracker />}
          {activeView === 'analyze' && <EnergyChart />}
          {activeView === 'history' && <EnergyHistory />}

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Energy Optimization Tips
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-primary-600 mt-0.5" />
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Track your energy levels consistently for better pattern recognition
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-primary-600 mt-0.5" />
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Schedule important tasks during your peak energy hours
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-primary-600 mt-0.5" />
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Take breaks when your energy dips below 4/10
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App