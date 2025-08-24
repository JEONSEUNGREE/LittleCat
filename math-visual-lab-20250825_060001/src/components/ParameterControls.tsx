import React from 'react'
import { RotateCcw, Play, Pause } from 'lucide-react'
import useStore from '../store/useStore'

const ParameterControls: React.FC = () => {
  const { 
    parameters, 
    equation, 
    animating, 
    selectedConcept,
    setParameter, 
    toggleAnimation, 
    resetParameters 
  } = useStore()

  const getParameterLabel = (param: 'a' | 'b' | 'c') => {
    if (selectedConcept === 'trigonometric') {
      if (param === 'a') return '진폭 (Amplitude)'
      if (param === 'b') return '주파수 (Frequency)'
      if (param === 'c') return '수직 이동 (Vertical Shift)'
    }
    if (selectedConcept === 'exponential') {
      if (param === 'a') return '초기값 (Initial Value)'
      if (param === 'b') return '성장률 (Growth Rate)'
      if (param === 'c') return '수직 이동 (Vertical Shift)'
    }
    if (param === 'a') return '기울기/계수 a'
    if (param === 'b') return '계수 b'
    return 'y절편/상수 c'
  }

  const getParameterRange = (param: 'a' | 'b' | 'c') => {
    if (selectedConcept === 'trigonometric' || selectedConcept === 'exponential') {
      if (param === 'b') return { min: -3, max: 3, step: 0.1 }
    }
    return { min: -10, max: 10, step: 0.5 }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">파라미터 조정</h2>
        <div className="flex space-x-2">
          <button
            onClick={toggleAnimation}
            className="p-2 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors"
            aria-label={animating ? '일시정지' : '재생'}
          >
            {animating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={resetParameters}
            className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            aria-label="초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gradient-to-r from-primary to-secondary rounded-lg">
        <p className="text-white font-mono text-sm md:text-base text-center">
          {equation}
        </p>
      </div>

      <div className="space-y-4">
        {(['a', 'b', 'c'] as const).map((param) => {
          const range = getParameterRange(param)
          return (
            <div key={param}>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">
                  {getParameterLabel(param)}
                </label>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {param} = {parameters[param].toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={parameters[param]}
                onChange={(e) => setParameter(param, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{range.min}</span>
                <span>{range.max}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ParameterControls