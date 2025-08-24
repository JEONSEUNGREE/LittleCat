import { BreathingCircle } from './components/BreathingCircle'
import { PatternSelector } from './components/PatternSelector'
import { Controls } from './components/Controls'
import { Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-breath-primary via-breath-secondary to-breath-dark">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="w-8 h-8 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Breath Flow
            </h1>
          </div>
          <p className="text-white/80 text-sm md:text-base">
            마음을 진정시키는 호흡 운동
          </p>
        </header>

        <main className="flex flex-col items-center space-y-8 md:space-y-10">
          <BreathingCircle />
          <Controls />
          <PatternSelector />
        </main>

        <footer className="text-center mt-12 md:mt-16 pb-4">
          <p className="text-white/60 text-xs">
            깊게 숨 쉬고, 마음의 평화를 찾으세요
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App