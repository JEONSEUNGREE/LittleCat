import { Clock, Trash2 } from 'lucide-react'
import { useTipStore } from '../store/tipStore'

export default function History() {
  const { history, clearHistory } = useTipStore()
  
  if (history.length === 0) {
    return null
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Calculations
        </h2>
        <button
          onClick={clearHistory}
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {history.map((calc) => (
          <div
            key={calc.id}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>{calc.country}</span>
                <span>•</span>
                <span>{calc.serviceQuality}</span>
                <span>•</span>
                <span>{new Date(calc.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ${calc.billAmount.toFixed(2)} + {calc.tipPercentage}%
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  ${calc.totalAmount.toFixed(2)}
                </span>
              </div>
              {calc.splitCount > 1 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Split {calc.splitCount} ways: ${calc.perPersonAmount.toFixed(2)} each
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}