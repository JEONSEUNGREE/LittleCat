import React from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { useConverterStore, Conversion } from '../store/useConverterStore'
import { unitCategories } from '../data/units'

export const RecentConversions: React.FC = () => {
  const { 
    recentConversions, 
    clearRecent,
    setSelectedCategory,
    setFromUnit,
    setToUnit
  } = useConverterStore()

  const handleSelect = (conversion: Conversion) => {
    setSelectedCategory(conversion.category)
    setFromUnit(conversion.fromUnit)
    setToUnit(conversion.toUnit)
  }

  if (recentConversions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Recent Conversions</h3>
        <p className="text-sm text-gray-500">
          Your conversion history will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-800">Recent</h2>
          <span className="text-sm text-gray-500">({recentConversions.length})</span>
        </div>
        <button
          onClick={clearRecent}
          className="
            text-sm text-gray-500 hover:text-red-500
            transition-colors duration-200
          "
        >
          Clear all
        </button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {recentConversions.slice(0, 10).map((conversion) => {
          const category = unitCategories[conversion.category]
          const fromUnit = category?.units[conversion.fromUnit]
          const toUnit = category?.units[conversion.toUnit]
          
          if (!category || !fromUnit || !toUnit) return null

          return (
            <div
              key={`${conversion.id}-${conversion.timestamp}`}
              className="
                flex items-center gap-3 p-3
                bg-gray-50 rounded-xl
                hover:bg-gray-100
                transition-colors duration-200
                cursor-pointer
              "
              onClick={() => handleSelect(conversion)}
            >
              <span className="text-lg">{category.icon}</span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">
                    {fromUnit.symbol}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">
                    {toUnit.symbol}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {new Date(conversion.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}