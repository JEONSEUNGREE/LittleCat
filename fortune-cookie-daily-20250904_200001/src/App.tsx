import { useState, useEffect } from 'react'
import Header from './components/Header'
import FortuneCookie from './components/FortuneCookie'
import History from './components/History'
import Statistics from './components/Statistics'
import { useFortuneStore } from './store/fortuneStore'

type ViewType = 'main' | 'history' | 'stats'

function App() {
  const [activeView, setActiveView] = useState<ViewType>('main')
  const { isDarkMode } = useFortuneStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen flex flex-col">
      <Header setActiveView={setActiveView} activeView={activeView} />
      
      <main className="flex-1 flex items-center justify-center">
        {activeView === 'main' && <FortuneCookie />}
        {activeView === 'history' && <History />}
        {activeView === 'stats' && <Statistics />}
      </main>

      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400">
        <p>매일 새로운 행운을 만나보세요 ✨</p>
      </footer>
    </div>
  )
}

export default App