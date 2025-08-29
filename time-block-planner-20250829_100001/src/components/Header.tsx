import { Calendar, Clock, LayoutGrid, Settings } from 'lucide-react'

interface HeaderProps {
  currentView: 'day' | 'week'
  setCurrentView: (view: 'day' | 'week') => void
}

export function Header({ currentView, setCurrentView }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Time Block Planner
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">{today}</p>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('day')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'day' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Day</span>
            </button>
            
            <button
              onClick={() => setCurrentView('week')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'week' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Week</span>
            </button>

            <button
              className="ml-2 p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}