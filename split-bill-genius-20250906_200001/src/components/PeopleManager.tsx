import { useState } from 'react'
import { UserPlus, X, User } from 'lucide-react'
import useBillStore from '../store/billStore'

export default function PeopleManager() {
  const [newPersonName, setNewPersonName] = useState('')
  const { people, addPerson, removePerson } = useBillStore()

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      addPerson(newPersonName.trim())
      setNewPersonName('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-500" />
          참가자 관리
        </h2>
        
        {/* Add Person Form */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddPerson()}
            placeholder="참가자 이름을 입력하세요"
            className="input-field flex-1"
          />
          <button
            onClick={handleAddPerson}
            className="btn-primary flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">추가</span>
          </button>
        </div>

        {/* People List */}
        <div className="space-y-2">
          {people.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>아직 추가된 참가자가 없습니다</p>
              <p className="text-sm mt-2">위에서 참가자를 추가해주세요</p>
            </div>
          ) : (
            people.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{person.name}</p>
                    <p className="text-sm text-gray-500">
                      {person.totalAmount > 0 
                        ? `₩${person.totalAmount.toLocaleString('ko-KR')}`
                        : '아직 계산되지 않음'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removePerson(person.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tips */}
      {people.length > 0 && people.length < 2 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            💡 더치페이를 위해 최소 2명 이상의 참가자를 추가해주세요
          </p>
        </div>
      )}
    </div>
  )
}