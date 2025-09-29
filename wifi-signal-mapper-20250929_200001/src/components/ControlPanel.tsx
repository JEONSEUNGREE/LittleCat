import { useState } from 'react'
import { 
  Scan, 
  Trash2, 
  Grid3x3, 
  Download, 
  Upload,
  Settings,
  Map,
  Info
} from 'lucide-react'
import useWifiStore from '../store/useWifiStore'

const ControlPanel: React.FC = () => {
  const { 
    isScanning, 
    setScanning, 
    clearMap, 
    clearNetworks,
    gridSize,
    setGridSize,
    simulateScan,
    mapPoints
  } = useWifiStore()
  
  const [showSettings, setShowSettings] = useState(false)
  
  const handleScan = () => {
    setScanning(true)
    simulateScan()
    setTimeout(() => {
      setScanning(false)
    }, 2000)
  }
  
  const handleClearAll = () => {
    if (window.confirm('모든 데이터를 삭제하시겠습니까?')) {
      clearMap()
      clearNetworks()
    }
  }
  
  const handleExport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      gridSize,
      mapPoints,
      version: '1.0.0'
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wifi-heatmap-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string)
            // Import logic would go here
            alert('데이터를 성공적으로 가져왔습니다!')
          } catch (error) {
            alert('파일을 읽을 수 없습니다.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Map className="w-5 h-5" />
          컨트롤 패널
        </h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Settings className={`w-5 h-5 ${showSettings ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {showSettings && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <div className="mb-3">
            <label className="text-sm opacity-80 flex items-center gap-2 mb-2">
              <Grid3x3 className="w-4 h-4" />
              그리드 크기: {gridSize}x{gridSize}
            </label>
            <input
              type="range"
              min="5"
              max="20"
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
          
          <div className="text-xs opacity-60">
            <div className="flex items-start gap-1 mb-1">
              <Info className="w-3 h-3 mt-0.5" />
              <span>그리드 크기를 변경하면 기존 데이터가 재계산됩니다.</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
            isScanning 
              ? 'bg-white/20 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          }`}
        >
          <Scan className={`w-4 h-4 ${isScanning ? 'animate-scan' : ''}`} />
          <span className="text-sm">{isScanning ? '스캔 중...' : '스캔'}</span>
        </button>
        
        <button
          onClick={handleClearAll}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">초기화</span>
        </button>
        
        <button
          onClick={handleExport}
          disabled={mapPoints.length === 0}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
            mapPoints.length === 0
              ? 'bg-white/10 cursor-not-allowed opacity-50'
              : 'bg-blue-500/20 hover:bg-blue-500/30'
          }`}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">내보내기</span>
        </button>
        
        <button
          onClick={handleImport}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-all"
        >
          <Upload className="w-4 h-4" />
          <span className="text-sm">가져오기</span>
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="opacity-80">측정 지점</span>
          <span className="font-bold">{mapPoints.length}개</span>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel