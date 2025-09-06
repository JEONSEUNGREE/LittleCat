import React from 'react'
import { Coffee, Droplet, Milk, GlassWater, Soup, Plus } from 'lucide-react'
import useHydrationStore from '../store/useHydrationStore'

const QuickAddButtons: React.FC = () => {
  const addDrink = useHydrationStore((state) => state.addDrink)
  
  const drinkOptions = [
    { amount: 250, type: 'water' as const, icon: Droplet, label: '250ml 물', color: 'bg-blue-500' },
    { amount: 200, type: 'coffee' as const, icon: Coffee, label: '200ml 커피', color: 'bg-amber-600' },
    { amount: 300, type: 'tea' as const, icon: GlassWater, label: '300ml 차', color: 'bg-green-500' },
    { amount: 250, type: 'milk' as const, icon: Milk, label: '250ml 우유', color: 'bg-purple-500' },
    { amount: 200, type: 'juice' as const, icon: Soup, label: '200ml 주스', color: 'bg-orange-500' },
    { amount: 500, type: 'water' as const, icon: Plus, label: '500ml 물', color: 'bg-cyan-500' }
  ]
  
  const handleAddDrink = (amount: number, type: typeof drinkOptions[0]['type']) => {
    addDrink(amount, type)
    
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }
  
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {drinkOptions.map((option, index) => {
        const Icon = option.icon
        return (
          <button
            key={index}
            onClick={() => handleAddDrink(option.amount, option.type)}
            className={`${option.color} text-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
          >
            <Icon className="w-8 h-8" />
            <span className="text-xs font-medium">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default QuickAddButtons