import { create } from 'zustand'

export interface WifiPoint {
  id: string
  x: number
  y: number
  signalStrength: number // -100 to 0 dBm
  timestamp: number
  ssid?: string
}

export interface WifiNetwork {
  ssid: string
  bssid: string
  signalStrength: number
  frequency: number
  security: string
}

interface WifiStore {
  // Map data
  mapPoints: WifiPoint[]
  gridSize: number
  selectedPoint: WifiPoint | null
  isScanning: boolean
  
  // Networks data
  detectedNetworks: WifiNetwork[]
  selectedNetwork: WifiNetwork | null
  
  // Actions
  addMapPoint: (point: Omit<WifiPoint, 'id' | 'timestamp'>) => void
  updatePoint: (id: string, strength: number) => void
  deletePoint: (id: string) => void
  selectPoint: (point: WifiPoint | null) => void
  setScanning: (scanning: boolean) => void
  setGridSize: (size: number) => void
  clearMap: () => void
  
  // Network actions
  addNetwork: (network: WifiNetwork) => void
  selectNetwork: (network: WifiNetwork | null) => void
  updateNetworkStrength: (bssid: string, strength: number) => void
  clearNetworks: () => void
  
  // Simulation
  simulateScan: () => void
}

const useWifiStore = create<WifiStore>((set, get) => ({
  mapPoints: [],
  gridSize: 10,
  selectedPoint: null,
  isScanning: false,
  detectedNetworks: [],
  selectedNetwork: null,
  
  addMapPoint: (point) => set((state) => ({
    mapPoints: [...state.mapPoints, {
      ...point,
      id: `point-${Date.now()}-${Math.random()}`,
      timestamp: Date.now()
    }]
  })),
  
  updatePoint: (id, strength) => set((state) => ({
    mapPoints: state.mapPoints.map(p => 
      p.id === id ? { ...p, signalStrength: strength } : p
    )
  })),
  
  deletePoint: (id) => set((state) => ({
    mapPoints: state.mapPoints.filter(p => p.id !== id),
    selectedPoint: state.selectedPoint?.id === id ? null : state.selectedPoint
  })),
  
  selectPoint: (point) => set({ selectedPoint: point }),
  
  setScanning: (scanning) => set({ isScanning: scanning }),
  
  setGridSize: (size) => set({ gridSize: size }),
  
  clearMap: () => set({ mapPoints: [], selectedPoint: null }),
  
  addNetwork: (network) => set((state) => {
    const exists = state.detectedNetworks.find(n => n.bssid === network.bssid)
    if (exists) {
      return {
        detectedNetworks: state.detectedNetworks.map(n => 
          n.bssid === network.bssid ? network : n
        )
      }
    }
    return { detectedNetworks: [...state.detectedNetworks, network] }
  }),
  
  selectNetwork: (network) => set({ selectedNetwork: network }),
  
  updateNetworkStrength: (bssid, strength) => set((state) => ({
    detectedNetworks: state.detectedNetworks.map(n => 
      n.bssid === bssid ? { ...n, signalStrength: strength } : n
    )
  })),
  
  clearNetworks: () => set({ detectedNetworks: [], selectedNetwork: null }),
  
  simulateScan: () => {
    const { addNetwork, mapPoints, gridSize } = get()
    
    // Simulate network detection
    const networks: WifiNetwork[] = [
      { ssid: 'HomeWiFi_5G', bssid: '00:11:22:33:44:55', signalStrength: -45, frequency: 5000, security: 'WPA2' },
      { ssid: 'HomeWiFi_2.4G', bssid: '00:11:22:33:44:56', signalStrength: -52, frequency: 2437, security: 'WPA2' },
      { ssid: 'Neighbor_WiFi', bssid: '00:11:22:33:44:57', signalStrength: -72, frequency: 2412, security: 'WPA' },
      { ssid: 'Guest_Network', bssid: '00:11:22:33:44:58', signalStrength: -65, frequency: 5180, security: 'Open' },
      { ssid: 'Office_Secure', bssid: '00:11:22:33:44:59', signalStrength: -80, frequency: 2462, security: 'WPA3' },
    ]
    
    networks.forEach(network => {
      // Add some randomness to signal strength
      const variation = (Math.random() - 0.5) * 10
      addNetwork({
        ...network,
        signalStrength: Math.max(-100, Math.min(0, network.signalStrength + variation))
      })
    })
    
    // Auto-generate some map points if empty
    if (mapPoints.length === 0) {
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          if (Math.random() > 0.7) {
            const distance = Math.sqrt(Math.pow(x - gridSize/2, 2) + Math.pow(y - gridSize/2, 2))
            const signalStrength = -40 - (distance * 8) - (Math.random() * 20)
            set((state) => ({
              mapPoints: [...state.mapPoints, {
                id: `auto-${x}-${y}`,
                x,
                y,
                signalStrength: Math.max(-100, signalStrength),
                timestamp: Date.now()
              }]
            }))
          }
        }
      }
    }
  }
}))

export default useWifiStore