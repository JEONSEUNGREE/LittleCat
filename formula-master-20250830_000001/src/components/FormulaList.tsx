import React from 'react'
import { BookOpen } from 'lucide-react'
import useFormulaStore from '../store/useFormulaStore'
import FormulaCard from './FormulaCard'

const FormulaList: React.FC = () => {
  const { formulas, selectedCategory, quizMode, incrementScore } = useFormulaStore()

  const filteredFormulas = formulas.filter(
    formula => selectedCategory === 'all' || formula.category === selectedCategory
  )

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      incrementScore()
    }
  }

  if (filteredFormulas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <BookOpen size={64} className="text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">선택한 카테고리에 공식이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredFormulas.map((formula) => (
        <FormulaCard
          key={formula.id}
          formula={formula}
          isQuizMode={quizMode}
          onQuizAnswer={handleQuizAnswer}
        />
      ))}
    </div>
  )
}

export default FormulaList