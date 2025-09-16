import { Trash2, AlertCircle } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function ExpenseList() {
  const expenses = useStore(state => state.expenses)
  const removeExpense = useStore(state => state.removeExpense)
  
  const sortedExpenses = [...expenses].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  )
  
  const groupedExpenses = sortedExpenses.reduce((acc, expense) => {
    const dateKey = expense.date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(expense)
    return acc
  }, {} as Record<string, typeof expenses>)

  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      '식비': '🍽️',
      '교통': '🚌',
      '쇼핑': '🛍️',
      '문화': '🎬',
      '카페': '☕',
      '기타': '📦'
    }
    return emojiMap[category] || '💳'
  }

  if (expenses.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">지출 내역</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 text-center">
            아직 기록된 지출이 없습니다<br />
            첫 지출을 기록해보세요!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">지출 내역</h2>
      
      <div className="space-y-6 max-h-[500px] overflow-y-auto">
        {Object.entries(groupedExpenses).map(([date, dayExpenses]) => {
          const dayTotal = dayExpenses.reduce((sum, e) => sum + e.amount, 0)
          
          return (
            <div key={date}>
              <div className="flex justify-between items-center mb-3 sticky top-0 bg-white py-2">
                <h3 className="text-sm font-semibold text-gray-600">{date}</h3>
                <span className="text-sm font-bold text-gray-900">
                  ₩{dayTotal.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                {dayExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl mt-1">{getCategoryEmoji(expense.category)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {expense.category}
                            </span>
                            {expense.isImpulse && (
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                                <AlertCircle size={12} />
                                <span className="text-xs">충동</span>
                              </div>
                            )}
                          </div>
                          {expense.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {expense.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {expense.date.toLocaleTimeString('ko-KR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                          ₩{expense.amount.toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeExpense(expense.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}