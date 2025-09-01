import { useState, useEffect } from 'react'
import { Heart, Activity, TrendingUp, Calendar, BarChart3, AlertCircle } from 'lucide-react'
import HRVMeasurement from './components/HRVMeasurement'
import HRVChart from './components/HRVChart'
import StressIndicator from './components/StressIndicator'
import HistoryView from './components/HistoryView'
import { useHRVStore } from './store/hrvStore'

function App() {
  const [activeTab, setActiveTab] = useState<'measure' | 'history' | 'insights'>('measure')
  const { currentHRV, stressLevel, measurements } = useHRVStore()

  useEffect(() => {
    // Initialize with some sample data
    const store = useHRVStore.getState()
    if (measurements.length === 0) {
      store.initializeSampleData()
    }
  }, [measurements.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-primary animate-pulse-slow" />
              <span className="text-xl font-bold text-dark">HRV Pulse</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                현재 HRV: <span className="font-bold text-primary">{currentHRV}ms</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('measure')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'measure'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>측정</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>기록</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'insights'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>인사이트</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'measure' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <HRVMeasurement />
              <StressIndicator stressLevel={stressLevel} />
            </div>
            <HRVChart />
          </div>
        )}

        {activeTab === 'history' && <HistoryView />}

        {activeTab === 'insights' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-dark">건강 인사이트</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">주간 평균 HRV</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {measurements.length > 0 
                    ? Math.round(measurements.reduce((sum, m) => sum + m.value, 0) / measurements.length)
                    : 0}ms
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  지난 주 대비 <span className="text-green-600 font-semibold">+5%</span> 개선
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">스트레스 관리</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {stressLevel === 'low' ? '낮음' : stressLevel === 'medium' ? '보통' : '높음'}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  오늘 3회 명상을 권장합니다
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">회복 지수</h3>
                <p className="text-3xl font-bold text-green-600">85%</p>
                <p className="text-sm text-gray-600 mt-2">
                  충분한 휴식을 취하고 있습니다
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">운동 권장</h3>
                <p className="text-3xl font-bold text-orange-600">중강도</p>
                <p className="text-sm text-gray-600 mt-2">
                  30분 유산소 운동 추천
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">건강 팁:</span> HRV는 자율신경계의 균형을 나타내는 중요한 지표입니다. 
                  규칙적인 운동, 충분한 수면, 스트레스 관리를 통해 HRV를 개선할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App