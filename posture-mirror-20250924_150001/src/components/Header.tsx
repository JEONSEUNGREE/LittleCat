import React from 'react'
import { Settings, Moon, Sun, Bell, BellOff } from 'lucide-react'
import usePostureStore from '../store/usePostureStore'

interface HeaderProps {
  onSettingsClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { darkMode, toggleDarkMode, notifications, toggleNotifications } = usePostureStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-top">
      <div className="glass-effect">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold gradient-text">Posture Mirror</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">자세 교정 도우미</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
              aria-label={notifications ? "알림 끄기" : "알림 켜기"}
            >
              {notifications ? (
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
              aria-label="다크모드 전환"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
              aria-label="설정"
            >
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header