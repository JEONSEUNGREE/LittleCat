import React from 'react'
import PostureAnalyzer from './components/PostureAnalyzer'
import ExercisePanel from './components/ExercisePanel'
import ProgressTracker from './components/ProgressTracker'
import Header from './components/Header'
import { usePostureStore } from './store/postureStore'

function App() {
  const { activeView } = usePostureStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeView === 'analyze' && <PostureAnalyzer />}
            {activeView === 'exercise' && <ExercisePanel />}
            {activeView === 'progress' && <ProgressTracker />}
          </div>
          
          {/* Side Stats */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Today's Score</span>
                  <span className="text-2xl font-bold text-primary-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Streak</span>
                  <span className="text-xl font-bold text-green-600">7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Exercises Done</span>
                  <span className="text-xl font-bold text-purple-600">23</span>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Daily Tip</h3>
              <p className="text-gray-600 text-sm">
                Keep your monitor at eye level to prevent neck strain. The top of your screen should be at or slightly below eye level.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App