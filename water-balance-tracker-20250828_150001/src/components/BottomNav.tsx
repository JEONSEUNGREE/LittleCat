import React from 'react'
import { Home, Clock, BarChart3, Settings } from 'lucide-react'

interface BottomNavProps {
  activeTab: 'home' | 'history' | 'stats' | 'settings'
  setActiveTab: (tab: 'home' | 'history' | 'stats' | 'settings') => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home' as const, icon: Home, label: '홈' },
    { id: 'history' as const, icon: Clock, label: '기록' },
    { id: 'stats' as const, icon: BarChart3, label: '통계' },
    { id: 'settings' as const, icon: Settings, label: '설정' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 flex flex-col items-center gap-1 transition-all ${
                isActive
                  ? 'text-water-blue'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon 
                className={`w-6 h-6 transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
              />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-water-blue rounded-t-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}