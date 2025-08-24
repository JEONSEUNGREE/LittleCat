import { Percent, Star, Globe } from 'lucide-react'
import { useTipStore } from '../store/tipStore'

const countries = [
  'USA', 'Canada', 'UK', 'Japan', 'Korea', 
  'France', 'Germany', 'Italy', 'Australia', 'China'
]

const serviceQualities = ['Poor', 'Fair', 'Good', 'Excellent', 'Outstanding']

export default function TipSelector() {
  const { 
    tipPercentage, 
    setTipPercentage,
    serviceQuality,
    setServiceQuality,
    selectedCountry,
    setCountry
  } = useTipStore()
  
  const tipPresets = [10, 15, 18, 20, 25]
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Tip Settings
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            <Globe className="w-4 h-4 mr-1" />
            Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:outline-none"
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            <Star className="w-4 h-4 mr-1" />
            Service Quality
          </label>
          <div className="grid grid-cols-3 gap-2">
            {serviceQualities.map(quality => (
              <button
                key={quality}
                onClick={() => setServiceQuality(quality)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  serviceQuality === quality
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            <Percent className="w-4 h-4 mr-1" />
            Tip Percentage: {tipPercentage}%
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between mt-2">
            {tipPresets.map(preset => (
              <button
                key={preset}
                onClick={() => setTipPercentage(preset)}
                className={`text-xs font-medium px-2 py-1 rounded ${
                  tipPercentage === preset
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}