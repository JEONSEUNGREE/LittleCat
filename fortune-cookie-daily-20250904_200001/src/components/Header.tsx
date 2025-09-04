import React from 'react'
import { Moon, Sun, History, Trophy, Heart } from 'lucide-react'
import { useFortuneStore } from '../store/fortuneStore'

interface HeaderProps {
  setActiveView: (view: 'main' | 'history' | 'stats') => void
  activeView: 'main' | 'history' | 'stats'
}

const Header: React.FC<HeaderProps> = ({ setActiveView, activeView }) => {
  const { isDarkMode, toggleDarkMode, streak, totalOpened } = useFortuneStore()

  return (
    <header className="glass-card m-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Fortune Cookie
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            매일의 행운을 만나보세요
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('history')}
            className={`p-2 rounded-lg transition-colors ${
              activeView === 'history'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="히스토리"
          >
            <History className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setActiveView('stats')}
            className={`p-2 rounded-lg transition-colors ${
              activeView === 'stats'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="통계"
          >
            <Trophy className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="다크모드 전환"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
      
      {(streak > 0 || totalOpened > 0) && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold">{streak}일</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">연속</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{totalOpened}개</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">열어봄</span>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header