import React from 'react'
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { useBudgetStore } from '../store/useBudgetStore'

const TransactionList: React.FC = () => {
  const { transactions, removeTransaction } = useBudgetStore()
  
  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      'Food & Dining': '🍔',
      'Transportation': '🚗',
      'Shopping': '🛍️',
      'Entertainment': '🎮',
      'Bills & Utilities': '💡',
      'Healthcare': '🏥',
      'Education': '📚',
      'Other': '📌'
    }
    return emojis[category] || '📌'
  }
  
  if (transactions.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
        <p className="text-white/60 text-center py-8">
          No transactions yet. Start by adding your first transaction!
        </p>
      </div>
    )
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white/10 rounded-lg p-3 flex items-center justify-between hover:bg-white/20 transition-all"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getCategoryEmoji(transaction.category)}</span>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">
                    {transaction.description || transaction.category}
                  </span>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-4 h-4 text-pulse-green" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-pulse-red" />
                  )}
                </div>
                <span className="text-white/60 text-xs">
                  {formatDate(transaction.timestamp)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`font-bold ${
                transaction.type === 'income' ? 'text-pulse-green' : 'text-pulse-red'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
              <button
                onClick={() => removeTransaction(transaction.id)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionList