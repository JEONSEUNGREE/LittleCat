import React from 'react'
import { Droplets, TrendingUp, Award, Clock } from 'lucide-react'
import useHydroStore from '../store/useHydroStore'

const HydrationTracker: React.FC = () => {
  const { 
    currentIntake, 
    dailyGoal, 
    streakDays,
    lastDrinkTime,
    drinkWater 
  } = useHydroStore()
  
  const percentage = Math.min((currentIntake / dailyGoal) * 100, 150)
  const timeSinceLastDrink = lastDrinkTime 
    ? Math.floor((Date.now() - lastDrinkTime) / 1000 / 60) 
    : null
  
  const quickDrinkAmounts = [100, 250, 350, 500]
  
  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-hydro-800 flex items-center gap-2">
          <Droplets className="w-8 h-8" />
          Hydration Status
        </h2>
        <div className="flex items-center gap-2 text-hydro-600">
          <Award className="w-5 h-5" />
          <span className="font-semibold">{streakDays} day streak</span>
        </div>
      </div>
      
      <div className="relative h-64 bg-gradient-to-t from-hydro-100 to-hydro-50 rounded-2xl overflow-hidden mb-6">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-hydro-500 to-hydro-300 transition-all duration-1000 ease-out"
          style={{ height: `${percentage}%` }}
        >
          <div className="absolute top-0 left-0 right-0 h-8 opacity-50">
            <div className="h-full bg-white/20 animate-water-wave"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-5xl font-bold mb-2">
            {currentIntake} ml
          </div>
          <div className="text-lg opacity-90">
            of {dailyGoal} ml goal
          </div>
          <div className="text-2xl font-semibold mt-2">
            {percentage.toFixed(0)}%
          </div>
        </div>
        
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/30 rounded-full animate-bubble"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        {quickDrinkAmounts.map(amount => (
          <button
            key={amount}
            onClick={() => drinkWater(amount)}
            className="py-3 px-2 bg-hydro-500 text-white rounded-lg font-semibold hover:bg-hydro-600 transition-colors"
          >
            {amount}ml
          </button>
        ))}
      </div>
      
      {timeSinceLastDrink !== null && (
        <div className="flex items-center justify-center gap-2 text-hydro-600 text-sm">
          <Clock className="w-4 h-4" />
          <span>
            Last drink: {timeSinceLastDrink < 60 
              ? `${timeSinceLastDrink} min ago`
              : `${Math.floor(timeSinceLastDrink / 60)} hours ago`}
          </span>
        </div>
      )}
      
      <div className="flex items-center justify-center gap-2 mt-4 text-hydro-600">
        <TrendingUp className="w-5 h-5" />
        <span className="text-sm">
          {percentage >= 100 
            ? "Great job! Goal achieved!" 
            : `${dailyGoal - currentIntake}ml to reach your goal`}
        </span>
      </div>
    </div>
  )
}