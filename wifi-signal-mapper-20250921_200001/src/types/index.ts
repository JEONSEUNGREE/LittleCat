export interface SignalPoint {
  id: string;
  x: number;
  y: number;
  signalStrength: number;
  timestamp: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor' | 'none';
}

export interface MapData {
  points: SignalPoint[];
  gridSize: number;
  lastUpdate: number;
}

export interface NetworkInfo {
  ssid: string;
  frequency: number;
  channel: number;
  security: string;
}