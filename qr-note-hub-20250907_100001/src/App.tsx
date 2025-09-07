import { useState } from 'react'
import QRGenerator from './components/QRGenerator'
import QRHistory from './components/QRHistory'
import Header from './components/Header'
import { useQRStore } from './store/qrStore'
import { Layout, Clock, QrCode } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator')
  const { qrCodes } = useQRStore()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'generator'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <QrCode size={20} />
              <span>생성기</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all relative ${
                activeTab === 'history'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Clock size={20} />
              <span>히스토리</span>
              {qrCodes.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {qrCodes.length}
                </span>
              )}
            </button>
          </div>

          <div className="transition-all duration-300">
            {activeTab === 'generator' ? <QRGenerator /> : <QRHistory />}
          </div>
        </div>

        <div className="glass-card p-4 text-center">
          <p className="text-white/80 text-sm">
            <Layout className="inline-block mr-2" size={16} />
            빠르게 QR 코드를 생성하고 관리하세요
          </p>
        </div>
      </main>
    </div>
  )
}

export default App