import React from 'react'
import { Trash2, Eye, Calendar, Users, DollarSign } from 'lucide-react'
import useBillStore from '../store/useBillStore'
import BillDetails from './BillDetails'

const BillList: React.FC = () => {
  const { bills, deleteBill, setCurrentBill, currentBill } = useBillStore()

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  if (currentBill) {
    return <BillDetails />
  }

  if (bills.length === 0) {
    return (
      <div className="card text-center py-12 animate-fade-in">
        <div className="text-gray-400 mb-4">
          <DollarSign className="w-16 h-16 mx-auto opacity-50" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          아직 정산 내역이 없습니다
        </h3>
        <p className="text-gray-500">
          새로운 정산을 만들어 시작하세요!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold gradient-text mb-4">정산 목록</h2>
      
      {bills.map((bill) => (
        <div
          key={bill.id}
          className="card hover:shadow-2xl transition-all duration-300 animate-slide-up"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {bill.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(bill.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {bill.participants.length}명
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {formatCurrency(bill.totalAmount)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                인당 {formatCurrency(bill.totalAmount / bill.participants.length)}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {bill.participants.map((participant) => (
                <span
                  key={participant.id}
                  className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {participant.name}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentBill(bill)}
                className="flex-1 py-2 px-4 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Eye className="w-4 h-4" />
                상세보기
              </button>
              <button
                onClick={() => deleteBill(bill.id)}
                className="py-2 px-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BillList