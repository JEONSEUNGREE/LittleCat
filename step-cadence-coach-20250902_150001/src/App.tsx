import React, { useState } from 'react'
import { Activity, ChartBar, Settings as SettingsIcon } from 'lucide-react'
import CadenceTracker from './components/CadenceTracker'
import ProgressChart from './components/ProgressChart'
import Settings from './components/Settings'

function App() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'progress' | 'settings'>('tracker')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="max-w-md mx-auto flex flex-col h-screen">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Activity className="text-primary-600" size={24} />
            </div>
            Step Cadence Coach
          </h1>
          <p className="text-sm text-gray-500 mt-1">Improve your running form</p>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {activeTab === 'tracker' && <CadenceTracker />}
          {activeTab === 'progress' && <ProgressChart />}
          {activeTab === 'settings' && <Settings />}
        </main>

        <nav className="bg-white border-t border-gray-200">
          <div className="grid grid-cols-3">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`py-3 px-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'tracker'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Activity size={20} />
              <span className="text-xs font-medium">Track</span>
            </button>
            
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-3 px-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'progress'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ChartBar size={20} />
              <span className="text-xs font-medium">Progress</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'settings'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <SettingsIcon size={20} />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default App