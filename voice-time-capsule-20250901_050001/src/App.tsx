import React, { useEffect } from 'react'
import Header from './components/Header'
import CapsuleList from './components/CapsuleList'
import RecordButton from './components/RecordButton'
import useCapsuleStore from './store/useCapsuleStore'

function App() {
  const capsules = useCapsuleStore((state) => state.capsules)

  useEffect(() => {
    // Check for available capsules and show notification
    const checkNotifications = () => {
      const availableCapsules = capsules.filter(
        (c) => new Date(c.scheduledFor) <= new Date() && !c.opened
      )
      
      if (availableCapsules.length > 0 && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Voice Time Capsule', {
          body: `${availableCapsules.length}개의 타임캡슐을 열 수 있어요!`,
          icon: '/vite.svg'
        })
      }
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    const interval = setInterval(checkNotifications, 60000 * 5) // Check every 5 minutes
    
    return () => clearInterval(interval)
  }, [capsules])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      <main className="max-w-md mx-auto p-4 mt-6">
        <CapsuleList />
      </main>

      <RecordButton />
    </div>
  )
}

export default App