import React, { useState } from 'react'
import { Play, Pause, RotateCcw, Clock, ChevronRight } from 'lucide-react'
import { exercises, Exercise } from '../store'

const ExerciseGuide: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false)
            if (selectedExercise) {
              setCompletedExercises((prev) => [...prev, selectedExercise.id])
              // Vibrate on completion
              if ('vibrate' in navigator) {
                navigator.vibrate([200, 100, 200])
              }
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isPlaying, timeLeft, selectedExercise])
  
  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setTimeLeft(exercise.duration)
    setIsPlaying(true)
  }
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  
  const resetExercise = () => {
    if (selectedExercise) {
      setTimeLeft(selectedExercise.duration)
      setIsPlaying(false)
    }
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const getCategoryColor = (category: Exercise['category']) => {
    switch (category) {
      case 'neck':
        return 'bg-blue-500'
      case 'shoulder':
        return 'bg-purple-500'
      case 'back':
        return 'bg-green-500'
      case 'full':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }
  
  const getCategoryLabel = (category: Exercise['category']) => {
    switch (category) {
      case 'neck':
        return '목'
      case 'shoulder':
        return '어깨'
      case 'back':
        return '등'
      case 'full':
        return '전신'
      default:
        return '기타'
    }
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">스트레칭 가이드</h2>
      
      {selectedExercise && timeLeft > 0 ? (
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{selectedExercise.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{selectedExercise.name}</h3>
            <p className="text-white/80">{selectedExercise.description}</p>
          </div>
          
          <div className="relative mb-6">
            <div className="text-5xl font-bold text-center mb-4">
              {formatTime(timeLeft)}
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100}%`,
                }}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={togglePlayPause}
              className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  일시정지
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  재시작
                </>
              )}
            </button>
            <button
              onClick={resetExercise}
              className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              다시하기
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {exercises.map((exercise) => {
            const isCompleted = completedExercises.includes(exercise.id)
            
            return (
              <button
                key={exercise.id}
                onClick={() => startExercise(exercise)}
                className={`w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 flex items-center gap-4 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  isCompleted ? 'opacity-60' : ''
                }`}
              >
                <div className="text-3xl">{exercise.icon}</div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">
                      {exercise.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full text-white ${getCategoryColor(
                        exercise.category
                      )}`}
                    >
                      {getCategoryLabel(exercise.category)}
                    </span>
                    {isCompleted && (
                      <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full text-white">
                        완료
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/60">{exercise.description}</p>
                </div>
                <div className="flex items-center gap-1 text-white/60">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{exercise.duration}초</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </button>
            )
          })}
        </div>
      )}
      
      {completedExercises.length === exercises.length && (
        <div className="mt-6 p-4 bg-green-500/20 rounded-xl text-center">
          <p className="text-green-300 font-semibold">
            🎉 모든 운동을 완료했습니다! 훌륭해요!
          </p>
          <button
            onClick={() => setCompletedExercises([])}
            className="mt-2 text-sm text-green-300 underline"
          >
            다시 시작하기
          </button>
        </div>
      )}
    </div>
  )
}