import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { TimerDisplay } from './components/TimerDisplay'
import { StatsCard } from './components/StatsCard'
import { MusicPlayer } from './components/MusicPlayer'
import { Settings } from './components/Settings'
import { usePomodoroStore } from './store/usePomodoroStore'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const tick = usePomodoroStore((state) => state.tick)

  // Set up timer interval
  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [tick])

  // Dark mode toggle
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Reset today's focus time at midnight
  useEffect(() => {
    const checkNewDay = () => {
      const lastCheck = localStorage.getItem('lastDayCheck')
      const today = new Date().toDateString()
      
      if (lastCheck !== today) {
        usePomodoroStore.setState({ todayFocusTime: 0 })
        localStorage.setItem('lastDayCheck', today)
      }
    }

    checkNewDay()
    const interval = setInterval(checkNewDay, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 pt-safe">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Pomodoro Play
          </h1>
          <div className="flex items-center gap-2">
            <Settings />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-safe">
          <TimerDisplay />
          <MusicPlayer />
          <StatsCard />
        </main>

        {/* Footer */}
        <footer className="text-center py-4 px-6 text-xs text-gray-500 dark:text-gray-400">
          <p>집중과 휴식의 완벽한 리듬 🎵</p>
        </footer>
      </div>
    </div>
  )
}

export default App