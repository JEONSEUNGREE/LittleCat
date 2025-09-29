import React from 'react'
import { Wifi, WifiOff, Lock, Unlock, Signal } from 'lucide-react'
import useWifiStore from '../store/useWifiStore'
import { getSignalColor, getSignalLevel, getSignalPercentage, calculateDistance } from '../utils/signalUtils'

const NetworkList: React.FC = () => {
  const { detectedNetworks, selectedNetwork, selectNetwork, isScanning } = useWifiStore()
  
  const sortedNetworks = [...detectedNetworks].sort((a, b) => b.signalStrength - a.signalStrength)
  
  const getFrequencyBand = (frequency: number): string => {
    if (frequency >= 5000) return '5 GHz'
    if (frequency >= 2400) return '2.4 GHz'
    return `${frequency} MHz`
  }
  
  const getSecurityIcon = (security: string) => {
    if (security === 'Open') {
      return <Unlock className="w-4 h-4 text-yellow-400" />
    }
    return <Lock className="w-4 h-4 text-green-400" />
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          감지된 네트워크
        </h3>
        {isScanning && (
          <div className="flex items-center gap-1 text-sm">
            <Signal className="w-4 h-4 animate-scan" />
            <span>스캔 중...</span>
          </div>
        )}
      </div>
      
      {sortedNetworks.length === 0 ? (
        <div className="text-center py-8 opacity-60">
          <WifiOff className="w-12 h-12 mx-auto mb-2" />
          <p className="text-sm">감지된 네트워크가 없습니다</p>
          <p className="text-xs mt-1">스캔 버튼을 눌러 검색하세요</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedNetworks.map((network) => {
            const isSelected = selectedNetwork?.bssid === network.bssid
            const signalPercentage = getSignalPercentage(network.signalStrength)
            const estimatedDistance = calculateDistance(network.signalStrength, network.frequency)
            
            return (
              <div
                key={network.bssid}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-white/20 ring-2 ring-white/50' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => selectNetwork(isSelected ? null : network)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{network.ssid || '숨김 네트워크'}</span>
                      {getSecurityIcon(network.security)}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {network.bssid} • {getFrequencyBand(network.frequency)}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div 
                      className="text-sm font-bold"
                      style={{ color: getSignalColor(network.signalStrength) }}
                    >
                      {network.signalStrength} dBm
                    </div>
                    <div className="text-xs opacity-70">
                      {getSignalLevel(network.signalStrength)}
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="opacity-70">신호 강도:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all"
                            style={{ 
                              width: `${signalPercentage}%`,
                              backgroundColor: getSignalColor(network.signalStrength)
                            }}
                          />
                        </div>
                        <span>{signalPercentage}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="opacity-70">예상 거리:</span>
                      <div className="font-medium mt-1">~{estimatedDistance}m</div>
                    </div>
                    <div>
                      <span className="opacity-70">보안:</span>
                      <div className="font-medium mt-1">{network.security}</div>
                    </div>
                    <div className="text-right">
                      <span className="opacity-70">주파수:</span>
                      <div className="font-medium mt-1">{network.frequency} MHz</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default NetworkList