import React, { useEffect, useState } from 'react'
import { ArrowUpDown, Star } from 'lucide-react'
import { useConverterStore } from '../store/useConverterStore'
import { conversionCategories, convertValue } from '../data/conversionData'

const ConverterPanel: React.FC = () => {
  const {
    selectedCategory,
    inputValue,
    fromUnit,
    toUnit,
    favorites,
    setInputValue,
    setFromUnit,
    setToUnit,
    swapUnits,
    addToHistory,
    toggleFavorite,
  } = useConverterStore()
  
  const [result, setResult] = useState<string>('0')
  
  const category = conversionCategories[selectedCategory]
  const units = category?.units || []
  
  useEffect(() => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult('0')
      return
    }
    
    const fromUnitData = units.find(u => u.name === fromUnit)
    const toUnitData = units.find(u => u.name === toUnit)
    
    if (fromUnitData && toUnitData) {
      const converted = convertValue(
        Number(inputValue),
        fromUnitData,
        toUnitData,
        selectedCategory
      )
      setResult(converted.toFixed(6).replace(/\.?0+$/, ''))
      
      // Add to history
      if (Number(inputValue) > 0) {
        addToHistory({
          category: selectedCategory,
          fromUnit: fromUnit,
          toUnit: toUnit,
          fromValue: Number(inputValue),
          toValue: converted,
        })
      }
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory, units, addToHistory])
  
  // Update units when category changes
  useEffect(() => {
    if (units.length > 0) {
      setFromUnit(units[0].name)
      setToUnit(units[1]?.name || units[0].name)
    }
  }, [selectedCategory, units, setFromUnit, setToUnit])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value)
    }
  }
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <div className="space-y-4">
        {/* From Unit */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            From
          </label>
          <div className="flex gap-2">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {units.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
            <button
              onClick={() => toggleFavorite(`${selectedCategory}-${fromUnit}`)}
              className={`p-2 rounded-lg transition-colors ${
                favorites.includes(`${selectedCategory}-${fromUnit}`)
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Star size={20} fill={favorites.includes(`${selectedCategory}-${fromUnit}`) ? 'currentColor' : 'none'} />
            </button>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter value"
            className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md"
          >
            <ArrowUpDown size={20} />
          </button>
        </div>
        
        {/* To Unit */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            To
          </label>
          <div className="flex gap-2">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {units.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
            <button
              onClick={() => toggleFavorite(`${selectedCategory}-${toUnit}`)}
              className={`p-2 rounded-lg transition-colors ${
                favorites.includes(`${selectedCategory}-${toUnit}`)
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Star size={20} fill={favorites.includes(`${selectedCategory}-${toUnit}`) ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="w-full px-4 py-3 text-lg border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200">
            <span className="font-semibold">{result}</span>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {units.find(u => u.name === toUnit)?.symbol}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}