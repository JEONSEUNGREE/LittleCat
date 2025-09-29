import React, { useEffect } from 'react'
import { Brain, Settings, Home, BarChart } from 'lucide-react'
import { Timer } from './components/Timer'
import { SessionInput } from './components/SessionInput'
import { Analytics } from './components/Analytics'
import { useFocusStore } from './store/useFocusStore'

type View = 'home' | 'analytics' | 'settings'

function App() {
  const { currentSession, analyzeFocusPatterns, setDailyGoal, dailyGoal } = useFocusStore()
  const [activeView, setActiveView] = React.useState<View>('home')

  useEffect(() => {
    // Initial pattern analysis
    analyzeFocusPatterns()
  }, [analyzeFocusPatterns])

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="glass-effect rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Focus Flow
            </h1>
          </div>
          <div className="text-white/60 text-sm">
            AI 집중력 관리
          </div>
        </header>

        {/* Navigation */}
        <nav className="glass-effect rounded-2xl p-2 mb-6 flex gap-2">
          <button
            onClick={() => setActiveView('home')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
              activeView === 'home'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">홈</span>
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
              activeView === 'analytics'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <BarChart className="w-4 h-4" />
            <span className="hidden sm:inline">분석</span>
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
              activeView === 'settings'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">설정</span>
          </button>
        </nav>

        {/* Main Content */}
        <main className="animate-fadeIn">
          {activeView === 'home' && (
            <div className="space-y-6">
              {currentSession ? <Timer /> : <SessionInput />}
            </div>
          )}

          {activeView === 'analytics' && <Analytics />}

          {activeView === 'settings' && (
            <div className="glass-effect rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">설정</h2>
              
              <div className="space-y-6">
                {/* Daily Goal Setting */}
                <div>
                  <label className="block text-white/80 text-sm mb-3">
                    일일 목표 (분)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="60"
                      max="480"
                      step="30"
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(Number(e.target.value))}
                      className="flex-1 accent-purple-500"
                    />
                    <div className="glass-effect px-4 py-2 rounded-xl min-w-[80px] text-center">
                      <span className="text-white font-bold">{dailyGoal}</span>
                      <span className="text-white/60 text-sm ml-1">분</span>
                    </div>
                  </div>
                  <div className="text-white/50 text-xs mt-2">
                    {Math.floor(dailyGoal / 60)}시간 {dailyGoal % 60}분
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <label className="flex items-center justify-between cursor-pointer glass-effect rounded-xl p-4">
                    <div>
                      <div className="text-white font-semibold">알림 설정</div>
                      <div className="text-white/60 text-sm mt-1">
                        세션 종료 시 알림을 받습니다
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only"
                    />
                    <div className="w-12 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500">
                      <div className="w-5 h-5 bg-white rounded-full translate-x-6 mt-0.5" />
                    </div>
                  </label>
                </div>

                {/* Dark Mode */}
                <div>
                  <label className="flex items-center justify-between cursor-pointer glass-effect rounded-xl p-4">
                    <div>
                      <div className="text-white font-semibold">다크 모드</div>
                      <div className="text-white/60 text-sm mt-1">
                        어두운 테마 사용
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only"
                    />
                    <div className="w-12 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500">
                      <div className="w-5 h-5 bg-white rounded-full translate-x-6 mt-0.5" />
                    </div>
                  </label>
                </div>

                {/* Clear Data */}
                <button
                  onClick={() => {
                    if (confirm('모든 세션 데이터를 삭제하시겠습니까?')) {
                      localStorage.removeItem('focus-sessions')
                      window.location.reload()
                    }
                  }}
                  className="w-full glass-effect py-3 rounded-xl text-red-400 hover:bg-white/10 transition-all"
                >
                  데이터 초기화
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App