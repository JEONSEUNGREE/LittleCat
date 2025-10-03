import React from 'react'
import { BarChart3, TrendingUp, Clock, Zap, Users, Globe } from 'lucide-react'
import useQRStore from '../store/useQRStore'

const QRStats: React.FC = () => {
  const { qrCodes } = useQRStore()
  
  const totalScans = qrCodes.reduce((sum, qr) => sum + qr.scanCount, 0)
  const avgScans = qrCodes.length > 0 ? Math.round(totalScans / qrCodes.length) : 0
  const mostUsedType = qrCodes.length > 0 
    ? Object.entries(
        qrCodes.reduce((acc, qr) => {
          acc[qr.type] = (acc[qr.type] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
    : 'N/A'
  
  const topPerformers = [...qrCodes]
    .sort((a, b) => b.scanCount - a.scanCount)
    .slice(0, 3)

  const stats = [
    { 
      label: 'Total QR Codes', 
      value: qrCodes.length, 
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      label: 'Total Scans', 
      value: totalScans, 
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      label: 'Avg Scans/Code', 
      value: avgScans, 
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    { 
      label: 'Most Used Type', 
      value: mostUsedType.toUpperCase(), 
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index} 
              className="card p-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Top performers */}
      {topPerformers.length > 0 && (
        <div className="card animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-primary" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Top Performers</h3>
          </div>
          
          <div className="space-y-3">
            {topPerformers.map((qr, index) => (
              <div key={qr.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{qr.name}</p>
                    <p className="text-sm text-gray-600">{qr.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{qr.scanCount}</p>
                  <p className="text-xs text-gray-600">scans</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity timeline */}
      <div className="card animate-slide-up">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-primary" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        </div>
        
        <div className="space-y-2">
          {qrCodes.slice(0, 5).map((qr) => (
            <div key={qr.id} className="flex items-center gap-3 p-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Created <span className="font-medium">{qr.name}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(qr.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {qrCodes.length === 0 && (
            <p className="text-center text-gray-500 py-4">No activity yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default QRStats