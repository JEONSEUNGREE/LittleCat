import { X, Bell, Volume2, Vibrate, Clock } from 'lucide-react'
import { usePostureStore } from '../store/usePostureStore'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    reminderInterval,
    soundEnabled,
    vibrationEnabled,
    setReminderInterval,
    toggleSound,
    toggleVibration,
  } = usePostureStore()

  const intervalOptions = [15, 30, 45, 60, 90]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              설정
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Reminder Interval */}
          <div>
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 mr-2 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                휴식 알림 간격
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {intervalOptions.map((interval) => (
                <button
                  key={interval}
                  onClick={() => setReminderInterval(interval)}
                  className={`py-2 px-3 rounded-lg font-medium transition-all ${
                    reminderInterval === interval
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {interval}분
                </button>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="flex items-center">
              <Volume2 className="w-5 h-5 mr-3 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  소리 알림
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  자세 불량 시 소리로 알림
                </p>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  soundEnabled ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Vibration Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="flex items-center">
              <Vibrate className="w-5 h-5 mr-3 text-purple-500" />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  진동 알림
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  자세 불량 시 진동으로 알림
                </p>
              </div>
            </div>
            <button
              onClick={toggleVibration}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                vibrationEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  vibrationEnabled ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Notification Permission */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  알림 권한
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  브라우저 알림을 허용해주세요
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  )
}