import React, { useEffect } from 'react'
import HeatmapGrid from './components/HeatmapGrid'
import NetworkList from './components/NetworkList'
import ControlPanel from './components/ControlPanel'
import { Activity, Wifi } from 'lucide-react'
import useWifiStore from './store/useWifiStore'

function App() {
  const { simulateScan } = useWifiStore()
  
  useEffect(() => {
    // Initial scan simulation on mount
    const timer = setTimeout(() => {
      simulateScan()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [simulateScan])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">WiFi Signal Mapper</h1>
                <p className="text-xs text-white/70">실시간 신호 강도 히트맵</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Activity className="w-4 h-4" />
              <span className="text-sm">실시간 모니터링</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls & Networks */}
          <div className="lg:col-span-1 space-y-4">
            <ControlPanel />
            <NetworkList />
          </div>
          
          {/* Right Panel - Heatmap */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 h-full min-h-[600px]">
              <HeatmapGrid />
            </div>
          </div>
        </div>
        
        {/* Mobile Notice */}
        <div className="mt-6 lg:hidden">
          <div className="bg-yellow-500/20 backdrop-blur-md rounded-lg p-4 text-white text-center">
            <p className="text-sm">
              💡 더 나은 경험을 위해 태블릿이나 데스크톱을 사용해보세요
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 pb-6 text-center text-white/60 text-sm">
        <p>© 2025 WiFi Signal Mapper • 모든 권리 보유</p>
      </footer>
    </div>
  )
}

export default App