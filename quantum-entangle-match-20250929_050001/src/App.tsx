import React from 'react'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import { Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      {/* Header */}
      <header className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-quantum-purple animate-particle-float" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-quantum-purple via-quantum-pink to-quantum-cyan bg-clip-text text-transparent">
            Quantum Entangle Match
          </h1>
          <Sparkles className="w-8 h-8 text-quantum-cyan animate-particle-float" style={{ animationDelay: '1s' }} />
        </div>
        <p className="text-slate-400 text-sm">양자 입자를 얽어 우주의 비밀을 풀어보세요</p>
      </header>

      {/* Game container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* Game board */}
        <div className="flex-1 flex justify-center">
          <GameBoard />
        </div>

        {/* Controls */}
        <div className="flex-1 lg:max-w-sm">
          <GameControls />
        </div>
      </div>

      {/* Background particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-quantum-purple/20 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App