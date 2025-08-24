import React from 'react'
import { Activity, Moon, Sun } from 'lucide-react'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm mb-6">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Mood Echo
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share emotions, find connections
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? (
              <Sun className="text-yellow-500" size={20} />
            ) : (
              <Moon className="text-gray-700" size={20} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header