import React from 'react'
import { Sliders, RotateCcw } from 'lucide-react'
import { useFormulaStore } from '../store/useFormulaStore'

export const ParameterControls: React.FC = () => {
  const { selectedFormula, parameters, updateParameter, setSelectedFormula } = useFormulaStore()
  
  if (!selectedFormula) return null
  
  const resetParameters = () => {
    if (selectedFormula) {
      setSelectedFormula(selectedFormula)
    }
  }
  
  return (
    <div className="glass-card p-4 md:p-6 space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Sliders className="w-5 h-5" />
          매개변수 조정
        </h2>
        <button
          onClick={resetParameters}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="초기값으로 리셋"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {selectedFormula.parameters.map(param => {
          const value = parameters[param.symbol] ?? param.value
          return (
            <div key={param.symbol} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="formula-text mr-2">{param.symbol}</span>
                  <span className="text-gray-600 dark:text-gray-400">({param.name})</span>
                </label>
                <span className="text-sm font-mono bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded">
                  {value.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={value}
                onChange={(e) => updateParameter(param.symbol, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:bg-indigo-600
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-indigo-500 
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 
                  [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:hover:bg-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{param.min}</span>
                <span>{param.max}</span>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {selectedFormula.description}
        </p>
      </div>
    </div>
  )
}