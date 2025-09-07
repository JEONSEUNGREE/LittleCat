import React, { useEffect, useState } from 'react'
import { Bell, BellOff, Coffee, Pause, Play, RefreshCw } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

export const BreakReminder: React.FC = () => {
  const { breakReminder, lastBreakTime, isMonitoring, takeBreak, toggleBreakReminder } = usePostureStore()
  const [timeUntilBreak, setTimeUntilBreak] = useState(30) // minutes
  const [showBreakAlert, setShowBreakAlert] = useState(false)

  useEffect(() => {
    if (isMonitoring && breakReminder) {
      const interval = setInterval(() => {
        const now = Date.now()
        const lastBreak = lastBreakTime ? lastBreakTime.getTime() : now - 30 * 60 * 1000
        const timeSinceBreak = (now - lastBreak) / 60000 // in minutes
        
        const remaining = Math.max(0, 30 - Math.floor(timeSinceBreak))
        setTimeUntilBreak(remaining)
        
        if (remaining === 0) {
          setShowBreakAlert(true)
        }
      }, 10000) // Check every 10 seconds

      return () => clearInterval(interval)
    }
  }, [isMonitoring, breakReminder, lastBreakTime])

  const handleTakeBreak = () => {
    takeBreak()
    setShowBreakAlert(false)
    setTimeUntilBreak(30)
  }

  const exercises = [
    { icon: '🙆‍♂️', name: '목 스트레칭', duration: '30초' },
    { icon: '🤸‍♀️', name: '어깨 돌리기', duration: '1분' },
    { icon: '👀', name: '눈 운동', duration: '30초' },
    { icon: '🚶‍♂️', name: '잠깐 걷기', duration: '2분' },
    { icon: '💧', name: '물 마시기', duration: '즉시' },
  ]

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Coffee className="w-6 h-6 text-primary-600" />
          휴식 알림
        </h2>
        <button
          onClick={toggleBreakReminder}
          className={`p-2 rounded-lg transition-all ${
            breakReminder 
              ? 'bg-primary-100 text-primary-600' 
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {breakReminder ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
        </button>
      </div>

      {showBreakAlert && (
        <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl animate-pulse-slow">
          <div className="flex items-center gap-3 mb-3">
            <Coffee className="w-6 h-6 text-orange-600" />
            <p className="font-semibold text-orange-900">휴식 시간입니다!</p>
          </div>
          <p className="text-sm text-orange-700 mb-3">
            30분이 지났습니다. 잠시 휴식을 취하고 스트레칭을 해보세요.
          </p>
          <button
            onClick={handleTakeBreak}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            휴식 시작
          </button>
        </div>
      )}

      {isMonitoring && breakReminder && !showBreakAlert && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">다음 휴식까지</span>
            <span className="text-lg font-bold text-primary-600">
              {timeUntilBreak}분
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-400 to-primary-600 h-full transition-all duration-500"
              style={{ width: `${((30 - timeUntilBreak) / 30) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          추천 스트레칭
        </h3>
        <div className="space-y-2">
          {exercises.map((exercise, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{exercise.icon}</span>
                <span className="font-medium">{exercise.name}</span>
              </div>
              <span className="text-sm text-gray-600">{exercise.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {!breakReminder && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            휴식 알림이 꺼져 있습니다
          </p>
        </div>
      )}
    </div>
  )
}