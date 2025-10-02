import { useState, useEffect } from 'react'
import { Camera, Activity, TrendingUp, Award, Settings, RefreshCw } from 'lucide-react'
import PostureCamera from './components/PostureCamera'
import PostureAnalysis from './components/PostureAnalysis'
import ExerciseGuide from './components/ExerciseGuide'
import ProgressTracker from './components/ProgressTracker'
import { usePostureStore } from './store/postureStore'

function App() {
  const [activeTab, setActiveTab] = useState<'camera' | 'analysis' | 'exercises' | 'progress'>('camera')
  const { currentPosture, updateScore, resetDaily } = usePostureStore()

  useEffect(() => {
    const checkDaily = () => {
      const now = new Date()
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetDaily()
      }
    }
    const interval = setInterval(checkDaily, 60000)
    return () => clearInterval(interval)
  }, [resetDaily])

  const getTabIcon = (tab: typeof activeTab) => {
    switch (tab) {
      case 'camera':
        return <Camera className="w-5 h-5" />
      case 'analysis':
        return <Activity className="w-5 h-5" />
      case 'exercises':
        return <TrendingUp className="w-5 h-5" />
      case 'progress':
        return <Award className="w-5 h-5" />
    }
  }

  const getTabLabel = (tab: typeof activeTab) => {
    switch (tab) {
      case 'camera':
        return '실시간'
      case 'analysis':
        return '분석'
      case 'exercises':
        return '운동'
      case 'progress':
        return '진도'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="glass-card m-4 p-4 flex items-center justify-between safe-area-inset">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">자세 거울</h1>
            <p className="text-xs text-gray-600">오늘의 점수: {currentPosture.score}점</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-20">
        {activeTab === 'camera' && <PostureCamera />}
        {activeTab === 'analysis' && <PostureAnalysis />}
        {activeTab === 'exercises' && <ExerciseGuide />}
        {activeTab === 'progress' && <ProgressTracker />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card rounded-t-2xl safe-area-inset">
        <div className="flex justify-around py-2">
          {(['camera', 'analysis', 'exercises', 'progress'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {getTabIcon(tab)}
              <span className="text-xs font-medium">{getTabLabel(tab)}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default App