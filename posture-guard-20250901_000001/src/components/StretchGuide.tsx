import { useState } from 'react'
import usePostureStore from '../store/postureStore'
import { Play, CheckCircle, Clock, ChevronRight } from 'lucide-react'

export default function StretchGuide() {
  const { stretches, completeStretch } = usePostureStore()
  const [activeStretch, setActiveStretch] = useState<string | null>(null)
  const [completedStretches, setCompletedStretches] = useState<Set<string>>(new Set())

  const handleStartStretch = (stretchId: string) => {
    setActiveStretch(stretchId)
    const stretch = stretches.find(s => s.id === stretchId)
    
    if (stretch) {
      setTimeout(() => {
        completeStretch(stretchId)
        setCompletedStretches(prev => new Set([...prev, stretchId]))
        setActiveStretch(null)
      }, stretch.duration * 1000)
    }
  }

  const getStretchIcon = (stretchName: string) => {
    const icons: { [key: string]: string } = {
      '목 스트레칭': '🦒',
      '어깨 돌리기': '💪',
      '허리 스트레칭': '🧘',
      '손목 스트레칭': '✋',
      '등 펴기': '🏋️'
    }
    return icons[stretchName] || '🤸'
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          스트레칭 가이드
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          정기적인 스트레칭으로 건강한 자세를 유지하세요
        </p>
      </div>

      <div className="space-y-3">
        {stretches.map((stretch) => {
          const isActive = activeStretch === stretch.id
          const isCompleted = completedStretches.has(stretch.id)

          return (
            <div
              key={stretch.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md transition-all ${
                isActive ? 'ring-2 ring-purple-600 scale-105' : ''
              } ${isCompleted ? 'opacity-75' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-2xl">{getStretchIcon(stretch.name)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {stretch.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {stretch.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {stretch.duration}초
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleStartStretch(stretch.id)}
                  disabled={isActive || isCompleted}
                  className={`ml-3 p-2 rounded-full transition-colors ${
                    isActive 
                      ? 'bg-purple-600 text-white animate-pulse' 
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : isActive ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>

              {isActive && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full animate-pulse"
                      style={{
                        animation: `progress ${stretch.duration}s linear`,
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {completedStretches.size === stretches.length && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            모든 스트레칭 완료!
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            다음 세션에서 다시 시작하세요
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}