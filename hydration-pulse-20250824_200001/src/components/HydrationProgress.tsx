import React from 'react'
import { TrendingUp, Target, Droplets } from 'lucide-react'
import { useHydrationStore } from '../store/hydrationStore'
import WaterDroplet from './WaterDroplet'

const HydrationProgress: React.FC = () => {
  const { todayIntake, dailyGoal, hydrationLevel } = useHydrationStore()
  
  const getHydrationMessage = () => {
    if (hydrationLevel < 25) return '물을 마실 시간이에요! 💧'
    if (hydrationLevel < 50) return '좋은 시작이에요! 계속해요! 🌊'
    if (hydrationLevel < 75) return '잘하고 있어요! 조금만 더! 💪'
    if (hydrationLevel < 100) return '거의 다 왔어요! 🎯'
    return '목표 달성! 훌륭해요! 🎉'
  }
  
  const getHydrationColor = () => {
    if (hydrationLevel < 25) return 'text-red-500'
    if (hydrationLevel < 50) return 'text-orange-500'
    if (hydrationLevel < 75) return 'text-yellow-500'
    return 'text-green-500'
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">오늘의 수분 섭취</h2>
        <Droplets className="text-blue-500" size={24} />
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <WaterDroplet size={150} filled={hydrationLevel > 0} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getHydrationColor()}`}>
              {hydrationLevel}%
            </span>
          </div>
        </div>
        
        <div className="w-full mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{todayIntake}ml</span>
            <span>{dailyGoal}ml</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 animate-pulse-ring"
              style={{ width: `${Math.min(100, hydrationLevel)}%` }}
            />
          </div>
        </div>
        
        <p className={`text-center font-medium ${getHydrationColor()}`}>
          {getHydrationMessage()}
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Target className="text-blue-500" size={20} />
            <div>
              <p className="text-xs text-gray-600">목표</p>
              <p className="font-bold text-gray-800">{dailyGoal}ml</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <TrendingUp className="text-green-500" size={20} />
            <div>
              <p className="text-xs text-gray-600">달성률</p>
              <p className="font-bold text-gray-800">{hydrationLevel}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HydrationProgress