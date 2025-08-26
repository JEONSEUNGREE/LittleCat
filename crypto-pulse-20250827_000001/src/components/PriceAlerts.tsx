import { useState } from 'react'
import { Bell, BellOff, Trash2, ChevronUp, ChevronDown, AlertCircle } from 'lucide-react'
import useCryptoStore from '../store/cryptoStore'

const PriceAlerts: React.FC = () => {
  const { alerts, cryptos, selectedCrypto, addAlert, removeAlert } = useCryptoStore()
  const [showAddAlert, setShowAddAlert] = useState(false)
  const [alertPrice, setAlertPrice] = useState('')
  const [alertType, setAlertType] = useState<'above' | 'below'>('above')

  const handleAddAlert = () => {
    if (selectedCrypto && alertPrice) {
      const price = parseFloat(alertPrice)
      if (!isNaN(price) && price > 0) {
        addAlert(selectedCrypto.id, price, alertType)
        setAlertPrice('')
        setShowAddAlert(false)
      }
    }
  }

  const getCryptoById = (id: string) => cryptos.find(c => c.id === id)

  const formatPrice = (price: number) => {
    if (price > 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    if (price > 1) return `$${price.toFixed(2)}`
    return `$${price.toFixed(4)}`
  }

  return (
    <div className="w-full">
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-crypto-accent" />
            Price Alerts
          </h2>
          
          {selectedCrypto && (
            <button
              onClick={() => setShowAddAlert(!showAddAlert)}
              className="px-4 py-2 bg-crypto-accent/20 hover:bg-crypto-accent/30 rounded-lg transition-all text-crypto-accent"
            >
              {showAddAlert ? 'Cancel' : 'New Alert'}
            </button>
          )}
        </div>

        {showAddAlert && selectedCrypto && (
          <div className="glass-dark rounded-lg p-4 mb-4">
            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-1">Alert for {selectedCrypto.name}</div>
              <div className="text-white">Current: {formatPrice(selectedCrypto.price)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => setAlertType('above')}
                className={`
                  px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2
                  ${alertType === 'above' 
                    ? 'bg-crypto-green/20 text-crypto-green border border-crypto-green/50' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'}
                `}
              >
                <ChevronUp className="w-4 h-4" />
                Above
              </button>
              <button
                onClick={() => setAlertType('below')}
                className={`
                  px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2
                  ${alertType === 'below' 
                    ? 'bg-crypto-red/20 text-crypto-red border border-crypto-red/50' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'}
                `}
              >
                <ChevronDown className="w-4 h-4" />
                Below
              </button>
            </div>
            
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={alertPrice}
                onChange={(e) => setAlertPrice(e.target.value)}
                placeholder="Target price"
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-crypto-accent"
                autoFocus
              />
              <button
                onClick={handleAddAlert}
                className="px-4 py-2 bg-crypto-accent hover:bg-crypto-accent/80 rounded-lg text-black font-medium transition-all"
              >
                Set Alert
              </button>
            </div>
          </div>
        )}

        {alerts.length > 0 ? (
          <div className="space-y-2">
            {alerts.map((alert) => {
              const crypto = getCryptoById(alert.cryptoId)
              if (!crypto) return null

              const isAbove = alert.type === 'above'
              const distance = ((alert.targetPrice - crypto.price) / crypto.price) * 100

              return (
                <div
                  key={alert.id}
                  className={`
                    glass-dark rounded-lg p-4 transition-all
                    ${alert.triggered ? 'ring-2 ring-crypto-gold animate-pulse-slow' : ''}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {alert.triggered ? (
                        <div className="p-2 rounded-lg bg-crypto-gold/20">
                          <AlertCircle className="w-5 h-5 text-crypto-gold" />
                        </div>
                      ) : (
                        <div className={`p-2 rounded-lg ${isAbove ? 'bg-crypto-green/20' : 'bg-crypto-red/20'}`}>
                          {isAbove ? (
                            <ChevronUp className={`w-5 h-5 text-crypto-green`} />
                          ) : (
                            <ChevronDown className={`w-5 h-5 text-crypto-red`} />
                          )}
                        </div>
                      )}
                      
                      <div>
                        <div className="text-white font-medium">
                          {crypto.name} {isAbove ? 'above' : 'below'} {formatPrice(alert.targetPrice)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {alert.triggered ? (
                            <span className="text-crypto-gold">Alert triggered!</span>
                          ) : (
                            <>
                              {Math.abs(distance).toFixed(2)}% {distance > 0 ? 'above' : 'below'} current
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeAlert(alert.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-crypto-red/20 transition-all text-gray-400 hover:text-crypto-red"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <BellOff className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <div className="text-gray-400 mb-2">No price alerts set</div>
            <div className="text-sm text-gray-500">
              {selectedCrypto 
                ? 'Click "New Alert" to get notified when prices reach your targets'
                : 'Select a cryptocurrency to set price alerts'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PriceAlerts