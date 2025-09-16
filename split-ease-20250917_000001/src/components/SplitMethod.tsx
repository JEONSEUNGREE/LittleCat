import { Divide, Edit, List } from 'lucide-react'
import { useBillStore } from '../store/billStore'
import { useEffect } from 'react'

export default function SplitMethod() {
  const { splitMethod, setSplitMethod, people, calculateSplit } = useBillStore()
  
  useEffect(() => {
    if (people.length > 0) {
      calculateSplit()
    }
  }, [people.length, calculateSplit])
  
  const methods = [
    {
      id: 'equal' as const,
      name: '균등 분할',
      description: '모두 같은 금액',
      icon: Divide,
      color: 'bg-blue-500'
    },
    {
      id: 'custom' as const,
      name: '수동 입력',
      description: '각자 금액 입력',
      icon: Edit,
      color: 'bg-purple-500'
    },
    {
      id: 'items' as const,
      name: '항목별',
      description: '주문 항목으로 계산',
      icon: List,
      color: 'bg-green-500'
    }
  ]
  
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">정산 방법</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = splitMethod === method.id
          
          return (
            <button
              key={method.id}
              onClick={() => setSplitMethod(method.id)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                isSelected 
                  ? 'border-primary bg-blue-50 shadow-md transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              disabled={method.id === 'custom' || (method.id === 'items' && people.length === 0)}
            >
              <div className={`w-10 h-10 rounded-full ${method.color} bg-opacity-20 flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
              </div>
              <div className="text-sm font-medium">{method.name}</div>
              <div className="text-xs text-gray-500 mt-1">{method.description}</div>
              
              {method.id === 'custom' && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded">준비중</span>
                </div>
              )}
              
              {method.id === 'items' && people.length === 0 && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded">참여자 필요</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      {splitMethod === 'equal' && people.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            총액을 {people.length}명이 균등하게 나눕니다.
          </p>
        </div>
      )}
      
      {splitMethod === 'items' && people.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            아래에서 항목을 추가하고 각 항목을 누가 나눌지 선택하세요.
          </p>
        </div>
      )}
    </div>
  )
}