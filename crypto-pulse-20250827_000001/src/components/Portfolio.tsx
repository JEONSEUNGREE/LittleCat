import React, { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, PlusCircle, Edit2 } from 'lucide-react'
import useCryptoStore from '../store/cryptoStore'

const Portfolio: React.FC = () => {
  const { portfolio, cryptos, updateHoldings, selectedCrypto } = useCryptoStore()
  const [editingCrypto, setEditingCrypto] = useState<string | null>(null)
  const [holdingAmount, setHoldingAmount] = useState<string>('')

  const cryptosWithHoldings = cryptos.filter(c => c.holdings && c.holdings > 0)
  const isPositive = portfolio.totalChangePercent > 0

  const handleUpdateHolding = (cryptoId: string) => {
    const amount = parseFloat(holdingAmount)
    if (!isNaN(amount) && amount >= 0) {
      updateHoldings(cryptoId, amount)
      setEditingCrypto(null)
      setHoldingAmount('')
    }
  }

  const formatValue = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <div className="w-full">
      <div className="glass rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wallet className="w-6 h-6 text-crypto-accent" />
            Portfolio
          </h2>
          
          {selectedCrypto && (
            <button
              onClick={() => {
                setEditingCrypto(selectedCrypto.id)
                setHoldingAmount(selectedCrypto.holdings?.toString() || '')
              }}
              className="flex items-center gap-2 px-4 py-2 bg-crypto-accent/20 hover:bg-crypto-accent/30 rounded-lg transition-all text-crypto-accent"
            >
              <PlusCircle className="w-4 h-4" />
              Add Holdings
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-dark rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Value</div>
            <div className="text-2xl font-bold text-white">
              {formatValue(portfolio.totalValue)}
            </div>
          </div>
          
          <div className="glass-dark rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">24h Change</div>
            <div className={`text-2xl font-bold flex items-center gap-2 ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
              {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {formatValue(Math.abs(portfolio.totalChange))}
            </div>
          </div>
          
          <div className="glass-dark rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">24h Change %</div>
            <div className={`text-2xl font-bold ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
              {isPositive ? '+' : '-'}{Math.abs(portfolio.totalChangePercent).toFixed(2)}%
            </div>
          </div>
        </div>

        {cryptosWithHoldings.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">Your Holdings</h3>
            {cryptosWithHoldings.map((crypto) => {
              const holdingValue = crypto.price * (crypto.holdings || 0)
              const changeAmount = holdingValue * (crypto.change24h / 100)
              const isEditing = editingCrypto === crypto.id
              
              return (
                <div key={crypto.id} className="glass-dark rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-accent to-crypto-purple flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {crypto.symbol.substring(0, 2)}
                        </span>
                      </div>
                      
                      <div>
                        <div className="text-white font-medium">
                          {crypto.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {crypto.holdings} {crypto.symbol}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-white font-medium">
                          {formatValue(holdingValue)}
                        </div>
                        <div className={`text-sm ${changeAmount >= 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                          {changeAmount >= 0 ? '+' : ''}{formatValue(changeAmount)}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setEditingCrypto(crypto.id)
                          setHoldingAmount(crypto.holdings?.toString() || '')
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="number"
                        step="0.0001"
                        value={holdingAmount}
                        onChange={(e) => setHoldingAmount(e.target.value)}
                        placeholder="Amount"
                        className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-crypto-accent"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdateHolding(crypto.id)}
                        className="px-4 py-2 bg-crypto-accent/20 hover:bg-crypto-accent/30 rounded-lg text-crypto-accent transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingCrypto(null)
                          setHoldingAmount('')
                        }}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">No holdings yet</div>
            <div className="text-sm text-gray-500">
              Select a cryptocurrency and add your holdings to track your portfolio
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Portfolio