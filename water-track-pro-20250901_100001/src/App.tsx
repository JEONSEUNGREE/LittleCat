import { useState, useEffect } from 'react'
import { useWaterStore } from './store/waterStore'
import Header from './components/Header'
import WaterTracker from './components/WaterTracker'
import Statistics from './components/Statistics'
import QuickAdd from './components/QuickAdd'
import History from './components/History'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('today')
  const { initializeDay } = useWaterStore()

  useEffect(() => {
    initializeDay()
  }, [initializeDay])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="max-w-md mx-auto p-4">
        <Header />
        
        <div className="bg-white rounded-3xl shadow-xl p-6 mt-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all ${
                activeTab === 'today'
                  ? 'bg-water-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              오늘
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all ${
                activeTab === 'stats'
                  ? 'bg-water-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              통계
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-water-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              기록
            </button>
          </div>

          {activeTab === 'today' && (
            <>
              <WaterTracker />
              <QuickAdd />
            </>
          )}
          {activeTab === 'stats' && <Statistics />}
          {activeTab === 'history' && <History />}
        </div>
      </div>
    </div>
  )
}