import { useState } from 'react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import FormulaList from './components/FormulaList'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            수학과 과학 공식 마스터
          </h2>
          <p className="text-gray-600">
            시각적으로 공식을 학습하고 퀴즈로 실력을 테스트하세요
          </p>
        </div>

        <CategoryFilter />
        <FormulaList />
      </main>

      <footer className="bg-white mt-12 py-6 border-t safe-area-inset">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Formula Master. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App