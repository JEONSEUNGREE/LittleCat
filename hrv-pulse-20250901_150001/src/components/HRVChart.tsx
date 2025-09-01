import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useHRVStore } from '../store/hrvStore'

export default function HRVChart() {
  const { measurements } = useHRVStore()
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([])

  useEffect(() => {
    // Get last 24 hours of data
    const now = new Date()
    const last24Hours = measurements
      .filter(m => m.timestamp.getTime() > now.getTime() - 24 * 60 * 60 * 1000)
      .slice(0, 12) // Show last 12 measurements
      .reverse()
      .map(m => ({
        time: m.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        value: m.value
      }))
    
    setChartData(last24Hours)
  }, [measurements])

  const maxValue = Math.max(...chartData.map(d => d.value), 80)
  const minValue = Math.min(...chartData.map(d => d.value), 20)
  const range = maxValue - minValue

  const getTrend = () => {
    if (chartData.length < 2) return 'stable'
    const recent = chartData.slice(-3).reduce((sum, d) => sum + d.value, 0) / 3
    const previous = chartData.slice(0, 3).reduce((sum, d) => sum + d.value, 0) / 3
    if (recent > previous + 5) return 'up'
    if (recent < previous - 5) return 'down'
    return 'stable'
  }

  const trend = getTrend()

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">24시간 HRV 추이</h2>
        <div className="flex items-center space-x-2">
          {trend === 'up' && (
            <>
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-500 font-medium">상승 추세</span>
            </>
          )}
          {trend === 'down' && (
            <>
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-500 font-medium">하락 추세</span>
            </>
          )}
          {trend === 'stable' && (
            <>
              <Minus className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500 font-medium">안정적</span>
            </>
          )}
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => {
              const height = ((data.value - minValue) / range) * 100
              const isHighStress = data.value < 40
              const isMediumStress = data.value >= 40 && data.value < 60
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex justify-center mb-2">
                    <span className="text-xs font-medium text-gray-700">
                      {data.value}
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isHighStress 
                        ? 'bg-gradient-to-t from-red-500 to-red-400' 
                        : isMediumStress 
                        ? 'bg-gradient-to-t from-yellow-500 to-yellow-400'
                        : 'bg-gradient-to-t from-green-500 to-green-400'
                    }`}
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  />
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">{data.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">측정 데이터가 없습니다</p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">낮은 스트레스</span>
          </div>
          <p className="text-sm font-semibold text-gray-700">60ms 이상</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">보통 스트레스</span>
          </div>
          <p className="text-sm font-semibold text-gray-700">40-60ms</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">높은 스트레스</span>
          </div>
          <p className="text-sm font-semibold text-gray-700">40ms 미만</p>
        </div>
      </div>
    </div>
  )
}