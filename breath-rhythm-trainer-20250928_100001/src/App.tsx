import React from 'react'
import Header from './components/Header'
import BreathingCircle from './components/BreathingCircle'
import ControlPanel from './components/ControlPanel'

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <BreathingCircle />
        <ControlPanel />
      </div>
    </div>
  )
}

export default App