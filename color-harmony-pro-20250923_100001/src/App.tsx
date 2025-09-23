import { ColorPicker } from './components/ColorPicker'
import { HarmonySelector } from './components/HarmonySelector'
import { ColorPalette } from './components/ColorPalette'
import { Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-indigo-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
              Color Harmony Pro
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            색상 이론 기반 완벽한 색상 조화 생성기
          </p>
        </header>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ColorPicker />
            <HarmonySelector />
          </div>
          
          <ColorPalette />
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Color Harmony Pro. 디자이너를 위한 색상 도구.</p>
        </footer>
      </div>
    </div>
  )
}

export default App