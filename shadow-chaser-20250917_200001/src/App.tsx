import React from 'react'
import GameBoard from './components/GameBoard'
import ScoreBoard from './components/ScoreBoard'
import Instructions from './components/Instructions'
import { Moon, Sun } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-pulse">
          <Sun className="text-yellow-400" size={60} />
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse" style={{ animationDelay: '1s' }}>
          <Moon className="text-blue-400" size={50} />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="w-20 h-20 bg-purple-500 rounded-full filter blur-xl" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <div className="w-16 h-16 bg-blue-500 rounded-full filter blur-xl" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            Shadow Chaser
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Navigate through light and shadow puzzles
          </p>
        </div>

        {/* Game Layout */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Score Board - Mobile Top, Desktop Left */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <ScoreBoard />
          </div>

          {/* Game Board - Center */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <GameBoard />
          </div>
        </div>

        {/* Instructions Button */}
        <Instructions />

        {/* Mobile-specific instructions */}
        <div className="mt-6 text-center text-gray-500 text-xs sm:hidden">
          <p>Use on-screen controls or swipe to move</p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-4 text-gray-600 text-xs">
        <p>Shadow Chaser v1.0</p>
      </div>
    </div>
  )
}

export default App