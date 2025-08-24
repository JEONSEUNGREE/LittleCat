import { useState } from 'react'
import { UserPlus, X, Check, Users } from 'lucide-react'
import useBillStore from '../store/useBillStore'

export default function PeopleList() {
  const [newPersonName, setNewPersonName] = useState('')
  const { people, addPerson, removePerson, togglePersonPaid, splitMethod, setSplitMethod } = useBillStore()

  const handleAddPerson = () => {
    if (newPersonName.trim() || people.length < 20) {
      addPerson(newPersonName)
      setNewPersonName('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPerson()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setSplitMethod('equal')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            splitMethod === 'equal'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          균등 분할
        </button>
        <button
          onClick={() => setSplitMethod('custom')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            splitMethod === 'custom'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          커스텀 분할
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="이름 입력 (선택사항)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          maxLength={20}
        />
        <button
          onClick={handleAddPerson}
          disabled={people.length >= 20}
          className="px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      {people.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">인원을 추가해주세요</p>
          <p className="text-sm text-gray-400 mt-1">최대 20명까지 추가 가능합니다</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
          {people.map((person, index) => (
            <div
              key={person.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all animate-slide-up ${
                person.isPaid
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => togglePersonPaid(person.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  person.isPaid
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {person.isPaid && <Check className="w-4 h-4 text-white" />}
              </button>
              
              <div className="flex-1">
                <p className="font-medium text-gray-800">{person.name}</p>
                <p className="text-sm text-gray-500">
                  ${person.amount.toFixed(2)}
                  {person.isPaid && <span className="text-green-600 ml-1">(지불완료)</span>}
                </p>
              </div>
              
              <button
                onClick={() => removePerson(person.id)}
                className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}

      {people.length > 0 && (
        <div className="bg-indigo-50 rounded-xl p-3 text-center">
          <p className="text-sm text-gray-600">
            총 <span className="font-bold text-indigo-600">{people.length}명</span> / 
            지불완료 <span className="font-bold text-green-600">
              {people.filter(p => p.isPaid).length}명
            </span>
          </p>
        </div>
      )}
    </div>
  )
}