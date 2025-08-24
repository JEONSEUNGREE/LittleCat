import React from 'react'
import { Droplet, Plus, Minus } from 'lucide-react'
import useWaterStore from '../store/waterStore'

const WaterTracker: React.FC = () => {
  const { getTodayTotal, dailyGoal, addWaterIntake, rhythmScore } = useWaterStore()
  const [amount, setAmount] = React.useState(250)
  
  const todayTotal = getTodayTotal()
  const percentage = Math.min((todayTotal / dailyGoal) * 100, 100)
  const fillHeight = `${percentage}%`
  
  const handleAddWater = () => {
    addWaterIntake(amount)
  }
  
  const adjustAmount = (delta: number) => {
    setAmount(prev => Math.max(50, Math.min(1000, prev + delta)))
  }
  
  return (
    <div className="glass rounded-3xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Today's Hydration</h2>
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-blue-300" />
          <span className="text-white font-medium">{todayTotal} / {dailyGoal} ml</span>
        </div>
      </div>
      
      {/* Water Glass Visual */}
      <div className="relative mx-auto w-40 h-48 mb-6">
        <div className="absolute inset-0 bg-white/10 rounded-b-3xl border-2 border-white/30 overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 right-0 water-wave transition-all duration-1000 ease-out"
            style={{ height: fillHeight }}
          >
            <div className="absolute inset-0 animate-wave opacity-50"></div>
          </div>
        </div>
        
        {/* Percentage Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-white drop-shadow-lg">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      
      {/* Rhythm Score */}
      <div className="text-center mb-6">
        <p className="text-sm text-white/70 mb-1">Rhythm Score</p>
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-8 rounded-full transition-all ${
                  i < Math.floor(rhythmScore / 20)
                    ? 'bg-blue-400 animate-pulse-slow'
                    : 'bg-white/20'
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: `${20 + (i * 4)}px`
                }}
              />
            ))}
          </div>
          <span className="text-xl font-bold text-white ml-2">{rhythmScore}</span>
        </div>
      </div>
      
      {/* Amount Selector */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => adjustAmount(-50)}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          <Minus className="w-5 h-5 text-white" />
        </button>
        
        <div className="text-center">
          <p className="text-3xl font-bold text-white">{amount}</p>
          <p className="text-sm text-white/70">ml</p>
        </div>
        
        <button
          onClick={() => adjustAmount(50)}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Add Water Button */}
      <button
        onClick={handleAddWater}
        className="w-full py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <Droplet className="w-5 h-5" />
        Add Water
      </button>
    </div>
  )
}

export default WaterTracker