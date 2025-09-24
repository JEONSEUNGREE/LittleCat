import { useEffect, useState } from 'react'
import Header from './components/Header'
import PostureMonitor from './components/PostureMonitor'
import DailyStats from './components/DailyStats'
import Settings from './components/Settings'
import usePostureStore from './store/usePostureStore'

function App() {
  const { darkMode } = usePostureStore()
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header onSettingsClick={() => setSettingsOpen(true)} />
      
      <main className="pt-20 pb-6 px-4 safe-bottom">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              건강한 자세, 건강한 삶
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              AI가 실시간으로 당신의 자세를 분석합니다
            </p>
          </div>
          
          <PostureMonitor />
          <DailyStats />
        </div>
      </main>
      
      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

export default App