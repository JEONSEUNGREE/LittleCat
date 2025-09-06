import { useEffect } from 'react'
import { Calculator, DollarSign, Users, Receipt, TrendingUp } from 'lucide-react'
import useBillStore from '../store/billStore'

export default function BillSummary() {
  const { people, items, totalBill, taxPercent, tipPercent, calculateSplit } = useBillStore()

  useEffect(() => {
    if (items.length > 0 && people.length > 0) {
      calculateSplit()
    }
  }, [items, people, taxPercent, tipPercent, calculateSplit])

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * (taxPercent / 100)
  const tip = subtotal * (tipPercent / 100)

  if (people.length === 0 || items.length === 0) {
    return (
      <div className="text-center py-12">
        <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 mb-2">정산할 준비가 되지 않았습니다</p>
        <p className="text-sm text-gray-400">참가자와 항목을 먼저 추가해주세요</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary-500" />
        정산 결과
      </h2>

      {/* Bill Breakdown */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            소계
          </span>
          <span className="font-medium">₩{subtotal.toLocaleString('ko-KR')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            세금 ({taxPercent}%)
          </span>
          <span className="font-medium">₩{tax.toLocaleString('ko-KR')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            팁 ({tipPercent}%)
          </span>
          <span className="font-medium">₩{tip.toLocaleString('ko-KR')}</span>
        </div>
        <div className="border-t pt-3 flex justify-between items-center">
          <span className="text-lg font-semibold text-primary-700">총 금액</span>
          <span className="text-2xl font-bold text-primary-700">
            ₩{totalBill.toLocaleString('ko-KR')}
          </span>
        </div>
      </div>

      {/* Individual Splits */}
      <div>
        <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          개인별 정산 금액
        </h3>
        <div className="space-y-3">
          {people.map((person) => {
            const percentage = totalBill > 0 ? (person.totalAmount / totalBill * 100).toFixed(1) : '0'
            
            return (
              <div key={person.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {person.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{person.name}</p>
                      <p className="text-xs text-gray-500">{percentage}% 부담</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-secondary-600">
                      ₩{person.totalAmount.toLocaleString('ko-KR')}
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-600 mb-1">평균 부담액</p>
          <p className="text-xl font-bold text-blue-700">
            ₩{people.length > 0 
              ? Math.round(totalBill / people.length).toLocaleString('ko-KR')
              : '0'}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-green-600 mb-1">1인당 팁</p>
          <p className="text-xl font-bold text-green-700">
            ₩{people.length > 0 
              ? Math.round(tip / people.length).toLocaleString('ko-KR')
              : '0'}
          </p>
        </div>
      </div>
    </div>
  )
}