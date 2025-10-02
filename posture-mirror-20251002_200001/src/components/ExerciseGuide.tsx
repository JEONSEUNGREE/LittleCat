import { useState } from 'react'
import { Play, Pause, CheckCircle, Circle, Clock, Flame, Star } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

export default function ExerciseGuide() {
  const { exercises, completeExercise } = usePostureStore()
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)

  const categories = {
    neck: { label: '목', color: 'bg-blue-500', lightColor: 'bg-blue-100' },
    shoulder: { label: '어깨', color: 'bg-purple-500', lightColor: 'bg-purple-100' },
    back: { label: '등', color: 'bg-green-500', lightColor: 'bg-green-100' },
    core: { label: '코어', color: 'bg-orange-500', lightColor: 'bg-orange-100' },
  }

  const getExercisesByCategory = (category: keyof typeof categories) => {
    return exercises.filter(ex => ex.category === category)
  }

  const startExercise = (exerciseId: string, duration: number) => {
    setActiveExercise(exerciseId)
    setIsPlaying(true)
    setTimeRemaining(duration)
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          completeExercise(exerciseId)
          setIsPlaying(false)
          setActiveExercise(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const completedCount = exercises.filter(ex => ex.completed).length
  const completionRate = Math.round((completedCount / exercises.length) * 100)

  return (
    <div className="space-y-4">
      {/* Daily Progress */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">오늘의 운동</h3>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              {completedCount}/{exercises.length} 완료
            </span>
          </div>
        </div>
        
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        
        {completionRate === 100 && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center gap-2">
            <Star className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700 font-medium">
              훌륭해요! 오늘의 목표를 모두 달성했습니다! 🎉
            </p>
          </div>
        )}
      </div>

      {/* Exercise Categories */}
      {Object.entries(categories).map(([key, config]) => {
        const categoryExercises = getExercisesByCategory(key as keyof typeof categories)
        if (categoryExercises.length === 0) return null

        return (
          <div key={key} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-sm font-bold">{config.label}</span>
              </div>
              <h4 className="font-semibold text-gray-800">{config.label} 운동</h4>
            </div>

            <div className="space-y-2">
              {categoryExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className={`p-3 rounded-lg transition-all ${
                    exercise.completed
                      ? 'bg-gray-50 opacity-75'
                      : activeExercise === exercise.id
                      ? config.lightColor
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => !exercise.completed && !isPlaying && startExercise(exercise.id, exercise.duration)}
                        disabled={exercise.completed || (isPlaying && activeExercise !== exercise.id)}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {exercise.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : activeExercise === exercise.id && isPlaying ? (
                          <Pause className="w-4 h-4 text-gray-700" />
                        ) : (
                          <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <p className={`font-medium ${exercise.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                          {exercise.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activeExercise === exercise.id && timeRemaining > 0
                              ? formatTime(timeRemaining)
                              : `${exercise.duration}초`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {activeExercise === exercise.id && (
                      <div className="w-16 h-16 relative">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${(timeRemaining / exercise.duration) * 176} 176`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gradient">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                          {Math.round((timeRemaining / exercise.duration) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Exercise Tips */}
      <div className="glass-card p-4 bg-gradient-to-br from-primary-50 to-blue-50">
        <h4 className="font-semibold text-gray-800 mb-3">💡 운동 팁</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            <span>각 운동 전후로 5초간 준비 및 마무리 스트레칭을 하세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            <span>통증이 있다면 즉시 중단하고 전문가와 상담하세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500 mt-1">•</span>
            <span>호흡을 일정하게 유지하며 천천히 동작을 수행하세요</span>
          </li>
        </ul>
      </div>
    </div>
  )
}