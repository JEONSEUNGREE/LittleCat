import React, { useState } from 'react'
import { Plus, Minus, DollarSign, Tag, FileText } from 'lucide-react'
import { useBudgetStore } from '../store/useBudgetStore'

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Other'
]

const TransactionForm: React.FC = () => {
  const addTransaction = useBudgetStore(state => state.addTransaction)
  
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || parseFloat(amount) <= 0) return
    
    addTransaction({
      amount: parseFloat(amount),
      category,
      description,
      timestamp: new Date(),
      type
    })
    
    // Reset form
    setAmount('')
    setDescription('')
    setCategory(categories[0])
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Add Transaction</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              type === 'expense'
                ? 'bg-pulse-red text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            <Minus className="w-4 h-4 inline mr-2" />
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              type === 'income'
                ? 'bg-pulse-green text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Income
          </button>
        </div>
        
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            required
          />
        </div>
        
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-purple-800">
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-white/60 w-5 h-5" />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
            rows={2}
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-white/90 transition-all transform hover:scale-105"
        >
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm