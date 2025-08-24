import { useEffect, useState } from 'react'
import { ArrowUpDown, Copy, Star, StarOff } from 'lucide-react'
import { useConverterStore } from '../store/useConverterStore'
import { UnitSelector } from './UnitSelector'
import { convert, unitCategories } from '../data/units'

export const Converter: React.FC = () => {
  const {
    inputValue,
    fromUnit,
    toUnit,
    selectedCategory,
    favorites,
    setInputValue,
    setFromUnit,
    setToUnit,
    swapUnits,
    addToFavorites,
    removeFromFavorites,
    addToRecent,
  } = useConverterStore()

  const [result, setResult] = useState<string>('0')
  const [copied, setCopied] = useState(false)

  const conversionId = `${selectedCategory}-${fromUnit}-${toUnit}`
  const isFavorite = favorites.some(f => f.id === conversionId)

  useEffect(() => {
    const value = parseFloat(inputValue) || 0
    const converted = convert(value, fromUnit, toUnit, selectedCategory)
    
    // Format result with appropriate decimal places
    let formatted: string
    if (converted === 0) {
      formatted = '0'
    } else if (converted < 0.01) {
      formatted = converted.toExponential(4)
    } else if (converted < 1) {
      formatted = converted.toFixed(6).replace(/\.?0+$/, '')
    } else if (converted < 1000) {
      formatted = converted.toFixed(4).replace(/\.?0+$/, '')
    } else {
      formatted = converted.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    
    setResult(formatted)

    // Add to recent conversions
    if (value > 0) {
      addToRecent({
        id: conversionId,
        fromUnit,
        toUnit,
        category: selectedCategory,
        timestamp: Date.now(),
      })
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory, addToRecent])

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(conversionId)
    } else {
      addToFavorites({
        id: conversionId,
        fromUnit,
        toUnit,
        category: selectedCategory,
        timestamp: Date.now(),
      })
    }
  }

  // Update units when category changes
  useEffect(() => {
    const category = unitCategories[selectedCategory]
    if (category) {
      const unitKeys = Object.keys(category.units)
      if (!unitKeys.includes(fromUnit)) {
        setFromUnit(unitKeys[0])
      }
      if (!unitKeys.includes(toUnit)) {
        setToUnit(unitKeys[1] || unitKeys[0])
      }
    }
  }, [selectedCategory, fromUnit, toUnit, setFromUnit, setToUnit])

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-600">
            Enter Value
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="
              w-full px-4 py-3
              bg-gray-50 border-2 border-gray-200 rounded-xl
              text-2xl font-bold text-gray-900
              focus:bg-white focus:border-primary-500
              focus:outline-none focus:ring-2 focus:ring-primary-200
              transition-all duration-200
            "
            placeholder="Enter value..."
          />
        </div>

        <UnitSelector
          value={fromUnit}
          onChange={setFromUnit}
          category={selectedCategory}
          label="From"
        />

        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="
              p-3 rounded-full
              bg-primary-100 text-primary-600
              hover:bg-primary-200 hover:scale-110
              active:scale-95
              transition-all duration-200
            "
            aria-label="Swap units"
          >
            <ArrowUpDown className="w-5 h-5" />
          </button>
        </div>

        <UnitSelector
          value={toUnit}
          onChange={setToUnit}
          category={selectedCategory}
          label="To"
        />
      </div>

      {/* Result Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium opacity-90">Result</span>
          <div className="flex gap-2">
            <button
              onClick={toggleFavorite}
              className="
                p-2 rounded-lg
                bg-white/20 hover:bg-white/30
                transition-all duration-200
              "
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <Star className="w-4 h-4 fill-current" />
              ) : (
                <StarOff className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleCopy}
              className="
                p-2 rounded-lg
                bg-white/20 hover:bg-white/30
                transition-all duration-200
              "
              aria-label="Copy result"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-3xl font-bold mb-1">
          {result}
        </div>
        <div className="text-sm opacity-90">
          {unitCategories[selectedCategory]?.units[toUnit]?.symbol}
        </div>
        {copied && (
          <div className="mt-2 text-xs bg-white/20 rounded-lg px-3 py-1 inline-block animate-fade-in">
            Copied to clipboard!
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        {['0.001', '0.01', '0.1', '1', '10', '100', '1000'].map((val) => (
          <button
            key={val}
            onClick={() => setInputValue(val)}
            className="
              px-3 py-1.5
              bg-gray-100 text-gray-700 text-sm font-medium
              rounded-lg hover:bg-gray-200
              transition-colors duration-200
            "
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  )
}