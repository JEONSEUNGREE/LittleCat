import { DollarSign } from 'lucide-react'
import useBillStore from '../store/useBillStore'

export default function BillInput() {
  const { totalAmount, setTotalAmount } = useBillStore()

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="total-amount" className="block text-sm font-medium text-gray-700 mb-2">
          총 금액
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="total-amount"
            value={totalAmount || ''}
            onChange={(e) => setTotalAmount(parseFloat(e.target.value) || 0)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {totalAmount > 0 && (
        <div className="bg-indigo-50 rounded-xl p-4 animate-slide-up">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">입력된 금액</span>
            <span className="text-2xl font-bold text-indigo-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {[10, 20, 50].map((amount) => (
          <button
            key={amount}
            onClick={() => setTotalAmount(totalAmount + amount)}
            className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            +${amount}
          </button>
        ))}
      </div>
    </div>
  )
}