import { Coffee, Droplets, Wine, Milk } from 'lucide-react'
import { useWaterStore } from '../store/waterStore'

const drinkOptions = [
  { icon: Droplets, type: 'water', amount: 250, label: '물 250ml', color: 'text-blue-500' },
  { icon: Coffee, type: 'coffee', amount: 150, label: '커피 150ml', color: 'text-amber-700' },
  { icon: Wine, type: 'juice', amount: 200, label: '주스 200ml', color: 'text-orange-500' },
  { icon: Milk, type: 'milk', amount: 200, label: '우유 200ml', color: 'text-gray-100' },
]

export default function QuickAdd() {
  const { addWater } = useWaterStore()
  const [customAmount, setCustomAmount] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  const handleQuickAdd = (amount: number, type: string) => {
    addWater(amount, type)
    // Add animation feedback
    const button = event?.currentTarget as HTMLButtonElement
    if (button) {
      button.classList.add('scale-95')
      setTimeout(() => button.classList.remove('scale-95'), 200)
    }
  }

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount)
    if (amount > 0 && amount <= 2000) {
      addWater(amount, 'water')
      setCustomAmount('')
      setShowCustom(false)
    }
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">빠른 추가</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        {drinkOptions.map((option) => {
          const Icon = option.icon
          return (
            <button
              key={option.type}
              onClick={() => handleQuickAdd(option.amount, option.type)}
              className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all transform hover:scale-105"
            >
              <Icon className={`w-5 h-5 ${option.color}`} />
              <span className="text-sm font-medium text-gray-700">{option.label}</span>
            </button>
          )
        })}
      </div>

      {showCustom ? (
        <div className="flex gap-2">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="ml 입력"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-water-500"
            min="1"
            max="2000"
          />
          <button
            onClick={handleCustomAdd}
            className="px-4 py-2 bg-water-500 text-white rounded-lg hover:bg-water-600"
          >
            추가
          </button>
          <button
            onClick={() => {
              setShowCustom(false)
              setCustomAmount('')
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowCustom(true)}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-water-500 hover:text-water-500 transition-colors"
        >
          + 직접 입력
        </button>
      )}
    </div>
  )
}

import { useState } from 'react'