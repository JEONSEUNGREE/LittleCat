import React from 'react'
import GameBoard from './components/GameBoard'
import InputPanel from './components/InputPanel'
import ScoreBoard from './components/ScoreBoard'
import { Swords, Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="text-center mb-6 pt-4">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
            <Swords className="w-8 h-8 text-purple-600 animate-bounce-slow" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Word Chain Battle
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse-slow" />
          </div>
          <p className="text-white/90 text-sm mt-2">끝말잇기 AI 대전</p>
        </header>

        {/* Main Game Area */}
        <div className="space-y-4">
          <ScoreBoard />
          <GameBoard />
          <InputPanel />
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-white/70 text-xs">
          <p>© 2024 Word Chain Battle</p>
          <p className="mt-1">한글 끝말잇기로 AI와 대결하세요!</p>
        </footer>
      </div>
    </div>
  )
}

export default App