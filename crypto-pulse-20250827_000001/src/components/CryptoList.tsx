import React from 'react'
import { TrendingUp, TrendingDown, Star, Bell } from 'lucide-react'
import useCryptoStore from '../store/cryptoStore'

const CryptoList: React.FC = () => {
  const { cryptos, watchlist, selectedCrypto, selectCrypto, toggleWatchlist } = useCryptoStore()

  const formatPrice = (price: number) => {
    if (price > 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    if (price > 1) return `$${price.toFixed(2)}`
    return `$${price.toFixed(4)}`
  }

  const formatMarketCap = (cap: number) => {
    if (cap > 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap > 1e9) return `$${(cap / 1e9).toFixed(2)}B`
    if (cap > 1e6) return `$${(cap / 1e6).toFixed(2)}M`
    return `$${cap.toLocaleString()}`
  }

  return (
    <div className="w-full">
      <div className="glass rounded-xl p-4 mb-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-crypto-accent" />
          Market Overview
        </h2>
        
        <div className="space-y-2">
          {cryptos.map((crypto) => {
            const isWatched = watchlist.includes(crypto.id)
            const isSelected = selectedCrypto?.id === crypto.id
            const isPositive = crypto.change24h > 0

            return (
              <div
                key={crypto.id}
                onClick={() => selectCrypto(crypto)}
                className={`
                  glass-dark rounded-lg p-4 cursor-pointer transition-all
                  hover:bg-white/10 hover:scale-[1.02]
                  ${isSelected ? 'ring-2 ring-crypto-accent glow' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crypto-accent to-crypto-purple flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {crypto.symbol.substring(0, 2)}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">{crypto.name}</h3>
                        <span className="text-gray-400 text-sm">{crypto.symbol}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-white font-bold">
                          {formatPrice(crypto.price)}
                        </span>
                        <div className={`flex items-center gap-1 ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
                          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          <span className="text-sm font-medium">
                            {Math.abs(crypto.change24h).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right mr-2">
                      <div className="text-gray-400 text-xs">Market Cap</div>
                      <div className="text-white font-medium">
                        {formatMarketCap(crypto.marketCap)}
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatchlist(crypto.id)
                      }}
                      className={`
                        p-2 rounded-lg transition-all
                        ${isWatched 
                          ? 'bg-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/30' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
                      `}
                    >
                      <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
                    </button>

                    {crypto.holdings && crypto.holdings > 0 && (
                      <div className="p-2 rounded-lg bg-crypto-green/20">
                        <Bell className="w-4 h-4 text-crypto-green" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CryptoList