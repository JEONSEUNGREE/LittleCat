import React, { useState, useEffect } from 'react'
import { Target, Trophy, Heart, Zap } from 'lucide-react'

interface Exercise {
  id: number
  name: string
  description: string
  duration: number
  icon: React.ReactNode
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: 'Slow Blink',
    description: 'Close your eyes slowly and hold for 2 seconds',
    duration: 10,
    icon: <Heart className="w-6 h-6" />
  },
  {
    id: 2,
    name: 'Rapid Blink',
    description: 'Blink rapidly 20 times to lubricate eyes',
    duration: 15,
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 3,
    name: 'Focus Shift',
    description: 'Focus on near object, then far object',
    duration: 20,
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 4,
    name: 'Palming',
    description: 'Cover eyes with palms and relax',
    duration: 30,
    icon: <Trophy className="w-6 h-6" />
  }
]

const ExerciseMode: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && currentExercise) {
      handleComplete()
    }
    
    return () => clearInterval(interval)
  }, [isActive, timeLeft, currentExercise])
  
  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise)
    setTimeLeft(exercise.duration)
    setIsActive(true)
  }
  
  const handleComplete = () => {
    if (currentExercise) {
      setCompletedExercises(prev => [...prev, currentExercise.id])
      setIsActive(false)
      setCurrentExercise(null)
    }
  }
  
  const resetExercises = () => {
    setCompletedExercises([])
    setCurrentExercise(null)
    setIsActive(false)
    setTimeLeft(0)
  }
  
  const progressPercentage = (completedExercises.length / exercises.length) * 100
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Eye Exercises</h2>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">
            {completedExercises.length}/{exercises.length}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {currentExercise ? (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-blue-600">
                {currentExercise.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{currentExercise.name}</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
          </div>
          
          <p className="text-gray-700 mb-4">{currentExercise.description}</p>
          
          <div className="relative h-2 bg-white rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${(timeLeft / currentExercise.duration) * 100}%` }}
            />
          </div>
          
          <button
            onClick={() => setIsActive(false)}
            className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Cancel Exercise
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {exercises.map(exercise => {
            const isCompleted = completedExercises.includes(exercise.id)
            
            return (
              <button
                key={exercise.id}
                onClick={() => !isCompleted && startExercise(exercise)}
                disabled={isCompleted}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                  isCompleted 
                    ? 'bg-green-50 border-2 border-green-300 cursor-not-allowed' 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-blue-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  isCompleted ? 'bg-green-200 text-green-700' : 'bg-white text-gray-600'
                }`}>
                  {exercise.icon}
                </div>
                
                <div className="flex-1 text-left">
                  <h4 className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-800'}`}>
                    {exercise.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">{exercise.duration}s</p>
                </div>
                
                {isCompleted && (
                  <div className="text-green-600">
                    <Trophy className="w-5 h-5" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
      
      {completedExercises.length === exercises.length && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
          <p className="text-green-800 font-semibold">All exercises completed!</p>
          <button
            onClick={resetExercises}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  )
}

export default ExerciseMode