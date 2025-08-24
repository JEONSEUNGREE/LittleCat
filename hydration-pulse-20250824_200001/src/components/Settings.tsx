import { useState } from 'react'
import { Settings as SettingsIcon, Bell, Target, Clock, X } from 'lucide-react'
import { useHydrationStore } from '../store/hydrationStore'

const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { 
    dailyGoal, 
    reminders, 
    reminderInterval,
    setDailyGoal,
    toggleReminders,
    setReminderInterval 
  } = useHydrationStore()
  
  const [tempGoal, setTempGoal] = useState(dailyGoal.toString())
  const [tempInterval, setTempInterval] = useState(reminderInterval.toString())
  
  const handleSave = () => {
    const newGoal = parseInt(tempGoal)
    const newInterval = parseInt(tempInterval)
    
    if (newGoal > 0) setDailyGoal(newGoal)
    if (newInterval > 0) setReminderInterval(newInterval)
    
    setIsOpen(false)
  }
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40"
      >
        <SettingsIcon size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">설정</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2">
                  <Target size={20} />
                  일일 목표 (ml)
                </label>
                <input
                  type="number"
                  value={tempGoal}
                  onChange={(e) => setTempGoal(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-gray-700 mb-2">
                  <Bell size={20} />
                  알림 설정
                </label>
                <button
                  onClick={toggleReminders}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    reminders 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {reminders ? '알림 켜짐' : '알림 꺼짐'}
                </button>
              </div>
              
              {reminders && (
                <div>
                  <label className="flex items-center gap-2 text-gray-700 mb-2">
                    <Clock size={20} />
                    알림 간격 (분)
                  </label>
                  <input
                    type="number"
                    value={tempInterval}
                    onChange={(e) => setTempInterval(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings