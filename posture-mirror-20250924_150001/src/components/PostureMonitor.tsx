import React, { useEffect, useState } from 'react'
import { Camera, CameraOff, AlertCircle, CheckCircle, Activity } from 'lucide-react'
import usePostureStore from '../store/usePostureStore'

const PostureMonitor: React.FC = () => {
  const { 
    currentScore, 
    sessionActive, 
    startSession, 
    endSession, 
    updateScore,
    addPostureData 
  } = usePostureStore()
  
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (sessionActive) {
      const interval = setInterval(() => {
        const mockNeck = 75 + Math.random() * 25
        const mockShoulder = 70 + Math.random() * 30
        const mockBack = 80 + Math.random() * 20
        const newScore = Math.round((mockNeck + mockShoulder + mockBack) / 3)
        
        updateScore(newScore)
        setIsAnalyzing(true)
        
        setTimeout(() => setIsAnalyzing(false), 500)
        
        if (Math.random() > 0.7) {
          addPostureData({
            score: newScore,
            neck: mockNeck,
            shoulder: mockShoulder,
            back: mockBack
          })
        }
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [sessionActive, updateScore, addPostureData])

  const getScoreColor = () => {
    if (currentScore >= 85) return 'text-success'
    if (currentScore >= 70) return 'text-warning'
    return 'text-danger'
  }

  const getScoreMessage = () => {
    if (currentScore >= 85) return '훌륭한 자세입니다!'
    if (currentScore >= 70) return '자세를 조금 교정해보세요'
    return '자세 교정이 필요합니다'
  }

  const getPostureIcon = () => {
    if (currentScore >= 85) return <CheckCircle className="w-6 h-6 text-success" />
    if (currentScore >= 70) return <AlertCircle className="w-6 h-6 text-warning" />
    return <AlertCircle className="w-6 h-6 text-danger" />
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden relative">
          {sessionActive ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full border-8 ${getScoreColor()} border-current flex items-center justify-center ${isAnalyzing ? 'animate-pulse-slow' : ''}`}>
                  <span className={`text-4xl font-bold ${getScoreColor()}`}>
                    {currentScore}
                  </span>
                </div>
                {isAnalyzing && (
                  <Activity className="absolute -top-2 -right-2 w-6 h-6 text-primary-500 animate-bounce-slow" />
                )}
              </div>
              
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getPostureIcon()}
                  <span className="text-lg font-medium dark:text-gray-200">
                    {getScoreMessage()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">목</p>
                    <p className="text-lg font-semibold dark:text-gray-200">양호</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">어깨</p>
                    <p className="text-lg font-semibold dark:text-gray-200">주의</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">허리</p>
                    <p className="text-lg font-semibold dark:text-gray-200">양호</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <Camera className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
                카메라를 켜고 자세 분석을 시작하세요
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                AI가 실시간으로 자세를 분석합니다
              </p>
            </div>
          )}
        </div>
        
        <button
          onClick={sessionActive ? endSession : startSession}
          className={`mt-6 w-full py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
            sessionActive 
              ? 'bg-danger text-white hover:bg-danger/90' 
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          {sessionActive ? (
            <span className="flex items-center justify-center gap-2">
              <CameraOff className="w-5 h-5" />
              세션 종료
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" />
              자세 분석 시작
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default PostureMonitor