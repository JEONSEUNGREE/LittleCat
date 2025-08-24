import React from 'react'
import { TrendingUp, Square, Activity, Zap } from 'lucide-react'
import useStore, { MathConcept } from '../store/useStore'

const concepts: { id: MathConcept; name: string; icon: React.ReactNode; color: string }[] = [
  { id: 'linear', name: '일차 함수', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-blue-500' },
  { id: 'quadratic', name: '이차 함수', icon: <Square className="w-5 h-5" />, color: 'bg-green-500' },
  { id: 'trigonometric', name: '삼각 함수', icon: <Activity className="w-5 h-5" />, color: 'bg-purple-500' },
  { id: 'exponential', name: '지수 함수', icon: <Zap className="w-5 h-5" />, color: 'bg-orange-500' }
]

const ConceptSelector: React.FC = () => {
  const { selectedConcept, setSelectedConcept } = useStore()

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">수학 개념 선택</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {concepts.map((concept) => (
          <button
            key={concept.id}
            onClick={() => setSelectedConcept(concept.id)}
            className={`p-3 rounded-lg transition-all transform hover:scale-105 ${
              selectedConcept === concept.id
                ? `${concept.color} text-white shadow-lg`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              {concept.icon}
              <span className="text-xs font-medium">{concept.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ConceptSelector