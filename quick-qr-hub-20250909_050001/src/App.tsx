import { useState } from 'react'
import { QrCode } from 'lucide-react'
import QRGenerator from './components/QRGenerator'
import QRHistory from './components/QRHistory'
import QuickActions from './components/QuickActions'
import { useQRStore } from './store/qrStore'

function App() {
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate')
  const { history } = useQRStore()

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Quick QR Hub</h1>
          </div>
          <p className="text-white/80 text-lg">Your Universal QR Code Generator & Scanner</p>
        </header>

        {/* Quick Actions */}
        <QuickActions />

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'generate'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Generate QR
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all relative ${
              activeTab === 'history'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            History
            {history.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {history.length}
              </span>
            )}
          </button>
        </div>

        {/* Main Content */}
        <main className="glass-card p-6 md:p-8">
          {activeTab === 'generate' ? <QRGenerator /> : <QRHistory />}
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-white/60 text-sm">
          <p>Quick QR Hub © 2025 | Create QR codes instantly</p>
        </footer>
      </div>
    </div>
  )
}

export default App