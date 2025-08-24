import { DollarSign } from 'lucide-react'
import { useTipStore } from '../store/tipStore'

export default function BillInput() {
  const { currentBill, setBillAmount } = useTipStore()
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Bill Amount
      </h2>
      
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="number"
          value={currentBill || ''}
          onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          className="w-full pl-10 pr-4 py-3 text-2xl font-bold border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          step="0.01"
          min="0"
        />
      </div>
      
      <div className="mt-4 flex gap-2">
        {[10, 20, 50, 100].map((amount) => (
          <button
            key={amount}
            onClick={() => setBillAmount(amount)}
            className="flex-1 py-2 px-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
          >
            ${amount}
          </button>
        ))}
      </div>
    </div>
  )
}