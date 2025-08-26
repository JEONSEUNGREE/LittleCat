import React, { useEffect } from 'react'
import { Timer } from './components/Timer'
import { Statistics } from './components/Statistics'
import { Settings } from './components/Settings'
import { useEyeCareStore } from './store/useEyeCareStore'

function App() {
  const { resetDaily } = useEyeCareStore()

  useEffect(() => {
    // 날짜가 바뀌었는지 확인하고 일일 통계 리셋
    const lastDate = localStorage.getItem('lastSessionDate')
    const today = new Date().toDateString()
    
    if (lastDate && lastDate !== today) {
      resetDaily()
    }
    
    // 알림 권한 요청
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [resetDaily])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Settings />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Eye Care Timer
          </h1>
          <p className="text-gray-600">
            20-20-20 규칙으로 눈 건강을 지켜보세요
          </p>
        </header>

        <main className="flex flex-col gap-8">
          <Timer />
          <Statistics />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>눈 건강을 위한 스마트한 선택</p>
          <p className="mt-1">© 2025 Eye Care Timer</p>
        </footer>
      </div>
    </div>
  )
}

export default App