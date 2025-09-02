import React from 'react'
import { TrendingUp, Award, Zap } from 'lucide-react'
import useCadenceStore from '../store/useCadenceStore'

const ProgressChart: React.FC = () => {
  const { weeklySteps, weeklyGoal, sessions } = useCadenceStore()
  
  const progressPercentage = Math.min(100, (weeklySteps / weeklyGoal) * 100)
  
  const getRecentSessions = () => {
    return sessions.slice(-7).reverse()
  }
  
  const getAverageCadence = () => {
    if (sessions.length === 0) return 0
    const recent = sessions.slice(-7)
    const sum = recent.reduce((acc, s) => acc + s.averageCadence, 0)
    return Math.round(sum / recent.length)
  }
  
  const getTotalStepsToday = () => {
    const today = new Date().toDateString()
    return sessions
      .filter(s => new Date(s.date).toDateString() === today)
      .reduce((acc, s) => acc + s.steps, 0)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="text-primary-500" size={24} />
          Progress
        </h2>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Weekly Goal</span>
          <span className="text-sm font-semibold text-gray-800">
            {weeklySteps.toLocaleString()} / {weeklyGoal.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-500">
          {progressPercentage.toFixed(0)}% Complete
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <Zap className="text-blue-500" size={16} />
            <span className="text-xs text-blue-600">Today</span>
          </div>
          <div className="text-lg font-bold text-blue-700">
            {getTotalStepsToday().toLocaleString()}
          </div>
          <div className="text-xs text-blue-500">steps</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <Award className="text-green-500" size={16} />
            <span className="text-xs text-green-600">Avg</span>
          </div>
          <div className="text-lg font-bold text-green-700">
            {getAverageCadence()}
          </div>
          <div className="text-xs text-green-500">SPM</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <TrendingUp className="text-purple-500" size={16} />
            <span className="text-xs text-purple-600">Sessions</span>
          </div>
          <div className="text-lg font-bold text-purple-700">
            {sessions.length}
          </div>
          <div className="text-xs text-purple-500">total</div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Sessions</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {getRecentSessions().length > 0 ? (
            getRecentSessions().map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">
                    {session.averageCadence} SPM
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(session.date).toLocaleDateString()} • {session.steps} steps
                  </div>
                </div>
                <div className={`text-sm font-semibold ${
                  session.quality >= 80 ? 'text-green-500' : 
                  session.quality >= 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {session.quality}%
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">
              No sessions yet. Start tracking to see your progress!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressChart