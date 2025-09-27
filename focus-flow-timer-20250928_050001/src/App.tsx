import React from 'react'
import { Timer } from './components/Timer'
import { ModeSelector } from './components/ModeSelector'
import { Statistics } from './components/Statistics'
import { FlowControls } from './components/FlowControls'
import { Activity } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Activity className="w-10 h-10 text-white" />
            <h1 className="text-4xl sm:text-5xl font-bold">Focus Flow Timer</h1>
          </div>
          <p className="text-lg opacity-90">적응형 플로우 상태 기반 집중 타이머</p>
        </header>

        <div className="space-y-6 sm:space-y-8">
          <ModeSelector />
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Timer />
            </div>
            <div className="lg:col-span-1">
              <FlowControls />
            </div>
          </div>
          
          <Statistics />
        </div>

        <footer className="text-center mt-12 opacity-60 text-sm animate-fade-in">
          <p>© 2024 Focus Flow Timer - Enhance Your Productivity</p>
        </footer>
      </div>
    </div>
  )
}

export default App