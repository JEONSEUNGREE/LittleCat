import React from 'react'
import { TrendingUp, Target, Zap, Award } from 'lucide-react'
import { useTimerStore } from '../store/useTimerStore'

export const Statistics: React.FC = () => {
  const { completedToday, dailyGoal, focusScore, sessions } = useTimerStore()
  
  const todayMinutes = sessions
    .filter(s => {
      const today = new Date()
      const sessionDate = new Date(s.completedAt)
      return sessionDate.toDateString() === today.toDateString() && s.type === 'work'
    })
    .reduce((acc, s) => acc + s.duration, 0) / 60

  const goalProgress = (completedToday / dailyGoal) * 100

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">Today's Progress</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 text-center">
          <Target className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{completedToday}/{dailyGoal}</div>
          <div className="text-white/70 text-sm mt-1">Sessions</div>
          <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-blue-400 transition-all duration-500"
              style={{ width: `${Math.min(100, goalProgress)}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{focusScore}%</div>
          <div className="text-white/70 text-sm mt-1">Focus Score</div>
          <div className="mt-3 text-xs text-white/60">
            {focusScore >= 85 ? 'Excellent!' : focusScore >= 70 ? 'Good' : 'Keep going!'}
          </div>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <TrendingUp className="w-8 h-8 text-green-300 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{Math.round(todayMinutes)}</div>
          <div className="text-white/70 text-sm mt-1">Minutes</div>
          <div className="mt-3 text-xs text-white/60">Total focus time</div>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <Award className="w-8 h-8 text-purple-300 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">
            {sessions.filter(s => s.focusLevel === 100).length}
          </div>
          <div className="text-white/70 text-sm mt-1">Perfect</div>
          <div className="mt-3 text-xs text-white/60">100% focus sessions</div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 mt-6">
        <h3 className="text-white font-semibold mb-3">Recent Sessions</h3>
        <div className="space-y-2">
          {sessions.slice(-5).reverse().map(session => (
            <div key={session.id} className="flex items-center justify-between py-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                {session.type === 'work' ? (
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-300 text-xs">W</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-green-300 text-xs">B</span>
                  </div>
                )}
                <div>
                  <div className="text-white text-sm">
                    {session.type === 'work' ? 'Focus' : 'Break'} Session
                  </div>
                  <div className="text-white/50 text-xs">
                    {Math.round(session.duration / 60)} minutes
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm">{session.focusLevel}%</div>
                <div className="text-white/50 text-xs">
                  {new Date(session.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-center text-white/50 py-4">
              No sessions completed yet. Start your first focus session!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}