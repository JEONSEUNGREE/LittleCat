import React from 'react'
import { X, Coffee, Droplet, Milk, GlassWater, Soup } from 'lucide-react'
import useHydrationStore, { DrinkRecord } from '../store/useHydrationStore'

const DrinkHistory: React.FC = () => {
  const { drinks, removeDrink } = useHydrationStore()
  
  const getIcon = (type: DrinkRecord['type']) => {
    switch (type) {
      case 'water': return Droplet
      case 'coffee': return Coffee
      case 'tea': return GlassWater
      case 'milk': return Milk
      case 'juice': return Soup
      default: return Droplet
    }
  }
  
  const getColor = (type: DrinkRecord['type']) => {
    switch (type) {
      case 'water': return 'text-blue-500'
      case 'coffee': return 'text-amber-600'
      case 'tea': return 'text-green-500'
      case 'milk': return 'text-purple-500'
      case 'juice': return 'text-orange-500'
      default: return 'text-gray-500'
    }
  }
  
  const getTypeName = (type: DrinkRecord['type']) => {
    switch (type) {
      case 'water': return '물'
      case 'coffee': return '커피'
      case 'tea': return '차'
      case 'milk': return '우유'
      case 'juice': return '주스'
      default: return '기타'
    }
  }
  
  const formatTime = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }
  
  const sortedDrinks = [...drinks].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  
  if (drinks.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">오늘의 기록</h3>
        <div className="text-center py-8 text-gray-400">
          <Droplet className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>아직 기록이 없어요</p>
          <p className="text-sm mt-1">위 버튼을 눌러 수분 섭취를 기록하세요</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">오늘의 기록</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {sortedDrinks.map((drink) => {
          const Icon = getIcon(drink.type)
          return (
            <div
              key={drink.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${getColor(drink.type)}`} />
                <div>
                  <span className="font-medium text-gray-800">
                    {drink.amount}ml {getTypeName(drink.type)}
                  </span>
                  <p className="text-xs text-gray-500">{formatTime(drink.timestamp)}</p>
                </div>
              </div>
              <button
                onClick={() => removeDrink(drink.id)}
                className="p-1 hover:bg-red-100 rounded-lg transition-colors group"
              >
                <X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DrinkHistory