import { useState } from 'react'
import { Calculator, Ruler, Thermometer, Clock, Zap, Package, ArrowUpDown } from 'lucide-react'
import CategorySelector from './components/CategorySelector'
import UnitInput from './components/UnitInput'
import ConversionResult from './components/ConversionResult'
import { useConverterStore } from './store/converterStore'
import { convertValue } from './utils/converter'

function App() {
  const { selectedCategory, fromUnit, toUnit, value, setSelectedCategory } = useConverterStore()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const result = convertValue(value, fromUnit, toUnit, selectedCategory)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-primary-50 via-white to-primary-100'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-lg">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <Calculator size={28} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Unit Converter Pro
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Quick & Accurate Conversions
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'
              } card-shadow`}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* Category Selector */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CategorySelector />
        </div>

        {/* Conversion Card */}
        <div className={`rounded-2xl p-6 mb-6 animate-slide-up ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'glass-effect'
        } card-shadow-lg`} style={{ animationDelay: '0.2s' }}>
          <div className="space-y-4">
            <UnitInput type="from" />
            
            <div className="flex justify-center py-2">
              <button className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:scale-110 transition-transform">
                <ArrowUpDown size={20} />
              </button>
            </div>
            
            <UnitInput type="to" />
          </div>
        </div>

        {/* Result Display */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <ConversionResult result={result} />
        </div>

        {/* Quick Access Categories */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { icon: <Ruler size={20} />, name: 'Length', key: 'length' },
            { icon: <Package size={20} />, name: 'Weight', key: 'weight' },
            { icon: <Thermometer size={20} />, name: 'Temp', key: 'temperature' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key as any)}
              className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all hover:scale-105 ${
                selectedCategory === cat.key
                  ? 'button-gradient text-white'
                  : isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 card-shadow'
              }`}
            >
              {cat.icon}
              <span className="text-xs font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className={`mt-12 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          <p>Convert units instantly & accurately</p>
          <p className="mt-1">© 2024 Unit Converter Pro</p>
        </footer>
      </div>
    </div>
  )
}

export default App