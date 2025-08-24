import React, { useEffect } from 'react'
import { Droplets } from 'lucide-react'
import HydrationProgress from './components/HydrationProgress'
import QuickAdd from './components/QuickAdd'
import History from './components/History'
import Settings from './components/Settings'
import { useHydrationStore } from './store/hydrationStore'

function App() {
  const { reminders, reminderInterval, lastReminderTime, hydrationLevel } = useHydrationStore()
  
  useEffect(() => {
    const checkForNewDay = () => {
      const lastCheck = localStorage.getItem('lastDayCheck')
      const today = new Date().toDateString()
      
      if (lastCheck !== today) {
        useHydrationStore.getState().clearTodayIntake()
        localStorage.setItem('lastDayCheck', today)
      }
    }
    
    checkForNewDay()
    const interval = setInterval(checkForNewDay, 60000)
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    if (!reminders) return
    
    const checkReminder = () => {
      if (!lastReminderTime) {
        if (Notification.permission === 'granted') {
          new Notification('Hydration Pulse', {
            body: '물을 마실 시간이에요! 💧',
            icon: '/vite.svg'
          })
        }
        return
      }
      
      const now = new Date()
      const diffMinutes = (now.getTime() - new Date(lastReminderTime).getTime()) / (1000 * 60)
      
      if (diffMinutes >= reminderInterval && hydrationLevel < 100) {
        if (Notification.permission === 'granted') {
          new Notification('Hydration Pulse', {
            body: `목표의 ${hydrationLevel}% 달성! 물을 마실 시간이에요! 💧`,
            icon: '/vite.svg'
          })
        }
      }
    }
    
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
    
    const interval = setInterval(checkReminder, 60000)
    checkReminder()
    
    return () => clearInterval(interval)
  }, [reminders, reminderInterval, lastReminderTime, hydrationLevel])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center gap-3 mb-8 pt-4">
          <div className="p-3 bg-blue-500 rounded-full text-white shadow-lg">
            <Droplets size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Hydration Pulse
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              건강한 수분 섭취 습관 만들기
            </p>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <HydrationProgress />
            <QuickAdd />
          </div>
          
          <div>
            <History />
          </div>
        </div>
        
        <Settings />
      </div>
    </div>
  )
}

export default App