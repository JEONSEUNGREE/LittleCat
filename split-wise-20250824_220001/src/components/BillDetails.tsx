import React, { useState } from 'react'
import { ArrowLeft, Users, DollarSign, ArrowRight, CheckCircle } from 'lucide-react'
import useBillStore from '../store/useBillStore'

const BillDetails: React.FC = () => {
  const { currentBill, setCurrentBill, updateBill, getBalance } = useBillStore()
  const [paidAmounts, setPaidAmounts] = useState<{ [key: string]: string }>({})

  if (!currentBill) return null

  const balances = getBalance(currentBill.id)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  const handlePaidAmountChange = (participantId: string, value: string) => {
    setPaidAmounts({ ...paidAmounts, [participantId]: value })
  }

  const savePaidAmounts = () => {
    const updatedParticipants = currentBill.participants.map(p => ({
      ...p,
      paid: parseFloat(paidAmounts[p.id] || '0') || p.paid || 0
    }))
    
    updateBill(currentBill.id, { participants: updatedParticipants })
    setPaidAmounts({})
  }

  const getParticipantStatus = (participant: any) => {
    const paid = participant.paid || 0
    const owed = participant.amount
    
    if (paid === owed) return { status: 'settled', color: 'text-green-600', bg: 'bg-green-100' }
    if (paid > owed) return { status: 'creditor', color: 'text-blue-600', bg: 'bg-blue-100' }
    return { status: 'debtor', color: 'text-red-600', bg: 'bg-red-100' }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card">
        <button
          onClick={() => setCurrentBill(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          돌아가기
        </button>

        <h2 className="text-3xl font-bold gradient-text mb-6">
          {currentBill.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-primary-700 mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">총 금액</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {formatCurrency(currentBill.totalAmount)}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-secondary-700 mb-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">참여자</span>
            </div>
            <div className="text-2xl font-bold text-secondary-900">
              {currentBill.participants.length}명
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">참여자별 정산 내역</h3>
          
          {currentBill.participants.map((participant) => {
            const status = getParticipantStatus(participant)
            const balance = (participant.paid || 0) - participant.amount
            
            return (
              <div
                key={participant.id}
                className="border-2 border-gray-100 rounded-xl p-4 hover:border-primary-200 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="font-semibold text-lg text-gray-800">
                      {participant.name}
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      {status.status === 'settled' && '정산 완료'}
                      {status.status === 'creditor' && '받을 돈 있음'}
                      {status.status === 'debtor' && '낼 돈 있음'}
                    </span>
                  </div>
                  {status.status === 'settled' && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">부담액</div>
                    <div className="font-semibold">{formatCurrency(participant.amount)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">지불액</div>
                    <div className="font-semibold">{formatCurrency(participant.paid || 0)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">잔액</div>
                    <div className={`font-semibold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      {balance >= 0 ? '+' : ''}{formatCurrency(Math.abs(balance))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex gap-2">
                  <input
                    type="number"
                    placeholder="실제 지불한 금액"
                    value={paidAmounts[participant.id] || ''}
                    onChange={(e) => handlePaidAmountChange(participant.id, e.target.value)}
                    className="input-field text-sm py-2"
                    step="0.01"
                  />
                  <button
                    onClick={savePaidAmounts}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    저장
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {balances.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">정산 방법</h3>
            <div className="space-y-3">
              {balances.map((balance, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="font-semibold text-gray-800">
                      {balance.from}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                    <div className="font-semibold text-gray-800">
                      {balance.to}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-primary-600">
                    {formatCurrency(balance.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BillDetails