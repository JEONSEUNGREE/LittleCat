import React, { useState } from 'react'
import { Settings as SettingsIcon, Bell, Target, X } from 'lucide-react'
import useHydrationStore from '../store/useHydrationStore'

const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    dailyGoal, 
    reminderEnabled, 
    reminderInterval,
    setDailyGoal,
    toggleReminder,
    setReminderInterval
  } = useHydrationStore()
  
  const [tempGoal, setTempGoal] = useState(dailyGoal)
  const [tempInterval, setTempInterval] = useState(reminderInterval)
  
  const handleSave = () => {
    setDailyGoal(tempGoal)
    setReminderInterval(tempInterval)
    setIsOpen(false)
  }
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
      >
        <SettingsIcon className="w-6 h-6 text-gray-700" />
      </button>
    )
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">설정</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-3">
              <Target className="w-5 h-5 mr-2 text-blue-500" />
              일일 목표량 (ml)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1000"
                max="4000"
                step="250"
                value={tempGoal}
                onChange={(e) => setTempGoal(Number(e.target.value))}
                className="flex-1"
              />
              <span className="w-20 text-center font-bold text-blue-600">
                {tempGoal}ml
              </span>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>1000ml</span>
              <span>4000ml</span>
            </div>
          </div>
          
          <div>
            <label className="flex items-center justify-between mb-4">
              <span className="flex items-center text-gray-700 font-medium">
                <Bell className="w-5 h-5 mr-2 text-blue-500" />
                알림 설정
              </span>
              <button
                onClick={toggleReminder}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                  reminderEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    reminderEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            
            {reminderEnabled && (
              <div className="mt-3">
                <label className="text-sm text-gray-600 mb-2 block">
                  알림 간격 (분)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="30"
                    value={tempInterval}
                    onChange={(e) => setTempInterval(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-16 text-center font-medium text-gray-700">
                    {tempInterval}분
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>30분</span>
                  <span>3시간</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-medium text-gray-800 mb-2">💡 팁</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 성인 기준 하루 권장 수분 섭취량은 약 2000ml입니다</li>
              <li>• 운동이나 더운 날씨에는 더 많은 수분이 필요해요</li>
              <li>• 규칙적인 수분 섭취가 건강에 좋습니다</li>
            </ul>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings