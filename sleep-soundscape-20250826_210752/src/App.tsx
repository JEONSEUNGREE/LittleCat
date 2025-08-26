import { Moon, Sparkles } from 'lucide-react'
import { SoundPlayer } from './components/SoundPlayer'
import { SoundMixer } from './components/SoundMixer'
import { SleepTimer } from './components/SleepTimer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-night-800 to-night-900 overflow-x-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
              <Moon className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Sleep Soundscape</h1>
              <p className="text-night-300 text-sm mt-1">AI 맞춤 수면 사운드</p>
            </div>
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <SoundPlayer />
            <SoundMixer />
            <SleepTimer />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4 space-y-6">
              <SoundPlayer />
              <SleepTimer />
            </div>
            <div className="lg:col-span-8">
              <SoundMixer />
            </div>
          </div>

          {/* Sleep Tips */}
          <div className="mt-8 bg-night-700/30 backdrop-blur rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              오늘의 수면 팁
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-night-600/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-400 mb-2">일정한 수면 시간</h4>
                <p className="text-sm text-night-200">매일 같은 시간에 잠들고 일어나는 습관을 만들어보세요.</p>
              </div>
              <div className="bg-night-600/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-400 mb-2">편안한 환경</h4>
                <p className="text-sm text-night-200">어둡고 시원하며 조용한 환경이 숙면에 도움이 됩니다.</p>
              </div>
              <div className="bg-night-600/30 rounded-lg p-4">
                <h4 className="font-medium text-indigo-400 mb-2">디지털 디톡스</h4>
                <p className="text-sm text-night-200">잠들기 1시간 전에는 스마트폰 사용을 자제해보세요.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto px-6 py-6 text-center">
        <p className="text-night-400 text-sm">
          편안한 밤 되세요 💤
        </p>
      </footer>
    </div>
  )
}

export default App