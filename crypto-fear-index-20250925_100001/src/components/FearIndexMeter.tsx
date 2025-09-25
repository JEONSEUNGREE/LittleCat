import { useFearIndexStore } from '../store/fearIndexStore'
import { TrendingDown, TrendingUp, Activity } from 'lucide-react'

const FearIndexMeter = () => {
  const { currentIndex, sentiment, lastUpdated } = useFearIndexStore()
  
  const getColorClass = (index: number) => {
    if (index <= 25) return 'text-red-500'
    if (index <= 45) return 'text-orange-500'
    if (index <= 55) return 'text-yellow-500'
    if (index <= 75) return 'text-lime-500'
    return 'text-green-500'
  }
  
  const getBackgroundGradient = (index: number) => {
    if (index <= 25) return 'from-red-500/20 to-red-600/20'
    if (index <= 45) return 'from-orange-500/20 to-orange-600/20'
    if (index <= 55) return 'from-yellow-500/20 to-yellow-600/20'
    if (index <= 75) return 'from-lime-500/20 to-lime-600/20'
    return 'from-green-500/20 to-green-600/20'
  }

  const getIcon = () => {
    if (currentIndex <= 35) return <TrendingDown className="w-8 h-8" />
    if (currentIndex >= 65) return <TrendingUp className="w-8 h-8" />
    return <Activity className="w-8 h-8" />
  }

  const getMeterRotation = () => {
    // Convert 0-100 to -90 to 90 degrees
    return (currentIndex * 1.8) - 90
  }

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient(currentIndex)} backdrop-blur-md rounded-2xl p-6 md:p-8`}>
      <div className="bg-white/10 rounded-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Fear & Greed Index
          </h2>
          <p className="text-gray-300 text-sm">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </p>
        </div>

        {/* Circular Meter */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"></div>
          
          {/* Gradient Ring */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-30"></div>
          
          {/* Inner Circle */}
          <div className="absolute inset-4 rounded-full bg-gray-900 flex flex-col items-center justify-center">
            <div className={`${getColorClass(currentIndex)} mb-2`}>
              {getIcon()}
            </div>
            <div className={`text-5xl font-bold ${getColorClass(currentIndex)}`}>
              {currentIndex}
            </div>
            <div className="text-white text-lg mt-2">{sentiment}</div>
          </div>
          
          {/* Pointer */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-24 bg-white origin-bottom -translate-x-1/2 -translate-y-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translate(-50%, -100%) rotate(${getMeterRotation()}deg)` }}
          >
            <div className="w-3 h-3 bg-white rounded-full absolute -top-2 -left-1"></div>
          </div>
        </div>

        {/* Scale Labels */}
        <div className="flex justify-between text-xs md:text-sm text-gray-300 px-4">
          <span className="text-red-400">Extreme Fear</span>
          <span className="text-orange-400">Fear</span>
          <span className="text-yellow-400">Neutral</span>
          <span className="text-lime-400">Greed</span>
          <span className="text-green-400">Extreme Greed</span>
        </div>

        {/* Description */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <p className="text-gray-300 text-sm md:text-base">
            {currentIndex <= 25 && "Markets are experiencing extreme fear. This could present buying opportunities for contrarian investors."}
            {currentIndex > 25 && currentIndex <= 45 && "Fear is prevalent in the market. Investors are cautious but not panicking."}
            {currentIndex > 45 && currentIndex <= 55 && "Market sentiment is balanced. Neither fear nor greed is dominating investor behavior."}
            {currentIndex > 55 && currentIndex <= 75 && "Greed is starting to drive the market. Consider taking some profits."}
            {currentIndex > 75 && "Extreme greed is present. Markets may be overheated and due for a correction."}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FearIndexMeter