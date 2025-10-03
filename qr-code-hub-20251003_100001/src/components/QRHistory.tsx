import React from 'react'
import { Clock, Search, Filter, Trash2, Eye, TrendingUp } from 'lucide-react'
import useQRStore from '../store/useQRStore'

const QRHistory: React.FC = () => {
  const { 
    searchTerm, 
    filterType, 
    setSearchTerm, 
    setFilterType, 
    getFilteredQRCodes, 
    deleteQRCode,
    setActiveQR 
  } = useQRStore()
  
  const filteredCodes = getFilteredQRCodes()

  const typeColors = {
    url: 'bg-blue-100 text-blue-800',
    text: 'bg-green-100 text-green-800',
    wifi: 'bg-purple-100 text-purple-800',
    email: 'bg-orange-100 text-orange-800',
    phone: 'bg-pink-100 text-pink-800'
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">QR History</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>{filteredCodes.length} codes</span>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search QR codes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Types</option>
            <option value="url">URL</option>
            <option value="text">Text</option>
            <option value="wifi">WiFi</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>

      {/* QR codes list */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredCodes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">No QR codes yet</p>
            <p className="text-sm">Create your first QR code to get started!</p>
          </div>
        ) : (
          filteredCodes.map((qr) => (
            <div
              key={qr.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setActiveQR(qr)}
            >
              {/* QR thumbnail */}
              {qr.logo && (
                <img 
                  src={qr.logo} 
                  alt={qr.name}
                  className="w-16 h-16 rounded-lg shadow-sm"
                />
              )}
              
              {/* QR info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">{qr.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${typeColors[qr.type]}`}>
                    {qr.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{qr.content}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>{formatDate(qr.createdAt)}</span>
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{qr.scanCount} scans</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                {qr.scanCount > 5 && (
                  <TrendingUp size={20} className="text-green-600" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteQRCode(qr.id)
                  }}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default QRHistory