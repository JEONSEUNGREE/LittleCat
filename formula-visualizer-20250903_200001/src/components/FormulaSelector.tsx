import React from 'react'
import { Book, Atom, FlaskConical } from 'lucide-react'
import { formulas } from '../data/formulas'
import { useFormulaStore, FormulaCategory } from '../store/useFormulaStore'

const categoryIcons = {
  math: Book,
  physics: Atom,
  chemistry: FlaskConical
}

const categoryNames = {
  math: '수학',
  physics: '물리',
  chemistry: '화학'
}

export const FormulaSelector: React.FC = () => {
  const { selectedFormula, setSelectedFormula, addToHistory } = useFormulaStore()
  const [selectedCategory, setSelectedCategory] = React.useState<FormulaCategory>('math')
  
  const filteredFormulas = formulas.filter(f => f.category === selectedCategory)
  
  const handleFormulaSelect = (formula: typeof formulas[0]) => {
    setSelectedFormula(formula)
    addToHistory(formula)
  }
  
  return (
    <div className="glass-card p-4 md:p-6 space-y-4 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
        공식 선택
      </h2>
      
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(categoryNames) as FormulaCategory[]).map(category => {
          const Icon = categoryIcons[category]
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{categoryNames[category]}</span>
            </button>
          )
        })}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredFormulas.map(formula => (
          <button
            key={formula.id}
            onClick={() => handleFormulaSelect(formula)}
            className={`text-left p-3 rounded-lg transition-all ${
              selectedFormula?.id === formula.id
                ? 'bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500'
                : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
            }`}
          >
            <div className="formula-text text-sm mb-1">{formula.expression}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {formula.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}