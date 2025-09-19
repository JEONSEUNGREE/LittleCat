import React from 'react'
import { Heart, Sparkles, Battery, Frown } from 'lucide-react'
import useHydroStore from '../store/useHydroStore'

const CharacterDisplay: React.FC = () => {
  const { characterMood, characterLevel, currentIntake, dailyGoal } = useHydroStore()
  
  const moodConfig = {
    thirsty: { 
      emoji: '😰', 
      message: 'I need water!', 
      color: 'text-red-500',
      icon: <Frown className="w-6 h-6" />
    },
    normal: { 
      emoji: '😊', 
      message: 'Feeling good!', 
      color: 'text-blue-500',
      icon: <Heart className="w-6 h-6" />
    },
    happy: { 
      emoji: '😄', 
      message: 'Perfectly hydrated!', 
      color: 'text-green-500',
      icon: <Sparkles className="w-6 h-6" />
    },
    energized: { 
      emoji: '🤩', 
      message: 'Super energized!', 
      color: 'text-purple-500',
      icon: <Battery className="w-6 h-6" />
    }
  }
  
  const config = moodConfig[characterMood]
  const healthPercentage = Math.min((currentIntake / dailyGoal) * 100, 100)
  
  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-hydro-800">Your Water Buddy</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-hydro-600">Level</span>
          <span className="bg-hydro-500 text-white px-3 py-1 rounded-full font-bold">
            {characterLevel}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="text-8xl animate-pulse-soft">{config.emoji}</div>
          <div className={`absolute -bottom-2 -right-2 ${config.color}`}>
            {config.icon}
          </div>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className={`text-lg font-semibold ${config.color}`}>
          {config.message}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-hydro-600">
          <span>Health</span>
          <span>{healthPercentage.toFixed(0)}%</span>
        </div>
        <div className="h-4 bg-hydro-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              healthPercentage > 75 ? 'bg-green-500' :
              healthPercentage > 50 ? 'bg-yellow-500' :
              healthPercentage > 25 ? 'bg-orange-500' :
              'bg-red-500'
            }`}
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-hydro-50 rounded-lg p-2">
          <div className="text-xs text-hydro-600">Mood</div>
          <div className="font-semibold capitalize text-hydro-800">
            {characterMood}
          </div>
        </div>
        <div className="bg-hydro-50 rounded-lg p-2">
          <div className="text-xs text-hydro-600">Energy</div>
          <div className="font-semibold text-hydro-800">
            {healthPercentage > 75 ? 'High' : healthPercentage > 40 ? 'Medium' : 'Low'}
          </div>
        </div>
        <div className="bg-hydro-50 rounded-lg p-2">
          <div className="text-xs text-hydro-600">Status</div>
          <div className="font-semibold text-hydro-800">
            {currentIntake >= dailyGoal ? 'Goal!' : 'Active'}
          </div>
        </div>
      </div>
    </div>
  )
}