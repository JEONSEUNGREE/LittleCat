import { Ruler, Thermometer, Clock, Zap, Package, Droplet, Gauge, HardDrive } from 'lucide-react'
import { useConverterStore } from '../store/converterStore'

const categories = [
  { id: 'length', name: 'Length', icon: <Ruler size={18} /> },
  { id: 'weight', name: 'Weight', icon: <Package size={18} /> },
  { id: 'temperature', name: 'Temperature', icon: <Thermometer size={18} /> },
  { id: 'time', name: 'Time', icon: <Clock size={18} /> },
  { id: 'volume', name: 'Volume', icon: <Droplet size={18} /> },
  { id: 'speed', name: 'Speed', icon: <Gauge size={18} /> },
  { id: 'energy', name: 'Energy', icon: <Zap size={18} /> },
  { id: 'data', name: 'Data', icon: <HardDrive size={18} /> },
]

export default function CategorySelector() {
  const { selectedCategory, setSelectedCategory } = useConverterStore()
  const isDarkMode = document.documentElement.classList.contains('dark')

  return (
    <div>
      <h2 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Select Category
      </h2>
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all hover:scale-105 ${
              selectedCategory === category.id
                ? 'button-gradient text-white shadow-lg'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 card-shadow'
            }`}
          >
            <div className="flex items-center justify-center">
              {category.icon}
            </div>
            <span className="text-xs font-medium truncate w-full">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}