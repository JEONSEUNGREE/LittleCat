import { useState } from 'react'
import { Users, UserPlus, X, Check, DollarSign } from 'lucide-react'
import { useBillStore } from '../store/billStore'

export default function PeopleManager() {
  const { people, addPerson, removePerson, togglePersonPaid, totalAmount, tipPercent, taxPercent } = useBillStore()
  const [newPersonName, setNewPersonName] = useState('')
  
  const grandTotal = totalAmount * (1 + (tipPercent + taxPercent) / 100)
  const totalPaid = people.filter(p => p.isPaid).reduce((sum, p) => sum + p.amount, 0)
  const remaining = grandTotal - totalPaid
  
  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPersonName.trim()) {
      addPerson(newPersonName.trim())
      setNewPersonName('')
    }
  }
  
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        참여자 관리
      </h2>
      
      <form onSubmit={handleAddPerson} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            className="input-field flex-1"
            placeholder="참여자 이름 입력"
            maxLength={20}
          />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">추가</span>
          </button>
        </div>
      </form>
      
      {people.length > 0 ? (
        <>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {people.map((person) => (
              <div 
                key={person.id} 
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  person.isPaid 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePersonPaid(person.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      person.isPaid 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {person.isPaid && <Check className="w-4 h-4 text-white" />}
                  </button>
                  <div>
                    <div className="font-medium">{person.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {person.amount.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}원
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removePerson(person.id)}
                  className="text-danger hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">총 인원</span>
              <span className="font-medium">{people.length}명</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">정산 완료</span>
              <span className="font-medium text-green-600">
                ₩{totalPaid.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">남은 금액</span>
              <span className={`font-medium ${remaining > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
                ₩{Math.max(0, remaining).toLocaleString('ko-KR', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>참여자를 추가해주세요</p>
        </div>
      )}
    </div>
  )
}