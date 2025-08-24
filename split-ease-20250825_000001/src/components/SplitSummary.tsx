import { AlertCircle, CheckCircle, DollarSign, Users, Percent } from 'lucide-react'
import useBillStore from '../store/useBillStore'

export default function SplitSummary() {
  const { totalAmount, tipPercentage, people, splitMethod } = useBillStore()
  
  const tipAmount = totalAmount * (tipPercentage / 100)
  const totalWithTip = totalAmount + tipAmount
  const amountPerPerson = people.length > 0 ? totalWithTip / people.length : 0
  const totalPaid = people.filter(p => p.isPaid).reduce((sum, p) => sum + p.amount, 0)
  const remaining = totalWithTip - totalPaid

  if (totalAmount === 0 || people.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">금액과 인원을 먼저 입력해주세요</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          정산 요약
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-white/80">원금</span>
            <span className="font-medium">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">팁 ({tipPercentage}%)</span>
            <span className="font-medium">+${tipAmount.toFixed(2)}</span>
          </div>
          <div className="border-t border-white/20 pt-3 flex justify-between">
            <span className="font-semibold">총 금액</span>
            <span className="text-2xl font-bold">${totalWithTip.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">인원</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{people.length}명</p>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">1인당</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">${amountPerPerson.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          지불 현황
        </h4>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">지불 완료</span>
            <span className="font-medium text-green-600">
              ${totalPaid.toFixed(2)} ({people.filter(p => p.isPaid).length}명)
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">남은 금액</span>
            <span className="font-medium text-red-600">
              ${remaining.toFixed(2)} ({people.filter(p => !p.isPaid).length}명)
            </span>
          </div>
        </div>
        
        <div className="relative pt-2">
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
            <div
              style={{ width: `${(totalPaid / totalWithTip) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {((totalPaid / totalWithTip) * 100).toFixed(0)}% 완료
          </p>
        </div>
      </div>

      {splitMethod === 'equal' && people.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            💡 균등 분할 모드: 모든 인원이 <strong>${amountPerPerson.toFixed(2)}</strong>씩 지불합니다
          </p>
        </div>
      )}
    </div>
  )
}