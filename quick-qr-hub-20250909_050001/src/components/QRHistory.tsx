import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Trash2, Clock, Copy, Check, Download } from 'lucide-react'
import { useQRStore } from '../store/qrStore'
import { useState } from 'react'

const QRHistory = () => {
  const { history, removeFromHistory, clearHistory } = useQRStore()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(hours / 24)
      return `${days} day${days !== 1 ? 's' : ''} ago`
    }
  }

  const copyContent = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const QRHistoryItem = ({ item }: { item: typeof history[0] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    useEffect(() => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, item.content, {
          width: 100,
          margin: 1,
          color: {
            dark: item.color || '#000000',
            light: '#FFFFFF'
          }
        })
      }
    }, [item])

    const downloadQR = () => {
      if (!canvasRef.current) return
      
      const url = canvasRef.current.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `qr-${item.label.replace(/\s+/g, '-')}-${item.id}.png`
      link.href = url
      link.click()
    }
    
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-white/70 transition-all">
        <canvas ref={canvasRef} className="rounded-lg bg-white" />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{item.label}</h3>
          <p className="text-sm text-gray-600 capitalize">{item.type}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" />
            {formatDate(item.timestamp)}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => copyContent(item.content, item.id)}
            className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all"
            title="Copy content"
          >
            {copiedId === item.id ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-purple-600" />
            )}
          </button>
          
          <button
            onClick={downloadQR}
            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all"
            title="Download QR"
          >
            <Download className="w-4 h-4 text-blue-600" />
          </button>
          
          <button
            onClick={() => removeFromHistory(item.id)}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-12 h-12 text-white/60" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No QR Codes Yet</h3>
        <p className="text-white/60">Generated QR codes will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Recent QR Codes</h2>
        <button
          onClick={clearHistory}
          className="text-red-400 hover:text-red-300 font-medium"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {history.map((item) => (
          <QRHistoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default QRHistory