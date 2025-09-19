import React from 'react'
import { Droplets, Music2, Trophy, Settings } from 'lucide-react'
import HydrationTracker from './components/HydrationTracker'
import RhythmGame from './components/RhythmGame'
import CharacterDisplay from './components/CharacterDisplay'
import useHydroStore from './store/useHydroStore'

function App() {
  const { score, maxCombo, perfectHits, goodHits, currentIntake, dailyGoal } = useHydroStore()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-hydro-50 via-hydro-100 to-hydro-200">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <header className="glass-card p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-hydro-500 rounded-xl">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-hydro-800">
                  Hydro Rhythm
                </h1>
                <p className="text-sm text-hydro-600">Musical Water Reminder</p>
              </div>
            </div>
            <button className="p-2 hover:bg-hydro-100 rounded-lg transition-colors">
              <Settings className="w-6 h-6 text-hydro-600" />
            </button>
          </div>
        </header>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RhythmGame />
            
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-hydro-800">Game Stats</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-hydro-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-hydro-700">{score}</div>
                  <div className="text-xs text-hydro-600">Total Score</div>
                </div>
                <div className="bg-hydro-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-hydro-700">{maxCombo}</div>
                  <div className="text-xs text-hydro-600">Max Combo</div>
                </div>
                <div className="bg-hydro-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{perfectHits}</div>
                  <div className="text-xs text-hydro-600">Perfect Hits</div>
                </div>
                <div className="bg-hydro-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{goodHits}</div>
                  <div className="text-xs text-hydro-600">Good Hits</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <CharacterDisplay />
            <HydrationTracker />
            
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Music2 className="w-5 h-5 text-hydro-600" />
                <h3 className="text-lg font-bold text-hydro-800">Daily Progress</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-hydro-600">Hydration</span>
                  <span className="font-semibold text-hydro-800">
                    {((currentIntake / dailyGoal) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-hydro-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-hydro-400 to-hydro-600 transition-all duration-500"
                    style={{ width: `${Math.min((currentIntake / dailyGoal) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App