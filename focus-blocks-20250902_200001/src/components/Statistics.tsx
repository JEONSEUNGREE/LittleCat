import React from 'react'
import { TrendingUp, Clock, Target, Award } from 'lucide-react'
import useFocusStore from '../store/useFocusStore'

const Statistics: React.FC = () => {
  const { sessions } = useFocusStore()

  const calculateStats = () => {
    if (sessions.length === 0) {
      return {
        totalFocusTime: 0,
        totalSessions: 0,
        averageSessionTime: 0,
        completionRate: 0,
        todayFocusTime: 0,
        streak: 0
      }
    }

    const totalFocusTime = sessions.reduce((acc, session) => acc + session.totalFocusTime, 0)
    const totalSessions = sessions.length
    const averageSessionTime = totalFocusTime / totalSessions
    
    const completedSessions = sessions.filter(s => s.completedBlocks > 0)
    const completionRate = (completedSessions.length / totalSessions) * 100

    const today = new Date().toDateString()
    const todaySessions = sessions.filter(s => s.startTime && new Date(s.startTime).toDateString() === today)
    const todayFocusTime = todaySessions.reduce((acc, session) => acc + session.totalFocusTime, 0)

    // Calculate streak (consecutive days with at least one session)
    let streak = 0
    const sortedSessions = [...sessions].sort((a, b) => 
      new Date(b.startTime!).getTime() - new Date(a.startTime!).getTime()
    )
    
    if (sortedSessions.length > 0) {
      streak = 1
      let currentDate = new Date(sortedSessions[0].startTime!)
      
      for (let i = 1; i < sortedSessions.length; i++) {
        const sessionDate = new Date(sortedSessions[i].startTime!)
        const diffDays = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) {
          streak++
          currentDate = sessionDate
        } else if (diffDays > 1) {
          break
        }
      }
    }

    return {
      totalFocusTime,
      totalSessions,
      averageSessionTime,
      completionRate,
      todayFocusTime,
      streak
    }
  }

  const stats = calculateStats()

  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Focus Stats</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <p className="text-3xl font-bold text-white">{formatMinutes(stats.todayFocusTime)}</p>
          <p className="text-white/70 text-sm">Today's Focus</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <p className="text-3xl font-bold text-white">{stats.streak}</p>
          <p className="text-white/70 text-sm">Day Streak</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <p className="text-3xl font-bold text-white">{Math.round(stats.completionRate)}%</p>
          <p className="text-white/70 text-sm">Completion Rate</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <p className="text-3xl font-bold text-white">{formatMinutes(stats.totalFocusTime)}</p>
          <p className="text-white/70 text-sm">Total Focus</p>
        </div>
      </div>

      <div className="mt-6 bg-white/10 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Recent Sessions</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sessions.slice(-5).reverse().map(session => (
            <div key={session.id} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
              <div>
                <p className="text-white text-sm">
                  {session.startTime && new Date(session.startTime).toLocaleDateString()}
                </p>
                <p className="text-white/60 text-xs">
                  {session.completedBlocks} blocks completed
                </p>
              </div>
              <p className="text-white font-semibold">
                {formatMinutes(session.totalFocusTime)}
              </p>
            </div>
          ))}
          {sessions.length === 0 && (
            <p className="text-white/50 text-center py-4">No sessions yet. Start focusing!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Statistics