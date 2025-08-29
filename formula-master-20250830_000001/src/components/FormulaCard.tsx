import { useState } from 'react'
import { ChevronDown, ChevronUp, Star, Info } from 'lucide-react'
import { Formula } from '../store/useFormulaStore'

interface FormulaCardProps {
  formula: Formula
  isQuizMode: boolean
  onQuizAnswer?: (correct: boolean) => void
}

const FormulaCard: React.FC<FormulaCardProps> = ({ formula, isQuizMode, onQuizAnswer }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(!isQuizMode)
  const [userAnswer, setUserAnswer] = useState('')

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'math': return 'bg-blue-100 text-blue-700'
      case 'physics': return 'bg-purple-100 text-purple-700'
      case 'chemistry': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleQuizSubmit = () => {
    const isCorrect = userAnswer.toLowerCase().replace(/\s/g, '') === 
                      formula.expression.toLowerCase().replace(/\s/g, '')
    setShowAnswer(true)
    if (onQuizAnswer) {
      onQuizAnswer(isCorrect)
    }
  }

  return (
    <div className="formula-card animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800">{formula.name}</h3>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(formula.category)}`}>
            {formula.category === 'math' ? '수학' : formula.category === 'physics' ? '물리' : '화학'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(formula.difficulty)}`}>
            {formula.difficulty === 'easy' ? '쉬움' : formula.difficulty === 'medium' ? '보통' : '어려움'}
          </span>
        </div>
      </div>

      {isQuizMode && !showAnswer ? (
        <div className="space-y-4">
          <p className="text-gray-600">{formula.description}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="공식을 입력하세요..."
            className="input-field"
            onKeyPress={(e) => e.key === 'Enter' && handleQuizSubmit()}
          />
          <button
            onClick={handleQuizSubmit}
            className="btn-primary w-full"
          >
            답변 제출
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <p className="formula-text text-center text-2xl text-gray-800">
              {formula.expression}
            </p>
          </div>

          <p className="text-gray-600 text-sm">{formula.description}</p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-primary hover:text-blue-700 transition-colors"
          >
            <Info size={18} />
            <span className="text-sm font-medium">변수 설명</span>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {isExpanded && (
            <div className="space-y-2 animate-slide-up">
              {formula.variables.map((variable, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <span className="font-mono text-lg font-bold text-primary">
                    {variable.symbol}
                  </span>
                  <span className="text-gray-700">{variable.name}</span>
                  {variable.unit && (
                    <span className="text-gray-500 text-sm ml-auto">({variable.unit})</span>
                  )}
                  {variable.value && (
                    <span className="text-gray-500 text-sm ml-auto">= {variable.value}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {isQuizMode && showAnswer && (
            <button
              onClick={() => {
                setShowAnswer(false)
                setUserAnswer('')
              }}
              className="btn-secondary w-full"
            >
              다시 풀어보기
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default FormulaCard