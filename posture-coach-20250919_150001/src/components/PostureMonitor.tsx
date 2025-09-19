import { useEffect, useRef } from 'react'
import { Play, Pause, RefreshCw, User, AlertTriangle, CheckCircle } from 'lucide-react'
import { usePostureStore } from '../store/usePostureStore'

export default function PostureMonitor() {
  const { 
    isMonitoring, 
    currentPosture,
    startMonitoring, 
    stopMonitoring,
    updatePosture,
    recordBreak,
    reminderInterval,
    soundEnabled,
    vibrationEnabled
  } = usePostureStore()

  const intervalRef = useRef<NodeJS.Timeout>()
  const reminderRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isMonitoring) {
      // Simulate posture detection every 5 seconds
      intervalRef.current = setInterval(() => {
        const random = Math.random()
        if (random < 0.6) {
          updatePosture('good')
        } else if (random < 0.85) {
          updatePosture('neutral')
        } else {
          updatePosture('bad')
          sendNotification()
        }
      }, 5000)

      // Set reminder interval
      reminderRef.current = setInterval(() => {
        sendReminder()
      }, reminderInterval * 60 * 1000)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (reminderRef.current) clearInterval(reminderRef.current)
      }
    }
  }, [isMonitoring, reminderInterval])

  const sendNotification = () => {
    if (soundEnabled) {
      // Play sound effect
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSyBzvLRiTUIF2m98OScTgwOUaXgxKhYDAZGnt/ywHkpBCx+0e/GizwBAl6088WmXA0XW7/ky6hWHwBJkt370nlEFQNSkuXsvHkEFxd1L0ExwqBxYGG+vGNia1v4N1wAQzkO7QPaxv2JjVGqAI5jeoD6hVxVAP19CRAUBQiCXh6+6YH/KA4FudfykdMISe66Yg')
      audio.play().catch(() => {})
    }
    
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(200)
    }
  }

  const sendReminder = () => {
    recordBreak()
    if (Notification.permission === 'granted') {
      new Notification('휴식 시간!', {
        body: '잠시 일어나서 스트레칭을 하세요',
        icon: '/favicon.ico'
      })
    }
  }

  const handleToggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring()
    } else {
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }
      startMonitoring()
    }
  }

  const getPostureIcon = () => {
    switch (currentPosture) {
      case 'good':
        return <CheckCircle className="w-24 h-24 text-success animate-pulse-slow" />
      case 'bad':
        return <AlertTriangle className="w-24 h-24 text-danger animate-bounce-slow" />
      default:
        return <User className="w-24 h-24 text-gray-400" />
    }
  }

  const getPostureMessage = () => {
    switch (currentPosture) {
      case 'good':
        return '훌륭해요! 좋은 자세를 유지하고 있습니다'
      case 'bad':
        return '자세를 바르게 교정해주세요!'
      default:
        return '모니터링을 시작하여 자세를 체크하세요'
    }
  }

  const getPostureColor = () => {
    switch (currentPosture) {
      case 'good':
        return 'bg-gradient-to-br from-green-400 to-green-600'
      case 'bad':
        return 'bg-gradient-to-br from-red-400 to-red-600'
      default:
        return 'bg-gradient-to-br from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-48 h-48 rounded-full ${getPostureColor()} mb-6 shadow-2xl`}>
          {getPostureIcon()}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          {getPostureMessage()}
        </h2>
        
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handleToggleMonitoring}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              isMonitoring 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {isMonitoring ? (
              <>
                <Pause className="w-5 h-5" />
                <span>모니터링 중지</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>모니터링 시작</span>
              </>
            )}
          </button>
          
          {isMonitoring && (
            <button
              onClick={recordBreak}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              <span>휴식 기록</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}