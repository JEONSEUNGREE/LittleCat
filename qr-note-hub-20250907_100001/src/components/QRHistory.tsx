import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { useQRStore } from '../store/qrStore'
import { 
  Trash2, Download, Copy, CheckCircle, Calendar, 
  Type, Link, Wifi, Mail, Phone, Search, X 
} from 'lucide-react'

export default function QRHistory() {
  const { qrCodes, removeQRCode, clearHistory } = useQRStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [qrImages, setQrImages] = useState<Record<string, string>>({})

  const typeIcons = {
    text: Type,
    url: Link,
    wifi: Wifi,
    email: Mail,
    phone: Phone,
  }

  const filteredQRCodes = qrCodes.filter(qr =>
    qr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qr.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const generateQRImages = async () => {
      const images: Record<string, string> = {}
      for (const qr of qrCodes.slice(0, 10)) {
        try {
          const dataURL = await QRCode.toDataURL(qr.content, {
            width: 200,
            margin: 1,
            color: {
              dark: qr.color || '#000000',
              light: '#FFFFFF'
            }
          })
          images[qr.id] = dataURL
        } catch (error) {
          console.error('QR 이미지 생성 실패:', error)
        }
      }
      setQrImages(images)
    }
    generateQRImages()
  }, [qrCodes])

  const handleCopy = async (qr: typeof qrCodes[0]) => {
    try {
      await navigator.clipboard.writeText(qr.content)
      setCopiedId(qr.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('복사 실패:', error)
    }
  }

  const handleDownload = async (qr: typeof qrCodes[0]) => {
    try {
      const dataURL = await QRCode.toDataURL(qr.content, {
        width: 400,
        margin: 2,
        color: {
          dark: qr.color || '#000000',
          light: '#FFFFFF'
        }
      })
      const link = document.createElement('a')
      link.download = `qr-${qr.title.replace(/\s+/g, '-')}-${Date.now()}.png`
      link.href = dataURL
      link.click()
    } catch (error) {
      console.error('다운로드 실패:', error)
    }
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return `${minutes}분 전`
      }
      return `${hours}시간 전`
    } else if (days === 1) {
      return '어제'
    } else if (days < 7) {
      return `${days}일 전`
    } else {
      return d.toLocaleDateString('ko-KR')
    }
  }

  if (qrCodes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4">
          <Calendar className="text-white/60" size={40} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">히스토리가 비어있습니다</h3>
        <p className="text-white/60">생성한 QR 코드가 여기에 저장됩니다</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button
          onClick={clearHistory}
          className="button-secondary flex items-center justify-center gap-2"
        >
          <X size={18} />
          전체 삭제
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredQRCodes.map((qr) => {
          const Icon = typeIcons[qr.type]
          return (
            <div key={qr.id} className="glass-card p-4 hover:scale-[1.02] transition-transform">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {qrImages[qr.id] && (
                    <img 
                      src={qrImages[qr.id]} 
                      alt="QR Code" 
                      className="w-24 h-24 bg-white rounded-lg p-1"
                    />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="text-white/80" size={16} />
                      <h4 className="font-semibold text-white truncate">
                        {qr.title}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-white/60 text-sm truncate mb-2">
                    {qr.content}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(qr.createdAt)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(qr)}
                      className="flex-1 py-1.5 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors flex items-center justify-center gap-1"
                    >
                      {copiedId === qr.id ? <CheckCircle size={14} /> : <Copy size={14} />}
                      {copiedId === qr.id ? '복사됨' : '복사'}
                    </button>
                    <button
                      onClick={() => handleDownload(qr)}
                      className="flex-1 py-1.5 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors flex items-center justify-center gap-1"
                    >
                      <Download size={14} />
                      저장
                    </button>
                    <button
                      onClick={() => removeQRCode(qr.id)}
                      className="py-1.5 px-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-white text-sm transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredQRCodes.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-white/60">검색 결과가 없습니다</p>
        </div>
      )}
    </div>
  )
}