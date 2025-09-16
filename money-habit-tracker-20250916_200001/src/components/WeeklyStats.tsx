import { TrendingDown, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function WeeklyStats() {
  const stats = useStore(state => state.getWeeklyStats())
  const savingsGoal = useStore(state => state.savingsGoal)
  const expenses = useStore(state => state.expenses)
  
  const weeklyGoal = savingsGoal * 7
  const savingsRate = ((weeklyGoal - stats.totalSpent) / weeklyGoal) * 100
  const isUnderBudget = stats.totalSpent <= weeklyGoal
  
  const categoryTotals = expenses
    .filter(e => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return e.date >= weekAgo
    })
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)
  
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">주간 습관 분석</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-purple-600" size={20} />
            {isUnderBudget ? (
              <TrendingDown className="text-green-600" size={16} />
            ) : (
              <TrendingUp className="text-red-600" size={16} />
            )}
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{Math.floor(stats.totalSpent).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-1">주간 총 지출</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-green-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{Math.floor(stats.avgDaily).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-1">일 평균 지출</div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className={`rounded-xl p-4 ${
          isUnderBudget 
            ? 'bg-gradient-to-br from-green-50 to-emerald-100' 
            : 'bg-gradient-to-br from-red-50 to-orange-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">절약률</span>
            <span className={`text-2xl font-bold ${
              isUnderBudget ? 'text-green-700' : 'text-red-700'
            }`}>
              {savingsRate.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all ${
                isUnderBudget ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-orange-500'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, savingsRate))}%` }}
            />
          </div>
          <div className="text-xs text-gray-600 mt-2">
            목표: ₩{weeklyGoal.toLocaleString()} / 실제: ₩{stats.totalSpent.toLocaleString()}
          </div>
        </div>
      </div>
      
      {stats.impulseRate > 0 && (
        <div className="mb-6">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-yellow-600" size={20} />
              <span className="font-medium text-gray-800">충동구매 경고</span>
            </div>
            <div className="text-3xl font-bold text-yellow-700 mb-1">
              {stats.impulseRate.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600">
              전체 구매 중 충동구매 비율
            </div>
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">카테고리별 지출 TOP 5</h3>
        <div className="space-y-2">
          {sortedCategories.map(([category, amount], index) => {
            const percentage = (amount / stats.totalSpent) * 100
            const colors = [
              'from-purple-500 to-indigo-500',
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500',
              'from-yellow-500 to-orange-500',
              'from-pink-500 to-rose-500'
            ]
            
            return (
              <div key={category} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {index + 1}. {category}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    ₩{Math.floor(amount).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${colors[index]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}