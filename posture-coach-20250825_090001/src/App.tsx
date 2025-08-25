import React, { useState } from 'react'
import { Activity, BarChart3, Dumbbell, Settings as SettingsIcon } from 'lucide-react'
import PostureMonitor from './components/PostureMonitor'
import ExerciseGuide from './components/ExerciseGuide'
import Statistics from './components/Statistics'
import Settings from './components/Settings'

type TabType = 'monitor' | 'exercise' | 'stats' | 'settings'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('monitor')
  
  const tabs = [
    { id: 'monitor' as TabType, label: '모니터링', icon: Activity },
    { id: 'exercise' as TabType, label: '운동', icon: Dumbbell },
    { id: 'stats' as TabType, label: '통계', icon: BarChart3 },
    { id: 'settings' as TabType, label: '설정', icon: SettingsIcon },
  ]
  
  const renderContent = () => {
    switch (activeTab) {
      case 'monitor':
        return <PostureMonitor />
      case 'exercise':
        return <ExerciseGuide />
      case 'stats':
        return <Statistics />
      case 'settings':
        return <Settings />
      default:
        return <PostureMonitor />
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg safe-top">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-white text-center">
            Posture Coach
          </h1>
          <p className="text-white/60 text-center text-sm mt-1">
            당신의 자세 교정 파트너
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        <div className="max-w-md mx-auto">
          {renderContent()}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 safe-bottom">
        <div className="grid grid-cols-4 max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-3 px-2 transition-all ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-1 transition-all ${
                    activeTab === tab.id ? 'scale-110' : ''
                  }`}
                />
                <span className="text-xs font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default App