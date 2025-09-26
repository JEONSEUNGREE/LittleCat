import { useState } from 'react'
import { TrendingUp, Calendar, Award, Target, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

const ProgressTracker: React.FC = () => {
  const { streak, records } = usePostureStore()
  const [selectedWeek, setSelectedWeek] = useState(0)
  
  // Mock data for demonstration
  const weeklyData = [
    { day: 'Mon', score: 78, exercises: 4 },
    { day: 'Tue', score: 82, exercises: 6 },
    { day: 'Wed', score: 85, exercises: 5 },
    { day: 'Thu', score: 88, exercises: 6 },
    { day: 'Fri', score: 84, exercises: 4 },
    { day: 'Sat', score: 90, exercises: 6 },
    { day: 'Sun', score: 92, exercises: 6 },
  ]
  
  const achievements = [
    { id: '1', name: 'Week Warrior', description: '7 day streak', earned: true, icon: '🏆' },
    { id: '2', name: 'Perfect Posture', description: 'Score above 90%', earned: true, icon: '⭐' },
    { id: '3', name: 'Exercise Master', description: 'Complete 50 exercises', earned: false, icon: '💪' },
    { id: '4', name: 'Month Champion', description: '30 day streak', earned: false, icon: '👑' },
  ]
  
  const averageScore = weeklyData.reduce((sum, day) => sum + day.score, 0) / weeklyData.length
  const totalExercises = weeklyData.reduce((sum, day) => sum + day.exercises, 0)
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-yellow-500'
    if (score >= 70) return 'bg-orange-500'
    return 'bg-red-500'
  }
  
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{Math.round(averageScore)}%</p>
          <p className="text-sm text-gray-600">Avg Score</p>
        </div>
        <div className="card text-center">
          <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{streak}</p>
          <p className="text-sm text-gray-600">Day Streak</p>
        </div>
        <div className="card text-center">
          <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{totalExercises}</p>
          <p className="text-sm text-gray-600">Exercises</p>
        </div>
        <div className="card text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">
            {achievements.filter(a => a.earned).length}
          </p>
          <p className="text-sm text-gray-600">Achievements</p>
        </div>
      </div>
      
      {/* Weekly Progress Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Weekly Progress</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedWeek(selectedWeek - 1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium px-3">
              {selectedWeek === 0 ? 'This Week' : `${Math.abs(selectedWeek)} Week${Math.abs(selectedWeek) > 1 ? 's' : ''} Ago`}
            </span>
            <button
              onClick={() => setSelectedWeek(Math.min(0, selectedWeek + 1))}
              className="p-1 hover:bg-gray-100 rounded"
              disabled={selectedWeek === 0}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Score Chart */}
          <div className="flex items-end justify-between h-40 px-2">
            {weeklyData.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="w-full max-w-12 bg-gray-100 rounded-t-lg relative">
                  <div
                    className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all ${getScoreColor(day.score)}`}
                    style={{ height: `${day.score}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
                      {day.score}%
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{day.day}</span>
              </div>
            ))}
          </div>
          
          {/* Exercise Count */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Daily Exercises</p>
            <div className="flex justify-between">
              {weeklyData.map((day, idx) => (
                <div key={idx} className="text-center flex-1">
                  <div className="w-8 h-8 mx-auto bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
                    {day.exercises}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievements */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                achievement.earned
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <span className="text-3xl">{achievement.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{achievement.name}</p>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              {achievement.earned && (
                <Award className="w-5 h-5 text-yellow-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Records */}
      {records.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {records.slice(0, 5).map((record, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">
                    Score: {record.score}%
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(record.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.score >= 90 ? 'bg-green-100 text-green-700' :
                  record.score >= 80 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {record.score >= 90 ? 'Excellent' :
                   record.score >= 80 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressTracker