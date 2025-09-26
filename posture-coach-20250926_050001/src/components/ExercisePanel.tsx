import { useState } from 'react'
import { Clock, CheckCircle, PlayCircle, RotateCcw, Target } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

const ExercisePanel: React.FC = () => {
  const { exercises, completeExercise, resetExercises } = usePostureStore()
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  
  const categories = {
    neck: { color: 'bg-blue-100 text-blue-700', icon: '🔄' },
    shoulders: { color: 'bg-green-100 text-green-700', icon: '🤸' },
    back: { color: 'bg-purple-100 text-purple-700', icon: '🧘' },
    core: { color: 'bg-orange-100 text-orange-700', icon: '💪' },
  }
  
  React.useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false)
      if (activeExercise) {
        completeExercise(activeExercise)
        setActiveExercise(null)
      }
    }
  }, [isRunning, timeLeft, activeExercise, completeExercise])
  
  const startExercise = (exerciseId: string, duration: number) => {
    setActiveExercise(exerciseId)
    setTimeLeft(duration)
    setIsRunning(true)
  }
  
  const stopExercise = () => {
    setIsRunning(false)
    setActiveExercise(null)
    setTimeLeft(0)
  }
  
  const completedCount = exercises.filter(e => e.completed).length
  const progressPercentage = (completedCount / exercises.length) * 100
  
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Today's Exercises</h2>
          <button
            onClick={resetExercises}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-medium">Reset</span>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {completedCount}/{exercises.length} completed
            </span>
            <span className="text-sm font-bold text-primary-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Active Exercise Timer */}
        {activeExercise && (
          <div className="bg-primary-50 rounded-lg p-6 mb-6 text-center">
            <h3 className="text-xl font-semibold text-primary-800 mb-2">
              {exercises.find(e => e.id === activeExercise)?.name}
            </h3>
            <div className="text-4xl font-bold text-primary-600 mb-4">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <button
              onClick={stopExercise}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            >
              Stop Exercise
            </button>
          </div>
        )}
      </div>
      
      {/* Exercise List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className={`card ${exercise.completed ? 'opacity-75' : ''} hover:shadow-lg transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{categories[exercise.category].icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {Math.floor(exercise.duration / 60)}:{(exercise.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories[exercise.category].color}`}>
                {exercise.category}
              </span>
            </div>
            
            {exercise.completed ? (
              <div className="flex items-center justify-center py-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-700">Completed</span>
              </div>
            ) : (
              <button
                onClick={() => startExercise(exercise.id, exercise.duration)}
                disabled={isRunning}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all ${
                  isRunning
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
                }`}
              >
                <PlayCircle className="w-5 h-5" />
                <span>Start Exercise</span>
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Exercise Tips */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="flex items-start space-x-3">
          <Target className="w-6 h-6 text-primary-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Exercise Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Perform exercises slowly and controlled</li>
              <li>• Stop if you feel pain or discomfort</li>
              <li>• Breathe normally throughout each exercise</li>
              <li>• Maintain good posture even during exercises</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExercisePanel