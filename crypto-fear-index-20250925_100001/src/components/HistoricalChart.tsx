import { useEffect, useState } from 'react'
import { useFearIndexStore } from '../store/fearIndexStore'
import { BarChart3, Clock } from 'lucide-react'

const HistoricalChart = () => {
  const { historicalData, addHistoricalData } = useFearIndexStore()
  const [timeframe, setTimeframe] = useState<'1H' | '6H' | '1D'>('1H')

  useEffect(() => {
    // Generate mock historical data on mount
    if (historicalData.length === 0) {
      const now = new Date()
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 60000) // 1 minute intervals
        const value = 30 + Math.floor(Math.random() * 40)
        addHistoricalData({
          date: date.toISOString(),
          value,
          sentiment: value <= 25 ? 'Extreme Fear' :
                     value <= 45 ? 'Fear' :
                     value <= 55 ? 'Neutral' :
                     value <= 75 ? 'Greed' :
                     'Extreme Greed'
        })
      }
    }
  }, [historicalData.length, addHistoricalData])

  const getBarColor = (value: number) => {
    if (value <= 25) return 'bg-red-500'
    if (value <= 45) return 'bg-orange-500'
    if (value <= 55) return 'bg-yellow-500'
    if (value <= 75) return 'bg-lime-500'
    return 'bg-green-500'
  }

  const maxValue = Math.max(...historicalData.map(d => d.value), 100)

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Historical Data
        </h3>
        
        <div className="flex gap-2">
          {(['1H', '6H', '1D'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                timeframe === tf 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="bg-white/5 rounded-lg p-4 h-64">
        {historicalData.length > 0 ? (
          <div className="h-full flex items-end justify-between gap-1">
            {historicalData.slice(-20).map((data, index) => {
              const height = (data.value / maxValue) * 100
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center justify-end group relative"
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                    <div className="font-semibold">{data.value}</div>
                    <div className="text-gray-400">{data.sentiment}</div>
                  </div>
                  
                  {/* Bar */}
                  <div
                    className={`w-full ${getBarColor(data.value)} rounded-t transition-all duration-300 hover:opacity-80`}
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <Clock className="w-6 h-6 mr-2" />
            Loading historical data...
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-300">Extreme Fear (0-25)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-300">Fear (26-45)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-300">Neutral (46-55)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-lime-500 rounded"></div>
          <span className="text-gray-300">Greed (56-75)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-300">Extreme Greed (76-100)</span>
        </div>
      </div>
    </div>
  )
}

export default HistoricalChart