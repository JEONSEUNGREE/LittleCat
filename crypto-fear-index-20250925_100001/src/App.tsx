import { useState, useEffect } from 'react'
import FearIndexMeter from './components/FearIndexMeter'
import MarketInsights from './components/MarketInsights'
import HistoricalChart from './components/HistoricalChart'
import { useFearIndexStore } from './store/fearIndexStore'
import { TrendingUp, AlertTriangle, Info } from 'lucide-react'

function App() {
  const { currentIndex, sentiment, updateIndex, addHistoricalData } = useFearIndexStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get Fear & Greed Index
    const fetchIndex = () => {
      const mockIndex = Math.floor(Math.random() * 100)
      updateIndex(mockIndex)
      addHistoricalData({
        date: new Date().toISOString(),
        value: mockIndex,
        sentiment: getSentimentFromIndex(mockIndex)
      })
      setIsLoading(false)
    }

    fetchIndex()
    const interval = setInterval(fetchIndex, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [updateIndex, addHistoricalData])

  const getSentimentFromIndex = (index: number): string => {
    if (index <= 25) return 'Extreme Fear'
    if (index <= 45) return 'Fear'
    if (index <= 55) return 'Neutral'
    if (index <= 75) return 'Greed'
    return 'Extreme Greed'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading Market Data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center py-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Crypto Fear & Greed Index
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Real-time market sentiment analysis
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fear Index Meter - Takes full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2">
            <FearIndexMeter />
          </div>

          {/* Quick Stats - Side panel on desktop */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Quick Stats
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-300">Current Index</p>
                <p className="text-2xl font-bold">{currentIndex}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-300">Market Sentiment</p>
                <p className="text-xl font-semibold text-yellow-400">{sentiment}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-300">24h Change</p>
                <p className="text-lg flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">+5%</span>
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-sm text-gray-300">Alert Level</p>
                <div className="flex items-center gap-2 mt-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <HistoricalChart />
          <MarketInsights />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-12 pb-6">
          <p>Data updates every 30 seconds | Not financial advice</p>
        </footer>
      </div>
    </div>
  )
}

export default App