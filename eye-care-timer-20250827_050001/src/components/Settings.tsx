import { useState } from 'react'
import { Settings as SettingsIcon, Bell, BellOff, Clock, Save } from 'lucide-react'
import { useEyeCareStore } from '../store/useEyeCareStore'

export const Settings: React.FC = () => {
  const {
    notificationsEnabled,
    workDuration,
    breakDuration,
    toggleNotifications,
    setWorkDuration,
    setBreakDuration
  } = useEyeCareStore()
  
  const [localWorkMinutes, setLocalWorkMinutes] = useState(Math.floor(workDuration / 60))
  const [localBreakSeconds, setLocalBreakSeconds] = useState(breakDuration)
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    setWorkDuration(localWorkMinutes * 60)
    setBreakDuration(localBreakSeconds)
    setIsOpen(false)
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
    toggleNotifications()
  }

  return (
    <>
      {/* 설정 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all z-40"
      >
        <SettingsIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* 설정 패널 */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsOpen(false)}>
        <div
          className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">설정</h2>
            
            {/* 알림 설정 */}
            <div className="mb-6">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  {notificationsEnabled ? (
                    <Bell className="w-5 h-5 text-blue-600" />
                  ) : (
                    <BellOff className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="font-medium text-gray-700">알림</span>
                </div>
                <button
                  onClick={requestNotificationPermission}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* 작업 시간 설정 */}
            <div className="mb-6">
              <label className="block mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">작업 시간 (분)</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={localWorkMinutes}
                  onChange={(e) => setLocalWorkMinutes(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            {/* 휴식 시간 설정 */}
            <div className="mb-8">
              <label className="block mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">휴식 시간 (초)</span>
                </div>
                <input
                  type="number"
                  min="10"
                  max="60"
                  value={localBreakSeconds}
                  onChange={(e) => setLocalBreakSeconds(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            {/* 저장 버튼 */}
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
              저장하기
            </button>
            
            {/* 20-20-20 규칙 설명 */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">20-20-20 규칙이란?</h3>
              <p className="text-sm text-blue-700">
                20분마다 20초 동안 20피트(약 6미터) 떨어진 곳을 바라보는 것입니다. 
                이는 눈의 피로를 줄이고 시력을 보호하는 데 도움이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}