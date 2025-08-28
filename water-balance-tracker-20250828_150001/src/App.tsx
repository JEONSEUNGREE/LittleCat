import { useState, useEffect } from 'react'
import { useWaterStore } from './store/useWaterStore'
import { ProfileSetup } from './components/ProfileSetup'
import { WaterTracker } from './components/WaterTracker'
import { History } from './components/History'
import { Statistics } from './components/Statistics'
import { Settings } from './components/Settings'
import { BottomNav } from './components/BottomNav'

type TabType = 'home' | 'history' | 'stats' | 'settings'

function App() {
  const { profile, resetDaily } = useWaterStore()
  const [activeTab, setActiveTab] = useState<TabType>('home')

  // Reset daily intake at midnight
  useEffect(() => {
    resetDaily()
    
    // Check every minute if it's a new day
    const interval = setInterval(() => {
      resetDaily()
    }, 60000)

    return () => clearInterval(interval)
  }, [resetDaily])

  const handleLogout = () => {
    useWaterStore.setState({ 
      profile: null, 
      entries: [], 
      currentIntake: 0 
    })
  }

  if (!profile) {
    return <ProfileSetup />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <WaterTracker />
      case 'history':
        return <History />
      case 'stats':
        return <Statistics />
      case 'settings':
        return <Settings onLogout={handleLogout} />
      default:
        return <WaterTracker />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {renderContent()}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App