import { create } from 'zustand'

export interface QRCodeItem {
  id: string
  content: string
  type: 'url' | 'text' | 'wifi' | 'email' | 'phone'
  name: string
  createdAt: Date
  color: string
  logo?: string
  scanCount: number
}

interface QRStore {
  qrCodes: QRCodeItem[]
  activeQR: QRCodeItem | null
  searchTerm: string
  filterType: string
  addQRCode: (qr: Omit<QRCodeItem, 'id' | 'createdAt' | 'scanCount'>) => void
  deleteQRCode: (id: string) => void
  setActiveQR: (qr: QRCodeItem | null) => void
  incrementScanCount: (id: string) => void
  setSearchTerm: (term: string) => void
  setFilterType: (type: string) => void
  getFilteredQRCodes: () => QRCodeItem[]
}

const useQRStore = create<QRStore>((set, get) => ({
  qrCodes: [],
  activeQR: null,
  searchTerm: '',
  filterType: 'all',
  
  addQRCode: (qr) => set((state) => ({
    qrCodes: [{
      ...qr,
      id: Date.now().toString(),
      createdAt: new Date(),
      scanCount: 0
    }, ...state.qrCodes]
  })),
  
  deleteQRCode: (id) => set((state) => ({
    qrCodes: state.qrCodes.filter(qr => qr.id !== id),
    activeQR: state.activeQR?.id === id ? null : state.activeQR
  })),
  
  setActiveQR: (qr) => set({ activeQR: qr }),
  
  incrementScanCount: (id) => set((state) => ({
    qrCodes: state.qrCodes.map(qr => 
      qr.id === id ? { ...qr, scanCount: qr.scanCount + 1 } : qr
    )
  })),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilterType: (type) => set({ filterType: type }),
  
  getFilteredQRCodes: () => {
    const { qrCodes, searchTerm, filterType } = get()
    return qrCodes.filter(qr => {
      const matchesSearch = qr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           qr.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || qr.type === filterType
      return matchesSearch && matchesType
    })
  }
}))

export default useQRStore