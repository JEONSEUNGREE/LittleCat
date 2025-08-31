import { useEffect, useState } from 'react'
import TimerDisplay from './components/TimerDisplay'
import StretchGuide from './components/StretchGuide'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import usePostureStore from './store/postureStore'
import { Bell, Activity, Settings as SettingsIcon } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'timer' | 'stretch' | 'stats' | 'settings'>('timer')
  const { 
    isTimerActive, 
    currentSession,
    notification,
    startTimer, 
    pauseTimer,
    resetTimer,
    clearNotification 
  } = usePostureStore()

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, clearNotification])

  const getTabContent = () => {
    switch(activeTab) {
      case 'timer':
        return <TimerDisplay />
      case 'stretch':
        return <StretchGuide />
      case 'stats':
        return <Statistics />
      case 'settings':
        return <Settings />
      default:
        return <TimerDisplay />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-slow">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl px-6 py-4 flex items-center space-x-3">
            <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">{notification}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Posture Guard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            건강한 자세를 위한 스마트 타이머
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <nav className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                activeTab === 'timer' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Activity className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">타이머</span>
            </button>
            <button
              onClick={() => setActiveTab('stretch')}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                activeTab === 'stretch' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Activity className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">스트레칭</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                activeTab === 'stats' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Activity className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">통계</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <SettingsIcon className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">설정</span>
            </button>
          </nav>

          <div className="p-6">
            {getTabContent()}
          </div>

          {activeTab === 'timer' && (
            <div className="px-6 pb-6 flex gap-3">
              {!isTimerActive ? (
                <button
                  onClick={startTimer}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  시작
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  일시정지
                </button>
              )}
              <button
                onClick={resetTimer}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                리셋
              </button>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-gray-600 dark:text-gray-400 text-xs">
          <p>© 2025 Posture Guard - 건강한 자세 습관 만들기</p>
        </footer>
      </div>
    </div>
  )
}

export default App