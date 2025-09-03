import React from 'react'
import { Timer } from './components/Timer'
import { Statistics } from './components/Statistics'
import { Settings } from './components/Settings'
import { Brain } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <Settings />
      
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Brain className="w-10 h-10 text-white" />
          <h1 className="text-4xl font-bold text-white">Deep Focus Timer</h1>
        </div>
        <p className="text-white/80">AI-powered focus optimization for maximum productivity</p>
      </header>

      <main className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
        <div className="glass rounded-3xl p-6 w-full max-w-2xl">
          <Timer />
        </div>
        
        <Statistics />
      </main>

      <footer className="mt-auto pt-8 text-center text-white/60 text-sm">
        <p>Track your focus. Optimize your breaks. Maximize productivity.</p>
      </footer>
    </div>
  )
}

export default App