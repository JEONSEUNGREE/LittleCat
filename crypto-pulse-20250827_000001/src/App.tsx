import React, { useEffect, useState } from 'react'
import { Activity, Menu, X } from 'lucide-react'
import CryptoList from './components/CryptoList'
import Portfolio from './components/Portfolio'
import PriceAlerts from './components/PriceAlerts'
import useCryptoStore from './store/cryptoStore'

function App() {
  const { initializeMockData, portfolio } = useCryptoStore()
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio' | 'alerts'>('market')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    initializeMockData()
  }, [initializeMockData])

  const tabs = [
    { id: 'market' as const, label: 'Market', count: null },
    { id: 'portfolio' as const, label: 'Portfolio', count: portfolio.totalValue > 0 ? `$${(portfolio.totalValue / 1000).toFixed(1)}k` : null },
    { id: 'alerts' as const, label: 'Alerts', count: null }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-darker via-crypto-dark to-crypto-darker">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-crypto-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-crypto-purple/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="glass sticky top-0 z-50 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-crypto-accent to-crypto-purple">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">Crypto Pulse</h1>
                  <p className="text-xs text-gray-400">Real-time Cryptocurrency Tracker</p>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-4 py-2 rounded-lg transition-all font-medium
                      ${activeTab === tab.id 
                        ? 'bg-crypto-accent/20 text-crypto-accent border border-crypto-accent/50' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    <span>{tab.label}</span>
                    {tab.count && (
                      <span className="ml-2 text-xs opacity-80">{tab.count}</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile navigation */}
            {mobileMenuOpen && (
              <nav className="md:hidden mt-4 flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      px-4 py-3 rounded-lg transition-all font-medium text-left
                      ${activeTab === tab.id 
                        ? 'bg-crypto-accent/20 text-crypto-accent border border-crypto-accent/50' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    <span>{tab.label}</span>
                    {tab.count && (
                      <span className="ml-2 text-xs opacity-80">{tab.count}</span>
                    )}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </header>

        {/* Main content area */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          <div className="min-h-[calc(100vh-120px)]">
            {activeTab === 'market' && <CryptoList />}
            {activeTab === 'portfolio' && <Portfolio />}
            {activeTab === 'alerts' && <PriceAlerts />}
          </div>
        </main>

        {/* Footer */}
        <footer className="glass border-t border-white/5 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="text-center text-gray-400 text-sm">
              <p>Real-time cryptocurrency prices powered by mock data</p>
              <p className="mt-1 text-xs">Updates every 5 seconds</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App