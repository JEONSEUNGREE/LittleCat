import { create } from 'zustand';
import { SignalPoint, MapData, NetworkInfo } from '../types';

interface WiFiStore {
  mapData: MapData;
  networkInfo: NetworkInfo | null;
  isScanning: boolean;
  selectedPoint: SignalPoint | null;
  addSignalPoint: (point: Omit<SignalPoint, 'id'>) => void;
  clearMap: () => void;
  setScanning: (scanning: boolean) => void;
  setSelectedPoint: (point: SignalPoint | null) => void;
  setNetworkInfo: (info: NetworkInfo) => void;
  getSignalQuality: (strength: number) => 'excellent' | 'good' | 'fair' | 'poor' | 'none';
}

export const useWiFiStore = create<WiFiStore>((set, get) => ({
  mapData: {
    points: [],
    gridSize: 20,
    lastUpdate: Date.now(),
  },
  networkInfo: null,
  isScanning: false,
  selectedPoint: null,

  addSignalPoint: (point) => {
    const id = `signal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const quality = get().getSignalQuality(point.signalStrength);
    
    set((state) => ({
      mapData: {
        ...state.mapData,
        points: [...state.mapData.points, { ...point, id, quality }],
        lastUpdate: Date.now(),
      },
    }));
  },

  clearMap: () => {
    set((state) => ({
      mapData: {
        ...state.mapData,
        points: [],
        lastUpdate: Date.now(),
      },
      selectedPoint: null,
    }));
  },

  setScanning: (scanning) => {
    set({ isScanning: scanning });
  },

  setSelectedPoint: (point) => {
    set({ selectedPoint: point });
  },

  setNetworkInfo: (info) => {
    set({ networkInfo: info });
  },

  getSignalQuality: (strength) => {
    if (strength >= -50) return 'excellent';
    if (strength >= -60) return 'good';
    if (strength >= -70) return 'fair';
    if (strength >= -80) return 'poor';
    return 'none';
  },
}))