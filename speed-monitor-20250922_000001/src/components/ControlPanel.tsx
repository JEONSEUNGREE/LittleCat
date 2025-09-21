import { useState, useEffect } from 'react'
import { Play, Pause, RefreshCw, Zap } from 'lucide-react'
import { useSpeedStore } from '../store/useSpeedStore'

export default function ControlPanel() {
  const { isMonitoring, setMonitoring, addReading, updateCurrentSpeed } = useSpeedStore()
  const [isTestRunning, setIsTestRunning] = useState(false)

  // Simulate speed test
  const runSpeedTest = async () => {
    setIsTestRunning(true)
    
    // Simulate test phases
    const phases = [
      { download: 0, upload: 0, ping: 0 },
      { download: 25, upload: 10, ping: 150 },
      { download: 50, upload: 20, ping: 100 },
      { download: 75, upload: 30, ping: 75 },
      { download: 100 + Math.random() * 50, upload: 40 + Math.random() * 20, ping: 20 + Math.random() * 30 }
    ]

    for (const phase of phases) {
      updateCurrentSpeed(phase)
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    const finalSpeed = phases[phases.length - 1]
    addReading({
      downloadSpeed: finalSpeed.download,
      uploadSpeed: finalSpeed.upload,
      ping: finalSpeed.ping,
      connectionType: getConnectionType()
    })

    setIsTestRunning(false)
  }

  const getConnectionType = () => {
    const types = ['WiFi 5GHz', 'WiFi 2.4GHz', '4G LTE', '5G', 'Ethernet']
    return types[Math.floor(Math.random() * types.length)]
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isMonitoring && !isTestRunning) {
      // Run test immediately
      runSpeedTest()
      
      // Then run every 30 seconds
      interval = setInterval(() => {
        runSpeedTest()
      }, 30000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isMonitoring])

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Control Panel
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Start/Stop Monitoring */}
        <button
          onClick={() => setMonitoring(!isMonitoring)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            isMonitoring
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          disabled={isTestRunning}
        >
          {isMonitoring ? (
            <>
              <Pause className="w-5 h-5" />
              Stop Monitoring
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Monitoring
            </>
          )}
        </button>

        {/* Run Single Test */}
        <button
          onClick={runSpeedTest}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            isTestRunning
              ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          disabled={isTestRunning || isMonitoring}
        >
          <RefreshCw className={`w-5 h-5 ${isTestRunning ? 'animate-spin' : ''}`} />
          {isTestRunning ? 'Testing...' : 'Run Test'}
        </button>

        {/* Status Indicator */}
        <div className="flex items-center justify-center bg-slate-900/50 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              isTestRunning ? 'bg-yellow-400 animate-pulse' :
              isMonitoring ? 'bg-green-400 animate-pulse' :
              'bg-gray-600'
            }`} />
            <span className="text-gray-300 font-medium">
              {isTestRunning ? 'Testing' :
               isMonitoring ? 'Monitoring' :
               'Idle'}
            </span>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
        <p className="text-gray-400 text-sm">
          {isMonitoring ? 
            'Automatic speed tests every 30 seconds' :
            'Click "Run Test" for a single test or "Start Monitoring" for continuous monitoring'
          }
        </p>
      </div>
    </div>
  )
}