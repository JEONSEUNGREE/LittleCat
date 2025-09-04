import { Sparkles, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-20 safe-top">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Emoji Story
              </h1>
              <p className="text-xs text-gray-500">Create magic with emojis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">
              {time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}