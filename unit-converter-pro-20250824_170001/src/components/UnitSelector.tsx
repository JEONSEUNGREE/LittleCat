import React from 'react'
import { ChevronDown } from 'lucide-react'
import { unitCategories } from '../data/units'

interface UnitSelectorProps {
  value: string
  onChange: (value: string) => void
  category: string
  label: string
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({ 
  value, 
  onChange, 
  category, 
  label 
}) => {
  const units = unitCategories[category]?.units || {}
  const selectedUnit = units[value]

  return (
    <div className="relative w-full">
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full px-4 py-3 pr-10
            bg-white border-2 border-gray-200 rounded-xl
            text-gray-900 font-medium
            appearance-none cursor-pointer
            hover:border-primary-300 focus:border-primary-500
            focus:outline-none focus:ring-2 focus:ring-primary-200
            transition-all duration-200
          "
        >
          {Object.entries(units).map(([key, unit]) => (
            <option key={key} value={key}>
              {unit.name} ({unit.symbol})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none mt-3" />
      </div>
      {selectedUnit && (
        <div className="mt-1 text-xs text-gray-500">
          Symbol: {selectedUnit.symbol}
        </div>
      )}
    </div>
  )
}