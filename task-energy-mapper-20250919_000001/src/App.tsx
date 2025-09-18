import React from 'react'
import { Activity, Calendar } from 'lucide-react'
import EnergyTracker from './components/EnergyTracker'
import TaskManager from './components/TaskManager'
import EnergyInsights from './components/EnergyInsights'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-slate-900 to-dark-bg">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Task Energy Mapper</h1>
                <p className="text-sm text-gray-400">Optimize tasks based on your energy</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <EnergyTracker />
            <EnergyInsights />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <TaskManager />
          </div>
        </div>

        {/* Mobile Optimization Message */}
        <footer className="mt-8 text-center text-xs text-gray-500 animate-fade-in">
          <p>Track energy • Match tasks • Boost productivity</p>
        </footer>
      </div>
    </div>
  )
}

export default App