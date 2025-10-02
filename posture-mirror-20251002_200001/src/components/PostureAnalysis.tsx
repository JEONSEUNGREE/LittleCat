import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { usePostureStore } from '../store/postureStore'

export default function PostureAnalysis() {
  const { currentPosture, dailyHistory, weeklyStats } = usePostureStore()
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

  const getRecommendations = () => {
    const recommendations = []
    
    if (currentPosture.neck < 80) {
      recommendations.push({
        type: 'neck',
        severity: currentPosture.neck < 60 ? 'high' : 'medium',
        title: '거북목 주의',
        description: '모니터 높이를 조정하고 턱을 당기는 연습을 하세요',
      })
    }
    
    if (currentPosture.shoulder < 80) {
      recommendations.push({
        type: 'shoulder',
        severity: currentPosture.shoulder < 60 ? 'high' : 'medium',
        title: '굽은 어깨',
        description: '어깨를 뒤로 젖히고 가슴을 펴는 스트레칭이 필요합니다',
      })
    }
    
    if (currentPosture.spine < 80) {
      recommendations.push({
        type: 'spine',
        severity: currentPosture.spine < 60 ? 'high' : 'medium',
        title: '척추 정렬',
        description: '등받이에 기대고 허리를 곧게 펴세요',
      })
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'good',
        severity: 'low',
        title: '훌륭한 자세!',
        description: '현재 자세를 유지하면서 정기적인 스트레칭을 계속하세요',
      })
    }
    
    return recommendations
  }

  const getTrend = (current: number, previous: number) => {
    const diff = current - previous
    if (Math.abs(diff) < 2) return 'stable'
    return diff > 0 ? 'up' : 'down'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  const calculateAverage = (key: keyof typeof currentPosture) => {
    if (dailyHistory.length === 0) return currentPosture[key]
    const sum = dailyHistory.reduce((acc, data) => acc + (data[key] as number), 0)
    return Math.round(sum / dailyHistory.length)
  }

  return (
    <div className="space-y-4">
      {/* Time Range Selector */}
      <div className="glass-card p-2 flex gap-2">
        {(['today', 'week', 'month'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              timeRange === range
                ? 'bg-primary-500 text-white'
                : 'bg-white/50 text-gray-700 hover:bg-white/70'
            }`}
          >
            {range === 'today' ? '오늘' : range === 'week' ? '이번주' : '이번달'}
          </button>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="glass-card p-4">
        <h3 className="font-semibold text-gray-800 mb-4">자세 분석 리포트</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">현재 점수</p>
            <p className="text-3xl font-bold text-primary-700">{currentPosture.score}</p>
            <div className="flex items-center gap-1 mt-2">
              {getTrendIcon(getTrend(currentPosture.score, 75))}
              <span className="text-xs text-gray-600">평균 대비</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">주간 개선도</p>
            <p className="text-3xl font-bold text-green-700">+{weeklyStats.improvement}%</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-600">지난주 대비</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">🦴</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">목 정렬</p>
                <p className="text-xs text-gray-600">평균: {calculateAverage('neck')}점</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800">{currentPosture.neck}</span>
              {getTrendIcon(getTrend(currentPosture.neck, calculateAverage('neck')))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">💪</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">어깨 균형</p>
                <p className="text-xs text-gray-600">평균: {calculateAverage('shoulder')}점</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800">{currentPosture.shoulder}</span>
              {getTrendIcon(getTrend(currentPosture.shoulder, calculateAverage('shoulder')))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">🦵</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">척추 정렬</p>
                <p className="text-xs text-gray-600">평균: {calculateAverage('spine')}점</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800">{currentPosture.spine}</span>
              {getTrendIcon(getTrend(currentPosture.spine, calculateAverage('spine')))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-4">
        <h3 className="font-semibold text-gray-800 mb-4">맞춤 추천</h3>
        <div className="space-y-3">
          {getRecommendations().map((rec, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                rec.severity === 'high' ? 'bg-red-50 border-red-200' :
                rec.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(rec.severity)}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{rec.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glass-card p-4">
        <h4 className="font-medium text-gray-700 mb-3">오늘의 통계</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">{dailyHistory.length}</p>
            <p className="text-xs text-gray-600">측정 횟수</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(weeklyStats.totalTime / 60)}분
            </p>
            <p className="text-xs text-gray-600">운동 시간</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{weeklyStats.average}</p>
            <p className="text-xs text-gray-600">주간 평균</p>
          </div>
        </div>
      </div>
    </div>
  )
}