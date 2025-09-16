import { useState } from 'react'
import { Calculator, Percent, DollarSign } from 'lucide-react'
import { useBillStore } from '../store/billStore'

export default function BillInput() {
  const { totalAmount, tipPercent, taxPercent, setTotalAmount, setTipPercent, setTaxPercent, calculateSplit } = useBillStore()
  const [localAmount, setLocalAmount] = useState(totalAmount.toString())
  
  const handleAmountChange = (value: string) => {
    setLocalAmount(value)
    const numValue = parseFloat(value) || 0
    setTotalAmount(numValue)
    calculateSplit()
  }
  
  const handleTipChange = (value: number) => {
    setTipPercent(value)
    calculateSplit()
  }
  
  const handleTaxChange = (value: number) => {
    setTaxPercent(value)
    calculateSplit()
  }
  
  const quickTipButtons = [10, 15, 18, 20]
  
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5" />
        계산서 정보
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            총 금액
          </label>
          <input
            type="number"
            value={localAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="input-field text-lg font-semibold"
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Percent className="inline w-4 h-4 mr-1" />
            팁 ({tipPercent}%)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {quickTipButtons.map(tip => (
              <button
                key={tip}
                onClick={() => handleTipChange(tip)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  tipPercent === tip 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {tip}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={tipPercent}
            onChange={(e) => handleTipChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Percent className="inline w-4 h-4 mr-1" />
            세금 ({taxPercent}%)
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={taxPercent}
            onChange={(e) => handleTaxChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">소계</span>
            <span className="font-medium">₩{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">팁</span>
            <span className="font-medium">₩{(totalAmount * tipPercent / 100).toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">세금</span>
            <span className="font-medium">₩{(totalAmount * taxPercent / 100).toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-bold">총계</span>
            <span className="font-bold text-primary text-lg">
              ₩{(totalAmount * (1 + (tipPercent + taxPercent) / 100)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}