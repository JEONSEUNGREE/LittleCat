import React from 'react'
import { Clock, Trash2 } from 'lucide-react'
import { useConverterStore } from '../store/useConverterStore'
import { conversionCategories } from '../data/conversionData'

const HistoryPanel: React.FC = () => {
  const { history, clearHistory } = useConverterStore()
  
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }
  
  if (history.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Clock size={20} />
            History
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No conversion history yet
        </p>
      </div>
    )
  }
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Clock size={20} />
          History
        </h2>
        <button
          onClick={clearHistory}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item) => {
          const category = conversionCategories[item.category]
          const fromSymbol = category?.units.find(u => u.name === item.fromUnit)?.symbol
          const toSymbol = category?.units.find(u => u.name === item.toUnit)?.symbol
          
          return (
            <div
              key={item.id}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.fromValue} {fromSymbol} = {item.toValue.toFixed(4).replace(/\.?0+$/, '')} {toSymbol}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {category?.name} • {formatTime(item.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}