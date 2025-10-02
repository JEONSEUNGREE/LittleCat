import React, { useState } from 'react'
import { Eye, Activity, Target, Menu, X, Info } from 'lucide-react'
import EyeVisual from './components/EyeVisual'
import BlinkTracker from './components/BlinkTracker'
import ExerciseMode from './components/ExerciseMode'
import useBlinkStore from './store/useBlinkStore'

type TabType = 'visual' | 'tracker' | 'exercise'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('visual')
  const [showInfo, setShowInfo] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  
  const { stats, recordBlink } = useBlinkStore()
  
  const handleManualBlink = () => {
    setIsBlinking(true)
    recordBlink()
    setTimeout(() => setIsBlinking(false), 300)
  }
  
  const tabs = [
    { id: 'visual' as TabType, label: 'Monitor', icon: <Eye className="w-4 h-4" /> },
    { id: 'tracker' as TabType, label: 'Track', icon: <Activity className="w-4 h-4" /> },
    { id: 'exercise' as TabType, label: 'Exercise', icon: <Target className="w-4 h-4" /> }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">Eye Blink Trainer</h1>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {/* Desktop Info Button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 md:hidden animate-fade-in">
              <button
                onClick={() => {
                  setShowInfo(!showInfo)
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Info className="w-4 h-4" />
                <span>About Eye Health</span>
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Info Panel */}
      {showInfo && (
        <div className="max-w-4xl mx-auto px-4 py-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Why Eye Blink Training?</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                When we look at screens, our blink rate drops by up to 60%. Normal blink rate is 15-20 times per minute,
                but during screen use, it can drop to as low as 5 blinks per minute.
              </p>
              <p>
                This leads to dry eyes, eye strain, blurred vision, and headaches. Regular blinking keeps eyes moist
                and reduces strain.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">20-20-20 Rule:</h3>
                <p className="text-blue-700">
                  Every 20 minutes, look at something 20 feet away for 20 seconds. This helps reset your focus
                  and encourages natural blinking.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'visual' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <EyeVisual
                isBlinking={isBlinking}
                averageRate={stats.averageRate}
                healthScore={stats.healthScore}
              />
              <button
                onClick={handleManualBlink}
                className="w-full mt-4 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium text-lg shadow-md"
              >
                Tap When You Blink
              </button>
            </div>
          )}
          
          {activeTab === 'tracker' && <BlinkTracker />}
          
          {activeTab === 'exercise' && <ExerciseMode />}
        </div>
        
        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Current Rate</p>
            <p className="text-xl font-bold text-gray-800">{stats.averageRate}/min</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Target Rate</p>
            <p className="text-xl font-bold text-green-600">{stats.targetRate}/min</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Total Blinks</p>
            <p className="text-xl font-bold text-blue-600">{stats.totalBlinks}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Health Score</p>
            <p className="text-xl font-bold text-purple-600">{stats.healthScore}%</p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-sm text-gray-500">
        <p>Eye Blink Trainer - Protect Your Vision</p>
        <p className="mt-1">Remember to take regular breaks from screens</p>
      </footer>
    </div>
  )
}

export default App