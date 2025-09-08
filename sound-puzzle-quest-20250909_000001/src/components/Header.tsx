import React from 'react'
import { Music2, Sparkles } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3">
          <Music2 size={32} className="text-purple-400 animate-bounce-slow" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Sound Puzzle Quest
          </h1>
          <Sparkles size={32} className="text-pink-400 animate-pulse" />
        </div>
        <p className="text-center text-gray-300 text-sm mt-2">
          소리의 패턴을 기억하고 따라해보세요!
        </p>
      </div>
    </header>
  )
}

export default Header