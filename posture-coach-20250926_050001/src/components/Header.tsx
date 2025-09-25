import React from 'react'
import { Activity, TrendingUp, BarChart3, Menu } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

const Header: React.FC = () => {
  const { activeView, setActiveView } = usePostureStore()
  
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-800">Posture Coach</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => setActiveView('analyze')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'analyze'
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span className="font-medium">Analyze</span>
            </button>
            
            <button
              onClick={() => setActiveView('exercise')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'exercise'
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Exercise</span>
            </button>
            
            <button
              onClick={() => setActiveView('progress')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'progress'
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Progress</span>
            </button>
          </nav>
          
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden flex space-x-3 mt-4 overflow-x-auto">
          <button
            onClick={() => setActiveView('analyze')}
            className={`flex-shrink-0 px-4 py-2 rounded-lg ${
              activeView === 'analyze'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100'
            }`}
          >
            Analyze
          </button>
          <button
            onClick={() => setActiveView('exercise')}
            className={`flex-shrink-0 px-4 py-2 rounded-lg ${
              activeView === 'exercise'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100'
            }`}
          >
            Exercise
          </button>
          <button
            onClick={() => setActiveView('progress')}
            className={`flex-shrink-0 px-4 py-2 rounded-lg ${
              activeView === 'progress'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100'
            }`}
          >
            Progress
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header