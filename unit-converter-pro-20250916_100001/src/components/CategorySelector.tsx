import React from 'react'
import { conversionCategories } from '../data/conversionData'
import * as Icons from 'lucide-react'
import { useConverterStore } from '../store/useConverterStore'

const CategorySelector: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useConverterStore()
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Select Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.entries(conversionCategories).map(([key, category]) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as React.FC<any>
          const isSelected = selectedCategory === key
          
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-lg transition-all
                ${isSelected 
                  ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {IconComponent && <IconComponent size={24} className="mb-1" />}
              <span className="text-xs font-medium">{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategorySelector