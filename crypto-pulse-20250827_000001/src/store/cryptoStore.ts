import { create } from 'zustand'

export interface Crypto {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  holdings?: number
  alertPrice?: number
}

export interface Portfolio {
  totalValue: number
  totalChange: number
  totalChangePercent: number
}

interface CryptoStore {
  cryptos: Crypto[]
  portfolio: Portfolio
  selectedCrypto: Crypto | null
  watchlist: string[]
  alerts: Array<{
    id: string
    cryptoId: string
    targetPrice: number
    type: 'above' | 'below'
    triggered: boolean
  }>
  
  // Actions
  updateCrypto: (crypto: Crypto) => void
  selectCrypto: (crypto: Crypto | null) => void
  toggleWatchlist: (cryptoId: string) => void
  updateHoldings: (cryptoId: string, amount: number) => void
  addAlert: (cryptoId: string, targetPrice: number, type: 'above' | 'below') => void
  removeAlert: (alertId: string) => void
  checkAlerts: () => void
  calculatePortfolio: () => void
  initializeMockData: () => void
}

const useCryptoStore = create<CryptoStore>((set, get) => ({
  cryptos: [],
  portfolio: {
    totalValue: 0,
    totalChange: 0,
    totalChangePercent: 0
  },
  selectedCrypto: null,
  watchlist: [],
  alerts: [],

  updateCrypto: (crypto) => set((state) => ({
    cryptos: state.cryptos.map(c => c.id === crypto.id ? crypto : c)
  })),

  selectCrypto: (crypto) => set({ selectedCrypto: crypto }),

  toggleWatchlist: (cryptoId) => set((state) => ({
    watchlist: state.watchlist.includes(cryptoId)
      ? state.watchlist.filter(id => id !== cryptoId)
      : [...state.watchlist, cryptoId]
  })),

  updateHoldings: (cryptoId, amount) => {
    set((state) => ({
      cryptos: state.cryptos.map(c => 
        c.id === cryptoId ? { ...c, holdings: amount } : c
      )
    }))
    get().calculatePortfolio()
  },

  addAlert: (cryptoId, targetPrice, type) => set((state) => ({
    alerts: [...state.alerts, {
      id: Date.now().toString(),
      cryptoId,
      targetPrice,
      type,
      triggered: false
    }]
  })),

  removeAlert: (alertId) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== alertId)
  })),

  checkAlerts: () => {
    const state = get()
    const updatedAlerts = state.alerts.map(alert => {
      const crypto = state.cryptos.find(c => c.id === alert.cryptoId)
      if (!crypto || alert.triggered) return alert

      const shouldTrigger = alert.type === 'above' 
        ? crypto.price >= alert.targetPrice
        : crypto.price <= alert.targetPrice

      return { ...alert, triggered: shouldTrigger }
    })

    set({ alerts: updatedAlerts })
  },

  calculatePortfolio: () => {
    const state = get()
    const cryptosWithHoldings = state.cryptos.filter(c => c.holdings && c.holdings > 0)
    
    const totalValue = cryptosWithHoldings.reduce(
      (sum, crypto) => sum + (crypto.price * (crypto.holdings || 0)), 
      0
    )
    
    const totalChange = cryptosWithHoldings.reduce(
      (sum, crypto) => {
        const holdingValue = crypto.price * (crypto.holdings || 0)
        const changeAmount = holdingValue * (crypto.change24h / 100)
        return sum + changeAmount
      }, 
      0
    )
    
    const totalChangePercent = totalValue > 0 ? (totalChange / totalValue) * 100 : 0

    set({ 
      portfolio: { 
        totalValue, 
        totalChange,
        totalChangePercent 
      } 
    })
  },

  initializeMockData: () => {
    const mockCryptos: Crypto[] = [
      { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 68543.21, change24h: 2.34, marketCap: 1342567890123, volume24h: 28654321098, holdings: 0.5 },
      { id: 'eth', symbol: 'ETH', name: 'Ethereum', price: 3856.78, change24h: -1.23, marketCap: 463289012345, volume24h: 15432109876, holdings: 2.3 },
      { id: 'bnb', symbol: 'BNB', name: 'BNB', price: 612.45, change24h: 0.89, marketCap: 91234567890, volume24h: 1234567890 },
      { id: 'sol', symbol: 'SOL', name: 'Solana', price: 187.32, change24h: 5.67, marketCap: 83456789012, volume24h: 2345678901, holdings: 10 },
      { id: 'xrp', symbol: 'XRP', name: 'Ripple', price: 0.6234, change24h: -0.45, marketCap: 34567890123, volume24h: 987654321 },
      { id: 'ada', symbol: 'ADA', name: 'Cardano', price: 0.5678, change24h: 1.23, marketCap: 19876543210, volume24h: 456789012 },
      { id: 'avax', symbol: 'AVAX', name: 'Avalanche', price: 42.18, change24h: 3.45, marketCap: 15678901234, volume24h: 345678901 },
      { id: 'dot', symbol: 'DOT', name: 'Polkadot', price: 8.76, change24h: -2.34, marketCap: 11234567890, volume24h: 234567890 }
    ]

    set({ 
      cryptos: mockCryptos,
      watchlist: ['btc', 'eth', 'sol']
    })
    
    get().calculatePortfolio()

    // Simulate price updates
    setInterval(() => {
      const state = get()
      const updatedCryptos = state.cryptos.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
        change24h: crypto.change24h + (Math.random() - 0.5) * 0.1
      }))
      set({ cryptos: updatedCryptos })
      get().calculatePortfolio()
      get().checkAlerts()
    }, 5000)
  }
}))

export default useCryptoStore