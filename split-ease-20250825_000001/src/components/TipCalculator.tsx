import { Percent } from 'lucide-react'
import useBillStore from '../store/useBillStore'

export default function TipCalculator() {
  const { tipPercentage, setTipPercentage, totalAmount } = useBillStore()
  const tipAmount = totalAmount * (tipPercentage / 100)
  const totalWithTip = totalAmount + tipAmount

  const presetTips = [10, 15, 18, 20, 25]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          팁 비율
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Percent className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(parseFloat(e.target.value) || 0)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            placeholder="15"
            min="0"
            max="100"
            step="1"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {presetTips.map((tip) => (
          <button
            key={tip}
            onClick={() => setTipPercentage(tip)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              tipPercentage === tip
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tip}%
          </button>
        ))}
      </div>

      {totalAmount > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 space-y-2 animate-slide-up">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">금액</span>
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">팁 ({tipPercentage}%)</span>
            <span className="font-medium text-indigo-600">+${tipAmount.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-medium text-gray-700">총 합계</span>
            <span className="text-xl font-bold text-indigo-600">
              ${totalWithTip.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}