import React, { useState } from 'react'
import { Droplet, Plus, Target, Trophy, Coffee, Leaf, Glass } from 'lucide-react'
import { useWaterStore } from '../store/useWaterStore'

const drinkOptions = [
  { type: 'water' as const, label: '물', icon: Droplet, amount: 250, color: 'from-blue-400 to-blue-600' },
  { type: 'coffee' as const, label: '커피', icon: Coffee, amount: 200, color: 'from-amber-600 to-amber-800' },
  { type: 'tea' as const, label: '차', icon: Leaf, amount: 200, color: 'from-green-500 to-green-700' },
  { type: 'juice' as const, label: '주스', icon: Glass, amount: 250, color: 'from-orange-400 to-orange-600' },
]

export const WaterTracker: React.FC = () => {
  const { profile, currentIntake, dailyGoal, addWaterEntry, getHydrationPercentage } = useWaterStore()
  const [customAmount, setCustomAmount] = useState('')
  const [selectedType, setSelectedType] = useState<'water' | 'coffee' | 'tea' | 'juice'>('water')
  const hydrationPercentage = getHydrationPercentage()

  const handleQuickAdd = (amount: number, type: 'water' | 'coffee' | 'tea' | 'juice') => {
    addWaterEntry(amount, type)
  }

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount)
    if (amount > 0) {
      addWaterEntry(amount, selectedType)
      setCustomAmount('')
    }
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="text-center mb-8 animate-drop">
        <h1 className="text-3xl font-bold text-white mb-2">
          안녕하세요, {profile?.name}님! 👋
        </h1>
        <p className="text-white/80">오늘도 건강한 하루 되세요</p>
      </div>

      {/* Main Water Glass */}
      <div className="max-w-sm mx-auto mb-8">
        <div className="relative bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
          <div className="relative h-64 w-full bg-white/30 rounded-2xl overflow-hidden">
            {/* Water fill animation */}
            <div 
              className="absolute bottom-0 w-full bg-gradient-to-t from-water-dark to-water-light transition-all duration-1000 water-fill"
              style={{ height: `${Math.min(100, hydrationPercentage)}%` }}
            />
            
            {/* Percentage display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white drop-shadow-lg">
                  {hydrationPercentage}%
                </div>
                <div className="text-white/90 mt-2">
                  {currentIntake}ml / {dailyGoal}ml
                </div>
              </div>
            </div>

            {/* Trophy icon when goal is reached */}
            {hydrationPercentage >= 100 && (
              <Trophy className="absolute top-4 right-4 w-8 h-8 text-yellow-400 animate-bounce" />
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-white mb-2">
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                일일 목표
              </span>
              <span className="font-semibold">{dailyGoal}ml</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-water-light to-water-blue transition-all duration-500"
                style={{ width: `${Math.min(100, hydrationPercentage)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="max-w-md mx-auto">
        <h3 className="text-white font-semibold mb-3">빠른 추가</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {drinkOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.type}
                onClick={() => handleQuickAdd(option.amount, option.type)}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-gray-800 font-medium">{option.label}</div>
                <div className="text-gray-500 text-sm">{option.amount}ml</div>
              </button>
            )
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl">
          <h3 className="text-gray-800 font-semibold mb-3">직접 입력</h3>
          <div className="flex gap-2">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-blue focus:border-transparent"
            >
              {drinkOptions.map(option => (
                <option key={option.type} value={option.type}>{option.label}</option>
              ))}
            </select>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="ml"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-blue focus:border-transparent"
              min="0"
              max="1000"
            />
            <button
              onClick={handleCustomAdd}
              disabled={!customAmount || parseInt(customAmount) <= 0}
              className="px-6 py-2 bg-water-blue text-white rounded-lg hover:bg-water-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}