import { useState } from 'react'
import { Trophy, Target, Calendar, ChevronRight, Award, Star, TrendingUp } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  total: number
}

export default function ProgressTracker() {
  const { weeklyStats, exercises, dailyHistory } = usePostureStore()
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week')

  const achievements: Achievement[] = [
    {
      id: '1',
      title: '첫 걸음',
      description: '첫 자세 분석 완료',
      icon: '🎯',
      unlocked: dailyHistory.length > 0,
      progress: dailyHistory.length > 0 ? 1 : 0,
      total: 1,
    },
    {
      id: '2',
      title: '일주일 전사',
      description: '7일 연속 운동',
      icon: '🔥',
      unlocked: false,
      progress: 3,
      total: 7,
    },
    {
      id: '3',
      title: '자세 마스터',
      description: '평균 90점 이상 달성',
      icon: '👑',
      unlocked: weeklyStats.average >= 90,
      progress: weeklyStats.average,
      total: 90,
    },
    {
      id: '4',
      title: '운동 챔피언',
      description: '100개 운동 완료',
      icon: '💪',
      unlocked: false,
      progress: exercises.filter(e => e.completed).length,
      total: 100,
    },
    {
      id: '5',
      title: '개선의 달인',
      description: '20% 이상 개선',
      icon: '📈',
      unlocked: weeklyStats.improvement >= 20,
      progress: weeklyStats.improvement,
      total: 20,
    },
  ]

  const weekData = [
    { day: '월', score: 72, exercises: 3 },
    { day: '화', score: 75, exercises: 4 },
    { day: '수', score: 78, exercises: 4 },
    { day: '목', score: 76, exercises: 3 },
    { day: '금', score: 80, exercises: 5 },
    { day: '토', score: 82, exercises: 4 },
    { day: '일', score: 85, exercises: 6 },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 75) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            진행 상황
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === 'week'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/50 text-gray-700'
              }`}
            >
              주간
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === 'month'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/50 text-gray-700'
              }`}
            >
              월간
            </button>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white/50 rounded-xl p-4">
          <div className="flex justify-between items-end h-32 mb-2">
            {weekData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative w-full flex justify-center">
                  <div
                    className={`w-8 rounded-t-lg ${getScoreColor(data.score)} transition-all duration-500`}
                    style={{ height: `${(data.score / 100) * 80}px` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700">{data.score}</span>
                <span className="text-xs text-gray-600">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-700">{weeklyStats.average}</p>
            <p className="text-xs text-blue-600">평균 점수</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-700">+{weeklyStats.improvement}%</p>
            <p className="text-xs text-green-600">개선율</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-700">
              {Math.round(weeklyStats.totalTime / 60)}분
            </p>
            <p className="text-xs text-purple-600">운동 시간</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-500" />
            업적
          </h3>
          <span className="text-sm text-gray-600">
            {unlockedCount}/{achievements.length} 달성
          </span>
        </div>

        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                  : 'bg-gray-50 opacity-75'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${
                      achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </p>
                    {achievement.unlocked && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{achievement.description}</p>
                  
                  {!achievement.unlocked && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>진행률</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-500" />
            이번 주 목표
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">평균 80점 달성</p>
                <p className="text-xs text-gray-600">현재: {weeklyStats.average}점</p>
              </div>
            </div>
            {weeklyStats.average >= 80 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">매일 운동하기</p>
                <p className="text-xs text-gray-600">5/7일 완료</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">3개 업적 달성</p>
                <p className="text-xs text-gray-600">{unlockedCount}/3 완료</p>
              </div>
            </div>
            {unlockedCount >= 3 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}