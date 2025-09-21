import { Gauge, Globe } from 'lucide-react'
import SpeedGauge from './components/SpeedGauge'
import ControlPanel from './components/ControlPanel'
import SpeedHistory from './components/SpeedHistory'

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gauge className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Speed Monitor
            </h1>
            <Globe className="w-10 h-10 text-purple-400" />
          </div>
          <p className="text-gray-400 text-lg">
            Real-time network performance tracking
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpeedGauge />
          <ControlPanel />
        </div>

        {/* History Section */}
        <SpeedHistory />

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Monitor your network speed and performance</p>
        </footer>
      </div>
    </div>
  )
}

export default App