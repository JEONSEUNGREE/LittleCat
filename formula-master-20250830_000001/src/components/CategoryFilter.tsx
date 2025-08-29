import React from 'react'
import { Calculator, Atom, Flask, Grid3x3 } from 'lucide-react'
import useFormulaStore from '../store/useFormulaStore'

const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useFormulaStore()

  const categories = [
    { id: 'all', name: '전체', icon: Grid3x3, color: 'bg-gray-500' },
    { id: 'math', name: '수학', icon: Calculator, color: 'bg-blue-500' },
    { id: 'physics', name: '물리', icon: Atom, color: 'bg-purple-500' },
    { id: 'chemistry', name: '화학', icon: Flask, color: 'bg-green-500' }
  ] as const

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">카테고리 선택</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                isSelected 
                  ? `${category.color} text-white shadow-lg scale-105` 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon size={24} />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter