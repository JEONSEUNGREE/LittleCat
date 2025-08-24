import React from 'react'
import { unitCategories } from '../data/units'
import { useConverterStore } from '../store/useConverterStore'

export const CategorySelector: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useConverterStore()

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max px-4 sm:px-0">
        {Object.entries(unitCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium
              transition-all duration-200 whitespace-nowrap
              ${selectedCategory === key 
                ? 'bg-primary-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="text-sm font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}