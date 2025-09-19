import { useState } from 'react'
import { usePostureStore } from './store/usePostureStore'
import Header from './components/Header'
import PostureMonitor from './components/PostureMonitor'
import PostureStats from './components/PostureStats'
import PostureTips from './components/PostureTips'
import SettingsModal from './components/SettingsModal'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const { isMonitoring } = usePostureStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Header onSettingsClick={() => setShowSettings(true)} />
        
        <main className="mt-8 space-y-6">
          <PostureMonitor />
          
          {isMonitoring && (
            <div className="grid md:grid-cols-2 gap-6">
              <PostureStats />
              <PostureTips />
            </div>
          )}
        </main>

        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  )
}

export default App