import { useEffect } from 'react'
import { Timer } from './components/Timer'
import { Settings } from './components/Settings'
import { Statistics } from './components/Statistics'
import { Activity } from 'lucide-react'

function App() {
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Activity className="text-white" size={36} />
            <h1 className="text-4xl font-bold text-white">자세 교정 타이머</h1>
          </div>
          <p className="text-white/80">건강한 자세를 유지하세요</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Timer />
          </div>
          
          <div className="space-y-6">
            <Settings />
            <Statistics />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2025 Posture Check Timer. 건강한 하루 되세요! 
          </p>
        </div>
      </div>
    </div>
  )
}

export default App