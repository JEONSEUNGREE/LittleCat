import React from 'react'
import { Brain, Trophy, Menu, X } from 'lucide-react'
import useFormulaStore from '../store/useFormulaStore'

interface HeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { quizMode, quizScore, toggleQuizMode } = useFormulaStore()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="메뉴 토글"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <Brain className="text-primary" size={32} />
              <h1 className="text-xl font-bold text-gray-800">Formula Master</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {quizMode && (
              <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full animate-pulse-slow">
                <Trophy className="text-amber-600" size={20} />
                <span className="font-semibold text-amber-800">{quizScore}점</span>
              </div>
            )}
            
            <button
              onClick={toggleQuizMode}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                quizMode 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-primary text-white hover:bg-blue-600'
              }`}
            >
              {quizMode ? '학습모드' : '퀴즈모드'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header