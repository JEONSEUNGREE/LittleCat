import React from 'react'
import Header from './components/Header'
import FormulaInput from './components/FormulaInput'
import GraphVisualization from './components/GraphVisualization'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <FormulaInput />
          </div>
          <div className="lg:col-span-2">
            <GraphVisualization />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-in">
            <h3 className="text-lg font-bold text-gray-800 mb-3">빠른 가이드</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">1.</span>
                <p>수식 입력란에 원하는 함수를 입력하세요</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">2.</span>
                <p>여러 개의 그래프를 동시에 비교할 수 있습니다</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">3.</span>
                <p>줌과 이동 기능으로 원하는 영역을 탐색하세요</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-bold text-gray-800 mb-3">지원 연산자</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">+, -, *, /</span>
                <p className="text-xs text-gray-600 mt-1">기본 연산</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">^, **</span>
                <p className="text-xs text-gray-600 mt-1">거듭제곱</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">sqrt()</span>
                <p className="text-xs text-gray-600 mt-1">제곱근</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">abs()</span>
                <p className="text-xs text-gray-600 mt-1">절댓값</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-bold text-gray-800 mb-3">수학 함수</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">sin, cos, tan</span>
                <p className="text-xs text-gray-600 mt-1">삼각함수</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">log, exp</span>
                <p className="text-xs text-gray-600 mt-1">로그/지수</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">floor, ceil</span>
                <p className="text-xs text-gray-600 mt-1">올림/내림</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-mono text-primary-600">min, max</span>
                <p className="text-xs text-gray-600 mt-1">최소/최대</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-sm text-gray-500">
        <p>© 2025 Math Formula Visualizer. 교육용 도구</p>
      </footer>
    </div>
  )
}

export default App