import { FlowBackground } from './components/FlowBackground'
import { ModeSelector } from './components/ModeSelector'
import { Timer } from './components/Timer'
import { Stats } from './components/Stats'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <FlowBackground />

      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 text-center">
          Focus Flow
        </h1>
        <p className="text-white/60 mb-8 text-sm md:text-base text-center">
          집중력을 높이는 시각적 포모도로 타이머
        </p>

        <ModeSelector />
        <Timer />
        <Stats />
      </div>
    </div>
  )
}

export default App
