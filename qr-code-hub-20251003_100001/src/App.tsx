import { useState } from 'react'
import { QrCode, Plus, History, BarChart3, Menu, X } from 'lucide-react'
import QRGenerator from './components/QRGenerator'
import QRHistory from './components/QRHistory'
import QRStats from './components/QRStats'
import useQRStore from './store/useQRStore'

type ViewType = 'generator' | 'history' | 'stats'

function App() {
  const [activeView, setActiveView] = useState<ViewType>('generator')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { activeQR } = useQRStore()

  const navigation = [
    { id: 'generator', label: 'Create', icon: Plus },
    { id: 'history', label: 'History', icon: History },
    { id: 'stats', label: 'Analytics', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <QrCode className="text-primary" size={32} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                QR Code Hub
              </h1>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as ViewType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      activeView === item.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t animate-slide-up">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id as ViewType)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                      activeView === item.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main view area */}
          <div className="lg:col-span-2 space-y-6">
            {activeView === 'generator' && <QRGenerator />}
            {activeView === 'history' && <QRHistory />}
            {activeView === 'stats' && <QRStats />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active QR display */}
            {activeQR && (
              <div className="card animate-fade-in">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Active QR Code</h3>
                <div className="flex flex-col items-center space-y-4">
                  {activeQR.logo && (
                    <img 
                      src={activeQR.logo} 
                      alt={activeQR.name}
                      className="w-48 h-48 rounded-lg shadow-lg"
                    />
                  )}
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800">{activeQR.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activeQR.type.toUpperCase()}</p>
                    <p className="text-xs text-gray-500 mt-2 break-all">{activeQR.content}</p>
                    <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                      <span className="text-gray-600">Scans: <strong>{activeQR.scanCount}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick tips */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Keep QR codes simple for better scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Use high contrast colors for reliability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Test your QR codes before sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Add clear calls-to-action near QR codes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white/90 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2024 QR Code Hub. Generate, manage, and track your QR codes.</p>
        </div>
      </footer>
    </div>
  )
}

export default App