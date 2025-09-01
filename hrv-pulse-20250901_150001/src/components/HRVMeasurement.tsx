import { useState, useEffect } from 'react'
import { Heart, Play, Square, Loader2 } from 'lucide-react'
import { useHRVStore } from '../store/hrvStore'

export default function HRVMeasurement() {
  const { isMessuring, startMeasuring, stopMeasuring, addMeasurement } = useHRVStore()
  const [simulatedHRV, setSimulatedHRV] = useState(0)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isMessuring && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1)
        // Simulate HRV fluctuation during measurement
        setSimulatedHRV(Math.floor(Math.random() * 20) + 45)
      }, 1000)
    } else if (isMessuring && countdown === 0) {
      // Measurement complete
      const finalHRV = Math.floor(Math.random() * 30) + 40
      addMeasurement(finalHRV)
      stopMeasuring()
      setSimulatedHRV(finalHRV)
    }

    return () => clearInterval(interval)
  }, [isMessuring, countdown, addMeasurement, stopMeasuring])

  const handleStartMeasurement = () => {
    startMeasuring()
    setCountdown(30) // 30 seconds measurement
    setSimulatedHRV(0)
  }

  const handleStopMeasurement = () => {
    stopMeasuring()
    setCountdown(0)
    setSimulatedHRV(0)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">HRV 측정</h2>
        <Heart className="w-6 h-6 text-primary animate-pulse" />
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        {!isMessuring && simulatedHRV === 0 && (
          <>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-600 text-center mb-6">
              편안한 자세로 앉아 심호흡을 하며<br />
              측정 버튼을 눌러주세요
            </p>
            <button
              onClick={handleStartMeasurement}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>측정 시작</span>
            </button>
          </>
        )}

        {isMessuring && (
          <>
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                  <span className="text-2xl font-bold text-dark">{countdown}s</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-center mb-2">측정 중...</p>
            <p className="text-3xl font-bold text-primary mb-6">
              {simulatedHRV > 0 ? `${simulatedHRV}ms` : '---'}
            </p>
            <button
              onClick={handleStopMeasurement}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Square className="w-5 h-5" />
              <span>측정 중지</span>
            </button>
          </>
        )}

        {!isMessuring && simulatedHRV > 0 && (
          <>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-white">{simulatedHRV}ms</span>
            </div>
            <p className="text-gray-600 text-center mb-6">
              측정이 완료되었습니다!<br />
              HRV 값이 기록되었습니다.
            </p>
            <button
              onClick={handleStartMeasurement}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>다시 측정</span>
            </button>
          </>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">측정 팁:</span> 조용한 환경에서 편안하게 앉아 
          규칙적으로 호흡하며 측정하세요. 아침 기상 직후가 가장 정확합니다.
        </p>
      </div>
    </div>
  )
}