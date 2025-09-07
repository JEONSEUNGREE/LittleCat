import React from 'react'
import { Shield, Settings, Info } from 'lucide-react'
import { PostureMonitor } from './components/PostureMonitor'
import { DailyStats } from './components/DailyStats'
import { BreakReminder } from './components/BreakReminder'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Posture Guardian</h1>
                <p className="text-gray-600">건강한 자세, 건강한 삶</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <Info className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Stats Overview */}
          <DailyStats />

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Posture Monitor */}
            <PostureMonitor />

            {/* Break Reminder */}
            <BreakReminder />
          </div>

          {/* Tips Section */}
          <div className="mt-6 glass-card p-6">
            <h2 className="text-xl font-bold mb-4">💡 올바른 자세 팁</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-2xl mb-2">🖥️</div>
                <h3 className="font-semibold mb-1">모니터 위치</h3>
                <p className="text-sm text-gray-600">눈높이에서 약간 아래</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-2xl mb-2">📏</div>
                <h3 className="font-semibold mb-1">화면 거리</h3>
                <p className="text-sm text-gray-600">팔 길이 정도 거리</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-2xl mb-2">🪑</div>
                <h3 className="font-semibold mb-1">의자 높이</h3>
                <p className="text-sm text-gray-600">발이 바닥에 평평하게</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-2xl mb-2">🦴</div>
                <h3 className="font-semibold mb-1">등 자세</h3>
                <p className="text-sm text-gray-600">등받이에 기대어 곧게</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Posture Guardian. 당신의 건강을 지켜드립니다.</p>
        </footer>
      </div>
    </div>
  )
}

export default App