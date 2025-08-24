import React from 'react'
import { Star, Trash2, ArrowRight } from 'lucide-react'
import { useConverterStore, Conversion } from '../store/useConverterStore'
import { unitCategories } from '../data/units'

export const Favorites: React.FC = () => {
  const { 
    favorites, 
    removeFromFavorites,
    setSelectedCategory,
    setFromUnit,
    setToUnit
  } = useConverterStore()

  const handleSelect = (favorite: Conversion) => {
    setSelectedCategory(favorite.category)
    setFromUnit(favorite.fromUnit)
    setToUnit(favorite.toUnit)
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Favorites Yet</h3>
        <p className="text-sm text-gray-500">
          Star your frequently used conversions to access them quickly
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <h2 className="text-lg font-semibold text-gray-800">Favorites</h2>
        <span className="text-sm text-gray-500">({favorites.length}/10)</span>
      </div>
      
      <div className="space-y-2">
        {favorites.map((favorite) => {
          const category = unitCategories[favorite.category]
          const fromUnit = category?.units[favorite.fromUnit]
          const toUnit = category?.units[favorite.toUnit]
          
          if (!category || !fromUnit || !toUnit) return null

          return (
            <div
              key={favorite.id}
              className="
                flex items-center gap-3 p-3
                bg-gray-50 rounded-xl
                hover:bg-gray-100
                transition-colors duration-200
                group cursor-pointer
              "
              onClick={() => handleSelect(favorite)}
            >
              <span className="text-xl">{category.icon}</span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">
                    {fromUnit.name}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="font-medium text-gray-700">
                    {toUnit.name}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {category.name}
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFromFavorites(favorite.id)
                }}
                className="
                  p-1.5 rounded-lg
                  text-gray-400 hover:text-red-500
                  hover:bg-red-50
                  opacity-0 group-hover:opacity-100
                  transition-all duration-200
                "
                aria-label="Remove from favorites"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}