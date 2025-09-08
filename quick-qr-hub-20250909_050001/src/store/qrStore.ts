import { create } from 'zustand'

export interface QRData {
  id: string
  type: 'text' | 'url' | 'wifi' | 'contact' | 'email'
  content: string
  label: string
  timestamp: number
  color?: string
}

interface QRStore {
  history: QRData[]
  currentQR: QRData | null
  addToHistory: (qr: QRData) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
  setCurrentQR: (qr: QRData | null) => void
}

export const useQRStore = create<QRStore>((set) => ({
  history: [],
  currentQR: null,
  
  addToHistory: (qr) =>
    set((state) => ({
      history: [qr, ...state.history.slice(0, 19)], // Keep last 20 items
      currentQR: qr,
    })),
    
  removeFromHistory: (id) =>
    set((state) => ({
      history: state.history.filter((item) => item.id !== id),
    })),
    
  clearHistory: () =>
    set({
      history: [],
      currentQR: null,
    }),
    
  setCurrentQR: (qr) =>
    set({
      currentQR: qr,
    }),
}))