import React, { useState } from 'react'
import { Settings as SettingsIcon, BarChart3, Brain } from 'lucide-react'
import Timer from './components/Timer'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import useFocusStore from './store/useFocusStore'

function App() {
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { currentSession } = useFocusStore()

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Focus Blocks</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className={`p-2 rounded-lg transition-colors ${
                showStats ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <SettingsIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Motivational Quote */}
          {!currentSession && (
            <div className="text-center mb-8">
              <p className="text-white/90 text-xl italic">
                "Focus is not about saying yes, it's about saying no."
              </p>
              <p className="text-white/60 text-sm mt-2">- Steve Jobs</p>
            </div>
          )}

          {/* Timer Component */}
          <Timer />

          {/* Statistics */}
          {showStats && <Statistics />}

          {/* Tips */}
          {!currentSession && !showStats && (
            <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white mb-3">Focus Tips</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Turn off notifications during focus blocks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Keep water nearby to stay hydrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Use breaks to move and stretch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Write down distracting thoughts for later</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-lg p-4 text-center">
        <p className="text-white/60 text-sm">
          Focus Blocks - Smart Time Management • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default App