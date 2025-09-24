import React from 'react'
import { X, Target, Volume2, Vibrate, Info, Shield } from 'lucide-react'
import usePostureStore from '../store/usePostureStore'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { dailyGoal, setDailyGoal, notifications } = usePostureStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-800 w-full sm:max-w-lg sm:mx-4 rounded-t-3xl sm:rounded-2xl shadow-xl safe-bottom">
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-gray-100">설정</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 dark:text-gray-300" />
          </button>
        </div>
        
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold dark:text-gray-100">목표 설정</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  일일 목표 점수
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-semibold w-12 text-right dark:text-gray-200">
                    {dailyGoal}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold dark:text-gray-100">알림 설정</h3>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between py-2">
                <span className="text-gray-700 dark:text-gray-300">음성 안내</span>
                <input
                  type="checkbox"
                  defaultChecked={notifications}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </label>
              
              <label className="flex items-center justify-between py-2">
                <span className="text-gray-700 dark:text-gray-300">진동 알림</span>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </label>
              
              <label className="flex items-center justify-between py-2">
                <span className="text-gray-700 dark:text-gray-300">휴식 알림 (1시간마다)</span>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </label>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold dark:text-gray-100">앱 정보</h3>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>버전</span>
                <span>0.0.1</span>
              </div>
              <div className="flex justify-between">
                <span>개발자</span>
                <span>LittleCat</span>
              </div>
              <div className="flex justify-between">
                <span>최종 업데이트</span>
                <span>2025.09.24</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors">
              변경사항 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings