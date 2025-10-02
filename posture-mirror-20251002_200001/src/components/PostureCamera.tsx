import { useState, useRef, useEffect } from 'react'
import { Camera, CameraOff, RotateCcw, Info, Zap } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

export default function PostureCamera() {
  const [isActive, setIsActive] = useState(false)
  const [analysisMode, setAnalysisMode] = useState<'realtime' | 'photo'>('realtime')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentPosture, updatePosture, addToHistory } = usePostureStore()

  useEffect(() => {
    if (isActive && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => console.error('Camera access denied:', err))
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isActive])

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        analyzePosture()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isActive])

  const analyzePosture = () => {
    const mockScores = {
      neck: 70 + Math.random() * 30,
      shoulder: 70 + Math.random() * 30,
      spine: 70 + Math.random() * 30,
    }
    const avgScore = Math.round(
      (mockScores.neck + mockScores.shoulder + mockScores.spine) / 3
    )
    
    const newData = {
      score: avgScore,
      neck: Math.round(mockScores.neck),
      shoulder: Math.round(mockScores.shoulder),
      spine: Math.round(mockScores.spine),
      timestamp: new Date(),
    }
    
    updatePosture(newData)
    addToHistory(newData)
  }

  const getPostureColor = (score: number) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getPostureMessage = () => {
    if (currentPosture.score >= 85) return '완벽한 자세입니다! 👏'
    if (currentPosture.score >= 70) return '좋은 자세네요! 조금만 더 개선해보세요'
    return '자세 교정이 필요합니다 💪'
  }

  return (
    <div className="space-y-4">
      {/* Camera View */}
      <div className="glass-card p-4">
        <div className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden">
          {isActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              <canvas ref={canvasRef} className="absolute inset-0" />
              
              {/* Posture Guide Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <ellipse
                    cx="50%"
                    cy="25%"
                    rx="60"
                    ry="80"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                  <line
                    x1="50%"
                    y1="35%"
                    x2="50%"
                    y2="75%"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                </svg>
              </div>

              {/* Real-time Score */}
              <div className="absolute top-4 left-4 glass-card px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getPostureColor(currentPosture.score)} animate-pulse`} />
                  <span className="text-sm font-semibold text-white">
                    {currentPosture.score}점
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white">
              <CameraOff className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">카메라를 활성화하세요</p>
              <p className="text-sm opacity-75 mt-2">실시간 자세 분석 시작</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 ${isActive ? 'btn-secondary' : 'btn-primary'}`}
          >
            {isActive ? (
              <>
                <CameraOff className="w-5 h-5 inline mr-2" />
                정지
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 inline mr-2" />
                시작
              </>
            )}
          </button>
          <button
            onClick={analyzePosture}
            disabled={!isActive}
            className="btn-secondary"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Analysis */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-500" />
            실시간 분석
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentPosture.score >= 85 ? 'bg-green-100 text-green-700' :
            currentPosture.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {getPostureMessage()}
          </span>
        </div>

        <div className="analysis-grid">
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">목</p>
            <p className="text-2xl font-bold text-gray-800">{currentPosture.neck}</p>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div
                className={`h-full rounded-full ${getPostureColor(currentPosture.neck)}`}
                style={{ width: `${currentPosture.neck}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">어깨</p>
            <p className="text-2xl font-bold text-gray-800">{currentPosture.shoulder}</p>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div
                className={`h-full rounded-full ${getPostureColor(currentPosture.shoulder)}`}
                style={{ width: `${currentPosture.shoulder}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">척추</p>
            <p className="text-2xl font-bold text-gray-800">{currentPosture.spine}</p>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div
                className={`h-full rounded-full ${getPostureColor(currentPosture.spine)}`}
                style={{ width: `${currentPosture.spine}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">종합</p>
            <p className="text-2xl font-bold text-gray-800">{currentPosture.score}</p>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div
                className={`h-full rounded-full ${getPostureColor(currentPosture.score)}`}
                style={{ width: `${currentPosture.score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 p-3 bg-primary-50 rounded-lg flex items-start gap-2">
          <Info className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-primary-700">
            화면의 가이드라인에 맞춰 서서 전신이 보이도록 카메라를 조정하세요
          </p>
        </div>
      </div>
    </div>
  )
}