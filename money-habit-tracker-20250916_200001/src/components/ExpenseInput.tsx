import { useState } from 'react'
import { DollarSign, ShoppingCart, AlertCircle, Check } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function ExpenseInput() {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('식비')
  const [description, setDescription] = useState('')
  const [isImpulse, setIsImpulse] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const categories = useStore(state => state.categories)
  const addExpense = useStore(state => state.addExpense)
  const savingsGoal = useStore(state => state.savingsGoal)
  const todayHabit = useStore(state => {
    const today = new Date().toISOString().split('T')[0]
    return state.getDailyHabit(today)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const expenseAmount = parseFloat(amount)
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      alert('올바른 금액을 입력해주세요')
      return
    }

    addExpense({
      amount: expenseAmount,
      category,
      description,
      date: new Date(),
      isImpulse
    })

    setAmount('')
    setDescription('')
    setIsImpulse(false)
    setShowSuccess(true)
    
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const todayTotal = todayHabit?.totalSpent || 0
  const remaining = savingsGoal - todayTotal
  const percentUsed = (todayTotal / savingsGoal) * 100

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">오늘 지출</span>
            <span className="text-lg font-bold text-gray-900">
              ₩{todayTotal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all ${
                percentUsed > 100 ? 'bg-red-500' : 
                percentUsed > 80 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-600">
            {remaining > 0 
              ? `₩${remaining.toLocaleString()} 남음` 
              : `₩${Math.abs(remaining).toLocaleString()} 초과`}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            금액
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="10,000"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명
          </label>
          <div className="relative">
            <ShoppingCart className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="무엇을 구매하셨나요?"
            />
          </div>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIsImpulse(!isImpulse)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isImpulse
                ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
            }`}
          >
            <AlertCircle size={18} />
            <span className="text-sm font-medium">충동구매</span>
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
        >
          지출 기록하기
        </button>
      </form>

      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Check size={20} />
          <span>지출이 기록되었습니다!</span>
        </div>
      )}
    </div>
  )
}