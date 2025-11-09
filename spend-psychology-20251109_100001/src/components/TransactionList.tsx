import { Trash2 } from 'lucide-react'
import { useStore } from '../store/useStore'

const EMOTION_EMOJI: Record<string, string> = {
  happy: '😊',
  neutral: '😐',
  sad: '😢',
  angry: '😡',
  stressed: '😰',
}

export default function TransactionList() {
  const transactions = useStore((state) => state.transactions)
  const deleteTransaction = useStore((state) => state.deleteTransaction)

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-gray-500">아직 기록된 지출이 없습니다</p>
        <p className="text-sm text-gray-400 mt-2">
          위에서 첫 지출을 기록해보세요!
        </p>
      </div>
    )
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.timestamp - a.timestamp
  )

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">최근 지출 내역</h2>

      <div className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="text-3xl">
                {EMOTION_EMOJI[transaction.emotion]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">
                    {transaction.category}
                  </span>
                  <span className="text-xs text-gray-500 px-2 py-1 bg-white rounded">
                    {transaction.emotion}
                  </span>
                </div>
                {transaction.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {transaction.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(transaction.timestamp).toLocaleString('ko-KR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-lg text-gray-900">
                ₩{transaction.amount.toLocaleString()}
              </span>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="삭제"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">총 지출</span>
          <span className="text-2xl font-bold text-purple-600">
            ₩
            {transactions
              .reduce((sum, t) => sum + t.amount, 0)
              .toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
