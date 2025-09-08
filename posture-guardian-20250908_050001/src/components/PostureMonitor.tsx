import { useEffect, useState } from 'react'
import { Activity, AlertCircle, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

export const PostureMonitor: React.FC = () => {
  const { isMonitoring, currentPosture, startMonitoring, stopMonitoring, updatePosture } = usePostureStore()
  const [mockPostureScore, setMockPostureScore] = useState(75)

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Mock posture detection - in real app would use camera/sensors
        const newScore = Math.floor(Math.random() * 100)
        setMockPostureScore(newScore)
        
        if (newScore >= 80) {
          updatePosture('good')
        } else if (newScore >= 50) {
          updatePosture('neutral')
        } else {
          updatePosture('bad')
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring, updatePosture])

  const getPostureColor = () => {
    switch (currentPosture) {
      case 'good': return 'text-green-500'
      case 'bad': return 'text-red-500'
      default: return 'text-yellow-500'
    }
  }

  const getPostureIcon = () => {
    switch (currentPosture) {
      case 'good': return <CheckCircle className="w-12 h-12" />
      case 'bad': return <XCircle className="w-12 h-12" />
      default: return <AlertCircle className="w-12 h-12" />
    }
  }

  const getPostureMessage = () => {
    switch (currentPosture) {
      case 'good': return '훌륭한 자세입니다! 계속 유지하세요 👍'
      case 'bad': return '자세를 바로 잡아주세요! 등을 펴고 화면과 거리를 유지하세요 ⚠️'
      default: return '자세를 체크하고 있습니다...'
    }
  }

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary-600" />
          실시간 자세 모니터링
        </h2>
        <button
          onClick={isMonitoring ? stopMonitoring : startMonitoring}
          className={isMonitoring ? 'btn-secondary' : 'btn-primary'}
        >
          {isMonitoring ? '모니터링 중지' : '모니터링 시작'}
        </button>
      </div>

      {isMonitoring && (
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <div className={`${getPostureColor()} transition-all duration-500`}>
              {getPostureIcon()}
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {mockPostureScore}%
            </div>
            <div className="text-gray-600">자세 점수</div>
          </div>

          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                mockPostureScore >= 80 ? 'bg-green-500' : 
                mockPostureScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${mockPostureScore}%` }}
            />
          </div>

          <div className="text-center p-4 bg-primary-50 rounded-xl">
            <p className="text-lg font-medium">{getPostureMessage()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm text-gray-600">좋은 자세</div>
              <div className="text-xl font-bold text-green-600">
                {Math.floor(mockPostureScore * 0.8)}분
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="text-sm text-gray-600">나쁜 자세</div>
              <div className="text-xl font-bold text-red-600">
                {Math.floor((100 - mockPostureScore) * 0.3)}분
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMonitoring && (
        <div className="text-center py-8">
          <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">모니터링을 시작하여 자세를 체크하세요</p>
        </div>
      )}
    </div>
  )
}