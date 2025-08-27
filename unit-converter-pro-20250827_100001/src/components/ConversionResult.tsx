import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useConverterStore } from '../store/converterStore'
import { units } from '../utils/units'

interface ConversionResultProps {
  result: string
}

export default function ConversionResult({ result }: ConversionResultProps) {
  const [copied, setCopied] = useState(false)
  const { selectedCategory, fromUnit, toUnit, value } = useConverterStore()
  const isDarkMode = document.documentElement.classList.contains('dark')

  const fromUnitData = units[selectedCategory].find(u => u.id === fromUnit)
  const toUnitData = units[selectedCategory].find(u => u.id === toUnit)

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!value || parseFloat(value) === 0) {
    return (
      <div className={`rounded-2xl p-8 text-center ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'glass-effect'
      } card-shadow`}>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          Enter a value to see the conversion
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl p-6 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'glass-effect'
    } card-shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-semibold ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Conversion Result
        </h3>
        <button
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-all hover:scale-105 ${
            copied 
              ? 'bg-green-500 text-white' 
              : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div className="space-y-3">
        {/* Original Value */}
        <div className={`p-3 rounded-lg ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Original
          </p>
          <p className={`text-lg font-semibold ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {value} {fromUnitData?.symbol}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>
            {fromUnitData?.name}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className={`w-0.5 h-6 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`} />
        </div>

        {/* Converted Value */}
        <div className={`p-4 rounded-lg bg-gradient-to-r ${
          isDarkMode
            ? 'from-primary-900/30 to-primary-800/30 border border-primary-700/30'
            : 'from-primary-50 to-primary-100 border border-primary-200'
        }`}>
          <p className={`text-sm ${isDarkMode ? 'text-primary-400' : 'text-primary-700'}`}>
            Result
          </p>
          <p className={`text-2xl font-bold ${
            isDarkMode ? 'text-primary-300' : 'text-primary-600'
          }`}>
            {result} {toUnitData?.symbol}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-primary-500' : 'text-primary-600'}`}>
            {toUnitData?.name}
          </p>
        </div>
      </div>

      {/* Formula Display */}
      <div className={`mt-4 p-3 rounded-lg ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'
      }`}>
        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          Formula: 1 {fromUnitData?.symbol} = {(1 * (fromUnitData?.toBase || 1) / (toUnitData?.toBase || 1)).toFixed(6)} {toUnitData?.symbol}
        </p>
      </div>
    </div>
  )
}