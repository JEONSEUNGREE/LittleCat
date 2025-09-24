import { useEffect } from 'react'
import { RefreshCw, Settings, Download } from 'lucide-react'
import { useBatteryStore } from './store/batteryStore'
import BatteryStatus from './components/BatteryStatus'
import AppUsageList from './components/AppUsageList'
import BatteryTips from './components/BatteryTips'
import BatteryChart from './components/BatteryChart'

function App() {
  const { generateMockData, updateBatteryInfo, setBatteryLevel, setCharging } = useBatteryStore()
  
  useEffect(() => {
    generateMockData()
    
    const batteryInterval = setInterval(() => {
      updateBatteryInfo()
    }, 5000)
    
    const simulateInterval = setInterval(() => {
      const isCharging = Math.random() > 0.7
      setCharging(isCharging)
      
      setBatteryLevel((prev: number) => {
        const change = isCharging ? Math.random() * 2 : -Math.random() * 1.5
        const newLevel = prev + change
        return Math.max(10, Math.min(100, newLevel))
      })
    }, 10000)
    
    return () => {
      clearInterval(batteryInterval)
      clearInterval(simulateInterval)
    }
  }, [generateMockData, updateBatteryInfo, setBatteryLevel, setCharging])
  
  const handleRefresh = () => {
    updateBatteryInfo()
    generateMockData()
  }
  
  const handleExport = () => {
    alert('배터리 리포트가 생성되었습니다!')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-white">Battery Analyzer Pro</h1>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg glass-effect hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleExport}
              className="p-2 rounded-lg glass-effect hover:bg-white/20 transition-colors"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-lg glass-effect hover:bg-white/20 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </header>
        
        <main>
          <BatteryStatus />
          <BatteryChart />
          <div className="mt-6">
            <AppUsageList />
          </div>
          <BatteryTips />
        </main>
        
        <footer className="mt-8 text-center text-white/50 text-xs">
          <p>© 2024 Battery Analyzer Pro</p>
          <p className="mt-1">실시간 배터리 분석 및 최적화</p>
        </footer>
      </div>
    </div>
  )
}

export default App