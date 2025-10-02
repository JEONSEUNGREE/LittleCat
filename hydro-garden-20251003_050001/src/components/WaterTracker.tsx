import React from 'react'
import { Droplets, Target, Flame, Plus, Minus } from 'lucide-react'
import useHydrationStore from '../store/useHydrationStore'

const WaterTracker: React.FC = () => {
  const { 
    currentIntake, 
    dailyGoal, 
    streakDays,
    addWater,
    setDailyGoal 
  } = useHydrationStore()
  
  const [customAmount, setCustomAmount] = React.useState(250)
  const percentage = Math.min((currentIntake / dailyGoal) * 100, 150)
  
  const waterOptions = [200, 250, 350, 500]

  const handleAddWater = (amount: number) => {
    addWater(amount)
    
    // 물방울 애니메이션
    const droplet = document.createElement('div')
    droplet.className = 'fixed text-4xl animate-water-drop pointer-events-none z-50'
    droplet.innerText = '💧'
    droplet.style.left = `${Math.random() * 80 + 10}%`
    droplet.style.top = '40%'
    document.body.appendChild(droplet)
    setTimeout(() => droplet.remove(), 1000)
  }

  const adjustGoal = (change: number) => {
    const newGoal = Math.max(500, Math.min(5000, dailyGoal + change))
    setDailyGoal(newGoal)
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Droplets className="text-water-blue" />
          오늘의 수분 섭취
        </h2>
        <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold">{streakDays}일 연속</span>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-3xl font-bold text-water-blue">{currentIntake}ml</span>
          <span className="text-gray-600">/ {dailyGoal}ml</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-water-blue to-blue-400 h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 20 && (
              <span className="text-white text-sm font-semibold">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            {percentage < 20 && (
              <span className="text-gray-700 text-sm font-semibold">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {waterOptions.map(amount => (
          <button
            key={amount}
            onClick={() => handleAddWater(amount)}
            className="bg-sky-light hover:bg-water-blue hover:text-white transition-all p-3 rounded-lg font-semibold"
          >
            +{amount}ml
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={customAmount}
          onChange={(e) => setCustomAmount(Number(e.target.value))}
          className="flex-1"
        />
        <button
          onClick={() => handleAddWater(customAmount)}
          className="bg-water-blue text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors min-w-[100px]"
        >
          +{customAmount}ml
        </button>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 flex items-center gap-2">
            <Target className="w-4 h-4" />
            일일 목표
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustGoal(-250)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold w-20 text-center">{dailyGoal}ml</span>
            <button
              onClick={() => adjustGoal(250)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}