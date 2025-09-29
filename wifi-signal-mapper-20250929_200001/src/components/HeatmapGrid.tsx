import { useMemo } from 'react'
import { getSignalColor, generateHeatmapData } from '../utils/signalUtils'
import useWifiStore from '../store/useWifiStore'

const HeatmapGrid: React.FC = () => {
  const { mapPoints, gridSize, addMapPoint, selectPoint, selectedPoint } = useWifiStore()
  
  const heatmapData = useMemo(() => {
    return generateHeatmapData(gridSize, mapPoints)
  }, [gridSize, mapPoints])
  
  const handleCellClick = (x: number, y: number) => {
    const existingPoint = mapPoints.find(p => p.x === x && p.y === y)
    
    if (existingPoint) {
      selectPoint(existingPoint.id === selectedPoint?.id ? null : existingPoint)
    } else {
      // Add new point with estimated signal
      const signalStrength = heatmapData[y][x]
      addMapPoint({ x, y, signalStrength })
    }
  }
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4 text-white text-center">
          <h2 className="text-xl font-bold mb-2">WiFi 신호 히트맵</h2>
          <p className="text-sm opacity-80">
            셀을 클릭하여 측정 지점을 추가하세요
          </p>
        </div>
        
        <div 
          className="heatmap-grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {heatmapData.map((row, y) => (
            row.map((signalStrength, x) => {
              const existingPoint = mapPoints.find(p => p.x === x && p.y === y)
              const isSelected = selectedPoint && selectedPoint.x === x && selectedPoint.y === y
              
              return (
                <div
                  key={`${x}-${y}`}
                  className={`signal-cell relative ${
                    isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''
                  } ${existingPoint ? 'animate-pulse-slow' : ''}`}
                  style={{
                    backgroundColor: getSignalColor(signalStrength),
                    opacity: signalStrength < -90 ? 0.3 : 0.8 + (signalStrength / 500)
                  }}
                  onClick={() => handleCellClick(x, y)}
                  title={`Signal: ${Math.round(signalStrength)} dBm`}
                >
                  {existingPoint && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
                    </div>
                  )}
                </div>
              )
            })
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex justify-center gap-4 text-white text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }} />
            <span>최고</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#84cc16' }} />
            <span>양호</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#facc15' }} />
            <span>보통</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fb923c' }} />
            <span>약함</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }} />
            <span>매우 약함</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeatmapGrid