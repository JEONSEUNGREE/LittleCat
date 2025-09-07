import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface QRCode {
  id: string
  type: 'text' | 'url' | 'wifi' | 'email' | 'phone'
  content: string
  title: string
  createdAt: Date
  color: string
}

interface QRStore {
  qrCodes: QRCode[]
  addQRCode: (qrCode: Omit<QRCode, 'id' | 'createdAt'>) => void
  removeQRCode: (id: string) => void
  clearHistory: () => void
}

export const useQRStore = create<QRStore>()(
  persist(
    (set) => ({
      qrCodes: [],
      addQRCode: (qrCode) =>
        set((state) => ({
          qrCodes: [
            {
              ...qrCode,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
            ...state.qrCodes,
          ].slice(0, 50), // Keep only last 50 items
        })),
      removeQRCode: (id) =>
        set((state) => ({
          qrCodes: state.qrCodes.filter((qr) => qr.id !== id),
        })),
      clearHistory: () => set({ qrCodes: [] }),
    }),
    {
      name: 'qr-note-hub-storage',
    }
  )
)