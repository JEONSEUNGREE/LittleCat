import { MessageCircle, Waves } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <MessageCircle className="w-8 h-8 text-purple-600 animate-pulse-slow" />
              <Waves className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1 animate-wave" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">
              Question Wave
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              오늘의 질문
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
              #{new Date().toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}