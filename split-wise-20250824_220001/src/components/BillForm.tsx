import React, { useState } from 'react'
import { Plus, X, Users, DollarSign, Calculator } from 'lucide-react'
import useBillStore, { Bill, Participant } from '../store/useBillStore'

const BillForm: React.FC = () => {
  const { addBill } = useBillStore()
  const [title, setTitle] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: '', amount: 0 }
  ])
  const [splitType, setSplitType] = useState<'equal' | 'custom' | 'percentage'>('equal')

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { id: Date.now().toString(), name: '', amount: 0 }
    ])
  }

  const removeParticipant = (id: string) => {
    if (participants.length > 1) {
      setParticipants(participants.filter(p => p.id !== id))
    }
  }

  const updateParticipant = (id: string, field: keyof Participant, value: string | number) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !totalAmount || participants.some(p => !p.name)) {
      alert('모든 필드를 입력해주세요')
      return
    }

    const amount = parseFloat(totalAmount)
    let finalParticipants = [...participants]

    if (splitType === 'equal') {
      const splitAmount = amount / participants.length
      finalParticipants = participants.map(p => ({
        ...p,
        amount: splitAmount
      }))
    }

    const newBill: Bill = {
      id: Date.now().toString(),
      title,
      totalAmount: amount,
      participants: finalParticipants,
      createdAt: new Date(),
      splitType
    }

    addBill(newBill)
    
    // Reset form
    setTitle('')
    setTotalAmount('')
    setParticipants([{ id: '1', name: '', amount: 0 }])
    setSplitType('equal')
  }

  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
        <Calculator className="w-7 h-7" />
        새 정산 만들기
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            정산 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="예: 점심 식사, 파티 비용"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            총 금액
          </label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="input-field"
            placeholder="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            분할 방식
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSplitType('equal')}
              className={`py-2 px-4 rounded-lg transition-all ${
                splitType === 'equal' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              균등 분할
            </button>
            <button
              type="button"
              onClick={() => setSplitType('custom')}
              className={`py-2 px-4 rounded-lg transition-all ${
                splitType === 'custom' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              커스텀
            </button>
            <button
              type="button"
              onClick={() => setSplitType('percentage')}
              className={`py-2 px-4 rounded-lg transition-all ${
                splitType === 'percentage' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              퍼센트
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            참여자
          </label>
          <div className="space-y-3">
            {participants.map((participant, index) => (
              <div key={participant.id} className="flex gap-2 animate-slide-up">
                <input
                  type="text"
                  value={participant.name}
                  onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
                  className="input-field flex-1"
                  placeholder={`참여자 ${index + 1}`}
                />
                {splitType !== 'equal' && (
                  <input
                    type="number"
                    value={participant.amount}
                    onChange={(e) => updateParticipant(participant.id, 'amount', parseFloat(e.target.value))}
                    className="input-field w-24"
                    placeholder="금액"
                    step="0.01"
                  />
                )}
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(participant.id)}
                    className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addParticipant}
            className="mt-3 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            참여자 추가
          </button>
        </div>

        <button type="submit" className="btn-primary w-full">
          정산 생성하기
        </button>
      </form>
    </div>
  )
}

export default BillForm