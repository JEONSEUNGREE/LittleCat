import { useEffect, useRef } from 'react'
import usePostureStore from '../store/postureStore'
import { Clock, AlertCircle } from 'lucide-react'

export default function TimerDisplay() {
  const { 
    isTimerActive, 
    elapsedTime, 
    settings,
    updateElapsedTime,
    setNotification 
  } = usePostureStore()
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isTimerActive) {
      intervalRef.current = setInterval(() => {
        const newTime = elapsedTime + 1
        updateElapsedTime(newTime)
        
        if (newTime > 0 && newTime % (settings.reminderInterval * 60) === 0) {
          setNotification('자세를 확인하고 스트레칭을 해주세요!')
          
          if (settings.vibrationEnabled && 'vibrate' in navigator) {
            navigator.vibrate([200, 100, 200])
          }
          
          if (settings.soundEnabled) {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmkcCjiS2Oy9diMFl2+z8BRwVwq')
            audio.play().catch(() => {})
          }
        }
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTimerActive, elapsedTime, settings, updateElapsedTime, setNotification])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPostureScore = () => {
    const sessionMinutes = Math.floor(elapsedTime / 60)
    if (sessionMinutes < 30) return '좋음'
    if (sessionMinutes < 60) return '주의'
    return '경고'
  }

  const getScoreColor = () => {
    const sessionMinutes = Math.floor(elapsedTime / 60)
    if (sessionMinutes < 30) return 'text-green-600'
    if (sessionMinutes < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          <div className={`w-48 h-48 rounded-full border-8 ${isTimerActive ? 'border-purple-600 animate-pulse-slow' : 'border-gray-300'} flex items-center justify-center bg-white dark:bg-gray-700`}>
            <div>
              <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-4xl font-bold text-gray-800 dark:text-white">
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
          {isTimerActive && (
            <div className="absolute -top-2 -right-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">현재 자세 상태</span>
          <span className={`font-bold ${getScoreColor()}`}>{getPostureScore()}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {Math.floor(elapsedTime / 60)}분 동안 작업 중
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              다음 스트레칭까지
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">
              {settings.reminderInterval - (Math.floor(elapsedTime / 60) % settings.reminderInterval)}분 남음
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
          <p className="text-xs text-gray-500 dark:text-gray-400">작업 시간</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {settings.workDuration}분
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
          <p className="text-xs text-gray-500 dark:text-gray-400">휴식 시간</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {settings.breakDuration}분
          </p>
        </div>
      </div>
    </div>
  )
}