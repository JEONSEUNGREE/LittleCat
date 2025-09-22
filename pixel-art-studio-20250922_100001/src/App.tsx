import { useEffect } from 'react'
import { Canvas } from './components/Canvas'
import { Toolbar } from './components/Toolbar'
import { ColorPalette } from './components/ColorPalette'
import { Sparkles } from 'lucide-react'

function App() {
  useEffect(() => {
    // Prevent default touch behaviors
    const preventDefaultTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchstart', preventDefaultTouch, { passive: false })
    document.addEventListener('touchmove', preventDefaultTouch, { passive: false })
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0
    document.addEventListener('touchend', (e) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }, false)

    return () => {
      document.removeEventListener('touchstart', preventDefaultTouch)
      document.removeEventListener('touchmove', preventDefaultTouch)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-dark to-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-pixel-primary animate-pulse-slow" size={24} />
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pixel-primary to-pixel-secondary bg-clip-text text-transparent">
              Pixel Art Studio
            </h1>
            <Sparkles className="text-pixel-secondary animate-pulse-slow" size={24} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
        {/* Toolbar */}
        <Toolbar />

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center">
          <Canvas />
        </div>

        {/* Color Palette */}
        <div className="w-full max-w-2xl">
          <ColorPalette />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700 py-2">
        <div className="text-center text-xs text-gray-500">
          픽셀 아트를 그려보세요! 터치와 마우스 모두 지원됩니다.
        </div>
      </footer>
    </div>
  )
}

export default App