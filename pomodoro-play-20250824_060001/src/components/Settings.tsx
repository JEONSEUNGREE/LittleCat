import React, { useState } from 'react'
import { Settings as SettingsIcon, X, Bell, Vibrate, Clock } from 'lucide-react'
import { usePomodoroStore } from '../store/usePomodoroStore'

export const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    workDuration,
    shortBreakDuration,
    longBreakDuration,
    sessionsUntilLongBreak,
    soundEnabled,
    vibrationEnabled,
    updateSettings
  } = usePomodoroStore()

  const handleDurationChange = (field: string, value: number) => {
    updateSettings({ [field]: value * 60 })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Settings"
      >
        <SettingsIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-white dark:bg-gray-900 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up sm:animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                설정
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  타이머 설정 (분)
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      집중 시간
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={Math.floor(workDuration / 60)}
                      onChange={(e) => handleDurationChange('workDuration', Number(e.target.value))}
                      className="w-20 px-3 py-1 text-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      짧은 휴식
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={Math.floor(shortBreakDuration / 60)}
                      onChange={(e) => handleDurationChange('shortBreakDuration', Number(e.target.value))}
                      className="w-20 px-3 py-1 text-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      긴 휴식
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={Math.floor(longBreakDuration / 60)}
                      onChange={(e) => handleDurationChange('longBreakDuration', Number(e.target.value))}
                      className="w-20 px-3 py-1 text-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      긴 휴식까지 세션 수
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={sessionsUntilLongBreak}
                      onChange={(e) => updateSettings({ sessionsUntilLongBreak: Number(e.target.value) })}
                      className="w-20 px-3 py-1 text-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  알림 설정
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      소리 알림
                    </span>
                    <input
                      type="checkbox"
                      checked={soundEnabled}
                      onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                      className="w-5 h-5 rounded text-red-500 focus:ring-red-500"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Vibrate className="w-4 h-4 mr-2" />
                      진동 알림
                    </span>
                    <input
                      type="checkbox"
                      checked={vibrationEnabled}
                      onChange={(e) => updateSettings({ vibrationEnabled: e.target.checked })}
                      className="w-5 h-5 rounded text-red-500 focus:ring-red-500"
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              저장하기
            </button>
          </div>
        </div>
      )}
    </>
  )
}