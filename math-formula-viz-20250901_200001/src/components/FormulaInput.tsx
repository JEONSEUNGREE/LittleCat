import React, { useState } from 'react'
import { Plus, X, Eye, EyeOff, Trash2 } from 'lucide-react'
import useFormulaStore from '../store/useFormulaStore'

const FormulaInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const { 
    formulas, 
    activeFormulaId,
    addFormula, 
    removeFormula, 
    toggleFormulaVisibility,
    setActiveFormula,
    updateFormula
  } = useFormulaStore()

  const handleAddFormula = () => {
    if (inputValue.trim()) {
      try {
        addFormula(inputValue.trim())
        setInputValue('')
        setIsAdding(false)
      } catch (error) {
        console.error('Invalid formula:', error)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddFormula()
    } else if (e.key === 'Escape') {
      setInputValue('')
      setIsAdding(false)
    }
  }

  const quickFormulas = [
    { label: 'Linear', formula: '2*x + 1' },
    { label: 'Quadratic', formula: 'x^2 - 4' },
    { label: 'Cubic', formula: 'x^3 - 3*x' },
    { label: 'Sine', formula: 'sin(x)' },
    { label: 'Cosine', formula: 'cos(x)' },
    { label: 'Exponential', formula: 'exp(x)' },
    { label: 'Logarithm', formula: 'log(x)' },
    { label: 'Absolute', formula: 'abs(x)' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">수식 입력</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-smooth no-select"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 animate-fade-in">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="예: x^2, sin(x), 2*x+1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
            <button
              onClick={handleAddFormula}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-smooth"
            >
              추가
            </button>
            <button
              onClick={() => {
                setInputValue('')
                setIsAdding(false)
              }}
              className="p-2 text-gray-500 hover:text-gray-700 transition-smooth"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {quickFormulas.map((qf) => (
              <button
                key={qf.label}
                onClick={() => setInputValue(qf.formula)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-smooth no-select"
              >
                {qf.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {formulas.map((formula) => (
          <div
            key={formula.id}
            className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-smooth cursor-pointer ${
              activeFormulaId === formula.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setActiveFormula(formula.id)}
          >
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: formula.color }}
            />
            <input
              type="text"
              value={formula.expression}
              onChange={(e) => updateFormula(formula.id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-transparent outline-none text-sm md:text-base"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFormulaVisibility(formula.id)
              }}
              className="p-1.5 text-gray-500 hover:text-gray-700 transition-smooth"
            >
              {formula.visible ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeFormula(formula.id)
              }}
              className="p-1.5 text-red-500 hover:text-red-700 transition-smooth"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {formulas.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">아직 수식이 없습니다</p>
          <button
            onClick={() => setIsAdding(true)}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            첫 번째 수식 추가하기
          </button>
        </div>
      )}
    </div>
  )
}

export default FormulaInput