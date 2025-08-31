import { useState } from 'react'
import usePostureStore from '../store/postureStore'
import { Volume2, Vibrate, Clock, Coffee, Save } from 'lucide-react'

export default function Settings() {
  const { settings, updateSettings } = usePostureStore()
  const [localSettings, setLocalSettings] = useState(settings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateSettings(localSettings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleChange = (key: keyof typeof settings, value: number | boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          설정
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          앱을 사용자에 맞게 설정하세요
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  알림 간격
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  자세 확인 알림 주기
                </p>
              </div>
            </div>
            <select
              value={localSettings.reminderInterval}
              onChange={(e) => handleChange('reminderInterval', parseInt(e.target.value))}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white"
            >
              <option value={15}>15분</option>
              <option value={20}>20분</option>
              <option value={25}>25분</option>
              <option value={30}>30분</option>
              <option value={45}>45분</option>
              <option value={60}>60분</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  작업 시간
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  집중 작업 시간 설정
                </p>
              </div>
            </div>
            <select
              value={localSettings.workDuration}
              onChange={(e) => handleChange('workDuration', parseInt(e.target.value))}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white"
            >
              <option value={15}>15분</option>
              <option value={20}>20분</option>
              <option value={25}>25분</option>
              <option value={30}>30분</option>
              <option value={45}>45분</option>
              <option value={50}>50분</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Coffee className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  휴식 시간
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  휴식 시간 설정
                </p>
              </div>
            </div>
            <select
              value={localSettings.breakDuration}
              onChange={(e) => handleChange('breakDuration', parseInt(e.target.value))}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white"
            >
              <option value={3}>3분</option>
              <option value={5}>5분</option>
              <option value={10}>10분</option>
              <option value={15}>15분</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  소리 알림
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  알림 소리 켜기/끄기
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChange('soundEnabled', !localSettings.soundEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                localSettings.soundEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Vibrate className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  진동 알림
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  진동 알림 켜기/끄기
                </p>
              </div>
            </div>
            <button
              onClick={() => handleChange('vibrationEnabled', !localSettings.vibrationEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                localSettings.vibrationEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localSettings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all ${
          saved 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Save className="w-5 h-5" />
          <span>{saved ? '저장됨!' : '설정 저장'}</span>
        </div>
      </button>
    </div>
  )
}