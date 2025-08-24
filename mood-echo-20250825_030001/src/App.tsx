import { useState, useEffect } from 'react'
import Header from './components/Header'
import MoodSelector from './components/MoodSelector'
import MoodBroadcast from './components/MoodBroadcast'
import EchoFeed from './components/EchoFeed'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
    
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              How's your mood today?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with others through shared emotions
            </p>
          </div>
          
          {/* Mood Selection */}
          <MoodSelector />
          
          {/* Mood Broadcast */}
          <MoodBroadcast />
          
          {/* Echo Feed */}
          <EchoFeed />
          
          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-500">247</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Echoes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-pink-500">89</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connections</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Similar Moods</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App