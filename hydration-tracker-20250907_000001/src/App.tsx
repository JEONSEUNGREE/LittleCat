import React, { useEffect } from 'react'
import { Droplets } from 'lucide-react'
import useHydrationStore from './store/useHydrationStore'
import DailyProgress from './components/DailyProgress'
import QuickAddButtons from './components/QuickAddButtons'
import DrinkHistory from './components/DrinkHistory'
import Settings from './components/Settings'

function App() {
  const { resetDaily, reminderEnabled, reminderInterval } = useHydrationStore()
  
  useEffect(() => {
    resetDaily()
    
    const checkNewDay = setInterval(() => {
      resetDaily()
    }, 60000)
    
    return () => clearInterval(checkNewDay)
  }, [resetDaily])
  
  useEffect(() => {
    if (!reminderEnabled) return
    
    const showNotification = () => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('💧 수분 섭취 시간!', {
          body: '물 한 잔 마실 시간이에요. 건강을 위해 수분을 보충하세요!',
          icon: '/vite.svg',
          tag: 'hydration-reminder',
          requireInteraction: false
        })
      }
    }
    
    const requestPermission = async () => {
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission()
      }
    }
    
    requestPermission()
    
    const reminderTimer = setInterval(showNotification, reminderInterval * 60 * 1000)
    
    return () => clearInterval(reminderTimer)
  }, [reminderEnabled, reminderInterval])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 pb-20">
      <Settings />
      
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Droplets className="w-10 h-10 text-white mr-2" />
            <h1 className="text-3xl font-bold text-white">Hydration Tracker</h1>
          </div>
          <p className="text-blue-100">건강한 수분 섭취 습관을 만들어요</p>
        </header>
        
        <div className="space-y-4">
          <DailyProgress />
          
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 p-4 pb-0">빠른 추가</h2>
            <QuickAddButtons />
          </div>
          
          <DrinkHistory />
        </div>
        
        <footer className="text-center mt-8 text-white/80 text-sm">
          <p>매일 충분한 수분을 섭취하여 건강을 지키세요 💙</p>
        </footer>
      </div>
    </div>
  )
}

export default App