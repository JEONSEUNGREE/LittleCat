import React from 'react'
import { Plus, Coffee, Droplet, Leaf, Wine } from 'lucide-react'
import { useHydrationStore } from '../store/hydrationStore'

const QuickAdd: React.FC = () => {
  const addDrink = useHydrationStore((state) => state.addDrink)
  
  const drinkOptions = [
    { amount: 250, type: 'water' as const, icon: Droplet, label: '250ml 물', color: 'bg-blue-500' },
    { amount: 200, type: 'coffee' as const, icon: Coffee, label: '200ml 커피', color: 'bg-amber-600' },
    { amount: 300, type: 'tea' as const, icon: Leaf, label: '300ml 차', color: 'bg-green-500' },
    { amount: 250, type: 'juice' as const, icon: Wine, label: '250ml 주스', color: 'bg-orange-500' },
  ]
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">빠른 추가</h2>
      <div className="grid grid-cols-2 gap-3">
        {drinkOptions.map((option) => {
          const Icon = option.icon
          return (
            <button
              key={`${option.type}-${option.amount}`}
              onClick={() => addDrink(option.amount, option.type)}
              className={`${option.color} text-white rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform active:scale-95`}
            >
              <Icon size={28} />
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          )
        })}
      </div>
      
      <div className="mt-4 flex gap-2">
        <input
          type="number"
          placeholder="직접 입력 (ml)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const input = e.target as HTMLInputElement
              const amount = parseInt(input.value)
              if (amount > 0) {
                addDrink(amount, 'water')
                input.value = ''
              }
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input[type="number"]') as HTMLInputElement
            const amount = parseInt(input.value)
            if (amount > 0) {
              addDrink(amount, 'water')
              input.value = ''
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  )
}

export default QuickAdd