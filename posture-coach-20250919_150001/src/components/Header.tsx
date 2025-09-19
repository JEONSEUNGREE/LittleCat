import { Settings, Activity } from 'lucide-react'

interface HeaderProps {
  onSettingsClick: () => void
}

export default function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-500 p-3 rounded-xl">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Posture Coach
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              당신의 건강한 자세를 위한 파트너
            </p>
          </div>
        </div>
        
        <button
          onClick={onSettingsClick}
          className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  )
}