import { ChevronDown } from 'lucide-react'
import { useConverterStore } from '../store/converterStore'
import { units } from '../utils/units'

interface UnitInputProps {
  type: 'from' | 'to'
}

export default function UnitInput({ type }: UnitInputProps) {
  const {
    selectedCategory,
    fromUnit,
    toUnit,
    value,
    setFromUnit,
    setToUnit,
    setValue
  } = useConverterStore()

  const currentUnit = type === 'from' ? fromUnit : toUnit
  const setUnit = type === 'from' ? setFromUnit : setToUnit
  const categoryUnits = units[selectedCategory]
  const isDarkMode = document.documentElement.classList.contains('dark')

  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {type === 'from' ? 'From' : 'To'}
      </label>
      
      <div className="space-y-3">
        {/* Unit Selector */}
        <div className="relative">
          <select
            value={currentUnit}
            onChange={(e) => setUnit(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl appearance-none transition-colors input-focus ${
              isDarkMode
                ? 'bg-gray-900 text-white border-gray-700'
                : 'bg-white text-gray-800 border-gray-200'
            } border`}
          >
            {categoryUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
          <ChevronDown 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            size={20}
          />
        </div>

        {/* Value Input (only for 'from') */}
        {type === 'from' && (
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className={`w-full px-4 py-3 rounded-xl transition-colors input-focus ${
              isDarkMode
                ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-500'
                : 'bg-white text-gray-800 border-gray-200 placeholder-gray-400'
            } border`}
          />
        )}
      </div>
    </div>
  )
}