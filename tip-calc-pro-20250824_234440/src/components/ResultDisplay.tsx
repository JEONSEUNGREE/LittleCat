import { Users, Calculator, TrendingUp } from 'lucide-react'
import { useTipStore } from '../store/tipStore'

export default function ResultDisplay() {
  const { 
    currentBill, 
    tipPercentage, 
    splitCount, 
    setSplitCount,
    calculateTip 
  } = useTipStore()
  
  const tipAmount = (currentBill * tipPercentage) / 100
  const totalAmount = currentBill + tipAmount
  const perPersonAmount = totalAmount / splitCount
  
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2" />
        Calculation Result
      </h2>
      
      <div className="space-y-4">
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-90">Bill Amount</span>
            <span className="text-xl font-bold">${currentBill.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-90 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Tip ({tipPercentage}%)
            </span>
            <span className="text-xl font-bold text-yellow-300">
              ${tipAmount.toFixed(2)}
            </span>
          </div>
          
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-90">Total</span>
              <span className="text-2xl font-bold text-green-300">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <label className="flex items-center text-sm opacity-90 mb-2">
            <Users className="w-4 h-4 mr-1" />
            Split between {splitCount} {splitCount === 1 ? 'person' : 'people'}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={splitCount}
            onChange={(e) => setSplitCount(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-3 text-center">
            <span className="text-sm opacity-90">Per Person</span>
            <div className="text-3xl font-bold text-yellow-300">
              ${perPersonAmount.toFixed(2)}
            </div>
          </div>
        </div>
        
        <button
          onClick={calculateTip}
          disabled={currentBill <= 0}
          className="w-full py-3 bg-white/20 backdrop-blur rounded-lg font-semibold hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save to History
        </button>
      </div>
    </div>
  )
}