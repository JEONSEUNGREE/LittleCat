import React from 'react'
import { GraduationCap, Github, Info } from 'lucide-react'
import { FormulaSelector } from './components/FormulaSelector'
import { ParameterControls } from './components/ParameterControls'
import { GraphVisualization } from './components/GraphVisualization'
import { useFormulaStore } from './store/useFormulaStore'

function App() {
  const { selectedFormula } = useFormulaStore()
  const [showInfo, setShowInfo] = React.useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <header className="glass-card mx-4 mt-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 text-white rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                Formula Visualizer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                수학과 과학 공식을 인터랙티브하게 시각화
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        
        {showInfo && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg animate-slide-up">
            <h3 className="font-semibold mb-2">사용 방법</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>1. 왼쪽에서 카테고리와 공식을 선택하세요</li>
              <li>2. 슬라이더로 매개변수를 조정하세요</li>
              <li>3. 실시간으로 변하는 그래프를 관찰하세요</li>
              <li>4. 다양한 공식을 탐험하며 수학적 관계를 이해하세요</li>
            </ul>
          </div>
        )}
      </header>
      
      <main className="p-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          <div className="lg:col-span-1 space-y-4">
            <FormulaSelector />
            {selectedFormula && <ParameterControls />}
          </div>
          <div className="lg:col-span-2">
            <GraphVisualization />
          </div>
        </div>
      </main>
      
      <footer className="text-center p-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center justify-center gap-4">
          <span>© 2025 Formula Visualizer</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-indigo-500 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App